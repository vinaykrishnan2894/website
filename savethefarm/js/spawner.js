// spawner.js — Pest spawning logic with progressive difficulty

class Spawner {
  constructor(grid) {
    this.grid = grid;         // array of CropTile
    this.activePests = [];    // current Pest objects
    this.spawnTimer = 0;
    this.elapsedTime = 0;
    this.enabled = false;
    this._onPestDamage = null; // callback(tileIndex)
    this._onPestChased = null; // callback(pest)
  }

  start() {
    this.enabled = true;
    this.elapsedTime = 0;
    this.spawnTimer = 0;
    this.activePests = [];
  }

  stop() {
    this.enabled = false;
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
      .map((t, i) => i)
      .filter(i => !this.grid[i].dead && !excludeIndices.includes(i));
    if (available.length === 0) return null;
    return available[Math.floor(Math.random() * available.length)];
  }

  _tilesOccupied() {
    return this.activePests
      .filter(p => p.alive)
      .map(p => p.tileIndex)
      .concat(
        this.activePests
          .filter(p => p.alive && p.secondaryTileIndex !== null)
          .map(p => p.secondaryTileIndex)
      );
  }

  _spawnPest(phase) {
    const occupied = this._tilesOccupied();
    const tileIndex = this._pickRandomTile(occupied);
    if (tileIndex === null) return;

    const type = phase.types[Math.floor(Math.random() * phase.types.length)];
    const tile = this.grid[tileIndex];
    const pest = new Pest(type, tileIndex, tile.px, tile.py, tile.tileSize);

    // Cricket swarm: pick a second adjacent tile
    if (type === 'cricket') {
      const col = tileIndex % CONFIG.GRID_COLS;
      const row = Math.floor(tileIndex / CONFIG.GRID_COLS);
      const neighbors = [];
      if (col + 1 < CONFIG.GRID_COLS) neighbors.push(tileIndex + 1);
      if (col - 1 >= 0) neighbors.push(tileIndex - 1);
      if (row + 1 < CONFIG.GRID_ROWS) neighbors.push(tileIndex + CONFIG.GRID_COLS);
      if (row - 1 >= 0) neighbors.push(tileIndex - CONFIG.GRID_COLS);
      const validNeighbors = neighbors.filter(n => !this.grid[n].dead && !occupied.includes(n));
      if (validNeighbors.length > 0) {
        pest.secondaryTileIndex = validNeighbors[Math.floor(Math.random() * validNeighbors.length)];
        const secondTile = this.grid[pest.secondaryTileIndex];
        // Position cricket swarm between the two tiles
        pest.x = (tile.px + secondTile.px + tile.tileSize) / 2;
        pest.y = (tile.py + secondTile.py + tile.tileSize) / 2;
      }
    }

    // Rabbit: set up hop path
    if (type === 'rabbit') {
      pest.hopTimer = CONFIG.RABBIT_HOP_INTERVAL;
      pest.hopCount = 0;
      pest.settled = false;
      // Start from a random edge position
      pest.x = tile.px + tile.tileSize / 2 + (Math.random() - 0.5) * 20;
      pest.y = tile.py + tile.tileSize / 2;
    }

    // Crow fly-in: start from above
    if (type === 'crow') {
      pest.flyInY = tile.py - 100;
      pest.startY = tile.py + tile.tileSize / 2;
      pest.y = pest.flyInY;
    }

    this.activePests.push(pest);
  }

  // Called when dog arrives at a pest's tile
  chasePest(tileIndex) {
    const pest = this.activePests.find(p =>
      p.alive && (p.tileIndex === tileIndex || p.secondaryTileIndex === tileIndex)
    );
    if (!pest) return null;
    pest.startFlee();
    if (this._onPestChased) this._onPestChased(pest);
    return pest;
  }

  // Returns the alive pest at this tile (if any)
  getPestAtTile(tileIndex) {
    return this.activePests.find(p =>
      p.alive && (p.tileIndex === tileIndex || p.secondaryTileIndex === tileIndex)
    );
  }

  update(dt) {
    this.elapsedTime += dt;

    // Update all pests
    this.activePests.forEach(p => p.update(dt));

    // Check for expired pests (timer ran out)
    this.activePests.forEach(p => {
      if (p.alive && p.timer <= 0) {
        // Pest eats the crop
        p.alive = false;
        p.fleeing = true; // play flee anim anyway (slinks away)
        p.fleeTime = p.fleeMaxTime;
        const tile = this.grid[p.tileIndex];
        if (tile) tile.takeDamage();
        if (p.secondaryTileIndex !== null) {
          const tile2 = this.grid[p.secondaryTileIndex];
          if (tile2) tile2.takeDamage();
        }
        if (this._onPestDamage) {
          this._onPestDamage(p.tileIndex);
          if (p.secondaryTileIndex !== null) this._onPestDamage(p.secondaryTileIndex);
        }
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
      const currentCount = this.activePests.filter(p => p.alive).length;
      const toSpawn = Math.min(
        phase.maxSimul - currentCount,
        // In phases 3+, sometimes spawn 2
        phase.maxSimul >= 2 && Math.random() < 0.4 ? 2 : 1
      );
      for (let i = 0; i < toSpawn; i++) {
        this._spawnPest(phase);
      }
    }
  }

  draw(ctx) {
    this.activePests.forEach(p => p.draw(ctx));
  }
}
