// game.js — Core game loop, state machine, world rendering
// States: LOADING → READY → COUNTDOWN → PLAYING → PAUSED → ENDING → ENDED → RESULTS

const CROP_TYPES = ['wheat', 'corn', 'carrot', 'sunflower'];
const GAME_OVER_CROP_THRESHOLD = 3;

class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx    = this.canvas.getContext('2d');
    this.state  = 'LOADING';

    // Must exist before resize()
    this.grid        = [];
    this.gridOffsetX = 0;
    this.gridOffsetY = 0;
    this.tileSize    = CONFIG.TILE_SIZE;

    // P1/P2: gradient/cloud cache
    this._bgCache = null;
    this._bgCacheW = 0;
    this._bgCacheH = 0;

    this._dpr = window.devicePixelRatio || 1;
    this._resizeScheduled = false;
    this.resize();
    window.addEventListener('resize', () => {
      if (!this._resizeScheduled) {
        this._resizeScheduled = true;
        requestAnimationFrame(() => { this.resize(); this._resizeScheduled = false; });
      }
    });

    this.dog     = null;
    this.spawner = null;
    this.ui      = new UI(this.canvas);

    this.timeLeft     = CONFIG.GAME_DURATION;
    this.bestCombo    = 1;
    this.pestsChased  = 0;
    this.loadProgress = 0;
    this.countdownValue = CONFIG.COUNTDOWN_DURATION;
    this.countdownTimer = 0;
    this.highScore = parseInt(localStorage.getItem('stf_highScore') || '0');

    this.missTaps        = [];
    this._gameOverBanner = null;
    this._globalTime     = 0; // ambient animation clock

    // Camera shake
    this._shakeTime = 0; this._shakeX = 0; this._shakeY = 0;

    this._setupInput();

    this._pauseBtn = document.getElementById('pauseBtn');
    if (this._pauseBtn) {
      this._pauseBtn.addEventListener('click', e => {
        e.stopPropagation();
        this.togglePause();
        Audio.init();
      });
      this._pauseBtn.style.display = 'none';
    }

    this._lastTime = performance.now();
    requestAnimationFrame(ts => this._loop(ts));
    this._fakeLoad();
  }

  // ── LAYOUT ──────────────────────────────────────
  resize() {
    const dpr = window.devicePixelRatio || 1;
    this._dpr = dpr;
    const w   = window.innerWidth;
    const h   = window.innerHeight;
    this.canvas.width  = Math.round(w * dpr);
    this.canvas.height = Math.round(h * dpr);
    this.canvas.style.width  = w + 'px';
    this.canvas.style.height = h + 'px';
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.cw = w; this.ch = h;
    // Invalidate background cache on resize
    this._bgCache = null;
    this._calcLayout();
  }

  _calcLayout() {
    const isLandscape = this.cw > this.ch * 1.3;
    const hudH  = isLandscape ? 70 : 110;
    const maxW  = Math.min(this.cw - 28, isLandscape ? this.cw * 0.56 : 430);
    const maxH  = Math.min(this.ch - hudH - 20, 430);
    this.tileSize = Math.floor(Math.min(
      (maxW - (CONFIG.GRID_COLS - 1) * CONFIG.TILE_PADDING) / CONFIG.GRID_COLS,
      (maxH - (CONFIG.GRID_ROWS - 1) * CONFIG.TILE_PADDING) / CONFIG.GRID_ROWS,
      CONFIG.TILE_SIZE
    ));
    const gridW = CONFIG.GRID_COLS * this.tileSize + (CONFIG.GRID_COLS - 1) * CONFIG.TILE_PADDING;
    const gridH = CONFIG.GRID_ROWS * this.tileSize + (CONFIG.GRID_ROWS - 1) * CONFIG.TILE_PADDING;
    this.gridOffsetX = isLandscape
      ? (this.cw * 0.5 - gridW) / 2 + this.cw * 0.08
      : (this.cw - gridW) / 2;
    this.gridOffsetY = (this.ch - gridH) / 2 + (isLandscape ? 0 : 18);

    if (this.grid.length > 0) {
      this.grid.forEach((tile, i) => {
        const col = i % CONFIG.GRID_COLS;
        const row = Math.floor(i / CONFIG.GRID_COLS);
        tile.px = this.gridOffsetX + col * (this.tileSize + CONFIG.TILE_PADDING);
        tile.py = this.gridOffsetY + row * (this.tileSize + CONFIG.TILE_PADDING);
        tile.tileSize = this.tileSize;
      });
    }
  }

  _gw() { return CONFIG.GRID_COLS * this.tileSize + (CONFIG.GRID_COLS - 1) * CONFIG.TILE_PADDING; }
  _gh() { return CONFIG.GRID_ROWS * this.tileSize + (CONFIG.GRID_ROWS - 1) * CONFIG.TILE_PADDING; }

  // ── BUILD ────────────────────────────────────────
  _buildGrid() {
    this.grid = [];
    for (let i = 0; i < CONFIG.GRID_ROWS * CONFIG.GRID_COLS; i++) {
      const col  = i % CONFIG.GRID_COLS;
      const row  = Math.floor(i / CONFIG.GRID_COLS);
      const type = CROP_TYPES[i % CROP_TYPES.length];
      const tile = new CropTile(col, row, type, 2);
      tile.px = this.gridOffsetX + col * (this.tileSize + CONFIG.TILE_PADDING);
      tile.py = this.gridOffsetY + row * (this.tileSize + CONFIG.TILE_PADDING);
      tile.tileSize = this.tileSize;
      this.grid.push(tile);
    }
  }

  _buildDog() {
    const cx = this.gridOffsetX + this._gw() / 2;
    const cy = this.gridOffsetY + this._gh() / 2;
    this.dog = new Dog(cx, cy);
    this.dog.centerX = cx; this.dog.centerY = cy;
    this.dog.size = Math.max(58, Math.min(Math.round(this.tileSize * 0.95), 92));
  }

  _buildSpawner() {
    this.spawner = new Spawner(this.grid);
    this.spawner.onPestDamage(tileIndex => {
      const tile = this.grid[tileIndex];
      if (tile) {
        // Camera shake on crop death
        this._triggerShake(4, 0.3);
        this.ui.scorePopups.push(new ScorePopup(
          tile.px + this.tileSize / 2, tile.py - 10, '💥', '#FF4968'
        ));
      }
      Audio.playMiss();
      this._checkCropGameOver();
    });
  }

  _triggerShake(amount, duration) {
    this._shakeTime = duration;
    this._shakeMag  = amount;
  }

  _checkCropGameOver() {
    if (this.state !== 'PLAYING') return;
    const alive = this.grid.filter(t => !t.dead).length;
    if (alive <= GAME_OVER_CROP_THRESHOLD) {
      this.state = 'ENDING';
      this.spawner.stop();
      this._gameOverBanner = { text: '☠ FARM DESTROYED!', alpha: 1, timer: 1.5 };
      setTimeout(() => this._endGame(), 1500);
    }
  }

  // ── LIFECYCLE ────────────────────────────────────
  _fakeLoad() {
    const duration = 1600; // slightly longer to let sprites load
    const start    = performance.now();

    // Kick off sprite preload in parallel
    let spritesReady = false;
    if (typeof loadSprites !== 'undefined') {
      loadSprites(() => { spritesReady = true; });
    } else {
      spritesReady = true;
    }

    const tick = () => {
      const elapsed = performance.now() - start;
      this.loadProgress = Math.min(1, elapsed / duration);
      // Don't advance past 0.95 until sprites are loaded
      if (!spritesReady) this.loadProgress = Math.min(0.92, this.loadProgress);
      if (this.loadProgress < 1 || !spritesReady) requestAnimationFrame(tick);
      else setTimeout(() => { this.state = 'READY'; }, 80);
    };
    requestAnimationFrame(tick);
  }

  _startGame() {
    Audio.stopMusic(0.3); // stop any previous music immediately
    this._bgCache = null; // force background re-render
    this._buildGrid();
    this._calcLayout();
    this._buildDog();
    this._buildSpawner();

    this.timeLeft    = CONFIG.GAME_DURATION;
    this.ui.score    = 0; this.ui.displayScore = 0;
    this.ui.timeLeft = this.timeLeft; this.ui.totalTime = CONFIG.GAME_DURATION;
    this.ui.resetResults();
    this.ui.breakCombo();
    this.pestsChased     = 0; this.bestCombo = 1;
    this.missTaps        = []; this._gameOverBanner = null;
    this._globalTime     = 0;
    this._shakeTime      = 0;

    this.state          = 'COUNTDOWN';
    this.countdownValue = CONFIG.COUNTDOWN_DURATION;
    this.countdownTimer = 1.0;
    this.ui.showCountdown(this.countdownValue);
    Audio.playCountdown(false);

    if (this._pauseBtn) { this._pauseBtn.style.display = 'block'; this._pauseBtn.textContent = '⏸'; }
  }

  togglePause() {
    if (this.state === 'PLAYING') {
      this.state = 'PAUSED';
      if (this._pauseBtn) this._pauseBtn.textContent = '▶';
    } else if (this.state === 'PAUSED') {
      this.state = 'PLAYING';
      if (this._pauseBtn) this._pauseBtn.textContent = '⏸';
    }
  }

  _updateMusicIntensity() {
    const elapsed = CONFIG.GAME_DURATION - this.timeLeft;
    let level = 0;
    for (let i = CONFIG.PHASES.length - 1; i >= 0; i--) {
      if (elapsed >= CONFIG.PHASES[i].startTime) { level = i; break; }
    }
    Audio.setMusicIntensity(level);
  }

  _endGame() {
    if (this.state === 'ENDED' || this.state === 'RESULTS') return;
    this.state = 'ENDED';
    this.spawner.stop();
    Audio.stopMusic(0.8);

    const cropBonus = this.grid.reduce((s, t) => {
      if (!t.dead) s += CONFIG.SURVIVING_CROP_BONUS;
      if (t.hp === t.maxHp) s += CONFIG.PERFECT_CROP_BONUS;
      return s;
    }, 0);
    this.ui.score += cropBonus;
    if (cropBonus > 0) {
      this.ui.scorePopups.push(new ScorePopup(this.cw / 2, this.ch / 2 - 70, `+${cropBonus} Crop Bonus!`, CONFIG.COLORS.gold));
    }

    const final = Math.round(this.ui.score);
    if (final > this.highScore) { this.highScore = final; localStorage.setItem('stf_highScore', this.highScore); }
    if (final >= 300) Audio.playVictory(); else Audio.playGameOver();

    setTimeout(() => {
      this.state = 'RESULTS';
      this.ui.resultsVisible = true;
      if (this._pauseBtn) this._pauseBtn.style.display = 'none';
    }, 1400);
  }

  // ── INPUT ────────────────────────────────────────
  _setupInput() {
    const handler = e => {
      e.preventDefault();
      Audio.init();
      const rect = this.canvas.getBoundingClientRect();
      const pts  = e.changedTouches || [e];
      for (const p of pts) {
        const px = (p.clientX !== undefined ? p.clientX : p.pageX) - rect.left;
        const py = (p.clientY !== undefined ? p.clientY : p.pageY) - rect.top;
        this._onTap(px, py);
      }
    };
    this.canvas.addEventListener('pointerdown', handler, { passive: false });
  }

  _onTap(px, py) {
    if (this.state === 'READY') {
      if (this.ui.hitTestReady(px, py) === 'play') this._startGame();
      return;
    }
    if (this.state === 'RESULTS') {
      const hit = this.ui.hitTestResults(px, py);
      if (hit === 'playAgain')  this._startGame();
      if (hit === 'backToFarm') window.location.href = 'https://vinaykrishnan.in';
      return;
    }
    if (this.state !== 'PLAYING') return;

    const tileIndex = this._tileAtPoint(px, py);
    if (tileIndex !== null) this.grid[tileIndex].triggerRipple();

    const pest = tileIndex !== null ? this.spawner.getPestAtTile(tileIndex) : null;
    if (!pest) {
      this.missTaps.push({ x: px, y: py, life: 0.55, maxLife: 0.55 });
      return;
    }

    const targetTile = this.grid[tileIndex];
    const destX = targetTile.px + targetTile.tileSize / 2;
    const destY = targetTile.py + targetTile.tileSize / 2 - targetTile.tileSize * 0.1;

    const capturedPest = pest;
    this.dog.moveTo(destX, destY, () => {
      const chased = this.spawner.chasePest(capturedPest.tileIndex);
      if (!chased) return;

      this.pestsChased++;
      Audio.playChase();
      this._triggerShake(2, 0.15); // light shake on successful chase

      // C1 fix: lastArrivalTime properly compared
      const now         = this.timeLeft;
      const last        = this.dog.lastArrivalTime;
      const timeSinceLast = last === null ? 9999 : Math.abs(last - now);

      if (timeSinceLast <= CONFIG.COMBO_WINDOW) {
        this.ui.addCombo();
        if (this.ui.comboMultiplier > 1) Audio.playCombo(this.ui.comboMultiplier);
      } else {
        this.ui.breakCombo();
        this.ui.addCombo();
      }
      this.dog.lastArrivalTime = now;
      this.bestCombo = Math.max(this.bestCombo, this.ui.comboMultiplier);

      const pts       = CONFIG.PEST_POINTS[chased.type];
      const scoreTile = this.grid[chased.tileIndex];
      this.ui.addScore(pts, scoreTile.px + this.tileSize / 2, scoreTile.py - 10, this.ui.comboMultiplier);
    });
  }

  _tileAtPoint(px, py) {
    // C2 fix: reduced pad and check centre-closest tile to avoid overlaps
    const pad = 8;
    let bestIdx = null, bestDist = 9999;
    for (let i = 0; i < this.grid.length; i++) {
      const t = this.grid[i];
      if (px >= t.px - pad && px <= t.px + this.tileSize + pad &&
          py >= t.py - pad && py <= t.py + this.tileSize + pad) {
        const cx   = t.px + this.tileSize / 2;
        const cy   = t.py + this.tileSize / 2;
        const dist = Math.hypot(px - cx, py - cy);
        if (dist < bestDist) { bestDist = dist; bestIdx = i; }
      }
    }
    return bestIdx;
  }

  // ── LOOP ─────────────────────────────────────────
  _loop(ts) {
    const dt = Math.min((ts - this._lastTime) / 1000, 0.05);
    this._lastTime = ts;
    this._update(dt);
    this._draw();
    requestAnimationFrame(t => this._loop(t));
  }

  _update(dt) {
    this._globalTime += dt;

    // Camera shake
    if (this._shakeTime > 0) {
      this._shakeTime -= dt;
      const mag  = (this._shakeTime / 0.3) * (this._shakeMag || 4);
      this._shakeX = (Math.random() - 0.5) * mag;
      this._shakeY = (Math.random() - 0.5) * mag;
      if (this._shakeTime <= 0) { this._shakeX = 0; this._shakeY = 0; }
    }

    // Miss taps
    this.missTaps = this.missTaps.filter(m => { m.life -= dt; return m.life > 0; });

    // Game over banner
    if (this._gameOverBanner) {
      this._gameOverBanner.timer -= dt;
      this._gameOverBanner.alpha  = Math.min(1, this._gameOverBanner.timer / 0.5);
    }

    // Update pest threat state on tiles
    if (this.grid.length > 0 && this.spawner) {
      this.grid.forEach(t => { t.threatened = false; });
      this.spawner.activePests.forEach(p => {
        if (!p.alive) return;
        if (this.grid[p.tileIndex]) this.grid[p.tileIndex].threatened = true;
        if (p.secondaryTileIndex !== null && this.grid[p.secondaryTileIndex])
          this.grid[p.secondaryTileIndex].threatened = true;
      });
    }

    switch (this.state) {
      case 'LOADING': break;
      case 'READY':
        if (!this.ui._readyAnim) this.ui._readyAnim = 0;
        this.ui._readyAnim += dt;
        break;

      case 'COUNTDOWN':
        this.countdownTimer -= dt;
        if (this.countdownTimer <= 0) {
          this.countdownValue--;
          if (this.countdownValue <= 0) {
            this.state = 'PLAYING'; this.spawner.start();
            this.ui.showCountdown(0); Audio.playCountdown(true);
            Audio.startMusic();
            this.countdownTimer = 0.9;
          } else {
            this.countdownTimer = 1.0;
            this.ui.showCountdown(this.countdownValue); Audio.playCountdown(false);
          }
        }
        this.grid.forEach(t => t.update(dt));
        this.ui.update(dt, CONFIG.GAME_DURATION);
        break;

      case 'PLAYING':
        this.timeLeft -= dt;
        if (this.timeLeft <= 0) { this.timeLeft = 0; this._endGame(); }
        // Update music intensity to match current phase
        this._updateMusicIntensity();
        this.grid.forEach(t => t.update(dt));
        this.dog.update(dt);
        this.spawner.update(dt);
        this.ui.update(dt, this.timeLeft);
        break;

      case 'ENDING':
      case 'ENDED':
        this.grid.forEach(t => t.update(dt));
        if (this.dog) this.dog.update(dt);
        if (this.spawner) this.spawner.update(dt);
        this.ui.update(dt, Math.max(0, this.timeLeft));
        break;

      case 'PAUSED':
        this.ui.update(0, this.timeLeft);
        break;

      case 'RESULTS':
        this.ui.update(dt, 0);
        break;
    }
  }

  // ── DRAW ─────────────────────────────────────────
  _draw() {
    const ctx = this.ctx;
    ctx.save();
    ctx.clearRect(0, 0, this.cw, this.ch);

    switch (this.state) {
      case 'LOADING':
        this.ui.drawLoading(ctx, this.cw, this.ch, this.loadProgress);
        break;
      case 'READY':
        this.ui.drawReady(ctx, this.cw, this.ch);
        break;
      default:
        this._drawGameWorld();
        break;
    }
    ctx.restore();
  }

  // P1/P2: cache static background into offscreen canvas
  _ensureBgCache() {
    if (this._bgCache && this._bgCacheW === this.cw && this._bgCacheH === this.ch) return;
    const oc  = document.createElement('canvas');
    oc.width  = this.cw; oc.height = this.ch;
    const oc2 = oc.getContext('2d');
    const gx  = this.gridOffsetX, gy = this.gridOffsetY;
    const gw  = this._gw();

    // Sky
    const sky = oc2.createLinearGradient(0, 0, 0, gy - 10);
    sky.addColorStop(0,   CONFIG.COLORS.skyTop);
    sky.addColorStop(0.6, CONFIG.COLORS.skyMid);
    sky.addColorStop(1,   CONFIG.COLORS.skyBot);
    oc2.fillStyle = sky;
    oc2.fillRect(0, 0, this.cw, gy - 10);

    // Static clouds
    _drawBgCloud(oc2, this.cw * 0.10, gy * 0.22, Math.min(52, this.cw * 0.13));
    _drawBgCloud(oc2, this.cw * 0.52, gy * 0.12, Math.min(68, this.cw * 0.16));
    _drawBgCloud(oc2, this.cw * 0.84, gy * 0.28, Math.min(44, this.cw * 0.11));

    // Ground gradient
    const ground = oc2.createLinearGradient(0, gy - 28, 0, this.ch);
    ground.addColorStop(0,    CONFIG.COLORS.grassLight);
    ground.addColorStop(0.12, CONFIG.COLORS.grass);
    ground.addColorStop(1,    CONFIG.COLORS.grassDark);
    oc2.fillStyle = ground;
    oc2.fillRect(0, gy - 28, this.cw, this.ch - (gy - 28));

    // Horizon edge
    oc2.fillStyle = '#A8DC38';
    oc2.fillRect(0, gy - 28, this.cw, 5);

    // Fence
    const fenceY     = gy - 52;
    const fenceLeft  = gx - 18;
    const fenceRight = gx + gw + 18;
    oc2.strokeStyle  = '#6A3828';
    oc2.lineWidth    = 5;
    oc2.beginPath(); oc2.moveTo(fenceLeft, fenceY + 16); oc2.lineTo(fenceRight, fenceY + 16); oc2.stroke();
    oc2.beginPath(); oc2.moveTo(fenceLeft, fenceY + 32); oc2.lineTo(fenceRight, fenceY + 32); oc2.stroke();
    for (let fx = fenceLeft; fx <= fenceRight + 1; fx += 28) {
      _drawCachedFencePost(oc2, fx, fenceY, 50);
    }

    // Bushes / trees outside grid
    _drawBgBush(oc2, gx - 52, gy + this._gh() * 0.35, 30);
    _drawBgBush(oc2, gx + gw + 40, gy + this._gh() * 0.55, 24);
    _drawBgBush(oc2, gx - 34, gy + this._gh() * 0.72, 20);
    _drawBgBush(oc2, gx + gw + 20, gy + this._gh() * 0.22, 18);

    this._bgCache  = oc;
    this._bgCacheW = this.cw;
    this._bgCacheH = this.ch;
  }

  _drawGameWorld() {
    const ctx = this.ctx;
    const cw  = this.cw, ch = this.ch;

    // Camera shake transform
    if (this._shakeX || this._shakeY) {
      ctx.translate(Math.round(this._shakeX), Math.round(this._shakeY));
    }

    // P2: draw cached static background
    this._ensureBgCache();
    ctx.drawImage(this._bgCache, 0, 0);

    // Animated moving clouds (layered over cached)
    ctx.save();
    ctx.globalAlpha = 0.4;
    const cloudScroll = (this._globalTime * 12) % (cw + 140);
    _drawBgCloud(ctx, -70 + cloudScroll, this.gridOffsetY * 0.35, 36);
    ctx.restore();

    // Crop tiles — back rows first (painter's algorithm for depth)
    for (let row = 0; row < CONFIG.GRID_ROWS; row++) {
      for (let col = 0; col < CONFIG.GRID_COLS; col++) {
        const tile = this.grid[row * CONFIG.GRID_COLS + col];
        tile.draw(ctx, tile.px, tile.py, this.tileSize, this._globalTime);
      }
    }

    // Pests
    this.spawner.draw(ctx);

    // Dog
    this.dog.draw(ctx);

    // Miss tap indicators
    this.missTaps.forEach(m => {
      const t = m.life / m.maxLife;
      ctx.save();
      ctx.globalAlpha = t * 0.9;
      ctx.translate(m.x, m.y - (1 - t) * 25);
      ctx.font = `bold 22px 'Fredoka One', cursive`;
      ctx.textAlign = 'center';
      ctx.strokeStyle = 'rgba(0,0,0,0.4)'; ctx.lineWidth = 4;
      ctx.strokeText('✗', 0, 0);
      ctx.fillStyle = '#FF4968'; ctx.fillText('✗', 0, 0);
      ctx.restore();
    });

    // HUD
    this.ui.drawHUD(ctx, cw, ch);

    // Countdown
    this.ui.drawCountdown(ctx, cw, ch);

    // Game over banner
    if (this._gameOverBanner && this._gameOverBanner.alpha > 0) {
      const b = this._gameOverBanner;
      ctx.save();
      ctx.globalAlpha = b.alpha;
      ctx.translate(cw / 2, ch / 2 - 16);
      // Panel
      ctx.fillStyle = 'rgba(160,0,0,0.9)';
      _uiRR(ctx, -150, -34, 300, 58, 18); ctx.fill();
      // Gloss
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      _uiRR(ctx, -146, -30, 292, 24, 16); ctx.fill();
      ctx.fillStyle = '#FFF';
      ctx.font = `bold 26px 'Fredoka One', cursive`;
      ctx.textAlign = 'center';
      ctx.fillText(b.text, 0, 12);
      ctx.restore();
    }

    // Paused overlay
    if (this.state === 'PAUSED') {
      ctx.fillStyle = 'rgba(20,10,0,0.6)';
      ctx.fillRect(0, 0, cw, ch);
      ctx.fillStyle = '#FFF';
      ctx.font = `bold 44px 'Fredoka One', cursive`;
      ctx.textAlign = 'center';
      ctx.fillText('⏸ PAUSED', cw / 2, ch / 2 - 10);
      ctx.font = `20px 'Fredoka One', cursive`;
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.fillText('Tap ▶ to continue', cw / 2, ch / 2 + 34);
    }

    // Landscape hint
    if (this.cw > this.ch && this.cw < 700) {
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(0, 0, cw, ch);
      ctx.fillStyle = '#FFF';
      ctx.font = `bold 22px 'Fredoka One', cursive`;
      ctx.textAlign = 'center';
      ctx.fillText('🔄 Rotate for best experience', cw / 2, ch / 2);
    }

    // Results
    if (this.state === 'RESULTS') {
      const cropsSaved = this.grid.filter(t => !t.dead).length;
      const final      = Math.round(this.ui.score);
      this.ui.drawResults(ctx, cw, ch, {
        score: final, cropsSaved,
        bestCombo: this.bestCombo, pestsChased: this.pestsChased,
        isNewBest: final > 0 && final >= this.highScore,
        highScore: this.highScore,
      });
    }
  }
}

