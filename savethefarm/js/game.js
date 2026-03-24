// game.js — Core game loop and state machine
// States: LOADING → READY → COUNTDOWN → PLAYING → PAUSED → ENDING → ENDED → RESULTS

const CROP_TYPES = ['wheat', 'corn', 'carrot', 'sunflower'];
const GAME_OVER_CROP_THRESHOLD = 3;

class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx    = this.canvas.getContext('2d');
    this.state  = 'LOADING';

    // Grid — must exist before resize() calls _calcLayout()
    this.grid        = [];
    this.gridOffsetX = 0;
    this.gridOffsetY = 0;
    this.tileSize    = CONFIG.TILE_SIZE;

    // B7 fix: track dpr separately, never stack scale calls
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

    this.timeLeft        = CONFIG.GAME_DURATION;
    this.bestCombo       = 1;
    this.pestsChased     = 0;
    this.loadProgress    = 0;
    this.countdownValue  = CONFIG.COUNTDOWN_DURATION;
    this.countdownTimer  = 0;
    this.highScore       = parseInt(localStorage.getItem('stf_highScore') || '0');

    // G1: tap-miss feedback particles
    this.missTaps = [];

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

  // ── LAYOUT ─────────────────────────────────────
  resize() {
    // B7 fix: reset canvas properly without stacking scale
    const dpr = window.devicePixelRatio || 1;
    this._dpr = dpr;
    const w   = window.innerWidth;
    const h   = window.innerHeight;
    this.canvas.width  = Math.round(w * dpr);
    this.canvas.height = Math.round(h * dpr);
    this.canvas.style.width  = w + 'px';
    this.canvas.style.height = h + 'px';
    // Reset transform completely before applying fresh scale
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.cw = w;
    this.ch = h;
    this._calcLayout();
  }

  _calcLayout() {
    // U5: respect landscape — reduce grid height in landscape
    const isLandscape = this.cw > this.ch;
    const hudH   = isLandscape ? 70 : 100;
    const maxW   = Math.min(this.cw - 30, isLandscape ? this.cw * 0.55 : 440);
    const maxH   = Math.min(this.ch - hudH - 30, isLandscape ? this.ch - 20 : 440);
    this.tileSize = Math.floor(Math.min(
      (maxW - (CONFIG.GRID_COLS - 1) * CONFIG.TILE_PADDING) / CONFIG.GRID_COLS,
      (maxH - (CONFIG.GRID_ROWS - 1) * CONFIG.TILE_PADDING) / CONFIG.GRID_ROWS,
      CONFIG.TILE_SIZE
    ));
    const gridW = CONFIG.GRID_COLS * this.tileSize + (CONFIG.GRID_COLS - 1) * CONFIG.TILE_PADDING;
    const gridH = CONFIG.GRID_ROWS * this.tileSize + (CONFIG.GRID_ROWS - 1) * CONFIG.TILE_PADDING;
    this.gridOffsetX = isLandscape
      ? (this.cw * 0.5 - gridW) / 2 + this.cw * 0.1
      : (this.cw - gridW) / 2;
    this.gridOffsetY = (this.ch - gridH) / 2 + (isLandscape ? 0 : 20);

    if (this.grid.length > 0) {
      this.grid.forEach((tile, i) => {
        const col = i % CONFIG.GRID_COLS;
        const row = Math.floor(i / CONFIG.GRID_COLS);
        tile.px       = this.gridOffsetX + col * (this.tileSize + CONFIG.TILE_PADDING);
        tile.py       = this.gridOffsetY + row * (this.tileSize + CONFIG.TILE_PADDING);
        tile.tileSize = this.tileSize;
      });
    }
  }

  _gridWidth()  { return CONFIG.GRID_COLS * this.tileSize + (CONFIG.GRID_COLS - 1) * CONFIG.TILE_PADDING; }
  _gridHeight() { return CONFIG.GRID_ROWS * this.tileSize + (CONFIG.GRID_ROWS - 1) * CONFIG.TILE_PADDING; }

  // ── BUILD ───────────────────────────────────────
  _buildGrid() {
    this.grid = [];
    for (let i = 0; i < CONFIG.GRID_ROWS * CONFIG.GRID_COLS; i++) {
      const col  = i % CONFIG.GRID_COLS;
      const row  = Math.floor(i / CONFIG.GRID_COLS);
      const type = CROP_TYPES[i % CROP_TYPES.length];
      const tile = new CropTile(col, row, type, 2);
      tile.px       = this.gridOffsetX + col * (this.tileSize + CONFIG.TILE_PADDING);
      tile.py       = this.gridOffsetY + row * (this.tileSize + CONFIG.TILE_PADDING);
      tile.tileSize = this.tileSize;
      this.grid.push(tile);
    }
  }

  _buildDog() {
    const cx = this.gridOffsetX + this._gridWidth() / 2;
    const cy = this.gridOffsetY + this._gridHeight() / 2;
    this.dog          = new Dog(cx, cy);
    this.dog.centerX  = cx;
    this.dog.centerY  = cy;
    // V3 fix: dog is at least 55px and at most 1.0× tile
    this.dog.size     = Math.max(55, Math.min(Math.round(this.tileSize * 0.9), 90));
  }

  _buildSpawner() {
    this.spawner = new Spawner(this.grid);
    this.spawner.onPestDamage(tileIndex => {
      const tile = this.grid[tileIndex];
      if (tile) {
        this.ui.scorePopups.push(new ScorePopup(
          tile.px + this.tileSize / 2, tile.py, '💥', '#FF4968'
        ));
      }
      Audio.playMiss();
      this._checkCropGameOver();
    });
  }

  _checkCropGameOver() {
    if (this.state !== 'PLAYING') return; // B4 fix: only trigger from PLAYING
    const alive = this.grid.filter(t => !t.dead).length;
    if (alive <= GAME_OVER_CROP_THRESHOLD) {
      this.state = 'ENDING';
      this.spawner.stop();
      // G6 fix: use a prominent centered banner, not a floating popup
      this._gameOverBanner = { text: '☠ FARM DESTROYED!', alpha: 1, timer: 1.4 };
      setTimeout(() => this._endGame(), 1400);
    }
  }

  // ── LIFECYCLE ───────────────────────────────────
  _fakeLoad() {
    const duration = 1600;
    const start    = performance.now();
    const tick = () => {
      this.loadProgress = Math.min(1, (performance.now() - start) / duration);
      if (this.loadProgress < 1) requestAnimationFrame(tick);
      else setTimeout(() => { this.state = 'READY'; }, 150);
    };
    requestAnimationFrame(tick);
  }

  _startGame() {
    this._buildGrid();
    this._calcLayout();
    this._buildDog();
    this._buildSpawner();

    this.timeLeft    = CONFIG.GAME_DURATION;
    this.ui.score    = 0;
    this.ui.displayScore = 0;
    this.ui.timeLeft = this.timeLeft;
    this.ui.totalTime = CONFIG.GAME_DURATION;
    this.ui.resultsVisible = false;
    this.ui.resultsSlide   = 0;
    this.ui.breakCombo();
    this.pestsChased      = 0;
    this.bestCombo        = 1;
    this.missTaps         = [];
    this._gameOverBanner  = null;

    this.state          = 'COUNTDOWN';
    this.countdownValue = CONFIG.COUNTDOWN_DURATION;
    this.countdownTimer = 1.0;
    this.ui.showCountdown(this.countdownValue);
    Audio.playCountdown(false);

    if (this._pauseBtn) {
      this._pauseBtn.style.display = 'block';
      this._pauseBtn.textContent   = '⏸';
    }
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

  _endGame() {
    // B4 fix: guard against double-call
    if (this.state === 'ENDED' || this.state === 'RESULTS') return;
    this.state = 'ENDED';
    this.spawner.stop();

    const cropBonus = this.grid.reduce((s, t) => {
      if (!t.dead) s += CONFIG.SURVIVING_CROP_BONUS;
      if (t.hp === t.maxHp) s += CONFIG.PERFECT_CROP_BONUS;
      return s;
    }, 0);
    this.ui.score += cropBonus;
    if (cropBonus > 0) {
      this.ui.scorePopups.push(new ScorePopup(
        this.cw / 2, this.ch / 2 - 60, `+${cropBonus} crop bonus!`, CONFIG.COLORS.gold
      ));
    }

    const final = Math.round(this.ui.score);
    if (final > this.highScore) {
      this.highScore = final;
      localStorage.setItem('stf_highScore', this.highScore);
    }
    if (final >= 300) Audio.playVictory();
    else              Audio.playGameOver();

    setTimeout(() => {
      this.state = 'RESULTS';
      this.ui.resultsVisible = true;
      if (this._pauseBtn) this._pauseBtn.style.display = 'none';
    }, 1400);
  }

  // ── INPUT ──────────────────────────────────────
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
      if (hit === 'playAgain')   this._startGame();
      if (hit === 'backToFarm')  window.location.href = 'https://vinaykrishnan.in';
      return;
    }
    if (this.state !== 'PLAYING') return;

    const tileIndex = this._tileAtPoint(px, py);

    // V8: always show ripple on any valid tile tap
    if (tileIndex !== null) this.grid[tileIndex].triggerRipple();

    const pest = tileIndex !== null ? this.spawner.getPestAtTile(tileIndex) : null;

    // G1: if tap hits no pest, show a miss indicator
    if (!pest) {
      this.missTaps.push({ x: px, y: py, life: 0.5, maxLife: 0.5 });
      return;
    }

    // B3 fix: dog goes to the TAPPED tile's position, not necessarily pest.tileIndex
    const targetTile = this.grid[tileIndex];
    const destX = targetTile.px + targetTile.tileSize / 2;
    const destY = targetTile.py + targetTile.tileSize / 2 - targetTile.tileSize * 0.12;

    const capturedPest = pest;
    const capturedArrivalTime = this.timeLeft; // used as reference; actual check in callback

    this.dog.moveTo(destX, destY, () => {
      // B1 fix: combo is measured at ARRIVAL time, not tap time
      const chased = this.spawner.chasePest(capturedPest.tileIndex);
      if (!chased) return;

      this.pestsChased++;
      Audio.playChase();

      // B1: use dog's lastArrivalTime (updated here, at actual arrival)
      const now           = this.timeLeft;
      const lastArrival   = this.dog.lastArrivalTime;
      const timeSinceLast = Math.abs(lastArrival - now); // both in game-clock seconds

      if (timeSinceLast <= CONFIG.COMBO_WINDOW) {
        this.ui.addCombo();
        if (this.ui.comboMultiplier > 1) Audio.playCombo(this.ui.comboMultiplier);
      } else {
        this.ui.breakCombo();
        this.ui.addCombo();
      }
      this.dog.lastArrivalTime = now; // B1: update at arrival
      this.bestCombo = Math.max(this.bestCombo, this.ui.comboMultiplier);

      const pts = CONFIG.PEST_POINTS[chased.type];
      // U6 fix: use tile position (stable), not pest position (may have moved)
      const scoreTile = this.grid[chased.tileIndex];
      this.ui.addScore(pts, scoreTile.px + this.tileSize / 2, scoreTile.py, this.ui.comboMultiplier);
    });
  }

  _tileAtPoint(px, py) {
    const pad = 10; // generous tap target for mobile
    for (let i = 0; i < this.grid.length; i++) {
      const t = this.grid[i];
      if (px >= t.px - pad && px <= t.px + this.tileSize + pad &&
          py >= t.py - pad && py <= t.py + this.tileSize + pad) {
        return i;
      }
    }
    return null;
  }

  // ── LOOP ───────────────────────────────────────
  _loop(ts) {
    const dt = Math.min((ts - this._lastTime) / 1000, 0.05);
    this._lastTime = ts;
    this._update(dt);
    this._draw();
    requestAnimationFrame(t => this._loop(t));
  }

  _update(dt) {
    // Miss tap particles
    this.missTaps = this.missTaps.filter(m => { m.life -= dt; return m.life > 0; });

    // Game over banner
    if (this._gameOverBanner) {
      this._gameOverBanner.timer -= dt;
      this._gameOverBanner.alpha  = Math.min(1, this._gameOverBanner.timer / 0.4);
    }

    switch (this.state) {
      case 'LOADING': break;
      case 'READY':
        if (this.ui._readyAnim === undefined) this.ui._readyAnim = 0;
        this.ui._readyAnim += dt;
        break;

      case 'COUNTDOWN':
        this.countdownTimer -= dt;
        if (this.countdownTimer <= 0) {
          this.countdownValue--;
          if (this.countdownValue <= 0) {
            this.state = 'PLAYING';
            this.spawner.start();
            this.ui.showCountdown(0);
            Audio.playCountdown(true);
            this.countdownTimer = 0.9;
          } else {
            this.countdownTimer = 1.0;
            this.ui.showCountdown(this.countdownValue);
            Audio.playCountdown(false);
          }
        }
        this.grid.forEach(t => t.update(dt));
        this.ui.update(dt, CONFIG.GAME_DURATION);
        break;

      case 'PLAYING':
        this.timeLeft -= dt;
        if (this.timeLeft <= 0) { this.timeLeft = 0; this._endGame(); }
        this.grid.forEach(t => t.update(dt));
        this.dog.update(dt);
        this.spawner.update(dt);
        this.ui.update(dt, this.timeLeft);
        break;

      case 'ENDING':
        this.grid.forEach(t => t.update(dt));
        this.dog.update(dt);
        this.spawner.update(dt);
        this.ui.update(dt, this.timeLeft);
        break;

      case 'PAUSED':
        this.ui.update(0, this.timeLeft);
        break;

      case 'ENDED':
        this.grid.forEach(t => t.update(dt));
        this.dog.update(dt);
        this.spawner.update(dt);
        this.ui.update(dt, 0);
        break;

      case 'RESULTS':
        this.ui.update(dt, 0);
        break;
    }
  }

  // ── DRAW ───────────────────────────────────────
  _draw() {
    const ctx = this.ctx;
    ctx.save(); // C6: top-level save so nothing bleeds between frames
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

  _drawGameWorld() {
    const ctx = this.ctx;
    const cw  = this.cw, ch = this.ch;
    const gx  = this.gridOffsetX, gy = this.gridOffsetY;
    const gw  = this._gridWidth(), gh = this._gridHeight();

    // V1: richer background — sky with clouds, ground with depth
    // Sky
    const sky = ctx.createLinearGradient(0, 0, 0, gy - 20);
    sky.addColorStop(0, '#4AB8F0');
    sky.addColorStop(1, '#A8D8F0');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, cw, gy - 20);

    // V1: subtle clouds in gameplay background
    ctx.save();
    ctx.globalAlpha = 0.55;
    _drawBgCloud(ctx, cw * 0.12, gy * 0.25, 45);
    _drawBgCloud(ctx, cw * 0.55, gy * 0.15, 55);
    _drawBgCloud(ctx, cw * 0.82, gy * 0.30, 38);
    ctx.restore();

    // Ground — gradient for depth
    const ground = ctx.createLinearGradient(0, gy - 30, 0, ch);
    ground.addColorStop(0,   '#92CC1C');
    ground.addColorStop(0.15,'#7DB018');
    ground.addColorStop(1,   '#558C10');
    ctx.fillStyle = ground;
    ctx.fillRect(0, gy - 30, cw, ch - (gy - 30));

    // V9 fix: grass stripes ONLY in areas above tile rows, not over tiles
    ctx.fillStyle = 'rgba(0,0,0,0.03)';
    for (let gsx = -10; gsx < cw + 10; gsx += 30) {
      // Only draw stripe in the grass strip above the grid
      ctx.fillRect(gsx, gy - 28, 14, 28);
    }

    // Horizon shadow line
    ctx.fillStyle = CONFIG.COLORS.grassDark;
    ctx.fillRect(0, gy - 30, cw, 6);

    // Fence
    const fenceY     = gy - 50;
    const fenceLeft  = gx - 16;
    const fenceRight = gx + gw + 16;
    ctx.strokeStyle  = '#7C433E';
    ctx.lineWidth    = 5;
    ctx.beginPath(); ctx.moveTo(fenceLeft,  fenceY + 16); ctx.lineTo(fenceRight, fenceY + 16); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(fenceLeft,  fenceY + 32); ctx.lineTo(fenceRight, fenceY + 32); ctx.stroke();
    for (let fx = fenceLeft; fx <= fenceRight; fx += 28) {
      Sprites.drawFencePost(ctx, fx, fenceY, 46);
    }

    // V1: small tree / bush decorations outside grid area
    _drawBgBush(ctx, gx - 55, gy + gh * 0.4, 28);
    _drawBgBush(ctx, gx + gw + 38, gy + gh * 0.6, 22);
    _drawBgBush(ctx, gx - 38, gy + gh * 0.75, 18);

    // Crop tiles (back rows first for painter's depth)
    for (let row = 0; row < CONFIG.GRID_ROWS; row++) {
      for (let col = 0; col < CONFIG.GRID_COLS; col++) {
        const tile = this.grid[row * CONFIG.GRID_COLS + col];
        tile.draw(ctx, tile.px, tile.py, this.tileSize);
      }
    }

    // Pests
    this.spawner.draw(ctx);

    // Dog
    this.dog.draw(ctx);

    // G1: miss tap "!" indicators
    this.missTaps.forEach(m => {
      const t = m.life / m.maxLife;
      ctx.save();
      ctx.globalAlpha = t;
      ctx.translate(m.x, m.y - (1 - t) * 20);
      ctx.font      = `bold 20px 'Fredoka One', cursive`;
      ctx.textAlign = 'center';
      ctx.strokeStyle = 'rgba(0,0,0,0.4)'; ctx.lineWidth = 3;
      ctx.strokeText('✗', 0, 0);
      ctx.fillStyle = '#FF4968';
      ctx.fillText('✗', 0, 0);
      ctx.restore();
    });

    // HUD
    this.ui.drawHUD(ctx, cw, ch);

    // Countdown
    this.ui.drawCountdown(ctx, cw, ch);

    // G6: game-over banner (prominent, centred)
    if (this._gameOverBanner && this._gameOverBanner.alpha > 0) {
      const b = this._gameOverBanner;
      ctx.save();
      ctx.globalAlpha = b.alpha;
      ctx.translate(cw / 2, ch / 2 - 20);
      ctx.fillStyle = 'rgba(180,0,0,0.85)';
      _uiRoundRectG(ctx, -150, -32, 300, 56, 16);
      ctx.fill();
      ctx.fillStyle = '#FFF';
      ctx.font      = `bold 26px 'Fredoka One', cursive`;
      ctx.textAlign = 'center';
      ctx.fillText(b.text, 0, 10);
      ctx.restore();
    }

    // Paused overlay
    if (this.state === 'PAUSED') {
      ctx.fillStyle = 'rgba(0,0,0,0.45)';
      ctx.fillRect(0, 0, cw, ch);
      ctx.fillStyle = '#FFF';
      ctx.font      = `bold 42px 'Fredoka One', cursive`;
      ctx.textAlign = 'center';
      ctx.fillText('⏸ PAUSED', cw / 2, ch / 2);
      ctx.font      = `20px 'Fredoka One', cursive`;
      ctx.fillStyle = 'rgba(255,255,255,0.75)';
      ctx.fillText('Tap ▶ to resume', cw / 2, ch / 2 + 44);
    }

    // U5: landscape warning
    if (this.cw > this.ch && this.cw < 700) {
      ctx.fillStyle = 'rgba(0,0,0,0.55)';
      ctx.fillRect(0, 0, cw, ch);
      ctx.fillStyle = '#FFF';
      ctx.font      = `bold 22px 'Fredoka One', cursive`;
      ctx.textAlign = 'center';
      ctx.fillText('🔄 Rotate for best experience', cw / 2, ch / 2);
    }

    // Results overlay
    if (this.state === 'RESULTS') {
      const cropsSaved = this.grid.filter(t => !t.dead).length;
      const final      = Math.round(this.ui.score);
      this.ui.drawResults(ctx, cw, ch, {
        score:       final,
        cropsSaved,
        bestCombo:   this.bestCombo,
        pestsChased: this.pestsChased,
        isNewBest:   final > 0 && final >= this.highScore,
      });
    }
  }
}

