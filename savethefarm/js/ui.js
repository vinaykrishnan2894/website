// ui.js — Premium HUD, screens, and results modal

class UI {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx    = canvas.getContext('2d');

    // Score
    this.score        = 0;
    this.displayScore = 0;
    this.scorePopups  = [];

    // Timer
    this.timeLeft   = CONFIG.GAME_DURATION;
    this.totalTime  = CONFIG.GAME_DURATION;
    this._timerShake = 0;

    // Combo
    this.comboCount       = 0;
    this.comboMultiplier  = 1;
    this.comboTimer       = 0;
    this.comboPulseScale  = 1;
    this.comboPulseTime   = 0;
    this._lastMultiplier  = 1;
    this._comboJump       = 0; // 0→1 bounce anim when multiplier changes

    // Results
    this.resultsVisible = false;
    this.resultsSlide   = 0;
    this._resultsStats  = null;
    this._scoreCountUp  = 0;   // animates toward final score
    this._starBurst     = [];  // celebration particles
    this._starsSpawned  = false;

    // Countdown
    this.countdownValue = 0;
    this.countdownScale = 0;
    this.countdownAlpha = 0;

    // Ready screen animation clock
    this._readyAnim = 0;

    // Button hit rects
    this._playBtn      = null;
    this._playAgainBtn = null;
    this._backBtn      = null;
  }

  // ── SCORE ────────────────────────────────────────
  addScore(points, x, y, multiplier = 1) {
    const total = points * multiplier;
    this.score += total;
    const text  = multiplier > 1 ? `+${total}  ×${multiplier}!` : `+${total}`;
    const color = multiplier >= 4 ? '#FF4968'
                : multiplier >= 3 ? '#FF9820'
                : multiplier >= 2 ? CONFIG.COLORS.goldLight
                : '#FFF';
    this.scorePopups.push(new ScorePopup(x, y, text, color));
  }

  addCombo() {
    this.comboCount++;
    this.comboTimer = CONFIG.COMBO_RESET;
    const prev = this.comboMultiplier;
    if      (this.comboCount >= CONFIG.COMBO_THRESHOLDS[2]) this.comboMultiplier = 4;
    else if (this.comboCount >= CONFIG.COMBO_THRESHOLDS[1]) this.comboMultiplier = 3;
    else if (this.comboCount >= CONFIG.COMBO_THRESHOLDS[0]) this.comboMultiplier = 2;
    else                                                     this.comboMultiplier = 1;
    if (this.comboMultiplier !== prev) {
      this._comboJump      = 1;    // A4: trigger bounce
      this.comboPulseTime  = CONFIG.ANIM.COMBO_PULSE;
      this.comboPulseScale = 1.6;
    }
  }

  breakCombo() {
    this.comboCount = 0; this.comboMultiplier = 1; this.comboTimer = 0; this._comboJump = 0;
  }

  showCountdown(value) {
    this.countdownValue = value;
    this.countdownScale = 2.8;
    this.countdownAlpha = 1;
  }

  // ── UPDATE ────────────────────────────────────────
  update(dt, timeLeft) {
    this.timeLeft = timeLeft;

    // Animate display score
    const diff = this.score - this.displayScore;
    this.displayScore += diff * Math.min(1, dt * 12);
    if (Math.abs(diff) < 0.5) this.displayScore = this.score;

    // Score popups
    this.scorePopups = this.scorePopups.filter(p => { p.update(dt); return !p.isDone; });

    // Combo
    if (this.comboTimer > 0) { this.comboTimer -= dt; if (this.comboTimer <= 0) this.breakCombo(); }
    if (this.comboPulseTime > 0) {
      this.comboPulseTime -= dt;
      const t = this.comboPulseTime / CONFIG.ANIM.COMBO_PULSE;
      this.comboPulseScale = 1 + t * 0.6;
    } else { this.comboPulseScale = 1; }
    // A4: combo jump decay (overshoot spring)
    if (this._comboJump > 0) this._comboJump = Math.max(0, this._comboJump - dt * 5);

    // Timer shake in last 15s
    if (this.timeLeft <= 15 && this.timeLeft > 0) {
      this._timerShake = Math.sin(Date.now() / 60) * 2;
    } else { this._timerShake = 0; }

    // Countdown fade
    if (this.countdownScale > 1) this.countdownScale = Math.max(1, this.countdownScale - dt * 6);
    if (this.countdownAlpha > 0) {
      this.countdownAlpha -= dt * (this.countdownValue === 0 ? 1.2 : 1.8);
      if (this.countdownAlpha < 0) this.countdownAlpha = 0;
    }

    // Results slide (easeOutBack spring)
    if (this.resultsVisible && this.resultsSlide < 1) {
      this.resultsSlide = Math.min(1, this.resultsSlide + dt / CONFIG.ANIM.RESULTS_SLIDE);
    }

    // Results score count-up
    if (this._resultsStats && this._scoreCountUp < this._resultsStats.score) {
      this._scoreCountUp = Math.min(
        this._resultsStats.score,
        this._scoreCountUp + this._resultsStats.score * dt * 0.9
      );
    }

    // Star burst particles
    this._starBurst = this._starBurst.filter(p => {
      p.life -= dt;
      p.x += p.vx * dt; p.y += p.vy * dt;
      p.vy += 120 * dt; p.vx *= 0.96;
      return p.life > 0;
    });
  }

  // ── HUD ──────────────────────────────────────────
  drawHUD(ctx, cw, ch) {
    const pad = 14;
    this._drawScoreCapsule(ctx, pad, pad);
    this._drawTimer(ctx, cw / 2, pad + 34);
    if (this.comboMultiplier >= 2 || this.comboCount >= CONFIG.COMBO_THRESHOLDS[0]) {
      this._drawComboBadge(ctx, pad, 70);
    }
    // Score popups
    this.scorePopups.forEach(p => p.draw(ctx));
  }

  _drawScoreCapsule(ctx, x, y) {
    const scoreStr  = String(Math.round(this.displayScore));
    const extraW    = Math.max(0, (scoreStr.length - 3) * 10);
    const w = 148 + extraW, h = 46;

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.14)';
    _uiRoundRect(ctx, x + 2, y + 4, w, h, h / 2); ctx.fill();

    // Background
    const bg = ctx.createLinearGradient(x, y, x, y + h);
    bg.addColorStop(0, '#FFFDF0'); bg.addColorStop(1, '#F5E8C0');
    ctx.fillStyle = bg;
    _uiRoundRect(ctx, x, y, w, h, h / 2); ctx.fill();

    // Border
    ctx.strokeStyle = '#D4B860'; ctx.lineWidth = 2;
    _uiRoundRect(ctx, x, y, w, h, h / 2); ctx.stroke();

    // Gloss
    ctx.fillStyle = 'rgba(255,255,255,0.45)';
    _uiRoundRect(ctx, x + 4, y + 3, w - 8, h * 0.44, h * 0.44 / 2); ctx.fill();

    // Gold coin
    const cg = ctx.createRadialGradient(x + 23, y + h / 2 - 2, 2, x + 23, y + h / 2, 14);
    cg.addColorStop(0, CONFIG.COLORS.goldLight); cg.addColorStop(1, CONFIG.COLORS.goldDark);
    ctx.fillStyle = cg;
    ctx.beginPath(); ctx.arc(x + 23, y + h / 2, 14, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = CONFIG.COLORS.goldDark; ctx.lineWidth = 1.5;
    ctx.stroke();
    // Coin gloss
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.beginPath(); ctx.ellipse(x + 20, y + h / 2 - 5, 6, 4, -0.4, 0, Math.PI * 2); ctx.fill();
    // Coin symbol
    ctx.fillStyle = '#7A5010'; ctx.font = `bold 14px 'Fredoka One', cursive`;
    ctx.textAlign = 'center'; ctx.fillText('$', x + 23, y + h / 2 + 5);

    // Score
    const fontSize = scoreStr.length > 4 ? 15 : scoreStr.length > 3 ? 17 : 20;
    ctx.fillStyle = CONFIG.COLORS.textHead;
    ctx.font      = `bold ${fontSize}px 'Fredoka One', cursive`;
    ctx.textAlign = 'left';
    ctx.fillText(scoreStr, x + 44, y + h / 2 + 7);
  }

  _drawTimer(ctx, cx, cy) {
    const r   = Math.max(27, Math.min(34, Math.round(Math.min(this.canvas.width, this.canvas.height) / (this.canvas.height > this.canvas.width ? 18 : 22))));
    const frac = Math.max(0, this.timeLeft / this.totalTime);
    const isWarn = this.timeLeft <= 15 && this.timeLeft > 0;
    const pulse  = isWarn ? 0.5 + 0.5 * Math.sin(Date.now() / 180) : 0;

    // Warning vignette
    if (isWarn && pulse > 0.2) {
      const vg = ctx.createRadialGradient(cx, cy, r * 4, cx, cy, Math.max(this.canvas.width, this.canvas.height) / 2);
      vg.addColorStop(0, 'rgba(0,0,0,0)');
      vg.addColorStop(1, `rgba(200,0,0,${pulse * 0.15})`);
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Apply timer shake
    ctx.save();
    ctx.translate(Math.round(this._timerShake * pulse), 0);

    // Pill background
    const pw = (r + 4) * 2 + 16, ph = (r + 4) * 2 + 10;
    const px = cx - pw / 2, py = cy - ph / 2;
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    _uiRoundRect(ctx, px + 2, py + 4, pw, ph, ph / 2); ctx.fill();
    const tbg = ctx.createLinearGradient(px, py, px, py + ph);
    tbg.addColorStop(0, isWarn ? '#FFF0F0' : '#FFFDF0');
    tbg.addColorStop(1, isWarn ? '#FFD8D8' : '#F5E8C0');
    ctx.fillStyle = tbg;
    _uiRoundRect(ctx, px, py, pw, ph, ph / 2); ctx.fill();
    ctx.strokeStyle = isWarn ? `rgba(220,50,50,${0.5 + pulse * 0.5})` : '#D4B860';
    ctx.lineWidth = 2;
    _uiRoundRect(ctx, px, py, pw, ph, ph / 2); ctx.stroke();
    // Pill gloss
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    _uiRoundRect(ctx, px + 4, py + 3, pw - 8, ph * 0.4, ph * 0.4 / 2); ctx.fill();

    // Ring track
    ctx.strokeStyle = 'rgba(0,0,0,0.1)'; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();

    // Timer arc
    const arcColor = frac > 0.5 ? '#4FC3F7' : frac > 0.25 ? '#F0AD4E' : '#E03030';
    ctx.strokeStyle = arcColor; ctx.lineWidth = 6; ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + frac * Math.PI * 2);
    ctx.stroke();

    // Time text
    const mins    = Math.floor(Math.max(0, this.timeLeft) / 60);
    const secs    = Math.floor(Math.max(0, this.timeLeft) % 60);
    const timeStr = `${mins}:${secs.toString().padStart(2, '0')}`;
    ctx.fillStyle = isWarn ? '#C02020' : CONFIG.COLORS.textHead;
    ctx.font      = `bold ${Math.round(r * 0.52)}px 'Fredoka One', cursive`;
    ctx.textAlign = 'center';
    ctx.fillText(timeStr, cx, cy + Math.round(r * 0.18));

    ctx.restore();
  }

  _drawComboBadge(ctx, lx, y) {
    // A4: bounce scale when multiplier just changed
    const jumpScale = 1 + _easeOutBack(this._comboJump) * 0.35;
    const scale = this.comboPulseScale * jumpScale;

    ctx.save();
    ctx.translate(lx + 26, y + 26);
    ctx.scale(scale, scale);

    // Shadow
    ctx.globalAlpha = 0.2; ctx.fillStyle = '#000';
    _drawStarburst(ctx, 3, 4, 28, 18, 8); ctx.fill();
    ctx.globalAlpha = 1;

    // Star body
    const sg = ctx.createRadialGradient(0, -6, 2, 0, 0, 28);
    sg.addColorStop(0, CONFIG.COLORS.goldLight); sg.addColorStop(1, CONFIG.COLORS.goldDark);
    ctx.fillStyle = sg;
    _drawStarburst(ctx, 0, 0, 28, 18, 8); ctx.fill();
    ctx.strokeStyle = CONFIG.COLORS.goldDark; ctx.lineWidth = 1.5; ctx.stroke();

    // Inner circle
    const ig = ctx.createRadialGradient(-4, -5, 2, 0, 0, 18);
    ig.addColorStop(0, '#FFF8D0'); ig.addColorStop(1, CONFIG.COLORS.goldLight);
    ctx.fillStyle = ig;
    ctx.beginPath(); ctx.arc(0, 0, 17, 0, Math.PI * 2); ctx.fill();

    // Gloss
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.beginPath(); ctx.ellipse(-4, -9, 9, 5, -0.3, 0, Math.PI * 2); ctx.fill();

    // Label
    const label = this.comboMultiplier > 1 ? `×${this.comboMultiplier}!` : `${this.comboCount}`;
    ctx.fillStyle   = CONFIG.COLORS.goldDark;
    ctx.strokeStyle = 'rgba(120,60,0,0.3)'; ctx.lineWidth = 3;
    ctx.font        = `bold ${label.length > 2 ? 13 : 16}px 'Fredoka One', cursive`;
    ctx.textAlign   = 'center';
    ctx.strokeText(label, 0, 6); ctx.fillText(label, 0, 6);

    ctx.restore();
  }

  // ── COUNTDOWN ─────────────────────────────────────
  drawCountdown(ctx, cw, ch) {
    if (this.countdownAlpha <= 0) return;
    ctx.save();
    ctx.globalAlpha = Math.min(1, this.countdownAlpha);
    ctx.translate(cw / 2, ch / 2);
    ctx.scale(this.countdownScale, this.countdownScale);

    const isGo = this.countdownValue === 0;
    // Circle colors by number
    const colors = { 3: '#4FC3F7', 2: '#F0AD4E', 1: '#E03030', 0: CONFIG.COLORS.btnGreen };
    const c      = colors[this.countdownValue] || '#FFF';
    const r      = 62;

    // Outer glow
    ctx.shadowColor = c; ctx.shadowBlur = 20;
    // Shadow circle
    ctx.fillStyle = 'rgba(0,0,0,0.22)';
    ctx.beginPath(); ctx.arc(4, 6, r, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;

    // Main circle
    const cg = ctx.createRadialGradient(-16, -16, 8, 0, 0, r);
    cg.addColorStop(0, _lighten(c, 0.35)); cg.addColorStop(1, c);
    ctx.fillStyle = cg;
    ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fill();

    // Ring
    ctx.strokeStyle = 'rgba(255,255,255,0.55)'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.arc(0, 0, r - 2, 0, Math.PI * 2); ctx.stroke();

    // Gloss
    ctx.fillStyle = 'rgba(255,255,255,0.28)';
    ctx.beginPath(); ctx.ellipse(-16, -22, 28, 18, -0.3, 0, Math.PI * 2); ctx.fill();

    // Number / GO
    ctx.fillStyle   = '#FFF';
    ctx.strokeStyle = 'rgba(0,0,0,0.2)'; ctx.lineWidth = 5;
    ctx.font = `bold ${isGo ? 38 : 56}px 'Fredoka One', cursive`;
    ctx.textAlign = 'center';
    ctx.strokeText(isGo ? 'GO!' : this.countdownValue, 0, isGo ? 14 : 20);
    ctx.fillText(isGo ? 'GO!' : this.countdownValue, 0, isGo ? 14 : 20);

    ctx.restore();
  }

  // ── RESULTS ───────────────────────────────────────
  drawResults(ctx, cw, ch, stats) {
    if (!this.resultsVisible) return;

    // Store stats for count-up
    if (!this._resultsStats) {
      this._resultsStats = stats;
      this._scoreCountUp = 0;
    }

    // Spawn star burst once on reveal
    if (!this._starsSpawned && this.resultsSlide > 0.3 && stats.score >= 200) {
      this._starsSpawned = true;
      for (let i = 0; i < 24; i++) {
        const a = (i / 24) * Math.PI * 2;
        const v = 80 + Math.random() * 160;
        this._starBurst.push({
          x: cw / 2, y: ch * 0.5,
          vx: Math.cos(a) * v, vy: Math.sin(a) * v - 60,
          life: 1.2 + Math.random() * 0.5, maxLife: 1.8,
          r: Math.random() * 6 + 3,
          color: [CONFIG.COLORS.goldLight, CONFIG.COLORS.gold, '#FFF', '#FF4968', CONFIG.COLORS.btnGreen][Math.floor(Math.random() * 5)],
        });
      }
    }

    const slide  = _easeOutBack(Math.min(1, this.resultsSlide));
    const panelW = Math.min(cw - 32, 420);
    const panelH = Math.min(ch - 40, 510);
    const panelX = (cw - panelW) / 2;
    const panelY = ch - panelH * slide - 10;

    // Backdrop
    ctx.fillStyle = `rgba(10,5,0,${slide * 0.68})`;
    ctx.fillRect(0, 0, cw, ch);

    // Star burst particles
    this._starBurst.forEach(p => {
      const t = p.life / p.maxLife;
      ctx.save();
      ctx.globalAlpha = t;
      ctx.fillStyle   = p.color;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r * t, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    });

    // Panel shadow
    ctx.fillStyle = 'rgba(0,0,0,0.28)';
    _uiRoundRect(ctx, panelX + 4, panelY + 8, panelW, panelH, 28); ctx.fill();

    // Panel body
    const pbg = ctx.createLinearGradient(panelX, panelY, panelX, panelY + panelH);
    pbg.addColorStop(0, '#FFFDF0'); pbg.addColorStop(1, '#F5EDCC');
    ctx.fillStyle = pbg;
    _uiRoundRect(ctx, panelX, panelY, panelW, panelH, 28); ctx.fill();
    ctx.strokeStyle = '#D4B860'; ctx.lineWidth = 2.5;
    _uiRoundRect(ctx, panelX, panelY, panelW, panelH, 28); ctx.stroke();

    const won = stats.score >= 200;
    const ribbonH = 68;
    const cx      = panelX + panelW / 2;

    // Top ribbon
    const rg = ctx.createLinearGradient(panelX, panelY, panelX, panelY + ribbonH);
    rg.addColorStop(0, won ? '#78D428' : '#FF6B6B');
    rg.addColorStop(1, won ? CONFIG.COLORS.btnGreen : CONFIG.COLORS.btnRed);
    ctx.fillStyle = rg;
    _uiRoundRect(ctx, panelX, panelY, panelW, ribbonH, 28); ctx.fill();
    ctx.fillRect(panelX, panelY + ribbonH - 28, panelW, 28);
    // Ribbon gloss
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    _uiRoundRect(ctx, panelX + 6, panelY + 5, panelW - 12, ribbonH * 0.45, 20); ctx.fill();

    // Title
    ctx.fillStyle   = '#FFF';
    ctx.strokeStyle = 'rgba(0,0,0,0.18)'; ctx.lineWidth = 4;
    ctx.font        = `bold 24px 'Fredoka One', cursive`;
    ctx.textAlign   = 'center';
    const title = won ? '🐕  FARM PROTECTED!' : '💀  FARM RAIDED!';
    ctx.strokeText(title, cx, panelY + 44); ctx.fillText(title, cx, panelY + 44);

    let ty = panelY + ribbonH + 18;

    // Animated score
    const displayedScore = Math.round(this._scoreCountUp);
    ctx.fillStyle   = won ? CONFIG.COLORS.btnGreen : CONFIG.COLORS.btnRed;
    ctx.strokeStyle = 'rgba(0,0,0,0.1)'; ctx.lineWidth = 3;
    ctx.font        = `bold 42px 'Fredoka One', cursive`;
    ctx.strokeText(`${displayedScore}`, cx, ty + 38); ctx.fillText(`${displayedScore}`, cx, ty + 38);
    ctx.fillStyle = CONFIG.COLORS.textBody; ctx.font = `16px 'Fredoka One', cursive`;
    ctx.fillText('points', cx, ty + 58);
    ty += 72;

    // U5: High score line
    const hsText = `Best: ${stats.highScore || 0} pts`;
    ctx.fillStyle = CONFIG.COLORS.textBody; ctx.font = `14px 'Fredoka One', cursive`;
    ctx.fillText(hsText, cx, ty);
    ty += 22;

    // Divider
    ctx.strokeStyle = '#E4D090'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(panelX + 24, ty); ctx.lineTo(panelX + panelW - 24, ty); ctx.stroke();
    ty += 14;

    // Stats rows
    const statRows = [
      ['🌾', 'Crops Saved', `${stats.cropsSaved} / 16`],
      ['🔥', 'Best Combo',  `×${stats.bestCombo}`],
      ['🎯', 'Pests Chased', `${stats.pestsChased || 0}`],
    ];
    statRows.forEach(([icon, label, val]) => {
      ctx.fillStyle = CONFIG.COLORS.textBody; ctx.font = `16px 'Fredoka One', cursive`;
      ctx.textAlign = 'left';
      ctx.fillText(`${icon}  ${label}`, panelX + 28, ty);
      ctx.textAlign = 'right';
      ctx.fillStyle = CONFIG.COLORS.textHead; ctx.font = `bold 16px 'Fredoka One', cursive`;
      ctx.fillText(val, panelX + panelW - 28, ty);
      ty += 28;
    });
    ty += 6;

    // Reward box
    const reward = _getRewardTier(stats.score);
    if (reward) {
      const rh = 76;
      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.1)';
      _uiRoundRect(ctx, panelX + 22, ty + 3, panelW - 44, rh, 16); ctx.fill();
      // Box
      const tierGrads = {
        Perfect: ['#FFE860','#F0B800'], Gold: ['#FFE040','#D09800'],
        Silver:  ['#E8E8E8','#A8B0B8'], Bronze: ['#F0C88A','#C07830'],
      };
      const [tc1, tc2] = tierGrads[reward.name] || ['#F6D233','#C88800'];
      const rboxG = ctx.createLinearGradient(panelX + 22, ty, panelX + 22, ty + rh);
      rboxG.addColorStop(0, tc1); rboxG.addColorStop(1, tc2);
      ctx.fillStyle = rboxG;
      _uiRoundRect(ctx, panelX + 22, ty, panelW - 44, rh, 16); ctx.fill();
      ctx.strokeStyle = tc2; ctx.lineWidth = 1.5;
      _uiRoundRect(ctx, panelX + 22, ty, panelW - 44, rh, 16); ctx.stroke();
      // Gloss
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      _uiRoundRect(ctx, panelX + 26, ty + 4, panelW - 52, rh * 0.42, 12); ctx.fill();

      const icons = { Perfect: '🏆', Gold: '🥇', Silver: '🥈', Bronze: '🥉' };
      ctx.fillStyle   = '#3A2800';
      ctx.font        = `bold 18px 'Fredoka One', cursive`;
      ctx.textAlign   = 'center';
      ctx.fillText(`${icons[reward.name] || '🎖'}  ${reward.name.toUpperCase()} REWARD`, cx, ty + 26);
      ctx.font        = `14px 'Fredoka One', cursive`;
      ctx.fillStyle   = '#5A3810';
      ctx.fillText(`${reward.pct}% faster growth · next ${reward.crops} crops`, cx, ty + 46);
      if (reward.cosmetic) {
        ctx.fillStyle = '#8A4010'; ctx.font = `12px 'Fredoka One', cursive`;
        ctx.fillText(`✨ ${reward.cosmetic} unlocked!`, cx, ty + 64);
      }
      ty += rh + 10;
    }

    // NEW BEST banner
    if (stats.isNewBest) {
      const nbg = ctx.createLinearGradient(panelX + 22, ty, panelX + 22, ty + 28);
      nbg.addColorStop(0, '#FFE860'); nbg.addColorStop(1, '#F0A800');
      ctx.fillStyle = nbg;
      _uiRoundRect(ctx, cx - 80, ty, 160, 28, 14); ctx.fill();
      ctx.fillStyle = '#3A2800'; ctx.font = `bold 14px 'Fredoka One', cursive`;
      ctx.textAlign = 'center'; ctx.fillText('⭐  NEW BEST!', cx, ty + 19);
      ty += 36;
    }

    // Buttons
    const btnAreaY = panelY + panelH - 70;
    const totalBtnW = panelW - 48;
    const btn1W = Math.round(totalBtnW * 0.54); // Play Again — wider, primary
    const btn2W = totalBtnW - btn1W - 10;
    const btnH  = 50;

    _drawGlossyBtn(ctx, panelX + 22, btnAreaY, btn1W, btnH,
      CONFIG.COLORS.btnGreen, CONFIG.COLORS.btnGreenDk, '#FFF', '🔄  PLAY AGAIN');
    _drawGlossyBtn(ctx, panelX + 22 + btn1W + 10, btnAreaY, btn2W, btnH,
      CONFIG.COLORS.btnBlue, CONFIG.COLORS.btnBlueDk, '#FFF', '🌻 FARM');

    this._playAgainBtn = { x: panelX + 22, y: btnAreaY, w: btn1W, h: btnH };
    this._backBtn      = { x: panelX + 22 + btn1W + 10, y: btnAreaY, w: btn2W, h: btnH };
  }

  hitTestResults(px, py) {
    if (this._playAgainBtn && _hitRect(px, py, this._playAgainBtn)) return 'playAgain';
    if (this._backBtn      && _hitRect(px, py, this._backBtn))      return 'backToFarm';
    return null;
  }

  // ── LOADING ───────────────────────────────────────
  drawLoading(ctx, cw, ch, progress) {
    // Sky
    const sg = ctx.createLinearGradient(0, 0, 0, ch);
    sg.addColorStop(0, CONFIG.COLORS.skyTop); sg.addColorStop(0.6, CONFIG.COLORS.skyMid); sg.addColorStop(1, CONFIG.COLORS.skyBot);
    ctx.fillStyle = sg; ctx.fillRect(0, 0, cw, ch);

    // Sun
    const sunX = cw * 0.82, sunY = ch * 0.14, sunR = Math.min(38, cw * 0.08);
    const sunG = ctx.createRadialGradient(sunX, sunY, 2, sunX, sunY, sunR * 1.8);
    sunG.addColorStop(0, '#FFF8A0'); sunG.addColorStop(0.4, '#F6D233'); sunG.addColorStop(1, 'rgba(246,210,51,0)');
    ctx.fillStyle = sunG; ctx.beginPath(); ctx.arc(sunX, sunY, sunR * 1.8, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#FFF8A0'; ctx.beginPath(); ctx.arc(sunX, sunY, sunR, 0, Math.PI * 2); ctx.fill();

    // Hills
    ctx.fillStyle = '#5AAA18';
    ctx.beginPath(); ctx.ellipse(cw * 0.22, ch * 0.55, cw * 0.36, ch * 0.22, 0, Math.PI, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#68C020';
    ctx.beginPath(); ctx.ellipse(cw * 0.72, ch * 0.54, cw * 0.32, ch * 0.20, 0, Math.PI, Math.PI * 2); ctx.fill();

    // Ground
    const gg = ctx.createLinearGradient(0, ch * 0.52, 0, ch);
    gg.addColorStop(0, CONFIG.COLORS.grassLight); gg.addColorStop(1, CONFIG.COLORS.grassDark);
    ctx.fillStyle = gg; ctx.fillRect(0, ch * 0.52, cw, ch * 0.48);
    ctx.fillStyle = '#A8DC38'; ctx.fillRect(0, ch * 0.52, cw, 5);

    // 3 crop silhouettes
    const cropXs = [cw * 0.18, cw * 0.50, cw * 0.80];
    const cropColors = ['#F6D233','#6DC424','#FF7200'];
    cropXs.forEach((cx2, i) => {
      ctx.fillStyle = '#4A8010';
      ctx.fillRect(cx2 - 3, ch * 0.58, 6, ch * 0.22);
      ctx.fillStyle = cropColors[i];
      ctx.beginPath(); ctx.arc(cx2, ch * 0.56, 18, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.25)';
      ctx.beginPath(); ctx.ellipse(cx2 - 5, ch * 0.53, 6, 4, -0.4, 0, Math.PI * 2); ctx.fill();
    });

    // Wood-banner title
    const bw = Math.min(cw - 24, 380), bh = Math.min(90, ch * 0.16);
    const bx = (cw - bw) / 2, by = ch * 0.06;
    _heroWoodBanner(ctx, bx, by, bw, bh);
    ctx.textAlign = 'center'; ctx.strokeStyle = '#5A2800'; ctx.lineWidth = 5;
    ctx.font = `bold ${Math.round(bh * 0.27)}px 'Fredoka One', cursive`;
    ctx.fillStyle = '#FFF';
    ctx.strokeText('Save the', cw / 2, by + bh * 0.38); ctx.fillText('Save the', cw / 2, by + bh * 0.38);
    ctx.font = `bold ${Math.round(bh * 0.50)}px 'Fredoka One', cursive`;
    ctx.lineWidth = 7;
    ctx.strokeText('FARM!', cw / 2, by + bh * 0.88);
    ctx.fillStyle = CONFIG.COLORS.goldLight; ctx.fillText('FARM!', cw / 2, by + bh * 0.88);

    // Subtitle
    ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.font = `15px 'Fredoka One', cursive`;
    ctx.fillText('Loading farm...', cw / 2, ch * 0.43);

    // Progress bar
    const barW = Math.min(cw - 64, 300), barH = 26;
    const barX = (cw - barW) / 2, barY = ch * 0.50;
    ctx.fillStyle = 'rgba(0,0,0,0.12)'; _uiRoundRect(ctx, barX + 2, barY + 4, barW, barH, barH / 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.5)'; _uiRoundRect(ctx, barX, barY, barW, barH, barH / 2); ctx.fill();
    ctx.strokeStyle = '#C4A35A'; ctx.lineWidth = 2; ctx.stroke();
    if (progress > 0.01) {
      const fillW = (barW - 4) * progress;
      const fg = ctx.createLinearGradient(barX, 0, barX + barW, 0);
      fg.addColorStop(0, '#E7C11F'); fg.addColorStop(1, CONFIG.COLORS.goldLight);
      ctx.fillStyle = fg; _uiRoundRect(ctx, barX + 2, barY + 2, fillW, barH - 4, (barH - 4) / 2); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.35)'; _uiRoundRect(ctx, barX + 2, barY + 2, fillW, (barH - 4) * 0.44, (barH - 4) * 0.44 / 2); ctx.fill();
      ctx.font = '16px serif'; ctx.textAlign = 'center';
      ctx.fillText('🌾', barX + 2 + fillW, barY + 18);
    }
  }

  // ── READY / HERO ──────────────────────────────────
  drawReady(ctx, cw, ch) {
    const t = this._readyAnim || 0;
    const HORIZON = ch * 0.50, FENCE_Y = HORIZON + 6;

    // Sky
    const sg = ctx.createLinearGradient(0, 0, 0, HORIZON);
    sg.addColorStop(0, '#3AAEE0'); sg.addColorStop(0.7, '#87CEEB'); sg.addColorStop(1, '#C8E8F8');
    ctx.fillStyle = sg; ctx.fillRect(0, 0, cw, HORIZON + 2);

    // Clouds
    _heroCloud(ctx, cw * 0.10, ch * 0.07, Math.min(60, cw * 0.14));
    _heroCloud(ctx, cw * 0.48, ch * 0.04, Math.min(76, cw * 0.17));
    _heroCloud(ctx, cw * 0.80, ch * 0.10, Math.min(50, cw * 0.12));

    // Hills
    ctx.fillStyle = '#5AB030';
    ctx.beginPath(); ctx.ellipse(cw * 0.22, HORIZON, cw * 0.38, ch * 0.20, 0, Math.PI, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#6DC038';
    ctx.beginPath(); ctx.ellipse(cw * 0.72, HORIZON, cw * 0.34, ch * 0.18, 0, Math.PI, Math.PI * 2); ctx.fill();

    // Barn
    const barnW = Math.min(90, cw * 0.2);
    _heroBarn(ctx, cw * 0.06 + barnW / 2, HORIZON, barnW);

    // Windmill
    _heroWindmill(ctx, cw * 0.86, HORIZON, Math.min(96, ch * 0.19), t);

    // Ground
    const gg = ctx.createLinearGradient(0, HORIZON, 0, ch);
    gg.addColorStop(0, CONFIG.COLORS.grassLight); gg.addColorStop(0.25, CONFIG.COLORS.grass); gg.addColorStop(1, CONFIG.COLORS.grassDark);
    ctx.fillStyle = gg; ctx.fillRect(0, HORIZON, cw, ch - HORIZON);
    ctx.fillStyle = '#A8DC38'; ctx.fillRect(0, HORIZON, cw, 5);
    ctx.fillStyle = 'rgba(0,0,0,0.03)';
    for (let gx = 0; gx < cw; gx += 30) ctx.fillRect(gx, HORIZON, 14, ch);

    // Dirt path
    const pg = ctx.createLinearGradient(0, HORIZON, 0, ch);
    pg.addColorStop(0, '#D4A050'); pg.addColorStop(1, '#A07030');
    ctx.fillStyle = pg;
    ctx.beginPath();
    ctx.moveTo(cw * 0.40, FENCE_Y + 6); ctx.quadraticCurveTo(cw * 0.50, FENCE_Y + ch * 0.12, cw * 0.42, ch);
    ctx.lineTo(cw * 0.58, ch); ctx.quadraticCurveTo(cw * 0.60, FENCE_Y + ch * 0.12, cw * 0.60, FENCE_Y + 6);
    ctx.closePath(); ctx.fill();

    // Fence
    _heroFenceRow(ctx, 0, cw, FENCE_Y);

    // Crops
    const cropD = [{x:0.12,c:'#F6D233'},{x:0.30,c:'#FF7200'},{x:0.62,c:'#4CAF50'},{x:0.80,c:'#F6D233'}];
    cropD.forEach(({x: cx2, c: color}) => {
      for (let row = 0; row < 3; row++) {
        const py = FENCE_Y + 26 + row * 26, sc = 0.55 + row * 0.2, px = cw * cx2 + row * 12;
        ctx.fillStyle = '#3A8010'; ctx.fillRect(px - 2 * sc, py - 24 * sc, 4 * sc, 24 * sc);
        ctx.fillStyle = color;
        ctx.beginPath(); ctx.arc(px, py - 24 * sc, 9 * sc, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.28)';
        ctx.beginPath(); ctx.ellipse(px - 2 * sc, py - 27 * sc, 3 * sc, 2 * sc, 0, 0, Math.PI * 2); ctx.fill();
      }
    });

    // Pests cameos
    const mX = cw * 0.12, mY = ch * 0.79, mS = Math.min(44, cw * 0.10);
    ctx.fillStyle = '#8B6914'; ctx.beginPath(); ctx.ellipse(mX, mY + mS * 0.18, mS * 0.7, mS * 0.22, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#A0784A'; ctx.beginPath(); ctx.ellipse(mX, mY + mS * 0.10, mS * 0.55, mS * 0.16, 0, 0, Math.PI * 2); ctx.fill();
    Sprites.drawMole(ctx, mX, mY - mS * 0.08, mS, t);
    ctx.save(); ctx.translate(cw * 0.80, HORIZON - ch * 0.14); ctx.scale(0.82, 0.82);
    Sprites.drawCrow(ctx, 0, 0, Math.min(44, cw * 0.10), t); ctx.restore();
    ctx.save(); ctx.translate(cw * 0.88, ch * 0.76); ctx.scale(0.78, 0.78);
    Sprites.drawRabbit(ctx, 0, 0, Math.min(42, cw * 0.10), t); ctx.restore();
    ctx.save(); ctx.translate(cw * 0.28, ch * 0.67); ctx.scale(0.72, 0.72);
    Sprites.drawCricketSwarm(ctx, 0, 0, Math.min(40, cw * 0.09), t); ctx.restore();

    // Rex running — hero
    const dogSize = Math.min(100, cw * 0.23);
    ctx.save(); ctx.translate(cw * 0.50, ch * 0.78);
    ctx.scale(dogSize / 90, dogSize / 90);
    Sprites.drawDog(ctx, 0, 0, 90, 'running', t); ctx.restore();

    // Wood title banner
    const bw = Math.min(cw - 20, 400), bh = Math.min(98, ch * 0.17);
    const bx = (cw - bw) / 2, by = ch * 0.04;
    _heroWoodBanner(ctx, bx, by, bw, bh);
    ctx.textAlign = 'center'; ctx.strokeStyle = '#5A2800'; ctx.lineWidth = 5;
    ctx.font = `bold ${Math.round(bh * 0.26)}px 'Fredoka One', cursive`;
    ctx.fillStyle = '#FFF';
    ctx.strokeText('Save the', cw / 2, by + bh * 0.37); ctx.fillText('Save the', cw / 2, by + bh * 0.37);
    ctx.font = `bold ${Math.round(bh * 0.50)}px 'Fredoka One', cursive`;
    ctx.lineWidth = 7;
    ctx.strokeText('FARM!', cw / 2, by + bh * 0.87);
    ctx.fillStyle = CONFIG.COLORS.goldLight; ctx.fillText('FARM!', cw / 2, by + bh * 0.87);

    // Instruction strip
    const sY = HORIZON - 34, sH = 30;
    ctx.fillStyle = 'rgba(0,0,0,0.38)'; _uiRoundRect(ctx, cw * 0.08, sY, cw * 0.84, sH, sH / 2); ctx.fill();
    ctx.fillStyle = '#FFF'; ctx.font = `${Math.min(14, Math.round(sH * 0.46))}px 'Fredoka One', cursive`;
    ctx.textAlign = 'center'; ctx.fillText('Tap pests before they eat your crops! 🌾', cw / 2, sY + sH * 0.68);

    // High score
    const hs = parseInt(localStorage.getItem('stf_highScore') || '0');
    if (hs > 0) {
      ctx.fillStyle = CONFIG.COLORS.goldLight; ctx.font = `bold 14px 'Fredoka One', cursive`;
      ctx.textAlign = 'center'; ctx.fillText(`⭐ Best: ${hs} pts`, cw / 2, ch * 0.82);
    }

    // PLAY button
    const btnW = Math.min(210, cw * 0.56), btnH = Math.min(60, ch * 0.076);
    const btnX = (cw - btnW) / 2, btnY = ch * 0.85;
    const pulse = 1 + Math.sin(t * 2.2) * 0.03;
    ctx.save();
    ctx.translate(btnX + btnW / 2, btnY + btnH / 2);
    ctx.scale(pulse, pulse);
    ctx.translate(-(btnX + btnW / 2), -(btnY + btnH / 2));
    ctx.shadowColor = CONFIG.COLORS.btnGreen; ctx.shadowBlur = 14;
    _drawGlossyBtn(ctx, btnX, btnY, btnW, btnH, CONFIG.COLORS.btnGreen, CONFIG.COLORS.btnGreenDk, '#FFF', '▶  PLAY NOW');
    ctx.restore();

    // Tap anywhere hint (subtle)
    ctx.fillStyle = 'rgba(255,255,255,0.55)'; ctx.font = `12px 'Fredoka One', cursive`;
    ctx.textAlign = 'center'; ctx.fillText('or tap anywhere to play', cw / 2, btnY + btnH + 16);

    this._playBtn = { x: 0, y: btnY - 20, w: cw, h: ch - btnY + 20 }; // full lower half is tappable
  }

  hitTestReady(px, py) {
    if (this._playBtn && _hitRect(px, py, this._playBtn)) return 'play';
    return null;
  }

  // Reset results state between games
  resetResults() {
    this._resultsStats  = null;
    this._scoreCountUp  = 0;
    this._starsSpawned  = false;
    this._starBurst     = [];
    this.resultsVisible = false;
    this.resultsSlide   = 0;
  }
}

// ── HELPERS ───────────────────────────────────────────

function _uiRoundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y);
  ctx.quadraticCurveTo(x+w,y,x+w,y+r); ctx.lineTo(x+w,y+h-r);
  ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h); ctx.lineTo(x+r,y+h);
  ctx.quadraticCurveTo(x,y+h,x,y+h-r); ctx.lineTo(x,y+r);
  ctx.quadraticCurveTo(x,y,x+r,y); ctx.closePath();
}

