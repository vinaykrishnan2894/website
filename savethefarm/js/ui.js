// ui.js — Score display, timer, combo, results screen, loading screen

class UI {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.score = 0;
    this.displayScore = 0;
    this.scorePopups = [];

    this.timeLeft = CONFIG.GAME_DURATION;
    this.totalTime = CONFIG.GAME_DURATION;
    this.timerPulse = 0;

    this.comboCount = 0;
    this.comboMultiplier = 1;
    this.comboTimer = 0;
    this.comboPulseScale = 1;
    this.comboPulseTime = 0;

    this.resultsVisible = false;
    this.resultsSlide = 0;

    this.loadProgress = 0;
    this.countdownValue = 0;
    this.countdownScale = 0;
    this.countdownAlpha = 0;

    // Button hit rects (set during draw)
    this._playAgainBtn = null;
    this._backBtn = null;
    this._playBtn = null;
  }

  addScore(points, x, y, multiplier = 1) {
    const total = points * multiplier;
    this.score += total;
    const text = multiplier > 1 ? `+${total} x${multiplier}!` : `+${total}`;
    const color = multiplier >= 3 ? '#FF4968' : multiplier >= 2 ? '#F6D233' : '#FFF';
    this.scorePopups.push(new ScorePopup(x, y, text, color));
  }

  addCombo() {
    this.comboCount++;
    this.comboTimer = CONFIG.COMBO_RESET;
    if (this.comboCount >= CONFIG.COMBO_THRESHOLDS[2]) this.comboMultiplier = 4;
    else if (this.comboCount >= CONFIG.COMBO_THRESHOLDS[1]) this.comboMultiplier = 3;
    else if (this.comboCount >= CONFIG.COMBO_THRESHOLDS[0]) this.comboMultiplier = 2;
    else this.comboMultiplier = 1;
    this.comboPulseTime = CONFIG.ANIM.COMBO_PULSE;
    this.comboPulseScale = 1.5;
  }

  breakCombo() {
    this.comboCount = 0;
    this.comboMultiplier = 1;
    this.comboTimer = 0;
  }

  showCountdown(value) {
    this.countdownValue = value;
    this.countdownScale = 2.5;
    this.countdownAlpha = 1;
  }

  update(dt, timeLeft) {
    this.timeLeft = timeLeft;

    const diff = this.score - this.displayScore;
    this.displayScore += diff * Math.min(1, dt * 10);
    if (Math.abs(diff) < 1) this.displayScore = this.score;

    this.scorePopups = this.scorePopups.filter(p => { p.update(dt); return !p.isDone; });

    if (this.comboTimer > 0) {
      this.comboTimer -= dt;
      if (this.comboTimer <= 0) this.breakCombo();
    }

    if (this.comboPulseTime > 0) {
      this.comboPulseTime -= dt;
      const t = this.comboPulseTime / CONFIG.ANIM.COMBO_PULSE;
      this.comboPulseScale = 1 + t * 0.5;
    } else {
      this.comboPulseScale = 1;
    }

    if (this.timeLeft <= 15) {
      this.timerPulse += dt * 4;
    }

    if (this.countdownScale > 1) {
      this.countdownScale = Math.max(1, this.countdownScale - dt * 5);
    }
    if (this.countdownAlpha > 0) {
      this.countdownAlpha -= dt * 1.5;
      if (this.countdownAlpha < 0) this.countdownAlpha = 0;
    }

    if (this.resultsVisible && this.resultsSlide < 1) {
      this.resultsSlide = Math.min(1, this.resultsSlide + dt / CONFIG.ANIM.RESULTS_SLIDE);
    }
  }

  // ── HUD ──────────────────────────────────────
  drawHUD(ctx, cw, ch) {
    const pad = 14;
    // Score: top-left
    this._drawScoreCapsule(ctx, pad, pad);
    // Timer: top-centre
    this._drawTimer(ctx, cw / 2, pad + 30);
    // Combo badge: top-left, below score capsule (avoids top-right pause button)
    this._drawComboBadge(ctx, pad + 72, pad + 52);
    // Score popups
    this.scorePopups.forEach(p => p.draw(ctx));
  }

  _drawScoreCapsule(ctx, x, y) {
    const w = 148, h = 44;
    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    _uiRoundRect(ctx, x + 2, y + 3, w, h, h / 2);
    ctx.fill();
    // Capsule
    ctx.fillStyle = '#FFF';
    ctx.strokeStyle = CONFIG.COLORS.uiBorder;
    ctx.lineWidth = 2;
    _uiRoundRect(ctx, x, y, w, h, h / 2);
    ctx.fill(); ctx.stroke();
    // Highlight
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    _uiRoundRect(ctx, x + 4, y + 3, w - 8, h / 2 - 4, h / 2 - 4);
    ctx.fill();
    // Coin
    const cg = ctx.createRadialGradient(x + 22, y + h / 2 - 2, 2, x + 22, y + h / 2, 13);
    cg.addColorStop(0, '#F6D233');
    cg.addColorStop(1, CONFIG.COLORS.gold);
    ctx.fillStyle = cg;
    ctx.beginPath();
    ctx.arc(x + 22, y + h / 2, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#8B6914';
    ctx.font = `bold 13px 'Fredoka One', cursive`;
    ctx.textAlign = 'center';
    ctx.fillText('$', x + 22, y + h / 2 + 5);
    // V6 fix: scale font down for large numbers
    const scoreStr  = String(Math.round(this.displayScore));
    const scoreFont = scoreStr.length > 4 ? 15 : scoreStr.length > 3 ? 17 : 20;
    ctx.fillStyle   = CONFIG.COLORS.textHead;
    ctx.font        = `bold ${scoreFont}px 'Fredoka One', cursive`;
    ctx.textAlign   = 'left';
    ctx.fillText(scoreStr, x + 42, y + h / 2 + 7);
  }

  _drawTimer(ctx, cx, cy) {
    // U4 fix: scale timer radius with canvas width
    const r = Math.max(26, Math.min(36, this.canvas.width / this.canvas.height > 1.5 ? 22 : 30));
    const frac = Math.max(0, this.timeLeft / this.totalTime);
    const isWarning = this.timeLeft <= 15 && this.timeLeft > 0;
    const pulseAlpha = isWarning ? 0.5 + Math.sin(this.timerPulse) * 0.5 : 0;

    // Warning vignette
    if (isWarning && pulseAlpha > 0.1) {
      const grad = ctx.createRadialGradient(cx, cy, r * 3, cx, cy, Math.min(this.canvas.width, this.canvas.height) / 1.5);
      grad.addColorStop(0, 'rgba(0,0,0,0)');
      grad.addColorStop(1, `rgba(200,0,0,${pulseAlpha * 0.18})`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.beginPath();
    ctx.arc(cx + 2, cy + 2, r + 4, 0, Math.PI * 2);
    ctx.fill();

    // Background
    ctx.fillStyle = isWarning ? `rgba(255,230,230,0.95)` : 'rgba(255,255,255,0.95)';
    ctx.strokeStyle = isWarning ? `rgba(${200 + Math.round(pulseAlpha * 55)},50,50,0.8)` : '#B8D8E8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, r + 4, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();

    // Arc
    const arcColor = frac > 0.5 ? '#4FC3F7' : frac > 0.25 ? '#F0AD4E' : '#D9534F';
    ctx.strokeStyle = arcColor;
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(cx, cy, r - 1, -Math.PI / 2, -Math.PI / 2 + frac * Math.PI * 2);
    ctx.stroke();

    // Time text
    const mins = Math.floor(Math.max(0, this.timeLeft) / 60);
    const secs = Math.floor(Math.max(0, this.timeLeft) % 60);
    const timeStr = `${mins}:${secs.toString().padStart(2, '0')}`;
    ctx.fillStyle = isWarning ? '#C02020' : CONFIG.COLORS.textHead;
    ctx.font = `bold 15px 'Fredoka One', cursive`;
    ctx.textAlign = 'center';
    ctx.fillText(timeStr, cx, cy + 5);
  }

  _drawComboBadge(ctx, lx, y) {
    if (this.comboMultiplier <= 1 && this.comboCount < CONFIG.COMBO_THRESHOLDS[0]) return;
    ctx.save();
    ctx.translate(lx + 22, y + 22);
    ctx.scale(this.comboPulseScale, this.comboPulseScale);
    // Shadow
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = '#000';
    _drawStarburst(ctx, 3, 3, 30, 20, 8);
    ctx.fill();
    ctx.globalAlpha = 1;
    // Star
    ctx.fillStyle = CONFIG.COLORS.gold;
    _drawStarburst(ctx, 0, 0, 30, 20, 8);
    ctx.fill();
    ctx.strokeStyle = '#C98B00';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    // Inner glow
    ctx.fillStyle = CONFIG.COLORS.goldLight;
    ctx.beginPath();
    ctx.arc(0, -2, 16, 0, Math.PI * 2);
    ctx.fill();
    // Label
    const label = this.comboMultiplier > 1 ? `x${this.comboMultiplier}!` : `${this.comboCount}`;
    ctx.fillStyle = '#7A4A00';
    ctx.font = `bold 16px 'Fredoka One', cursive`;
    ctx.textAlign = 'center';
    ctx.fillText(label, 0, 3);
    ctx.restore();
  }

  // ── COUNTDOWN ────────────────────────────────
  drawCountdown(ctx, cw, ch) {
    if (this.countdownAlpha <= 0) return;
    ctx.save();
    ctx.globalAlpha = this.countdownAlpha;
    ctx.translate(cw / 2, ch / 2);
    ctx.scale(this.countdownScale, this.countdownScale);
    const isGo = this.countdownValue === 0;
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath(); ctx.arc(4, 6, 58, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = isGo ? CONFIG.COLORS.btnGreen : '#FFF';
    ctx.strokeStyle = isGo ? '#5A9E00' : '#4FC3F7';
    ctx.lineWidth = 5;
    ctx.beginPath(); ctx.arc(0, 0, 58, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = isGo ? '#FFF' : CONFIG.COLORS.textHead;
    ctx.font = `bold ${isGo ? 36 : 52}px 'Fredoka One', cursive`;
    ctx.textAlign = 'center';
    ctx.fillText(isGo ? 'GO!' : this.countdownValue, 0, isGo ? 13 : 18);
    ctx.restore();
  }

  // ── RESULTS SCREEN ────────────────────────────
  drawResults(ctx, cw, ch, stats) {
    if (!this.resultsVisible) return;
    const slide = _easeOut(this.resultsSlide);

    // Backdrop
    ctx.fillStyle = `rgba(0,0,0,${slide * 0.55})`;
    ctx.fillRect(0, 0, cw, ch);

    const panelW = Math.min(cw - 40, 400);
    // B6 fix: clamp panel height to screen height with padding
    const panelH = Math.min(480, ch - 60);
    const panelX = (cw - panelW) / 2;
    // Slide in from bottom
    const panelY = ch - (panelH + 30) * slide;

    // Panel shadow
    ctx.fillStyle = 'rgba(0,0,0,0.22)';
    _uiRoundRect(ctx, panelX + 4, panelY + 8, panelW, panelH, 24);
    ctx.fill();

    // Panel body
    ctx.fillStyle = '#FFFEF8';
    _uiRoundRect(ctx, panelX, panelY, panelW, panelH, 24);
    ctx.fill();
    ctx.strokeStyle = CONFIG.COLORS.uiBorder;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Top ribbon / header strip
    const won = stats.score >= 200;
    ctx.fillStyle = won ? CONFIG.COLORS.btnGreen : CONFIG.COLORS.btnRed;
    _uiRoundRect(ctx, panelX, panelY, panelW, 62, 24);
    ctx.fill();
    // Cover bottom corners of ribbon
    ctx.fillRect(panelX, panelY + 38, panelW, 24);

    ctx.fillStyle = '#FFF';
    ctx.font = `bold 24px 'Fredoka One', cursive`;
    ctx.textAlign = 'center';
    ctx.fillText(won ? '🐕  FARM PROTECTED!' : '😢  FARM RAIDED!', panelX + panelW / 2, panelY + 38);

    let ty = panelY + 82;
    const cx = panelX + panelW / 2;

    // Score highlight box
    ctx.fillStyle = won ? 'rgba(141,220,37,0.1)' : 'rgba(255,73,104,0.1)';
    _uiRoundRect(ctx, panelX + 20, ty - 4, panelW - 40, 40, 12);
    ctx.fill();
    ctx.fillStyle = CONFIG.COLORS.textHead;
    ctx.font = `bold 24px 'Fredoka One', cursive`;
    ctx.textAlign = 'center';
    ctx.fillText(`⭐  ${stats.score} pts`, cx, ty + 24);
    ty += 52;

    // Stats row
    const statRows = [
      ['🌾', 'Crops Saved', `${stats.cropsSaved} / 16`],
      ['🔥', 'Best Combo', `x${stats.bestCombo}`],
      ['⏱', 'Pests Chased', `${stats.pestsChased || 0}`],
    ];
    statRows.forEach(([icon, label, val]) => {
      ctx.fillStyle = CONFIG.COLORS.textBody;
      ctx.font = `18px 'Fredoka One', cursive`;
      ctx.textAlign = 'left';
      ctx.fillText(`${icon}  ${label}`, panelX + 32, ty);
      ctx.textAlign = 'right';
      ctx.fillStyle = CONFIG.COLORS.textHead;
      ctx.font = `bold 18px 'Fredoka One', cursive`;
      ctx.fillText(val, panelX + panelW - 32, ty);
      ty += 30;
    });
    ty += 6;

    // Reward tier box
    const reward = _getRewardTier(stats.score);
    if (reward) {
      const rBoxH = 78;
      ctx.fillStyle = '#FFFBEE';
      ctx.strokeStyle = CONFIG.COLORS.gold;
      ctx.lineWidth = 2;
      _uiRoundRect(ctx, panelX + 20, ty, panelW - 40, rBoxH, 14);
      ctx.fill(); ctx.stroke();

      const tierColors = { Perfect: '#E8A800', Gold: '#E8A800', Silver: '#90A4AE', Bronze: '#A1714B' };
      ctx.fillStyle = tierColors[reward.name] || CONFIG.COLORS.gold;
      ctx.font = `bold 19px 'Fredoka One', cursive`;
      ctx.textAlign = 'center';
      const tierIcons = { Perfect: '🏆', Gold: '🥇', Silver: '🥈', Bronze: '🥉' };
      ctx.fillText(`${tierIcons[reward.name]}  ${reward.name.toUpperCase()} REWARD`, cx, ty + 26);
      ctx.fillStyle = CONFIG.COLORS.textBody;
      ctx.font = `14px 'Fredoka One', cursive`;
      ctx.fillText(`${reward.pct}% faster crop growth · next ${reward.crops} crops`, cx, ty + 48);
      if (reward.cosmetic) {
        ctx.fillStyle = CONFIG.COLORS.ribbon;
        ctx.font = `13px 'Fredoka One', cursive`;
        ctx.fillText(`✨ ${reward.cosmetic} decoration unlocked!`, cx, ty + 66);
      }
      ty += rBoxH + 10;
    }

    // NEW BEST! badge
    if (stats.isNewBest) {
      ctx.fillStyle = CONFIG.COLORS.gold;
      _uiRoundRect(ctx, cx - 72, ty, 144, 28, 14);
      ctx.fill();
      ctx.fillStyle = '#FFF';
      ctx.font = `bold 15px 'Fredoka One', cursive`;
      ctx.textAlign = 'center';
      ctx.fillText('✨  NEW BEST!', cx, ty + 19);
      ty += 36;
    }

    // Buttons
    const btnW = (panelW - 56) / 2;
    const btnH = 50;
    const btnY = panelY + panelH - btnH - 20;

    // Play Again (green)
    _drawGlossyBtn(ctx, panelX + 18, btnY, btnW, btnH, CONFIG.COLORS.btnGreen, '#5A9E00', '#FFF', '🔄  PLAY AGAIN');
    // Back to Farm (blue)
    _drawGlossyBtn(ctx, panelX + panelW - 18 - btnW, btnY, btnW, btnH, CONFIG.COLORS.btnBlue, '#0288D1', '#FFF', '🌻  BACK TO FARM');

    this._playAgainBtn = { x: panelX + 18, y: btnY, w: btnW, h: btnH };
    this._backBtn = { x: panelX + panelW - 18 - btnW, y: btnY, w: btnW, h: btnH };
  }

  hitTestResults(px, py) {
    if (this._playAgainBtn && _hitRect(px, py, this._playAgainBtn)) return 'playAgain';
    if (this._backBtn && _hitRect(px, py, this._backBtn)) return 'backToFarm';
    return null;
  }

  // ── LOADING SCREEN ─────────────────────────────
  drawLoading(ctx, cw, ch, progress) {
    const grad = ctx.createLinearGradient(0, 0, 0, ch);
    grad.addColorStop(0, CONFIG.COLORS.skyTop);
    grad.addColorStop(1, CONFIG.COLORS.skyBot);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, cw, ch);

    ctx.fillStyle = CONFIG.COLORS.grass;
    ctx.fillRect(0, ch * 0.65, cw, ch * 0.35);
    ctx.fillStyle = CONFIG.COLORS.grassDark;
    ctx.fillRect(0, ch * 0.65, cw, 8);

    ctx.font = `bold 42px 'Fredoka One', cursive`;
    ctx.textAlign = 'center';
    ctx.strokeStyle = 'rgba(255,255,255,0.9)';
    ctx.lineWidth = 8;
    ctx.strokeText('🌾 SAVE THE FARM', cw / 2, ch * 0.32);
    ctx.fillStyle = CONFIG.COLORS.textHead;
    ctx.fillText('🌾 SAVE THE FARM', cw / 2, ch * 0.32);

    ctx.fillStyle = CONFIG.COLORS.textBody;
    ctx.font = `18px 'Fredoka One', cursive`;
    ctx.fillText('Loading...', cw / 2, ch * 0.42);

    const barW = Math.min(cw - 80, 320);
    const barH = 26;
    const barX = (cw - barW) / 2;
    const barY = ch * 0.5;

    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    _uiRoundRect(ctx, barX + 2, barY + 3, barW, barH, barH / 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    _uiRoundRect(ctx, barX, barY, barW, barH, barH / 2);
    ctx.fill();
    ctx.strokeStyle = '#C4A35A';
    ctx.lineWidth = 2;
    ctx.stroke();

    if (progress > 0.01) {
      const grad2 = ctx.createLinearGradient(barX, 0, barX + barW, 0);
      grad2.addColorStop(0, '#E7C11F');
      grad2.addColorStop(1, '#F6D233');
      ctx.fillStyle = grad2;
      _uiRoundRect(ctx, barX + 2, barY + 2, (barW - 4) * progress, barH - 4, (barH - 4) / 2);
      ctx.fill();
      // Highlight on fill
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      _uiRoundRect(ctx, barX + 2, barY + 2, (barW - 4) * progress, (barH - 4) / 2, (barH - 4) / 2);
      ctx.fill();
    }
    ctx.font = '18px serif';
    ctx.fillText('🌾', barX + (barW - 4) * progress - 2, barY + 18);
  }

  // ── READY / HERO SCREEN ───────────────────────
  drawReady(ctx, cw, ch) {
    const t = this._readyAnim || 0;
    // Key Y references — everything anchors relative to these
    const HORIZON   = ch * 0.50;  // where sky meets ground
    const GROUND_Y  = HORIZON;
    const FENCE_Y   = GROUND_Y + 8;

    // ── 1. SKY ──
    const skyG = ctx.createLinearGradient(0, 0, 0, HORIZON);
    skyG.addColorStop(0,   '#3AAEE0');
    skyG.addColorStop(0.7, '#87CEEB');
    skyG.addColorStop(1,   '#C8E8F8');
    ctx.fillStyle = skyG;
    ctx.fillRect(0, 0, cw, HORIZON + 2);

    // ── 2. CLOUDS (sky only) ──
    _heroCloud(ctx, cw * 0.10, ch * 0.07, Math.min(64, cw * 0.15));
    _heroCloud(ctx, cw * 0.48, ch * 0.04, Math.min(80, cw * 0.18));
    _heroCloud(ctx, cw * 0.80, ch * 0.09, Math.min(55, cw * 0.13));

    // ── 3. DISTANT HILLS (sit on horizon) ──
    ctx.fillStyle = '#5AB030';
    ctx.beginPath();
    ctx.ellipse(cw * 0.22, HORIZON, cw * 0.38, ch * 0.20, 0, Math.PI, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#6DC038';
    ctx.beginPath();
    ctx.ellipse(cw * 0.72, HORIZON, cw * 0.34, ch * 0.18, 0, Math.PI, Math.PI * 2);
    ctx.fill();

    // ── 4. BARN — sits ON horizon (base at HORIZON) ──
    const barnH = Math.min(110, ch * 0.22);
    const barnW = barnH * 0.75;
    const barnX = cw * 0.06;
    const barnBaseY = HORIZON; // base of barn at horizon
    _heroBarn(ctx, barnX + barnW / 2, barnBaseY, barnW);

    // ── 5. WINDMILL — sits ON horizon ──
    const wmH = Math.min(100, ch * 0.20);
    const wmX = cw * 0.86;
    _heroWindmill(ctx, wmX, HORIZON, wmH, t);

    // ── 6. GROUND ──
    const groundG = ctx.createLinearGradient(0, GROUND_Y, 0, ch);
    groundG.addColorStop(0,   '#7DC428');
    groundG.addColorStop(0.25,'#6BB820');
    groundG.addColorStop(1,   '#4A8C10');
    ctx.fillStyle = groundG;
    ctx.fillRect(0, GROUND_Y, cw, ch - GROUND_Y);

    // Subtle grass stripe texture
    ctx.fillStyle = 'rgba(0,0,0,0.035)';
    for (let gx = -10; gx < cw; gx += 30) ctx.fillRect(gx, GROUND_Y, 14, ch);

    // Ground edge highlight
    ctx.fillStyle = '#92D42E';
    ctx.fillRect(0, GROUND_Y, cw, 5);

    // ── 7. DIRT PATH ──
    const pathG = ctx.createLinearGradient(0, GROUND_Y, 0, ch);
    pathG.addColorStop(0, '#D4A050');
    pathG.addColorStop(1, '#A07030');
    ctx.fillStyle = pathG;
    ctx.beginPath();
    ctx.moveTo(cw * 0.40, FENCE_Y + 8);
    ctx.quadraticCurveTo(cw * 0.50, FENCE_Y + ch * 0.12, cw * 0.42, ch);
    ctx.lineTo(cw * 0.58, ch);
    ctx.quadraticCurveTo(cw * 0.60, FENCE_Y + ch * 0.12, cw * 0.60, FENCE_Y + 8);
    ctx.closePath();
    ctx.fill();

    // ── 8. FENCE ROW ──
    _heroFenceRow(ctx, 0, cw, FENCE_Y);

    // ── 9. CROPS (perspective-scaled rows) ──
    const cropDefs = [
      { x: 0.12, color: '#F6D233', stem: '#4A9B14', label: '🌾' },
      { x: 0.30, color: '#FF7200', stem: '#4A9B14', label: '🥕' },
      { x: 0.62, color: '#4CAF50', stem: '#2E7D32', label: '🌽' },
      { x: 0.80, color: '#F6D233', stem: '#4A9B14', label: '🌻' },
    ];
    cropDefs.forEach(({ x, color, stem }) => {
      for (let row = 0; row < 3; row++) {
        const py = FENCE_Y + 28 + row * 28;
        const sc = 0.6 + row * 0.2; // perspective scale
        const px = cw * x + row * 14;
        // Stem
        ctx.fillStyle = stem;
        ctx.fillRect(px - 2 * sc, py - 28 * sc, 4 * sc, 28 * sc);
        // Head
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(px, py - 28 * sc, 9 * sc, 0, Math.PI * 2);
        ctx.fill();
        // Shine
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.beginPath();
        ctx.arc(px - 2 * sc, py - 31 * sc, 3 * sc, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // ── 10. PESTS (cameos grounded properly) ──
    // Mole — emerging from dirt mound at bottom-left, ON the ground
    const moleX = cw * 0.12;
    const moleGroundY = ch * 0.80;
    const moleSize = Math.min(48, cw * 0.11);
    ctx.fillStyle = '#8B6914';
    ctx.beginPath(); ctx.ellipse(moleX, moleGroundY + moleSize * 0.15, moleSize * 0.7, moleSize * 0.22, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#A0784A';
    ctx.beginPath(); ctx.ellipse(moleX, moleGroundY + moleSize * 0.1, moleSize * 0.55, moleSize * 0.16, 0, 0, Math.PI * 2); ctx.fill();
    Sprites.drawMole(ctx, moleX, moleGroundY - moleSize * 0.1, moleSize, t);

    // Crow — flying in sky (above horizon)
    ctx.save();
    ctx.translate(cw * 0.80, HORIZON - ch * 0.14);
    ctx.scale(0.85, 0.85);
    Sprites.drawCrow(ctx, 0, 0, Math.min(46, cw * 0.11), t);
    ctx.restore();

    // Rabbit — sitting on ground, right side
    const rabX = cw * 0.88;
    const rabY = ch * 0.76;
    const rabSize = Math.min(44, cw * 0.10);
    ctx.save();
    ctx.translate(rabX, rabY);
    ctx.scale(0.8, 0.8);
    Sprites.drawRabbit(ctx, 0, 0, rabSize * 1.2, t);
    ctx.restore();

    // Cricket swarm — mid-ground
    ctx.save();
    ctx.translate(cw * 0.28, ch * 0.65);
    ctx.scale(0.75, 0.75);
    Sprites.drawCricketSwarm(ctx, 0, 0, Math.min(42, cw * 0.10), t);
    ctx.restore();

    // ── 11. REX RUNNING — large, centred, grounded ──
    const dogSize = Math.min(100, cw * 0.24);
    const dogX = cw * 0.50;
    const dogGroundY = ch * 0.78; // paws at this Y
    ctx.save();
    ctx.translate(dogX, dogGroundY);
    const dogS = dogSize / 90;
    ctx.scale(dogS, dogS);
    Sprites.drawDog(ctx, 0, 0, 90, 'running', t);
    ctx.restore();

    // ── 12. WOODEN TITLE BANNER ──
    const bannerW = Math.min(cw - 20, 400);
    const bannerH = Math.min(100, ch * 0.18);
    const bannerX = (cw - bannerW) / 2;
    const bannerY = ch * 0.04;
    _heroWoodBanner(ctx, bannerX, bannerY, bannerW, bannerH);

    const titleSize  = Math.round(bannerH * 0.26);
    const farmSize   = Math.round(bannerH * 0.50);
    ctx.textAlign = 'center';
    ctx.strokeStyle = '#5A2800'; ctx.lineWidth = 5;
    ctx.font = `bold ${titleSize}px 'Fredoka One', cursive`;
    ctx.fillStyle = '#FFF';
    ctx.strokeText('Save the', cw / 2, bannerY + bannerH * 0.36);
    ctx.fillText('Save the',  cw / 2, bannerY + bannerH * 0.36);
    ctx.font = `bold ${farmSize}px 'Fredoka One', cursive`;
    ctx.lineWidth = 8;
    ctx.strokeText('FARM!', cw / 2, bannerY + bannerH * 0.88);
    ctx.fillStyle = '#F6D233';
    ctx.fillText('FARM!',  cw / 2, bannerY + bannerH * 0.88);

    // ── 13. HINT STRIP ──
    const stripY = HORIZON - 36;
    const stripH = 30;
    ctx.fillStyle = 'rgba(0,0,0,0.38)';
    _uiRoundRect(ctx, cw * 0.08, stripY, cw * 0.84, stripH, stripH / 2);
    ctx.fill();
    ctx.fillStyle = '#FFF';
    ctx.font = `${Math.min(14, Math.round(stripH * 0.46))}px 'Fredoka One', cursive`;
    ctx.textAlign = 'center';
    ctx.fillText('Tap pests before they eat your crops! 🌾', cw / 2, stripY + stripH * 0.68);

    // ── 14. PLAY BUTTON ──
    const btnW = Math.min(200, cw * 0.54);
    const btnH = Math.min(58, ch * 0.075);
    const btnX = (cw - btnW) / 2;
    const btnY = ch * 0.86;
    const pulse = 1 + Math.sin(t * 2.5) * 0.04; // gentle pulse only
    ctx.save();
    ctx.translate(btnX + btnW / 2, btnY + btnH / 2);
    ctx.scale(pulse, pulse);
    ctx.translate(-(btnX + btnW / 2), -(btnY + btnH / 2));
    ctx.shadowColor = CONFIG.COLORS.btnGreen;
    ctx.shadowBlur = 12;
    _drawGlossyBtn(ctx, btnX, btnY, btnW, btnH, CONFIG.COLORS.btnGreen, '#4A8E00', '#FFF', '▶  PLAY NOW');
    ctx.restore();

    this._playBtn = { x: btnX - 16, y: btnY - 12, w: btnW + 32, h: btnH + 24 };
  }

  hitTestReady(px, py) {
    if (this._playBtn && _hitRect(px, py, this._playBtn)) return 'play';
    return null;
  }
}

// ─────────────────────────────────────────────
// HELPERS (module-private)
// ─────────────────────────────────────────────
function _easeOut(t) {
  return 1 - Math.pow(1 - t, 3);
}

function _hitRect(px, py, rect) {
  return px >= rect.x && px <= rect.x + rect.w && py >= rect.y && py <= rect.y + rect.h;
}

function _getRewardTier(score) {
  for (const r of CONFIG.REWARDS) {
    if (score >= r.score) return r;
  }
  return null;
}

function _uiRoundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function _drawGlossyBtn(ctx, x, y, w, h, color, shadow, textColor, label) {
  // Shadow
  ctx.fillStyle = shadow;
  _uiRoundRect(ctx, x + 2, y + 4, w, h, h / 2);
  ctx.fill();
  // Body
  ctx.fillStyle = color;
  _uiRoundRect(ctx, x, y, w, h, h / 2);
  ctx.fill();
  // Gloss highlight
  ctx.fillStyle = 'rgba(255,255,255,0.28)';
  _uiRoundRect(ctx, x + 5, y + 4, w - 10, h / 2 - 4, h / 2 - 4);
  ctx.fill();
  // Label
  ctx.fillStyle = textColor;
  ctx.font = `bold 15px 'Fredoka One', cursive`;
  ctx.textAlign = 'center';
  ctx.fillText(label, x + w / 2, y + h / 2 + 6);
}

function _drawStarburst(ctx, cx, cy, outerR, innerR, spikes) {
  ctx.beginPath();
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const a = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2;
    if (i === 0) ctx.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    else ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
  }
  ctx.closePath();
}

// ── HERO SCREEN DRAWING HELPERS ───────────────
function _heroCloud(ctx, cx, cy, r) {
  ctx.fillStyle = 'rgba(255,255,255,0.92)';
  [0, -r*0.4, r*0.4, -r*0.7, r*0.7].forEach((ox, i) => {
    const oy = i === 0 ? 0 : r * 0.25;
    const cr = i === 0 ? r * 0.55 : r * 0.38;
    ctx.beginPath();
    ctx.arc(cx + ox, cy + oy, cr, 0, Math.PI * 2);
    ctx.fill();
  });
}

// Barn: x,y = base centre (bottom of structure)
function _heroBarn(ctx, x, y, width) {
  const w = width, h = w * 1.4;
  ctx.save(); ctx.translate(x, y);
  // Body — red
  const bodyG = ctx.createLinearGradient(-w/2, 0, w/2, 0);
  bodyG.addColorStop(0, '#C03020');
  bodyG.addColorStop(0.5,'#D83828');
  bodyG.addColorStop(1, '#A82818');
  ctx.fillStyle = bodyG;
  ctx.fillRect(-w/2, -h * 0.6, w, h * 0.6);
  // Side shadow
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.fillRect(w/2 - w*0.08, -h*0.6, w*0.08, h*0.6);
  // Roof
  ctx.fillStyle = '#8B1A10';
  ctx.beginPath();
  ctx.moveTo(-w/2 - w*0.08, -h*0.6);
  ctx.lineTo(0, -h);
  ctx.lineTo(w/2 + w*0.08, -h*0.6);
  ctx.closePath(); ctx.fill();
  // Roof highlight
  ctx.fillStyle = 'rgba(255,255,255,0.1)';
  ctx.beginPath();
  ctx.moveTo(-w/2, -h*0.6);
  ctx.lineTo(0, -h);
  ctx.lineTo(0, -h*0.6);
  ctx.closePath(); ctx.fill();
  // Door (double)
  ctx.fillStyle = '#5A2800';
  ctx.fillRect(-w*0.18, -h*0.42, w*0.16, h*0.42);
  ctx.fillRect( w*0.02, -h*0.42, w*0.16, h*0.42);
  ctx.strokeStyle = '#3A1400'; ctx.lineWidth = 1.5;
  ctx.strokeRect(-w*0.18, -h*0.42, w*0.16, h*0.42);
  ctx.strokeRect( w*0.02, -h*0.42, w*0.16, h*0.42);
  // Loft window (round)
  ctx.fillStyle = '#FFD040';
  ctx.beginPath(); ctx.arc(0, -h*0.72, w*0.1, 0, Math.PI*2); ctx.fill();
  ctx.strokeStyle = '#8B1A10'; ctx.lineWidth = 2;
  ctx.stroke();
  // Cross bar on window
  ctx.strokeStyle = '#8B1A10'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(-w*0.1, -h*0.72); ctx.lineTo(w*0.1, -h*0.72); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, -h*0.82); ctx.lineTo(0, -h*0.62); ctx.stroke();
  // White trim strips
  ctx.strokeStyle = '#F5F0E8'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(-w/2, -h*0.6); ctx.lineTo(w/2, -h*0.6); ctx.stroke();
  ctx.restore();
}

// Windmill: x,y = base of tower (ground level)
function _heroWindmill(ctx, x, y, height, t) {
  const h = height;
  ctx.save(); ctx.translate(x, y);
  // Tower (tapered trapezoid)
  const tw = h * 0.18, bw = h * 0.28;
  ctx.fillStyle = '#D4C4A0';
  ctx.beginPath();
  ctx.moveTo(-bw/2, 0);
  ctx.lineTo(bw/2, 0);
  ctx.lineTo(tw/2, -h);
  ctx.lineTo(-tw/2, -h);
  ctx.closePath(); ctx.fill();
  // Tower shading
  ctx.fillStyle = 'rgba(0,0,0,0.12)';
  ctx.beginPath();
  ctx.moveTo(bw/2, 0);
  ctx.lineTo(bw/2 + h*0.04, 0);
  ctx.lineTo(tw/2 + h*0.02, -h);
  ctx.lineTo(tw/2, -h);
  ctx.closePath(); ctx.fill();
  // Tower cap
  ctx.fillStyle = '#B8A870';
  ctx.beginPath();
  ctx.ellipse(0, -h, tw/2 + 4, 6, 0, 0, Math.PI*2);
  ctx.fill();
  // Blades (rotate slowly: t is in seconds, 0.4 rad/s)
  ctx.save(); ctx.translate(0, -h - 4); ctx.rotate(t * 0.4);
  ctx.fillStyle = '#E8D8A8';
  ctx.strokeStyle = '#C0A858'; ctx.lineWidth = 1;
  for (let i = 0; i < 4; i++) {
    ctx.save(); ctx.rotate(i * Math.PI / 2);
    ctx.beginPath();
    ctx.moveTo(-3, 0);
    ctx.lineTo(-5, -h*0.42);
    ctx.lineTo(5, -h*0.42);
    ctx.lineTo(3, 0);
    ctx.closePath();
    ctx.fill(); ctx.stroke();
    ctx.restore();
  }
  // Hub
  ctx.fillStyle = '#8B7040';
  ctx.beginPath(); ctx.arc(0, 0, 5, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#F6D233';
  ctx.beginPath(); ctx.arc(0, 0, 3, 0, Math.PI*2); ctx.fill();
  ctx.restore();
  ctx.restore();
}

function _heroFenceRow(ctx, x1, x2, y) {
  ctx.strokeStyle = '#7C433E';
  ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(x1, y + 10); ctx.lineTo(x2, y + 10); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x1, y + 22); ctx.lineTo(x2, y + 22); ctx.stroke();
  ctx.fillStyle = '#904832';
  for (let fx = x1 + 10; fx < x2; fx += 30) {
    ctx.fillRect(fx - 4, y - 2, 8, 30);
  }
}

function _heroWoodBanner(ctx, x, y, w, h) {
  // Drop shadow
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  _uiRoundRect(ctx, x + 4, y + 6, w, h, 14);
  ctx.fill();
  // Wood grain gradient
  const wg = ctx.createLinearGradient(x, y, x, y + h);
  wg.addColorStop(0, '#C87030');
  wg.addColorStop(0.3, '#A85820');
  wg.addColorStop(0.7, '#944E18');
  wg.addColorStop(1, '#7A3A0C');
  ctx.fillStyle = wg;
  _uiRoundRect(ctx, x, y, w, h, 14);
  ctx.fill();
  // Wood grain lines
  ctx.strokeStyle = 'rgba(0,0,0,0.1)';
  ctx.lineWidth = 2;
  for (let gi = 0; gi < 4; gi++) {
    ctx.beginPath();
    ctx.moveTo(x + 10, y + h * (0.2 + gi * 0.22));
    ctx.quadraticCurveTo(x + w/2, y + h * (0.22 + gi * 0.22), x + w - 10, y + h * (0.2 + gi * 0.22));
    ctx.stroke();
  }
  // Border
  ctx.strokeStyle = '#5A2800';
  ctx.lineWidth = 3;
  _uiRoundRect(ctx, x, y, w, h, 14);
  ctx.stroke();
  // Nail dots at corners
  ctx.fillStyle = '#3A1800';
  [[x+14, y+10],[x+w-14, y+10],[x+14, y+h-10],[x+w-14, y+h-10]].forEach(([nx,ny]) => {
    ctx.beginPath(); ctx.arc(nx, ny, 4, 0, Math.PI*2); ctx.fill();
  });
}