// ── BACKGROUND HELPERS ─────────────────────────────
function _drawBgCloud(ctx, cx, cy, r) {
  ctx.fillStyle = 'rgba(255,255,255,0.88)';
  [[0,0,0.52],[1,-0.4,0.36],[1,0.4,0.36],[-1,-0.72,0.32],[-1,0.72,0.32]].forEach(([dir,oMul,rMul]) => {
    ctx.beginPath();
    ctx.arc(cx + (dir !== 0 ? dir * r * 0.4 : 0), cy + (oMul * r * 0.25), r * rMul, 0, Math.PI * 2);
    ctx.fill();
  });
}

function _drawBgBush(ctx, x, y, r) {
  ctx.fillStyle = '#3A8010';
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#5AAC20';
  ctx.beginPath(); ctx.arc(x - r * 0.55, y - r * 0.3, r * 0.72, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(x + r * 0.5,  y - r * 0.25, r * 0.65, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#70C030';
  ctx.beginPath(); ctx.arc(x - r * 0.1, y - r * 0.55, r * 0.52, 0, Math.PI * 2); ctx.fill();
}

function _drawCachedFencePost(ctx, x, y, h) {
  ctx.fillStyle = '#8B4832';
  ctx.fillRect(x - 4, y, 8, h);
  ctx.fillStyle = '#A05040';
  ctx.fillRect(x - 6, y, 12, 10);
  ctx.fillStyle = 'rgba(0,0,0,0.14)';
  ctx.fillRect(x + 4, y + 10, 3, h - 10);
}

// Shared roundrect for game.js (ui.js has its own)
function _uiRR(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y);
  ctx.quadraticCurveTo(x+w,y,x+w,y+r); ctx.lineTo(x+w,y+h-r);
  ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h); ctx.lineTo(x+r,y+h);
  ctx.quadraticCurveTo(x,y+h,x,y+h-r); ctx.lineTo(x,y+r);
  ctx.quadraticCurveTo(x,y,x+r,y); ctx.closePath();
}

window.addEventListener('load', () => { new Game(); });