function _drawGlossyBtn(ctx, x, y, w, h, color, darkColor, textColor, label) {
  const r = h / 2;
  // Shadow
  ctx.fillStyle = darkColor;
  _uiRoundRect(ctx, x + 2, y + 4, w, h, r); ctx.fill();
  // Body
  const bg = ctx.createLinearGradient(x, y, x, y + h);
  bg.addColorStop(0, _lighten(color, 0.15)); bg.addColorStop(1, color);
  ctx.fillStyle = bg; _uiRoundRect(ctx, x, y, w, h, r); ctx.fill();
  // Gloss
  ctx.fillStyle = 'rgba(255,255,255,0.28)';
  _uiRoundRect(ctx, x + 5, y + 4, w - 10, h * 0.44, h * 0.44 / 2); ctx.fill();
  // Border
  ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 1.5;
  _uiRoundRect(ctx, x, y, w, h, r); ctx.stroke();
  // Label
  ctx.fillStyle   = textColor;
  ctx.strokeStyle = 'rgba(0,0,0,0.18)'; ctx.lineWidth = 3;
  ctx.font        = `bold 16px 'Fredoka One', cursive`;
  ctx.textAlign   = 'center';
  ctx.strokeText(label, x + w / 2, y + h / 2 + 6);
  ctx.fillText(label,   x + w / 2, y + h / 2 + 6);
}

