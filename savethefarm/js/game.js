// game.js — Core game loop and state machine
// States: LOADING → READY → COUNTDOWN → PLAYING → PAUSED → ENDED → RESULTS

const CROP_TYPES = ['wheat', 'corn', 'carrot', 'sunflower'];
// Game over threshold: when only this many crops have HP left
const GAME_OVER_CROP_THRESHOLD = 3;

class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');

    this.state = 'LOADING';

    // Grid — must init BEFORE resize() which calls _calcLayout()
    this.grid = [];
    this.gridOffsetX = 0;
    this.gridOffsetY = 0;
    this.tileSize = CONFIG.TILE_SIZE;

    // Responsive sizing
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Entities
    this.dog = null;
    this.spawner = null;

    // UI
    this.ui = new UI(this.canvas);

    // Game state
    this.timeLeft = CONFIG.GAME_DURATION;
    this.bestCombo = 1;
    this.lastChaseGameTime = 9999; // tracks game clock at last chase
    this.pestsChased = 0;

    // Loading
    this.loadProgress = 0;

    // Countdown
    this.countdownValue = CONFIG.COUNTDOWN_DURATION;
    this.countdownTimer = 0;

    // High score (localStorage)
    this.highScore = parseInt(localStorage.getItem('stf_highScore') || '0');

    // Input
    this._setupInput();

    // Pause button
    this._pauseBtn = document.getElementById('pauseBtn');
    if (this._pauseBtn) {
      this._pauseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.togglePause();
        Audio.init();
      });
      this._pauseBtn.style.display = 'none';
    }

    // Boot
    this._lastTime = performance.now();
    requestAnimationFrame(ts => this._loop(ts));
    this._fakeLoad();
  }

  // ── LAYOUT ─────────────────────────────────────
  resize() {
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.canvas.width = w * dpr;
    this.canvas.height = h * dpr;
    this.canvas.style.width = w + 'px';
    this.canvas.style.height = h + 'px';
    this.ctx.scale(dpr, dpr);
    this.cw = w;
    this.ch = h;
    this._calcLayout();
  }

  _calcLayout() {
    const maxGridW = Math.min(this.cw - 40, 440);
    const maxGridH = Math.min(this.ch - 130, 440);
    this.tileSize = Math.floor(Math.min(
      (maxGridW - (CONFIG.GRID_COLS - 1) * CONFIG.TILE_PADDING) / CONFIG.GRID_COLS,
      (maxGridH - (CONFIG.GRID_ROWS - 1) * CONFIG.TILE_PADDING) / CONFIG.GRID_ROWS,
      CONFIG.TILE_SIZE
    ));
    const gridW = CONFIG.GRID_COLS * this.tileSize + (CONFIG.GRID_COLS - 1) * CONFIG.TILE_PADDING;
    const gridH = CONFIG.GRID_ROWS * this.tileSize + (CONFIG.GRID_ROWS - 1) * CONFIG.TILE_PADDING;
    this.gridOffsetX = (this.cw - gridW) / 2;
    this.gridOffsetY = (this.ch - gridH) / 2 + 24;

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

  _gridWidth() {
    return CONFIG.GRID_COLS * this.tileSize + (CONFIG.GRID_COLS - 1) * CONFIG.TILE_PADDING;
  }

  // ── GRID / DOG / SPAWNER SETUP ─────────────────
  _buildGrid() {
    this.grid = [];
    const cropSeq = [...CROP_TYPES, ...CROP_TYPES, ...CROP_TYPES, ...CROP_TYPES];
    for (let i = 0; i < CONFIG.GRID_ROWS * CONFIG.GRID_COLS; i++) {
      const col = i % CONFIG.GRID_COLS;
      const row = Math.floor(i / CONFIG.GRID_COLS);
      const px = this.gridOffsetX + col * (this.tileSize + CONFIG.TILE_PADDING);
      const py = this.gridOffsetY + row * (this.tileSize + CONFIG.TILE_PADDING);
      const tile = new CropTile(col, row, cropSeq[i % cropSeq.length], 2);
      tile.px = px;
      tile.py = py;
      tile.tileSize = this.tileSize;
      this.grid.push(tile);
    }
  }

  _buildDog() {
    const cx = this.gridOffsetX + this._gridWidth() / 2;
    const cy = this.gridOffsetY + (CONFIG.GRID_ROWS / 2) * (this.tileSize + CONFIG.TILE_PADDING) - CONFIG.TILE_PADDING / 2;
    this.dog = new Dog(cx, cy);
    this.dog.centerX = cx;
    this.dog.centerY = cy;
    this.dog.size = Math.max(48, Math.round(this.tileSize * 0.75));
  }

  _buildSpawner() {
    this.spawner = new Spawner(this.grid);
    this.spawner.onPestDamage((tileIndex) => {
      const tile = this.grid[tileIndex];
      if (tile) {
        this.ui.scorePopups.push(new ScorePopup(
          tile.px + this.tileSize / 2,
          tile.py,
          '💥', '#FF4968'
        ));
      }
      Audio.playMiss();
      // Check game-over condition
      this._checkCropGameOver();
    });
  }

  _checkCropGameOver() {
    const aliveCrops = this.grid.filter(t => !t.dead).length;
    if (aliveCrops <= GAME_OVER_CROP_THRESHOLD && this.state === 'PLAYING') {
      // Show alert popup then end
      this.ui.scorePopups.push(new ScorePopup(this.cw / 2, this.ch / 2 - 40, '☠ FARM DESTROYED!', '#FF4968'));
      setTimeout(() => this._endGame(), 1200);
      this.state = 'ENDING'; // prevent double-trigger
      this.spawner.stop();
    }
  }

  // ── LOADING / GAME START / END ─────────────────
  _fakeLoad() {
    const duration = 1800;
    const start = performance.now();
    const tick = () => {
      this.loadProgress = Math.min(1, (performance.now() - start) / duration);
      if (this.loadProgress < 1) requestAnimationFrame(tick);
      else setTimeout(() => { this.state = 'READY'; }, 200);
    };
    requestAnimationFrame(tick);
  }

  _startGame() {
    this._buildGrid();
    this._calcLayout();
    this._buildDog();
    this._buildSpawner();

    this.timeLeft = CONFIG.GAME_DURATION;
    this.ui.score = 0;
    this.ui.displayScore = 0;
    this.ui.timeLeft = this.timeLeft;
    this.ui.totalTime = CONFIG.GAME_DURATION;
    this.ui.resultsVisible = false;
    this.ui.resultsSlide = 0;
    this.ui.breakCombo();
    this.lastChaseGameTime = 9999;
    this.pestsChased = 0;
    this.bestCombo = 1;

    this.state = 'COUNTDOWN';
    this.countdownValue = CONFIG.COUNTDOWN_DURATION;
    this.countdownTimer = 1.0;
    this.ui.showCountdown(this.countdownValue);
    Audio.playCountdown(false);

    if (this._pauseBtn) this._pauseBtn.style.display = 'block';
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
    if (this.state === 'ENDED' || this.state === 'RESULTS') return;
    this.state = 'ENDED';
    this.spawner.stop();

    // Crop survival bonuses
    const cropBonus = this.grid.reduce((sum, t) => {
      if (!t.dead) sum += CONFIG.SURVIVING_CROP_BONUS;
      if (t.hp === t.maxHp) sum += CONFIG.PERFECT_CROP_BONUS;
      return sum;
    }, 0);
    this.ui.score += cropBonus;
    if (cropBonus > 0) {
      this.ui.scorePopups.push(new ScorePopup(
        this.cw / 2, this.ch / 2 - 60,
        `+${cropBonus} crop bonus!`, CONFIG.COLORS.gold
      ));
    }

    const finalScore = Math.round(this.ui.score);
    if (finalScore > this.highScore) {
      this.highScore = finalScore;
      localStorage.setItem('stf_highScore', this.highScore);
    }

    // Play appropriate end sound
    if (finalScore >= 300) Audio.playVictory();
    else Audio.playGameOver();

    setTimeout(() => {
      this.state = 'RESULTS';
      this.ui.resultsVisible = true;
      if (this._pauseBtn) this._pauseBtn.style.display = 'none';
    }, 1400);
  }

  // ── INPUT ──────────────────────────────────────
  _setupInput() {
    const handler = (e) => {
      e.preventDefault();
      // Init audio on first touch
      Audio.init();

      const rect = this.canvas.getBoundingClientRect();
      const touches = e.changedTouches || [e];
      for (const touch of touches) {
        const px = (touch.clientX !== undefined ? touch.clientX : touch.pageX) - rect.left;
        const py = (touch.clientY !== undefined ? touch.clientY : touch.pageY) - rect.top;
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
      if (hit === 'playAgain') this._startGame();
      else if (hit === 'backToFarm') window.location.href = 'https://vinaykrishnan.in';
      return;
    }

    if (this.state !== 'PLAYING') return;

    // Find tapped tile
    const tileIndex = this._tileAtPoint(px, py);
    if (tileIndex === null) return;

    // Is there a pest on this tile?
    const pest = this.spawner.getPestAtTile(tileIndex);
    if (!pest) return;

    // Immediately cancel any pending move and re-target dog
    const tile = this.grid[pest.tileIndex];
    const destX = tile.px + tile.tileSize / 2;
    const destY = tile.py + tile.tileSize / 2 - tile.tileSize * 0.15;

    // Capture pest reference NOW (before callback closure)
    const capturedPest = pest;
    const capturedTime = this.timeLeft;

    this.dog.moveTo(destX, destY, () => {
      // Dog arrived — attempt chase
      const chased = this.spawner.chasePest(capturedPest.tileIndex);
      if (!chased) return; // pest already fled or expired

      this.pestsChased++;
      Audio.playChase();

      // Combo: compare game clock timestamps
      const timeSinceLast = Math.abs(capturedTime - this.lastChaseGameTime);
      if (timeSinceLast <= CONFIG.COMBO_WINDOW + 0.3) {
        this.ui.addCombo();
        if (this.ui.comboMultiplier > 1) Audio.playCombo(this.ui.comboMultiplier);
      } else {
        this.ui.breakCombo();
        this.ui.addCombo();
      }
      this.lastChaseGameTime = capturedTime;
      this.bestCombo = Math.max(this.bestCombo, this.ui.comboMultiplier);

      const pts = CONFIG.PEST_POINTS[chased.type];
      this.ui.addScore(pts, chased.x, chased.y, this.ui.comboMultiplier);
    });
  }

  _tileAtPoint(px, py) {
    // Hit-test expanded slightly for easier mobile tapping
    const pad = 8;
    for (let i = 0; i < this.grid.length; i++) {
      const t = this.grid[i];
      if (px >= t.px - pad && px <= t.px + this.tileSize + pad &&
          py >= t.py - pad && py <= t.py + this.tileSize + pad) {
        return i;
      }
    }
    return null;
  }

  // ── MAIN LOOP ──────────────────────────────────
  _loop(timestamp) {
    const dt = Math.min((timestamp - this._lastTime) / 1000, 0.05);
    this._lastTime = timestamp;
    this._update(dt);
    this._draw();
    requestAnimationFrame(ts => this._loop(ts));
  }

  _update(dt) {
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
        if (this.timeLeft <= 0) {
          this.timeLeft = 0;
          this._endGame();
        }
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
  }

  _drawGameWorld() {
    const ctx = this.ctx;
    const cw = this.cw, ch = this.ch;

    // Sky gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, ch);
    skyGrad.addColorStop(0, CONFIG.COLORS.skyTop);
    skyGrad.addColorStop(1, CONFIG.COLORS.skyBot);
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, cw, ch);

    // Grass
    ctx.fillStyle = CONFIG.COLORS.grass;
    ctx.fillRect(0, this.gridOffsetY - 36, cw, ch);
    ctx.fillStyle = CONFIG.COLORS.grassDark;
    ctx.fillRect(0, this.gridOffsetY - 36, cw, 10);

    // Grass texture stripes
    ctx.fillStyle = 'rgba(0,0,0,0.04)';
    for (let gx = -20; gx < cw + 20; gx += 32) {
      ctx.fillRect(gx, this.gridOffsetY - 32, 14, ch);
    }

    // Fence (top of grid)
    const fenceY = this.gridOffsetY - 52;
    const fenceLeft = this.gridOffsetX - 18;
    const fenceRight = this.gridOffsetX + this._gridWidth() + 18;
    // Rails
    ctx.strokeStyle = '#7C433E';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(fenceLeft, fenceY + 18);
    ctx.lineTo(fenceRight, fenceY + 18);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(fenceLeft, fenceY + 34);
    ctx.lineTo(fenceRight, fenceY + 34);
    ctx.stroke();
    // Posts
    for (let fx = fenceLeft; fx <= fenceRight; fx += 28) {
      Sprites.drawFencePost(ctx, fx, fenceY, 48);
    }

    // Crop tiles (back rows first for depth)
    for (let row = 0; row < CONFIG.GRID_ROWS; row++) {
      for (let col = 0; col < CONFIG.GRID_COLS; col++) {
        const tile = this.grid[row * CONFIG.GRID_COLS + col];
        tile.draw(ctx, tile.px, tile.py, this.tileSize);
      }
    }

    // Pests
    this.spawner.draw(ctx);

    // Dog (on top)
    this.dog.draw(ctx);

    // HUD
    this.ui.drawHUD(ctx, cw, ch);

    // Countdown
    this.ui.drawCountdown(ctx, cw, ch);

    // Paused overlay
    if (this.state === 'PAUSED') {
      ctx.fillStyle = 'rgba(0,0,0,0.45)';
      ctx.fillRect(0, 0, cw, ch);
      ctx.fillStyle = '#FFF';
      ctx.font = `bold 42px 'Fredoka One', cursive`;
      ctx.textAlign = 'center';
      ctx.fillText('⏸ PAUSED', cw / 2, ch / 2);
      ctx.font = `20px 'Fredoka One', cursive`;
      ctx.fillStyle = 'rgba(255,255,255,0.75)';
      ctx.fillText('Tap ▶ to resume', cw / 2, ch / 2 + 42);
    }

    // Results overlay
    if (this.state === 'RESULTS') {
      const cropsSaved = this.grid.filter(t => !t.dead).length;
      const finalScore = Math.round(this.ui.score);
      this.ui.drawResults(ctx, cw, ch, {
        score: finalScore,
        cropsSaved,
        bestCombo: this.bestCombo,
        pestsChased: this.pestsChased,
        isNewBest: finalScore > 0 && finalScore >= this.highScore
      });
    }
  }
}

// ── BOOT ──────────────────────────────────────
window.addEventListener('load', () => {
  new Game();
});
