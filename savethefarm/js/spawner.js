// spawner.js — Pest spawning with progressive difficulty
// Fixes: B5 (elapsedTime leaks past stop), B8 (rabbit hops between tiles), G5 (grace period)

class Spawner {
  constructor(grid) {
    this.grid       = grid;
    this.activePests = [];
    this.spawnTimer  = 0;
    this.elapsedTime = 0;
    this.enabled     = false;
    this._onPestDamage = null;
    this._onPestChased = null;
  }

  start() {
    this.enabled     = true;
    this.elapsedTime = 0;
    this.spawnTimer  = CONFIG.SPAWN_GRACE_PERIOD; // G5: grace before first spawn
    this.activePests = [];
  }

  stop() {
    this.enabled = false;
    // B5 fix: do NOT keep ticking elapsedTime after stop
  }

  onPestDamage(cb) { this._onPestDamage = cb; }
  onPestChased(cb) { this._onPestChased = cb; }

  _currentPhase() {
    for (const phase of CONFIG.PHASES) {
      if (this.elapsedTime >= phase.startTime && this.elapsedTime < phase.endTime) {
        return phase;
      }
    }
    return CONFIG.PHASES[CONFIG.PHASES.length - 1];
  }

  _pickRandomTile(excludeIndices = []) {
    const available = this.grid
      .map((_, i) => i)
      .filter(i => !this.grid[i].dead && !excludeIndices.includes(i));
    if (available.length === 0) return null;
    return available[Math.floor(Math.random() * available.length)];
  }

  _tilesOccupied() {
    const out = [];
    for (const p of this.activePests) {
      if (!p.alive) continue;
      out.push(p.tileIndex);
      if (p.secondaryTileIndex !== null) out.push(p.secondaryTileIndex);
    }
    return out;
  }

  _spawnPest(phase) {
    const occupied  = this._tilesOccupied();
    const tileIndex = this._pickRandomTile(occupied);
    if (tileIndex === null) return;

    const type = phase.types[Math.floor(Math.random() * phase.types.length)];
    const tile = this.grid[tileIndex];
    const pest = new Pest(type, tileIndex, tile.px, tile.py, tile.tileSize);

    // Cricket: pick adjacent secondary tile
    if (type === 'cricket') {
      const col = tileIndex % CONFIG.GRID_COLS;
      const row = Math.floor(tileIndex / CONFIG.GRID_COLS);
      const neighbors = [];
      if (col + 1 < CONFIG.GRID_COLS) neighbors.push(tileIndex + 1);
      if (col - 1 >= 0)               neighbors.push(tileIndex - 1);
      if (row + 1 < CONFIG.GRID_ROWS) neighbors.push(tileIndex + CONFIG.GRID_COLS);
      if (row - 1 >= 0)               neighbors.push(tileIndex - CONFIG.GRID_COLS);
      const valid = neighbors.filter(n => !this.grid[n].dead && !occupied.includes(n));
      if (valid.length > 0) {
        pest.secondaryTileIndex = valid[Math.floor(Math.random() * valid.length)];
        const t2 = this.grid[pest.secondaryTileIndex];
        pest.x = (tile.px + t2.px + tile.tileSize) / 2;
        pest.y = (tile.py + t2.py + tile.tileSize) / 2;
      }
    }

    // G8 fix: Rabbit gets a hop PATH (list of tile indices to visit)
    if (type === 'rabbit') {
      const hopPath = _buildRabbitPath(tileIndex, this.grid, occupied);
      pest.hopPath      = hopPath;  // array of tile indices
      pest.hopPathIdx   = 0;        // which hop we're on
      pest.hopTimer     = CONFIG.RABBIT_HOP_INTERVAL;
      pest.settled      = false;
      // Start at first tile
      pest.x = tile.px + tile.tileSize / 2;
      pest.y = tile.py + tile.tileSize / 2;
    }

    // Crow fly-in from above
    if (type === 'crow') {
      pest.flyInY = tile.py - 120;
      pest.startY = tile.py + tile.tileSize / 2;
      pest.y      = pest.flyInY;
    }

    this.activePests.push(pest);
  }

  // B3 fix: dog goes to the TAPPED tile, but we match pest by either tile
  chasePest(tileIndex) {
    const pest = this.activePests.find(p =>
      p.alive && (p.tileIndex === tileIndex || p.secondaryTileIndex === tileIndex)
    );
    if (!pest) return null;
    pest.startFlee();
    if (this._onPestChased) this._onPestChased(pest);
    return pest;
  }