function _drawStarburst(ctx, cx, cy, outerR, innerR, spikes) {
  ctx.beginPath();
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const a = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2;
    if (i === 0) ctx.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    else         ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
  }
  ctx.closePath();
}

function _easeOut(t)      { return 1 - Math.pow(1 - t, 3); }
function _easeOutBack(t)  {
  const c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

function _hitRect(px, py, r) {
  return px >= r.x && px <= r.x + r.w && py >= r.y && py <= r.y + r.h;
}

function _getRewardTier(score) {
  for (const r of CONFIG.REWARDS) { if (score >= r.score) return r; }
  return null;
}

function _lighten(hex, amt) {
  const n = parseInt(hex.replace('#',''), 16);
  const r = Math.min(255, ((n >> 16) & 0xFF) + Math.round(255 * amt));
  const g = Math.min(255, ((n >> 8)  & 0xFF) + Math.round(255 * amt));
  const b = Math.min(255, ( n        & 0xFF) + Math.round(255 * amt));
  return `rgb(${r},${g},${b})`;
}

// ── HERO SCREEN HELPERS ───────────────────────────────
function _heroCloud(ctx, cx, cy, r) {
  ctx.fillStyle = 'rgba(255,255,255,0.90)';
  [[0,0,0.52],[1,-0.42,0.36],[1,0.42,0.36],[-1,-0.72,0.30],[-1,0.72,0.30]].forEach(([d,om,rm]) => {
    ctx.beginPath(); ctx.arc(cx + d * r * 0.42, cy + om * r * 0.26, r * rm, 0, Math.PI * 2); ctx.fill();
  });
}

function _heroBarn(ctx, x, y, width) {
  const w = width, h = w * 1.4;
  ctx.save(); ctx.translate(x, y);
  // Body
  const bg = ctx.createLinearGradient(-w/2, 0, w/2, 0);
  bg.addColorStop(0, '#C03020'); bg.addColorStop(0.5, '#D83828'); bg.addColorStop(1, '#A82818');
  ctx.fillStyle = bg; ctx.fillRect(-w/2, -h*0.6, w, h*0.6);
  ctx.fillStyle = 'rgba(0,0,0,0.12)'; ctx.fillRect(w/2-w*0.08, -h*0.6, w*0.08, h*0.6);
  // Roof
  ctx.fillStyle = '#8B1A10';
  ctx.beginPath(); ctx.moveTo(-w/2-w*0.06,-h*0.6); ctx.lineTo(0,-h); ctx.lineTo(w/2+w*0.06,-h*0.6); ctx.closePath(); ctx.fill();
  ctx.fillStyle='rgba(255,255,255,0.08)';
  ctx.beginPath(); ctx.moveTo(-w/2,-h*0.6); ctx.lineTo(0,-h); ctx.lineTo(0,-h*0.6); ctx.closePath(); ctx.fill();
  // Door
  ctx.fillStyle='#5A2800'; ctx.fillRect(-w*0.18,-h*0.42,w*0.16,h*0.42); ctx.fillRect(w*0.02,-h*0.42,w*0.16,h*0.42);
  ctx.strokeStyle='#3A1400'; ctx.lineWidth=1.5;
  ctx.strokeRect(-w*0.18,-h*0.42,w*0.16,h*0.42); ctx.strokeRect(w*0.02,-h*0.42,w*0.16,h*0.42);
  // Window
  ctx.fillStyle='#FFD040'; ctx.beginPath(); ctx.arc(0,-h*0.72,w*0.09,0,Math.PI*2); ctx.fill();
  ctx.strokeStyle='#8B1A10'; ctx.lineWidth=2; ctx.stroke();
  ctx.strokeStyle='#8B1A10'; ctx.lineWidth=1.5;
  ctx.beginPath(); ctx.moveTo(-w*0.09,-h*0.72); ctx.lineTo(w*0.09,-h*0.72); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0,-h*0.81); ctx.lineTo(0,-h*0.63); ctx.stroke();
  ctx.restore();
}