// ── BACKGROUND DECORATION HELPERS ──────────────
function _drawBgCloud(ctx, cx, cy, r) {
  ctx.fillStyle = 'rgba(255,255,255,0.82)';
  [0, -r*0.4, r*0.4, -r*0.72, r*0.72].forEach((ox, i) => {
    const cr = i === 0 ? r * 0.52 : r * 0.36;
    ctx.beginPath();
    ctx.arc(cx + ox, cy + (i === 0 ? 0 : r * 0.22), cr, 0, Math.PI * 2);
    ctx.fill();
  });
}

function _drawBgBush(ctx, x, y, r) {
  ctx.fillStyle = '#4A9018';
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#5AAC20';
  ctx.beginPath(); ctx.arc(x - r * 0.5, y - r * 0.3, r * 0.7, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(x + r * 0.5, y - r * 0.2, r * 0.65, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#68C028';
  ctx.beginPath(); ctx.arc(x, y - r * 0.5, r * 0.55, 0, Math.PI * 2); ctx.fill();
}

// Needed here since game.js draws the gameover banner
function _uiRoundRectG(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y);
  ctx.quadraticCurveTo(x+w,y,x+w,y+r);
  ctx.lineTo(x+w,y+h-r);
  ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
  ctx.lineTo(x+r,y+h);
  ctx.quadraticCurveTo(x,y+h,x,y+h-r);
  ctx.lineTo(x,y+r);
  ctx.quadraticCurveTo(x,y,x+r,y);
  ctx.closePath();
}

// ── BOOT ──────────────────────────────────────
window.addEventListener('load', () => { new Game(); });