  getPestAtTile(tileIndex) {
    return this.activePests.find(p =>
      p.alive && (p.tileIndex === tileIndex || p.secondaryTileIndex === tileIndex)
    );
  }

  update(dt) {
    // B5 fix: only advance time when enabled
    if (this.enabled) {
      this.elapsedTime += dt;
    }

    // Update all pests (always, so flee animations complete)
    this.activePests.forEach(p => p.update(dt, this.grid));

    // G8: advance rabbit hops between tiles
    this.activePests.forEach(p => {
      if (p.type !== 'rabbit' || p.settled || !p.alive) return;
      p.hopTimer -= dt;
      if (p.hopTimer <= 0) {
        p.hopPathIdx++;
        if (p.hopPathIdx >= p.hopPath.length) {
          // Reached final tile — settle here
          p.settled    = true;
          p.tileIndex  = p.hopPath[p.hopPath.length - 1];
          p.timer      = CONFIG.PEST_TIMERS.rabbit;
          p.maxTimer   = p.timer;
          const ft = this.grid[p.tileIndex];
          p.x = ft.px + ft.tileSize / 2;
          p.y = ft.py + ft.tileSize / 2;
        } else {
          // Hop to next tile
          const nextIdx = p.hopPath[p.hopPathIdx];
          p.tileIndex   = nextIdx;
          const nt      = this.grid[nextIdx];
          p.x           = nt.px + nt.tileSize / 2;
          p.y           = nt.py + nt.tileSize / 2;
          p.isHopping   = true;
          p.hopTimer    = CONFIG.RABBIT_HOP_INTERVAL;
          setTimeout(() => { p.isHopping = false; }, CONFIG.RABBIT_HOP_INTERVAL * 400);
        }
      }
    });

    // Check expired pests
    this.activePests.forEach(p => {
      if (!p.alive || p.timer > 0) return;
      p.alive    = false;
      p.fleeing  = true;
      p.fleeTime = p.fleeMaxTime;
      const tile = this.grid[p.tileIndex];
      if (tile) tile.takeDamage();
      if (p.secondaryTileIndex !== null) {
        const t2 = this.grid[p.secondaryTileIndex];
        if (t2) t2.takeDamage();
      }
      if (this._onPestDamage) {
        this._onPestDamage(p.tileIndex);
        if (p.secondaryTileIndex !== null) this._onPestDamage(p.secondaryTileIndex);
      }
    });

    // Remove finished pests
    this.activePests = this.activePests.filter(p => !p.isDone);

    if (!this.enabled) return;

    // Spawn new pests
    const phase = this._currentPhase();
    this.spawnTimer -= dt;
    if (this.spawnTimer <= 0) {
      this.spawnTimer = phase.interval;
      const alive = this.activePests.filter(p => p.alive).length;
      const want  = phase.maxSimul >= 2 && Math.random() < 0.4 ? 2 : 1;
      const count = Math.min(phase.maxSimul - alive, want);
      for (let i = 0; i < count; i++) this._spawnPest(phase);
    }
  }

  draw(ctx) {
    this.activePests.forEach(p => p.draw(ctx));
  }
}

// G8 helper: build a short random path of 2-3 adjacent tile indices for rabbit
function _buildRabbitPath(startIdx, grid, occupied) {
  const path   = [startIdx];
  const maxLen = Math.floor(Math.random() * (CONFIG.RABBIT_HOP_COUNT.max - CONFIG.RABBIT_HOP_COUNT.min + 1))
               + CONFIG.RABBIT_HOP_COUNT.min;
  let cur = startIdx;
  for (let h = 0; h < maxLen; h++) {
    const col  = cur % CONFIG.GRID_COLS;
    const row  = Math.floor(cur / CONFIG.GRID_COLS);
    const candidates = [];
    if (col + 1 < CONFIG.GRID_COLS) candidates.push(cur + 1);
    if (col - 1 >= 0)               candidates.push(cur - 1);
    if (row + 1 < CONFIG.GRID_ROWS) candidates.push(cur + CONFIG.GRID_COLS);
    if (row - 1 >= 0)               candidates.push(cur - CONFIG.GRID_COLS);
    const valid = candidates.filter(n => !grid[n].dead && !path.includes(n) && !occupied.includes(n));
    if (valid.length === 0) break;
    cur = valid[Math.floor(Math.random() * valid.length)];
    path.push(cur);
  }
  return path;
}