function _heroWindmill(ctx, x, y, height, t) {
  const h = height;
  ctx.save(); ctx.translate(x, y);
  const tw=h*0.16, bw=h*0.26;
  const tg = ctx.createLinearGradient(-bw/2, 0, bw/2, 0);
  tg.addColorStop(0, '#C8B888'); tg.addColorStop(1, '#DDD0A8');
  ctx.fillStyle = tg;
  ctx.beginPath(); ctx.moveTo(-bw/2,0); ctx.lineTo(bw/2,0); ctx.lineTo(tw/2,-h); ctx.lineTo(-tw/2,-h); ctx.closePath(); ctx.fill();
  ctx.fillStyle='rgba(0,0,0,0.10)';
  ctx.beginPath(); ctx.moveTo(bw/2,0); ctx.lineTo(bw/2+h*0.04,0); ctx.lineTo(tw/2+h*0.02,-h); ctx.lineTo(tw/2,-h); ctx.closePath(); ctx.fill();
  // Cap
  ctx.fillStyle='#B8A870'; ctx.beginPath(); ctx.ellipse(0,-h,tw/2+4,6,0,0,Math.PI*2); ctx.fill();
  // Blades (slow rotation)
  ctx.save(); ctx.translate(0,-h-4); ctx.rotate(t * 0.35);
  ctx.fillStyle='#E8D8A8'; ctx.strokeStyle='#C0A858'; ctx.lineWidth=1;
  for (let i=0;i<4;i++){
    ctx.save(); ctx.rotate(i*Math.PI/2);
    ctx.beginPath(); ctx.moveTo(-3,0); ctx.lineTo(-5,-h*0.38); ctx.lineTo(5,-h*0.38); ctx.lineTo(3,0); ctx.closePath();
    ctx.fill(); ctx.stroke(); ctx.restore();
  }
  ctx.fillStyle='#8B7040'; ctx.beginPath(); ctx.arc(0,0,5,0,Math.PI*2); ctx.fill();
  ctx.fillStyle=CONFIG.COLORS.goldLight; ctx.beginPath(); ctx.arc(0,0,3,0,Math.PI*2); ctx.fill();
  ctx.restore();
  ctx.restore();
}

function _heroFenceRow(ctx, x1, x2, y) {
  ctx.strokeStyle='#6A3828'; ctx.lineWidth=4;
  ctx.beginPath(); ctx.moveTo(x1,y+10); ctx.lineTo(x2,y+10); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x1,y+22); ctx.lineTo(x2,y+22); ctx.stroke();
  ctx.fillStyle='#8B4832';
  for (let fx=x1+10; fx<x2; fx+=30) { ctx.fillRect(fx-4,y-2,8,30); }
}

function _heroWoodBanner(ctx, x, y, w, h) {
  ctx.fillStyle='rgba(0,0,0,0.22)'; _uiRoundRect(ctx,x+4,y+6,w,h,14); ctx.fill();
  const wg=ctx.createLinearGradient(x,y,x,y+h);
  wg.addColorStop(0,'#C87030'); wg.addColorStop(0.3,'#A85820'); wg.addColorStop(0.7,'#944E18'); wg.addColorStop(1,'#7A3A0C');
  ctx.fillStyle=wg; _uiRoundRect(ctx,x,y,w,h,14); ctx.fill();
  ctx.strokeStyle='rgba(0,0,0,0.1)'; ctx.lineWidth=1.5;
  for (let i=0;i<4;i++){
    ctx.beginPath(); ctx.moveTo(x+10,y+h*(0.2+i*0.22)); ctx.quadraticCurveTo(x+w/2,y+h*(0.22+i*0.22),x+w-10,y+h*(0.2+i*0.22)); ctx.stroke();
  }
  ctx.strokeStyle='#5A2800'; ctx.lineWidth=2.5; _uiRoundRect(ctx,x,y,w,h,14); ctx.stroke();
  ctx.fillStyle='#3A1800';
  [[x+14,y+10],[x+w-14,y+10],[x+14,y+h-10],[x+w-14,y+h-10]].forEach(([nx,ny])=>{
    ctx.beginPath(); ctx.arc(nx,ny,4,0,Math.PI*2); ctx.fill();
  });
  // Gloss
  ctx.fillStyle='rgba(255,255,255,0.1)'; _uiRoundRect(ctx,x+6,y+4,w-12,h*0.38,12); ctx.fill();
}

function _lighten(hex, amt) {
  try {
    const n=parseInt(hex.replace('#',''),16);
    const r=Math.min(255,((n>>16)&0xFF)+Math.round(255*amt));
    const g=Math.min(255,((n>>8)&0xFF)+Math.round(255*amt));
    const b=Math.min(255,(n&0xFF)+Math.round(255*amt));
    return `rgb(${r},${g},${b})`;
  } catch(e) { return hex; }
}
