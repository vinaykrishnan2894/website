// entities.js — Sprite drawing + game entity classes

// ─────────────────────────────────────────────
// SPRITE DRAWER — all canvas drawing functions
// ─────────────────────────────────────────────
const Sprites = {

  // ══ REX THE DOG ══════════════════════════════
  // Clean side-profile Border Collie. Brown saddle, white chest/face blaze,
  // red harness, floppy ear, happy tongue. Drawn as one coherent shape.
  drawDog(ctx, x, y, size, state = 'idle', animTime = 0) {
    ctx.save();
    ctx.translate(x, y);
    const s = size / 90;
    const run = state === 'running';
    const bark = state === 'barking';
    const lSwing = run ? Math.sin(animTime * 20) * 24 : 0;
    const bob    = run ? Math.abs(Math.sin(animTime * 20)) * 4 : 0;
    const wagAngle = run
      ? -35 + Math.sin(animTime * 20) * 40
      : -50 + Math.sin(animTime * 4) * 20;

    // ── shadow ──
    ctx.save(); ctx.globalAlpha = 0.15; ctx.fillStyle = '#000';
    ctx.beginPath(); ctx.ellipse(0, (32 + bob) * s, 30 * s, 6 * s, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    // ── tail (behind body) ──
    ctx.save();
    ctx.translate(22 * s, (0 + bob) * s);
    ctx.rotate(wagAngle * Math.PI / 180);
    ctx.fillStyle = '#A04010'; // brown shaft
    ctx.beginPath(); ctx.ellipse(0, -12 * s, 4 * s, 13 * s, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#EDE8DF'; // white plume tip
    ctx.beginPath(); ctx.ellipse(1 * s, -24 * s, 7 * s, 10 * s, 0.2, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    // ── back legs ──
    _dogLeg(ctx, s,  6 * s, (22 + bob) * s, -lSwing * 0.7);
    _dogLeg(ctx, s, 16 * s, (22 + bob) * s,  lSwing * 0.7);

    // ── body ── (brown oval for saddle area)
    ctx.fillStyle = '#B84C14';
    ctx.beginPath();
    ctx.ellipse(4 * s, (2 + bob) * s, 26 * s, 15 * s, 0.05, 0, Math.PI * 2);
    ctx.fill();

    // ── white belly / underside ──
    ctx.fillStyle = '#F5F0E8';
    ctx.beginPath();
    ctx.ellipse(4 * s, (12 + bob) * s, 20 * s, 10 * s, 0, 0, Math.PI * 2);
    ctx.fill();

    // ── front legs ──
    _dogLeg(ctx, s, -8 * s, (22 + bob) * s,  lSwing);
    _dogLeg(ctx, s,  4 * s, (22 + bob) * s, -lSwing);

    // ── neck / chest area ──
    ctx.fillStyle = '#B84C14';
    ctx.beginPath();
    ctx.ellipse(-16 * s, (-5 + bob) * s, 12 * s, 11 * s, -0.3, 0, Math.PI * 2);
    ctx.fill();

    // ── big white chest ruff ──
    ctx.fillStyle = '#F5F0E8';
    ctx.beginPath();
    ctx.ellipse(-18 * s, (4 + bob) * s, 11 * s, 16 * s, -0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFF';
    ctx.beginPath();
    ctx.ellipse(-20 * s, (2 + bob) * s, 7 * s, 12 * s, -0.1, 0, Math.PI * 2);
    ctx.fill();

    // ── harness (red, drawn on body) ──
    ctx.strokeStyle = '#CC1818';
    ctx.lineWidth = 3.5 * s; ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(-16 * s, (-10 + bob) * s, 9 * s, 0.5, Math.PI - 0.5); // collar
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-10 * s, (-6 + bob) * s);
    ctx.quadraticCurveTo(4 * s, (4 + bob) * s, 14 * s, (-2 + bob) * s); // back strap
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-10 * s, (-6 + bob) * s);
    ctx.quadraticCurveTo(-2 * s, (8 + bob) * s, 8 * s, (8 + bob) * s); // chest strap
    ctx.stroke();
    // gold buckle
    ctx.fillStyle = '#F6D233'; ctx.strokeStyle = '#C8A820'; ctx.lineWidth = 1.2 * s;
    ctx.beginPath(); ctx.ellipse(4 * s, (4 + bob) * s, 4 * s, 4 * s, 0, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();

    // ── HEAD ──
    const hx = -26 * s, hy = (-22 + bob) * s;

    // left floppy ear (brown, drops down-left)
    ctx.fillStyle = '#8B3208';
    ctx.beginPath();
    ctx.ellipse(hx - 8 * s, hy + 8 * s, 6 * s, 14 * s, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#C05018';
    ctx.beginPath();
    ctx.ellipse(hx - 7 * s, hy + 9 * s, 4 * s, 10 * s, -0.2, 0, Math.PI * 2);
    ctx.fill();

    // head — brown base circle
    ctx.fillStyle = '#C05018';
    ctx.beginPath(); ctx.arc(hx, hy, 17 * s, 0, Math.PI * 2); ctx.fill();

    // right ear (semi-prick — stands up with folded tip)
    ctx.fillStyle = '#8B3208';
    ctx.beginPath();
    ctx.ellipse(hx + 12 * s, hy - 12 * s, 7 * s, 14 * s, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#EDE8DF'; // white fold at tip
    ctx.beginPath();
    ctx.ellipse(hx + 14 * s, hy - 22 * s, 5 * s, 6 * s, 0.3, 0, Math.PI * 2);
    ctx.fill();

    // ── wide white blaze (key Buddy trait — covers most of face) ──
    ctx.fillStyle = '#EDE8DF';
    ctx.beginPath();
    ctx.ellipse(hx + 1 * s, hy + 2 * s, 12 * s, 17 * s, 0.04, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFF';
    ctx.beginPath();
    ctx.ellipse(hx + 1 * s, hy + 1 * s, 9 * s, 13 * s, 0.04, 0, Math.PI * 2);
    ctx.fill();
    // brown eye-patch marks on the blaze
    ctx.fillStyle = '#C05018';
    ctx.beginPath(); ctx.ellipse(hx - 5 * s, hy - 8 * s, 6 * s, 4.5 * s, -0.15, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(hx + 7 * s, hy - 7 * s, 5 * s, 4 * s, 0.15, 0, Math.PI * 2); ctx.fill();

    // ── snout ── (slightly protruding, rounded)
    ctx.fillStyle = '#C05018';
    ctx.beginPath();
    ctx.ellipse(hx + 14 * s, hy + 5 * s, 9 * s, 7 * s, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#EDE8DF'; // white muzzle
    ctx.beginPath();
    ctx.ellipse(hx + 15 * s, hy + 6 * s, 7 * s, 5.5 * s, 0, 0, Math.PI * 2);
    ctx.fill();

    // nose
    ctx.fillStyle = '#100800';
    ctx.beginPath(); ctx.ellipse(hx + 21 * s, hy + 4 * s, 4.5 * s, 3.5 * s, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.beginPath(); ctx.ellipse(hx + 20 * s, hy + 2.5 * s, 1.8 * s, 1.3 * s, 0, 0, Math.PI * 2); ctx.fill();

    // open mouth + tongue (always friendly)
    ctx.fillStyle = '#AA1818';
    ctx.beginPath(); ctx.arc(hx + 17 * s, hy + 11 * s, 5.5 * s, 0, Math.PI); ctx.fill();
    ctx.fillStyle = '#FF7070';
    ctx.beginPath(); ctx.ellipse(hx + 19 * s, hy + 16 * s, 4.5 * s, 6.5 * s, 0.1, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#E04848'; ctx.lineWidth = 1.5 * s;
    ctx.beginPath(); ctx.moveTo(hx + 19 * s, hy + 11 * s); ctx.lineTo(hx + 19 * s, hy + 20 * s); ctx.stroke();
    ctx.fillStyle = '#FFF';
    ctx.fillRect(hx + 11 * s, hy + 10 * s, 12 * s, 4 * s);

    // ── eyes ──
    // whites
    ctx.fillStyle = '#FFF8F0';
    ctx.beginPath(); ctx.ellipse(hx - 3 * s, hy - 9 * s, 6 * s, 5.5 * s, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(hx + 7 * s, hy - 8 * s, 5.5 * s, 5 * s, 0, 0, Math.PI * 2); ctx.fill();
    // iris (warm brown)
    ctx.fillStyle = '#6B2C08';
    ctx.beginPath(); ctx.arc(hx - 2 * s, hy - 9 * s, 4.5 * s, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(hx + 8 * s, hy - 8 * s, 4 * s, 0, Math.PI * 2); ctx.fill();
    // pupil
    ctx.fillStyle = '#080400';
    ctx.beginPath(); ctx.arc(hx - 1.5 * s, hy - 9 * s, 2.6 * s, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(hx + 8.5 * s, hy - 8 * s, 2.3 * s, 0, Math.PI * 2); ctx.fill();
    // shine
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.beginPath(); ctx.arc(hx + 0 * s, hy - 10.5 * s, 1.7 * s, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(hx + 10 * s, hy - 9.5 * s, 1.4 * s, 0, Math.PI * 2); ctx.fill();
    // top eyelid line
    ctx.strokeStyle = '#4A1804'; ctx.lineWidth = 2 * s;
    ctx.beginPath(); ctx.arc(hx - 2 * s, hy - 9 * s, 4.8 * s, Math.PI + 0.5, -0.5); ctx.stroke();
    ctx.beginPath(); ctx.arc(hx + 8 * s, hy - 8 * s, 4.3 * s, Math.PI + 0.5, -0.5); ctx.stroke();

    ctx.restore();
  },

  // ══ CROW ════════════════════════════════════
  drawCrow(ctx, x, y, size, animTime = 0) {
    ctx.save(); ctx.translate(x, y);
    const s = size / 50;
    const flap = Math.sin(animTime * 6) * 10;

    ctx.save(); ctx.globalAlpha = 0.12; ctx.fillStyle = '#000';
    ctx.beginPath(); ctx.ellipse(0, 22 * s, 14 * s, 5 * s, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    // wings
    ctx.fillStyle = '#1A1A2E';
    ctx.save(); ctx.translate(-10 * s, 2 * s); ctx.rotate((-25 + flap) * Math.PI / 180);
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(-20 * s, -10 * s, -22 * s, 8 * s); ctx.quadraticCurveTo(-12 * s, 12 * s, 0, 0); ctx.fill();
    ctx.restore();
    ctx.save(); ctx.translate(10 * s, 2 * s); ctx.rotate((25 - flap) * Math.PI / 180);
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(20 * s, -10 * s, 22 * s, 8 * s); ctx.quadraticCurveTo(12 * s, 12 * s, 0, 0); ctx.fill();
    ctx.restore();

    // body
    ctx.fillStyle = '#16213E';
    ctx.beginPath(); ctx.ellipse(0, 4 * s, 12 * s, 16 * s, 0, 0, Math.PI * 2); ctx.fill();
    // head
    ctx.fillStyle = '#1A1A2E';
    ctx.beginPath(); ctx.arc(0, -14 * s, 12 * s, 0, Math.PI * 2); ctx.fill();
    // iridescent sheen
    ctx.fillStyle = 'rgba(60,80,200,0.2)';
    ctx.beginPath(); ctx.ellipse(-4 * s, -17 * s, 6 * s, 4 * s, -0.4, 0, Math.PI * 2); ctx.fill();
    // beak
    ctx.fillStyle = '#E8C21A';
    ctx.beginPath(); ctx.moveTo(10 * s, -14 * s); ctx.lineTo(20 * s, -12 * s); ctx.lineTo(10 * s, -10 * s); ctx.closePath(); ctx.fill();
    // eye
    ctx.fillStyle = '#FFF'; ctx.beginPath(); ctx.arc(6 * s, -16 * s, 4 * s, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(7 * s, -16 * s, 2.5 * s, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#FFF'; ctx.beginPath(); ctx.arc(8 * s, -17 * s, 1 * s, 0, Math.PI * 2); ctx.fill();
    // feet
    ctx.strokeStyle = '#E8781A'; ctx.lineWidth = 2 * s; ctx.lineCap = 'round';
    [-5, 5].forEach(ox => {
      ctx.beginPath();
      ctx.moveTo(ox * s, 18 * s); ctx.lineTo(ox * s, 24 * s);
      ctx.moveTo(ox * s, 24 * s); ctx.lineTo((ox - 5) * s, 28 * s);
      ctx.moveTo(ox * s, 24 * s); ctx.lineTo(ox * s, 29 * s);
      ctx.moveTo(ox * s, 24 * s); ctx.lineTo((ox + 5) * s, 28 * s);
      ctx.stroke();
    });
    ctx.restore();
  },

  // ══ MOLE ════════════════════════════════════
  drawMole(ctx, x, y, size, animTime = 0) {
    ctx.save(); ctx.translate(x, y);
    const s = size / 50;

    // dirt mound
    ctx.fillStyle = '#8B6914';
    ctx.beginPath(); ctx.ellipse(0, 20 * s, 22 * s, 10 * s, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#A0784A';
    ctx.beginPath(); ctx.ellipse(0, 18 * s, 18 * s, 8 * s, 0, 0, Math.PI * 2); ctx.fill();
    // body
    ctx.fillStyle = '#8B6F4E';
    ctx.beginPath(); ctx.ellipse(0, 4 * s, 17 * s, 22 * s, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#C4A882';
    ctx.beginPath(); ctx.ellipse(0, 6 * s, 9 * s, 14 * s, 0, 0, Math.PI * 2); ctx.fill();
    // claws
    [[-16, 8], [16, 8]].forEach(([ox, oy]) => {
      ctx.fillStyle = '#FFCDD2';
      ctx.beginPath(); ctx.ellipse(ox * s, oy * s, 7 * s, 5 * s, ox < 0 ? 0.3 : -0.3, 0, Math.PI * 2); ctx.fill();
      for (let i = -1; i <= 1; i++) {
        ctx.fillStyle = '#E0B0B0';
        ctx.beginPath(); ctx.ellipse((ox + i * 3) * s, (oy + 4) * s, 2 * s, 3 * s, 0, 0, Math.PI * 2); ctx.fill();
      }
    });
    // head
    ctx.fillStyle = '#8B6F4E';
    ctx.beginPath(); ctx.arc(0, -14 * s, 16 * s, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#FFB6C1';
    ctx.beginPath(); ctx.ellipse(0, -10 * s, 8 * s, 6 * s, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#FF8CA1';
    ctx.beginPath(); ctx.ellipse(-2 * s, -11 * s, 3 * s, 2 * s, 0, 0, Math.PI * 2); ctx.fill();
    // eyes with glasses
    ctx.strokeStyle = '#5A4030'; ctx.lineWidth = 2 * s;
    [-8, 8].forEach(ox => {
      ctx.beginPath(); ctx.arc(ox * s, -18 * s, 5 * s, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = '#2C1A0E'; ctx.beginPath(); ctx.arc(ox * s, -18 * s, 3 * s, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#FFF'; ctx.beginPath(); ctx.arc((ox + 1.5) * s, -19.5 * s, 1.2 * s, 0, Math.PI * 2); ctx.fill();
    });
    ctx.strokeStyle = '#5A4030'; ctx.lineWidth = 2 * s;
    ctx.beginPath(); ctx.moveTo(-3 * s, -18 * s); ctx.lineTo(3 * s, -18 * s); ctx.stroke();
    ctx.restore();
  },

  // ══ CRICKET SWARM ═══════════════════════════
  drawCricketSwarm(ctx, x, y, size, animTime = 0) {
    ctx.save(); ctx.translate(x, y);
    const s = size / 50;
    [[-16,-8],[0,-14],[16,-6],[-12,6],[8,10],[-4,14]].forEach(([ox, oy], i) => {
      const bob = Math.sin(animTime * 5 + i * 1.2) * 3;
      ctx.save(); ctx.translate(ox * s, (oy + bob) * s);
      _drawSingleCricket(ctx, s * 0.8);
      ctx.restore();
    });
    ctx.restore();
  },

  // ══ RABBIT ══════════════════════════════════
  drawRabbit(ctx, x, y, size, animTime = 0, isHopping = false) {
    ctx.save(); ctx.translate(x, y);
    const s = size / 55;
    const sq = isHopping ? 0.85 + Math.abs(Math.sin(animTime * 12)) * 0.2 : 1;
    ctx.scale(1 / sq, sq);

    ctx.save(); ctx.globalAlpha = 0.15; ctx.fillStyle = '#000';
    ctx.beginPath(); ctx.ellipse(0, 24 * s, 15 * s, 5 * s, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    // back legs
    ctx.fillStyle = '#D8D8D8';
    ctx.beginPath(); ctx.ellipse(-8 * s, 16 * s, 7 * s, 11 * s, -0.4, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(8 * s, 16 * s, 7 * s, 11 * s, 0.4, 0, Math.PI * 2); ctx.fill();
    // body
    ctx.fillStyle = '#E8E8E8';
    ctx.beginPath(); ctx.ellipse(0, 4 * s, 16 * s, 20 * s, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#F8F0F0';
    ctx.beginPath(); ctx.ellipse(0, 8 * s, 9 * s, 13 * s, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#FFF';
    ctx.beginPath(); ctx.arc(14 * s, 8 * s, 6 * s, 0, Math.PI * 2); ctx.fill();
    // front paws
    ctx.fillStyle = '#D8D8D8';
    ctx.beginPath(); ctx.ellipse(-9 * s, 14 * s, 5 * s, 7 * s, -0.2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(4 * s, 14 * s, 5 * s, 7 * s, 0.2, 0, Math.PI * 2); ctx.fill();
    // head
    ctx.fillStyle = '#E8E8E8';
    ctx.beginPath(); ctx.arc(-2 * s, -16 * s, 15 * s, 0, Math.PI * 2); ctx.fill();
    // ears
    [[-10,-36,-0.15],[ 6,-36, 0.15]].forEach(([ex, ey, a]) => {
      ctx.fillStyle = '#E8E8E8'; ctx.beginPath(); ctx.ellipse(ex*s,ey*s,6*s,18*s,a,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = '#F8BBD0'; ctx.beginPath(); ctx.ellipse(ex*s,ey*s,3*s,13*s,a,0,Math.PI*2); ctx.fill();
    });
    // eyes
    ctx.fillStyle = '#2C1A0E';
    ctx.beginPath(); ctx.arc(-8*s,-18*s,4*s,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(4*s,-18*s,4*s,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#FFF';
    ctx.beginPath(); ctx.arc(-7*s,-20*s,1.5*s,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(5*s,-20*s,1.5*s,0,Math.PI*2); ctx.fill();
    // nose
    ctx.fillStyle = '#FF9999';
    ctx.beginPath(); ctx.ellipse(-2*s,-12*s,4*s,3*s,0,0,Math.PI*2); ctx.fill();
    // teeth
    ctx.fillStyle='#FFF'; ctx.strokeStyle='#CCC'; ctx.lineWidth=0.5*s;
    ctx.beginPath(); ctx.rect(-6*s,-10*s,4*s,5*s); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.rect(-1*s,-10*s,4*s,5*s); ctx.fill(); ctx.stroke();
    ctx.restore();
  },

  // ══ CROP TILES ══════════════════════════════
  // FarmVille 3 style: round, chunky, cartoonish, bright
  // Each crop drawn as a tidy "potted plant" silhouette anchored at bottom center
  drawCrop(ctx, x, y, tileSize, cropType, stage, damaged = false) {
    const s = tileSize / 90;
    ctx.save();
    ctx.translate(x, y);
    switch (cropType) {
      case 'wheat':     _drawWheat(ctx, s, stage, damaged); break;
      case 'corn':      _drawCorn(ctx, s, stage, damaged); break;
      case 'carrot':    _drawCarrot(ctx, s, stage, damaged); break;
      case 'sunflower': _drawSunflower(ctx, s, stage, damaged); break;
    }
    ctx.restore();
  },

  // ══ FENCE POST ══════════════════════════════
  drawFencePost(ctx, x, y, h) {
    ctx.fillStyle = '#904832';
    _roundRect(ctx, x - 4, y, 8, h, 2); ctx.fill();
    ctx.fillStyle = '#7C433E';
    _roundRect(ctx, x - 6, y, 12, 8, 2); ctx.fill();
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.fillRect(x + 4, y + 8, 3, h - 8);
  },
};

// ─────────────────────────────────────────────
// PRIVATE HELPERS
// ─────────────────────────────────────────────

// Simple collie leg: upper segment + lower + white paw
function _dogLeg(ctx, s, x, y, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle * Math.PI / 180);
  ctx.fillStyle = '#A04010';
  ctx.beginPath(); ctx.ellipse(0, 5*s, 4.5*s, 9*s, 0, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#8B3208';
  ctx.beginPath(); ctx.ellipse(0, 13*s, 3.5*s, 7*s, 0, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#EDE8DF'; // white paw
  ctx.beginPath(); ctx.ellipse(0, 19*s, 5*s, 3*s, 0, 0, Math.PI*2); ctx.fill();
  ctx.restore();
}

function _drawSingleCricket(ctx, s) {
  ctx.fillStyle = '#4CAF50';
  ctx.beginPath(); ctx.ellipse(0,0,8*s,5*s,0.3,0,Math.PI*2); ctx.fill();
  ctx.fillStyle = '#388E3C';
  ctx.beginPath(); ctx.arc(-6*s,-1*s,4*s,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#FFF'; ctx.beginPath(); ctx.arc(-7*s,-2*s,1.5*s,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#000'; ctx.beginPath(); ctx.arc(-7*s,-2*s,0.8*s,0,Math.PI*2); ctx.fill();
  ctx.strokeStyle='#2E7D32'; ctx.lineWidth=0.8*s;
  ctx.beginPath(); ctx.moveTo(-8*s,-4*s); ctx.quadraticCurveTo(-14*s,-10*s,-10*s,-14*s); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-7*s,-4*s); ctx.quadraticCurveTo(-12*s,-8*s,-16*s,-10*s); ctx.stroke();
  [[-3,3,-8,6],[0,3,-2,7],[3,2,4,6],[-3,-2,-8,-6],[0,-2,-2,-7],[3,-1,4,-6]].forEach(([x1,y1,x2,y2])=>{
    ctx.beginPath(); ctx.moveTo(x1*s,y1*s); ctx.lineTo(x2*s,y2*s); ctx.stroke();
  });
}

// ══ CROP DRAWING — FarmVille 3 style ══════════
// Chunky, round, very readable. Each has 3 growth stages + damaged variant.
// Drawn bottom-anchored: plant sits on the tile soil.

function _stem(ctx, s, color, x, y1, y2, w = 3) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.rect((x - w/2) * s, y1 * s, w * s, (y2 - y1) * s);
  ctx.fill();
}

function _leaf(ctx, s, color, x, y, angle, lw = 14, lh = 5) {
  ctx.save();
  ctx.translate(x * s, y * s);
  ctx.rotate(angle * Math.PI / 180);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(0, 0, lw * s, lh * s, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function _drawWheat(ctx, s, stage, dmg) {
  // FV3 style: golden bundled wheat stalks, round grain heads
  const gc = dmg ? '#9B8B50' : '#5A9B18'; // stalk green
  const hc = dmg ? '#B8960A' : '#E7C11F'; // grain head gold
  const lc = dmg ? '#D0A820' : '#F6D233'; // lighter grain

  // cast shadow
  ctx.save(); ctx.globalAlpha = 0.1; ctx.fillStyle = '#000';
  ctx.beginPath(); ctx.ellipse(0, 2*s, 18*s, 4*s, 0, 0, Math.PI*2); ctx.fill();
  ctx.restore();

  if (stage === 0) {
    // Tiny sprout: 2 round green leaves, one stem
    _stem(ctx, s, gc, 0, -12, 2);
    _leaf(ctx, s, gc, -7, -6, 30, 12, 5);
    _leaf(ctx, s, gc,  7, -6, -30, 12, 5);
    ctx.fillStyle = gc;
    ctx.beginPath(); ctx.ellipse(0, -14*s, 5*s, 7*s, 0, 0, Math.PI*2); ctx.fill();
  } else if (stage === 1) {
    // 3 stalks with small forming heads
    for (let i = -1; i <= 1; i++) {
      _stem(ctx, s, gc, i*10, -22, 2, 3.5);
      _leaf(ctx, s, gc, i*10 - 9, -10, 25, 14, 5);
      _leaf(ctx, s, gc, i*10 + 9, -16, -25, 14, 5);
      ctx.fillStyle = hc;
      ctx.beginPath(); ctx.ellipse(i*10*s,-24*s,5*s,9*s,0,0,Math.PI*2); ctx.fill();
    }
  } else {
    // Full golden wheat bundle — 3 stalks, plump grain heads, seed detail
    for (let i = -1; i <= 1; i++) {
      _stem(ctx, s, gc, i*11, -20, 2, 3.5);
      _leaf(ctx, s, gc, i*11-10, -8, 30, 15, 5);
      _leaf(ctx, s, gc, i*11+10,-15, -30, 15, 5);
      // Grain head (round, plump)
      ctx.fillStyle = hc;
      ctx.beginPath(); ctx.ellipse(i*11*s,-28*s,6*s,13*s,0,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = lc;
      // Grain bumps
      for (let g = -2; g <= 2; g++) {
        ctx.beginPath(); ctx.ellipse((i*11+g*1.5)*s,(-28+g*4)*s,2.5*s,3.5*s,0,0,Math.PI*2); ctx.fill();
      }
    }
  }
}

function _drawCorn(ctx, s, stage, dmg) {
  const gc = dmg ? '#9B8B50' : '#4A9B14';
  const lc = dmg ? '#B8A060' : '#6DC424';
  const ec = dmg ? '#9B7000' : '#F6D233';
  const eh = dmg ? '#7A5500' : '#E8B800';

  ctx.save(); ctx.globalAlpha = 0.1; ctx.fillStyle = '#000';
  ctx.beginPath(); ctx.ellipse(0, 2*s, 14*s, 4*s, 0, 0, Math.PI*2); ctx.fill();
  ctx.restore();

  if (stage === 0) {
    _stem(ctx, s, lc, 0, -14, 2, 4);
    _leaf(ctx, s, lc, -10, -6, 25, 14, 5);
    _leaf(ctx, s, lc,  10, -6,-25, 14, 5);
  } else if (stage === 1) {
    _stem(ctx, s, gc, 0, -28, 2, 5);
    _leaf(ctx, s, lc, -14, -8, 30, 18, 6);
    _leaf(ctx, s, lc,  14,-15,-30, 18, 6);
    _leaf(ctx, s, lc, -10,-18, 20, 14, 5);
    // small forming ear
    ctx.fillStyle = lc;
    ctx.beginPath(); ctx.ellipse(12*s,-12*s,6*s,10*s,0.2,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = ec;
    ctx.beginPath(); ctx.ellipse(13*s,-12*s,4*s,7*s,0.2,0,Math.PI*2); ctx.fill();
  } else {
    _stem(ctx, s, gc, 0, -34, 2, 5);
    _leaf(ctx, s, lc, -16, -10, 35, 20, 7);
    _leaf(ctx, s, lc,  16, -18,-35, 20, 7);
    _leaf(ctx, s, lc, -12, -22, 20, 16, 6);
    _leaf(ctx, s, lc,  12, -26,-20, 16, 6);
    // husk
    ctx.fillStyle = lc;
    ctx.beginPath(); ctx.ellipse(14*s,-18*s,8*s,16*s,0.2,0,Math.PI*2); ctx.fill();
    // ear side (3D)
    ctx.fillStyle = gc;
    ctx.beginPath(); ctx.ellipse(20*s,-18*s,3*s,14*s,0.2,0,Math.PI*2); ctx.fill();
    // kernels
    ctx.fillStyle = ec;
    ctx.beginPath(); ctx.ellipse(14*s,-18*s,5.5*s,12*s,0.2,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle = eh; ctx.lineWidth = 1*s;
    for (let r = 0; r < 5; r++) {
      ctx.beginPath(); ctx.moveTo(9*s,(-28+r*5)*s); ctx.lineTo(19*s,(-29+r*5)*s); ctx.stroke();
    }
    // silks
    ctx.strokeStyle = dmg ? '#9B8B50' : '#F0D040'; ctx.lineWidth = 1*s;
    [10,13,16].forEach(sx => {
      ctx.beginPath(); ctx.moveTo(sx*s,-6*s); ctx.quadraticCurveTo((sx-4)*s,-14*s,(sx-6)*s,-24*s); ctx.stroke();
    });
  }
}

function _drawCarrot(ctx, s, stage, dmg) {
  const gc = dmg ? '#9B8B50' : '#4A9B14';
  const cc = dmg ? '#A06030' : '#FF7200';
  const cl = dmg ? '#C07040' : '#FFB040';

  ctx.save(); ctx.globalAlpha = 0.1; ctx.fillStyle = '#000';
  ctx.beginPath(); ctx.ellipse(0, 2*s, 12*s, 3*s, 0, 0, Math.PI*2); ctx.fill();
  ctx.restore();

  if (stage === 0) {
    // Just green tops
    _stem(ctx, s, gc, 0, -10, 2, 3);
    _leaf(ctx, s, gc, -6, -5, 35, 11, 4);
    _leaf(ctx, s, gc,  0, -8,  0, 8,  4);
    _leaf(ctx, s, gc,  6, -5,-35, 11, 4);
  } else if (stage === 1) {
    // Top showing, orange tip emerging
    for (const [ox, a] of [[-4, 20],[0, 0],[4, -20]]) {
      _stem(ctx, s, gc, ox, -12, 2, 3.5);
      _leaf(ctx, s, gc, ox-7, -6, 35+ox*2, 12, 4);
    }
    // Small orange bulge
    ctx.fillStyle = cc;
    ctx.beginPath(); ctx.ellipse(0, 8*s, 9*s, 7*s, 0, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = cl;
    ctx.beginPath(); ctx.ellipse(6*s, 8*s, 3*s, 6*s, 0.1, 0, Math.PI*2); ctx.fill();
  } else {
    // Full carrot: bushy top + bright tapered carrot body
    const tops = [[-6,20],[-2,0],[2,-10],[6,20]];
    tops.forEach(([ox,a]) => {
      _stem(ctx, s, gc, ox, -14, 0, 3);
      _leaf(ctx, s, gc, ox-8, -7, a, 13, 4.5);
    });
    // Carrot body — front face
    ctx.fillStyle = cc;
    ctx.beginPath();
    ctx.moveTo(-10*s, 2*s);
    ctx.quadraticCurveTo(-12*s, 26*s, 0, 36*s);
    ctx.quadraticCurveTo(12*s, 26*s, 10*s, 2*s);
    ctx.closePath(); ctx.fill();
    // Right highlight (3D)
    ctx.fillStyle = cl;
    ctx.beginPath();
    ctx.moveTo(10*s, 2*s);
    ctx.quadraticCurveTo(16*s, 20*s, 0, 36*s);
    ctx.quadraticCurveTo(13*s, 24*s, 13*s, 4*s);
    ctx.closePath(); ctx.fill();
    // Ribs
    ctx.strokeStyle = 'rgba(0,0,0,0.12)'; ctx.lineWidth = 1.5*s;
    for (let r = 1; r <= 3; r++) {
      ctx.beginPath();
      ctx.moveTo(-10*s + r*2*s, (2+r*8)*s);
      ctx.quadraticCurveTo(0, (4+r*8)*s, 10*s - r*2*s, (2+r*8)*s);
      ctx.stroke();
    }
    // Tip
    ctx.fillStyle = dmg ? '#803010' : '#CC4400';
    ctx.beginPath(); ctx.arc(0, 36*s, 3*s, 0, Math.PI*2); ctx.fill();
  }
}

function _drawSunflower(ctx, s, stage, dmg) {
  const gc = dmg ? '#9B8B50' : '#4A9B14';
  const lc = dmg ? '#B8A060' : '#6DC424';
  const pc = dmg ? '#A08030' : '#F6D233'; // petal yellow
  const ph = dmg ? '#C0A040' : '#FFE060'; // petal highlight
  const dc = dmg ? '#5A3010' : '#3E2000'; // disk dark
  const dl = dmg ? '#7A5030' : '#6B3800'; // disk seed color

  ctx.save(); ctx.globalAlpha = 0.1; ctx.fillStyle = '#000';
  ctx.beginPath(); ctx.ellipse(0, 2*s, 14*s, 4*s, 0, 0, Math.PI*2); ctx.fill();
  ctx.restore();

  if (stage === 0) {
    _stem(ctx, s, lc, 0, -12, 2, 4);
    _leaf(ctx, s, lc, -9, -6, 30, 12, 5);
    _leaf(ctx, s, lc,  9, -6,-30, 12, 5);
    // tiny bud
    ctx.fillStyle = lc;
    ctx.beginPath(); ctx.ellipse(0,-14*s,5*s,6*s,0,0,Math.PI*2); ctx.fill();
  } else if (stage === 1) {
    _stem(ctx, s, gc, 0, -26, 2, 5);
    _leaf(ctx, s, lc, -14, -10, 35, 18, 6);
    _leaf(ctx, s, lc,  14, -16,-35, 18, 6);
    // small flower bud with sepal
    ctx.fillStyle = lc;
    ctx.beginPath(); ctx.ellipse(0,-28*s,9*s,11*s,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = pc;
    ctx.beginPath(); ctx.ellipse(0,-28*s,6*s,7*s,0,0,Math.PI*2); ctx.fill();
    // proto-petals
    ctx.fillStyle = pc;
    for (let i = 0; i < 8; i++) {
      ctx.save(); ctx.translate(0,-28*s); ctx.rotate(i*Math.PI/4);
      ctx.beginPath(); ctx.ellipse(0,-12*s,3.5*s,7*s,0,0,Math.PI*2); ctx.fill();
      ctx.restore();
    }
    ctx.fillStyle = dc; ctx.beginPath(); ctx.arc(0,-28*s,7*s,0,Math.PI*2); ctx.fill();
  } else {
    _stem(ctx, s, gc, 0, -28, 2, 5);
    _leaf(ctx, s, lc, -16, -12, 38, 20, 7);
    _leaf(ctx, s, lc,  16, -20,-38, 20, 7);
    _leaf(ctx, s, lc, -12, -22, 22, 16, 6);
    // Full bloom — 12 petals (2 rings for fullness)
    for (let ring = 0; ring < 2; ring++) {
      const rr = 16 + ring * 3, pr = ring === 0 ? pc : ph;
      const cnt = ring === 0 ? 12 : 8;
      ctx.fillStyle = pr;
      for (let i = 0; i < cnt; i++) {
        ctx.save();
        ctx.translate(0, -30*s);
        ctx.rotate((i/cnt)*Math.PI*2 + ring*Math.PI/cnt);
        ctx.beginPath(); ctx.ellipse(0,-rr*s,5*s,11*s,0,0,Math.PI*2); ctx.fill();
        ctx.restore();
      }
    }
    // Center disk — dark
    ctx.fillStyle = dc;
    ctx.beginPath(); ctx.arc(0,-30*s,13*s,0,Math.PI*2); ctx.fill();
    // Seed spirals (simplified as circles)
    ctx.fillStyle = dl;
    for (let i = 0; i < 8; i++) {
      const a = (i/8)*Math.PI*2;
      ctx.beginPath(); ctx.arc(Math.cos(a)*6*s,-30*s+Math.sin(a)*6*s,2.5*s,0,Math.PI*2); ctx.fill();
    }
    ctx.fillStyle = dmg ? '#9B7040' : '#8B5E00';
    ctx.beginPath(); ctx.arc(0,-30*s,3.5*s,0,Math.PI*2); ctx.fill();
    // Center top highlight
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.beginPath(); ctx.ellipse(-3*s,-34*s,8*s,4*s,0,0,Math.PI*2); ctx.fill();
  }
}

function _roundRect(ctx, x, y, w, h, r) {
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

function _drawCollieleg(ctx, x, y, s, angle, topColor, botColor) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle * Math.PI / 180);
  // Upper leg — brown
  ctx.fillStyle = topColor;
  ctx.beginPath();
  ctx.ellipse(0, 5 * s, 5 * s, 10 * s, 0, 0, Math.PI * 2);
  ctx.fill();
  // Lower leg — slightly lighter
  ctx.fillStyle = botColor;
  ctx.beginPath();
  ctx.ellipse(0, 14 * s, 4 * s, 7 * s, 0, 0, Math.PI * 2);
  ctx.fill();
  // White paw
  ctx.fillStyle = '#F0EBE0';
  ctx.beginPath();
  ctx.ellipse(0, 19 * s, 5.5 * s, 3.5 * s, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function _drawSingleCricket(ctx, s) {
  ctx.fillStyle = '#4CAF50';
  ctx.beginPath();
  ctx.ellipse(0, 0, 8 * s, 5 * s, 0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#388E3C';
  ctx.beginPath();
  ctx.arc(-6 * s, -1 * s, 4 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#FFF';
  ctx.beginPath();
  ctx.arc(-7 * s, -2 * s, 1.5 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.arc(-7 * s, -2 * s, 0.8 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#2E7D32';
  ctx.lineWidth = 0.8 * s;
  ctx.beginPath();
  ctx.moveTo(-8 * s, -4 * s);
  ctx.quadraticCurveTo(-14 * s, -10 * s, -10 * s, -14 * s);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-7 * s, -4 * s);
  ctx.quadraticCurveTo(-12 * s, -8 * s, -16 * s, -10 * s);
  ctx.stroke();
  [[-3, 3, -8, 6], [0, 3, -2, 7], [3, 2, 4, 6],
   [-3, -2, -8, -6], [0, -2, -2, -7], [3, -1, 4, -6]].forEach(([x1, y1, x2, y2]) => {
    ctx.beginPath();
    ctx.moveTo(x1 * s, y1 * s);
    ctx.lineTo(x2 * s, y2 * s);
    ctx.stroke();
  });
}

// ── 3D ISOMETRIC CROP HELPERS ─────────────────
// Each crop is drawn with a slight forward-lean perspective:
// bottom anchor = ground level, plant leans slightly toward viewer.
// A cast shadow behind gives depth.

function _shadow3D(ctx, s, w = 12, offset = 8) {
  ctx.save();
  ctx.globalAlpha = 0.12;
  ctx.fillStyle = '#2A1800';
  ctx.beginPath();
  ctx.ellipse(offset * s * 0.3, 4 * s, w * s, 4 * s, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function _drawWheat(ctx, s, stage, damaged) {
  const gc = damaged ? '#A09040' : '#6DB320';
  const tc = damaged ? '#B8960A' : '#E7C11F';
  const tl = damaged ? '#D0A820' : '#F6D233';

  _shadow3D(ctx, s, 16, 6);

  if (stage === 0) {
    // Sprout: single stem with 2 leaves
    ctx.fillStyle = gc;
    ctx.beginPath();
    ctx.rect(-2 * s, -5 * s, 4 * s, 20 * s);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(-10 * s, 5 * s, 10 * s, 4 * s, 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(10 * s, 0 * s, 10 * s, 4 * s, -0.4, 0, Math.PI * 2);
    ctx.fill();
  } else if (stage === 1) {
    for (let i = -1; i <= 1; i++) {
      const tiltX = i * 0.08;
      ctx.save();
      ctx.transform(1, tiltX, 0, 1, 0, 0);
      ctx.fillStyle = gc;
      ctx.beginPath();
      ctx.rect((i * 10 - 2) * s, -15 * s, 4 * s, 35 * s);
      ctx.fill();
      ctx.fillStyle = gc;
      ctx.beginPath();
      ctx.ellipse((i * 10 - 10) * s, 2 * s, 12 * s, 4 * s, 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse((i * 10 + 10) * s, -4 * s, 12 * s, 4 * s, -0.3, 0, Math.PI * 2);
      ctx.fill();
      // Half-formed grain
      ctx.fillStyle = tc;
      ctx.beginPath();
      ctx.ellipse((i * 10) * s, -18 * s, 5 * s, 8 * s, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  } else {
    // Full golden wheat — 3 stalks with perspective lean
    for (let i = -1; i <= 1; i++) {
      ctx.save();
      ctx.transform(1, i * 0.06, 0, 1, 0, 0);
      // Stalk
      ctx.fillStyle = gc;
      ctx.beginPath();
      ctx.rect((i * 12 - 2) * s, -5 * s, 4 * s, 30 * s);
      ctx.fill();
      // Leaves (one each side)
      ctx.beginPath();
      ctx.ellipse((i * 12 - 12) * s, 8 * s, 13 * s, 4 * s, 0.25, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse((i * 12 + 12) * s, 2 * s, 13 * s, 4 * s, -0.25, 0, Math.PI * 2);
      ctx.fill();
      // Grain head — front face
      ctx.fillStyle = tc;
      ctx.beginPath();
      ctx.ellipse((i * 12) * s, -16 * s, 6 * s, 20 * s, 0, 0, Math.PI * 2);
      ctx.fill();
      // Grain head — side highlight (3D)
      ctx.fillStyle = tl;
      for (let j = -3; j <= 3; j++) {
        ctx.beginPath();
        ctx.ellipse((i * 12 + j * 1.5) * s, (-16 + j * 3.5) * s, 2.5 * s, 3.5 * s, 0.3, 0, Math.PI * 2);
        ctx.fill();
      }
      // Top shadow edge
      ctx.fillStyle = 'rgba(0,0,0,0.12)';
      ctx.beginPath();
      ctx.ellipse((i * 12 + 4) * s, -14 * s, 3 * s, 18 * s, 0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
}

function _drawCorn(ctx, s, stage, damaged) {
  const gc = damaged ? '#9B8B50' : '#5A9B18';
  const lc = damaged ? '#B8A060' : '#7DC424';
  const ec = damaged ? '#9B7000' : '#F6D233';

  _shadow3D(ctx, s, 14, 5);

  if (stage === 0) {
    ctx.fillStyle = lc;
    ctx.beginPath();
    ctx.rect(-2 * s, -2 * s, 4 * s, 25 * s);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(-10 * s, 10 * s, 12 * s, 5 * s, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(10 * s, 4 * s, 12 * s, 5 * s, 0.3, 0, Math.PI * 2);
    ctx.fill();
  } else if (stage === 1) {
    ctx.fillStyle = gc;
    ctx.beginPath();
    ctx.rect(-3 * s, -18 * s, 6 * s, 48 * s);
    ctx.fill();
    ctx.fillStyle = lc;
    ctx.beginPath();
    ctx.moveTo(0, 5 * s);
    ctx.quadraticCurveTo(-28 * s, -5 * s, -22 * s, 16 * s);
    ctx.quadraticCurveTo(-10 * s, 12 * s, 0, 5 * s);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(0, -5 * s);
    ctx.quadraticCurveTo(28 * s, -14 * s, 22 * s, 7 * s);
    ctx.quadraticCurveTo(10 * s, 3 * s, 0, -5 * s);
    ctx.fill();
    // Small ear forming
    ctx.fillStyle = lc;
    ctx.beginPath();
    ctx.ellipse(14 * s, 6 * s, 7 * s, 11 * s, 0.2, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.fillStyle = gc;
    ctx.beginPath();
    ctx.rect(-3 * s, -22 * s, 6 * s, 55 * s);
    ctx.fill();
    ctx.fillStyle = lc;
    ctx.beginPath();
    ctx.moveTo(0, 2 * s);
    ctx.quadraticCurveTo(-30 * s, -8 * s, -24 * s, 16 * s);
    ctx.quadraticCurveTo(-12 * s, 11 * s, 0, 2 * s);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(0, -8 * s);
    ctx.quadraticCurveTo(30 * s, -18 * s, 24 * s, 6 * s);
    ctx.quadraticCurveTo(12 * s, 0, 0, -8 * s);
    ctx.fill();
    // Corn ear — husk front face
    ctx.fillStyle = lc;
    ctx.beginPath();
    ctx.ellipse(13 * s, 8 * s, 9 * s, 15 * s, 0.15, 0, Math.PI * 2);
    ctx.fill();
    // Corn ear — side face (3D)
    ctx.fillStyle = gc;
    ctx.beginPath();
    ctx.ellipse(20 * s, 8 * s, 3 * s, 13 * s, 0.15, 0, Math.PI * 2);
    ctx.fill();
    // Kernels
    ctx.fillStyle = ec;
    ctx.beginPath();
    ctx.ellipse(13 * s, 9 * s, 6 * s, 12 * s, 0.15, 0, Math.PI * 2);
    ctx.fill();
    // Kernel rows
    ctx.strokeStyle = damaged ? '#7A5000' : '#D4A800';
    ctx.lineWidth = 1 * s;
    for (let r = 0; r < 4; r++) {
      ctx.beginPath();
      ctx.moveTo(9 * s, (-3 + r * 5) * s);
      ctx.lineTo(17 * s, (-4 + r * 5) * s);
      ctx.stroke();
    }
    // Silk
    ctx.strokeStyle = damaged ? '#9B8B50' : '#F0C040';
    ctx.lineWidth = 1 * s;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo((10 + i * 2) * s, -4 * s);
      ctx.quadraticCurveTo((7 + i * 3) * s, -14 * s, (5 + i * 2) * s, -22 * s);
      ctx.stroke();
    }
  }
}

function _drawCarrot(ctx, s, stage, damaged) {
  const gc = damaged ? '#9B8B50' : '#5A9B18';
  const cc = damaged ? '#A06030' : '#FF7B00';
  const cl = damaged ? '#C07040' : '#FF9830';

  _shadow3D(ctx, s, 12, 4);

  if (stage === 0) {
    ctx.fillStyle = gc;
    ctx.beginPath();
    ctx.rect(-2 * s, -2 * s, 4 * s, 22 * s);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(-7 * s, 8 * s, 8 * s, 3.5 * s, 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(7 * s, 4 * s, 8 * s, 3.5 * s, -0.4, 0, Math.PI * 2);
    ctx.fill();
  } else if (stage === 1) {
    ctx.fillStyle = gc;
    for (const [ox, ang] of [[-4, 0.2], [0, 0], [4, -0.2]]) {
      ctx.beginPath();
      ctx.ellipse(ox * s, 0, 4 * s, 16 * s, ang, 0, Math.PI * 2);
      ctx.fill();
    }
    // Orange top emerging — front face
    ctx.fillStyle = cc;
    ctx.beginPath();
    ctx.ellipse(0, 18 * s, 13 * s, 9 * s, 0, 0, Math.PI * 2);
    ctx.fill();
    // Side face (3D)
    ctx.fillStyle = cl;
    ctx.beginPath();
    ctx.ellipse(11 * s, 18 * s, 4 * s, 8 * s, 0.1, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.fillStyle = gc;
    for (const [ox, ang] of [[-6, 0.25], [0, 0], [6, -0.25]]) {
      ctx.beginPath();
      ctx.ellipse(ox * s, -8 * s, 4 * s, 20 * s, ang, 0, Math.PI * 2);
      ctx.fill();
    }
    // Carrot body — front face
    ctx.fillStyle = cc;
    ctx.beginPath();
    ctx.moveTo(-13 * s, 8 * s);
    ctx.quadraticCurveTo(-15 * s, 28 * s, 0, 40 * s);
    ctx.quadraticCurveTo(13 * s, 28 * s, 11 * s, 8 * s);
    ctx.closePath();
    ctx.fill();
    // Carrot body — right side face (3D depth)
    ctx.fillStyle = cl;
    ctx.beginPath();
    ctx.moveTo(11 * s, 8 * s);
    ctx.quadraticCurveTo(18 * s, 24 * s, 0, 40 * s);
    ctx.quadraticCurveTo(14 * s, 28 * s, 14 * s, 10 * s);
    ctx.closePath();
    ctx.fill();
    // Ribs
    ctx.strokeStyle = 'rgba(0,0,0,0.15)';
    ctx.lineWidth = 1.5 * s;
    for (let i = 1; i <= 3; i++) {
      ctx.beginPath();
      ctx.moveTo(-13 * s + i * 3 * s, (8 + i * 8) * s);
      ctx.quadraticCurveTo(0, (10 + i * 8) * s, 11 * s - i * 2 * s, (8 + i * 8) * s);
      ctx.stroke();
    }
    ctx.fillStyle = damaged ? '#803010' : '#CC4400';
    ctx.beginPath();
    ctx.arc(0, 40 * s, 3 * s, 0, Math.PI * 2);
    ctx.fill();
  }
}

function _drawSunflower(ctx, s, stage, damaged) {
  const gc = damaged ? '#9B8B50' : '#5A9B18';
  const lc = damaged ? '#B8A060' : '#7DC424';
  const pc = damaged ? '#A08030' : '#F6D233';
  const dc = damaged ? '#5A3010' : '#4A2800';

  _shadow3D(ctx, s, 14, 5);

  if (stage === 0) {
    ctx.fillStyle = lc;
    ctx.beginPath();
    ctx.rect(-2 * s, 0, 4 * s, 22 * s);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(-9 * s, 10 * s, 9 * s, 4 * s, -0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(9 * s, 5 * s, 9 * s, 4 * s, 0.4, 0, Math.PI * 2);
    ctx.fill();
  } else if (stage === 1) {
    ctx.fillStyle = gc;
    ctx.beginPath();
    ctx.rect(-3 * s, -8 * s, 6 * s, 38 * s);
    ctx.fill();
    ctx.fillStyle = lc;
    ctx.beginPath();
    ctx.ellipse(-14 * s, 8 * s, 14 * s, 5 * s, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(14 * s, 2 * s, 14 * s, 5 * s, 0.3, 0, Math.PI * 2);
    ctx.fill();
    // Bud
    ctx.fillStyle = lc;
    ctx.beginPath();
    ctx.arc(0, -16 * s, 10 * s, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = pc;
    ctx.beginPath();
    ctx.arc(0, -16 * s, 6 * s, 0, Math.PI * 2);
    ctx.fill();
    // Bud side (3D)
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    ctx.beginPath();
    ctx.ellipse(7 * s, -14 * s, 4 * s, 9 * s, 0.2, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.fillStyle = gc;
    ctx.beginPath();
    ctx.rect(-3 * s, -4 * s, 6 * s, 38 * s);
    ctx.fill();
    ctx.fillStyle = lc;
    ctx.beginPath();
    ctx.ellipse(-15 * s, 10 * s, 15 * s, 5 * s, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(15 * s, 4 * s, 15 * s, 5 * s, 0.3, 0, Math.PI * 2);
    ctx.fill();
    // Petals — front-facing (flat)
    ctx.fillStyle = pc;
    for (let i = 0; i < 12; i++) {
      ctx.save();
      ctx.translate(0, -20 * s);
      ctx.rotate((i / 12) * Math.PI * 2);
      ctx.beginPath();
      ctx.ellipse(0, -15 * s, 5 * s, 11 * s, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    // Center disk — front face
    ctx.fillStyle = dc;
    ctx.beginPath();
    ctx.arc(0, -20 * s, 13 * s, 0, Math.PI * 2);
    ctx.fill();
    // Center disk — top/side face (3D illusion)
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.beginPath();
    ctx.ellipse(-3 * s, -26 * s, 10 * s, 5 * s, 0, 0, Math.PI * 2);
    ctx.fill();
    // Seeds pattern
    ctx.fillStyle = damaged ? '#7A5030' : '#6B3800';
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(Math.cos(a) * 6 * s, -20 * s + Math.sin(a) * 6 * s, 2.5 * s, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = damaged ? '#9B7040' : '#8B5E00';
    ctx.beginPath();
    ctx.arc(0, -20 * s, 3 * s, 0, Math.PI * 2);
    ctx.fill();
  }
}

function _roundRect(ctx, x, y, w, h, r) {
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

// ─────────────────────────────────────────────
// CROP TILE ENTITY
// ─────────────────────────────────────────────

// ═══════════════════════════════════════════════
// CROP TILE
// ═══════════════════════════════════════════════
class CropTile {
  constructor(col, row, cropType, stage = 2) {
    this.col = col; this.row = row;
    this.cropType = cropType;
    this.stage    = stage;
    this.maxHp    = CONFIG.CROP_HP;
    this.hp       = this.maxHp;
    this.damaged  = false;
    this.dead     = false;
    // Shake
    this.shakeTime = 0; this.shakeX = 0;
    // Tap ripple
    this.rippleTime = 0; this.rippleR = 0;
    // Damage flash
    this.flashTime = 0;
    // Ambient sway (crops gently sway)
    this.swayOffset = Math.random() * Math.PI * 2;
    // Threat pulse (when pest is on this tile)
    this.threatened = false;
    this.threatPulse = 0;
  }

  takeDamage() {
    if (this.dead) return;
    this.hp      = Math.max(0, this.hp - 1);
    this.damaged = this.hp < this.maxHp;
    this.dead    = this.hp === 0;
    this.shakeTime = CONFIG.ANIM.CROP_SHAKE;
    this.flashTime = CONFIG.ANIM.DAMAGE_FLASH;
    if (this.stage > 0) this.stage = Math.max(0, this.stage - 1);
  }

  triggerRipple() {
    this.rippleTime = CONFIG.ANIM.TAP_RIPPLE;
  }

  update(dt) {
    if (this.shakeTime > 0) {
      this.shakeTime -= dt;
      this.shakeX = Math.sin(this.shakeTime * 45) * 6 * (this.shakeTime / CONFIG.ANIM.CROP_SHAKE);
      if (this.shakeTime <= 0) this.shakeX = 0;
    }
    if (this.rippleTime > 0) this.rippleTime -= dt;
    if (this.flashTime  > 0) this.flashTime  -= dt;
    if (this.threatened)     this.threatPulse += dt * 4;
  }

  draw(ctx, px, py, tileSize, globalTime) {
    ctx.save();
    const ts = tileSize;
    const x  = Math.round(px + this.shakeX);
    const y  = Math.round(py);

    // ── 3D tile geometry ──
    const topH = Math.max(8, Math.round(ts * 0.20));
    const skew = Math.max(4, Math.round(ts * 0.09));

    const hpFrac = this.hp / this.maxHp;

    // TOP FACE — catches light, lighter color
    let topColor, frontColor;
    if (this.dead) {
      topColor = '#BCA888'; frontColor = CONFIG.COLORS.tileDead;
    } else if (hpFrac > 0.66) {
      topColor = '#DEC070'; frontColor = CONFIG.COLORS.tileBase;
    } else if (hpFrac > 0.33) {
      topColor = '#C8A050'; frontColor = '#B08840';
    } else {
      topColor = '#B08840'; frontColor = '#906828';
    }

    // Top face
    ctx.fillStyle = topColor;
    ctx.beginPath();
    ctx.moveTo(x + skew, y);
    ctx.lineTo(x + ts + skew, y);
    ctx.lineTo(x + ts, y + topH);
    ctx.lineTo(x, y + topH);
    ctx.closePath();
    ctx.fill();

    // Top face highlight (light source top-left)
    ctx.fillStyle = 'rgba(255,255,255,0.22)';
    ctx.beginPath();
    ctx.moveTo(x + skew, y);
    ctx.lineTo(x + ts * 0.5 + skew, y);
    ctx.lineTo(x + ts * 0.5, y + topH);
    ctx.lineTo(x, y + topH);
    ctx.closePath();
    ctx.fill();

    // FRONT FACE
    ctx.fillStyle = frontColor;
    ctx.strokeStyle = CONFIG.COLORS.tileBorder;
    ctx.lineWidth = 1.5;
    _roundRect(ctx, x, y + topH, ts, ts - topH, CONFIG.TILE_RADIUS * 0.6);
    ctx.fill(); ctx.stroke();

    // Front face ambient occlusion (bottom darker)
    const aoG = ctx.createLinearGradient(0, y + topH, 0, y + ts);
    aoG.addColorStop(0, 'rgba(0,0,0,0)');
    aoG.addColorStop(1, 'rgba(0,0,0,0.12)');
    ctx.fillStyle = aoG;
    _roundRect(ctx, x, y + topH, ts, ts - topH, CONFIG.TILE_RADIUS * 0.6);
    ctx.fill();

    // Soil furrow lines
    ctx.strokeStyle = 'rgba(0,0,0,0.08)';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 3; i++) {
      const fy = y + topH + 10 + i * 15;
      if (fy > y + ts - 8) break;
      ctx.beginPath();
      ctx.moveTo(x + 8, fy);
      ctx.quadraticCurveTo(x + ts / 2, fy + 3, x + ts - 8, fy);
      ctx.stroke();
    }

    // RIGHT SIDE FACE — shadow side
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.beginPath();
    ctx.moveTo(x + ts,        y + topH);
    ctx.lineTo(x + ts + skew, y);
    ctx.lineTo(x + ts + skew, y + topH * 0.85);
    ctx.lineTo(x + ts,        y + topH * 2 - 2);
    ctx.closePath();
    ctx.fill();

    // DAMAGE FLASH — red overlay
    if (this.flashTime > 0) {
      const fa = (this.flashTime / CONFIG.ANIM.DAMAGE_FLASH) * 0.5;
      ctx.fillStyle = `rgba(220,30,0,${fa})`;
      _roundRect(ctx, x, y + topH, ts, ts - topH, CONFIG.TILE_RADIUS * 0.6);
      ctx.fill();
    }

    // THREAT PULSE — yellow glow when pest is on tile
    if (this.threatened) {
      const tp = 0.3 + Math.sin(this.threatPulse) * 0.25;
      ctx.strokeStyle = `rgba(255,200,0,${tp})`;
      ctx.lineWidth = 3;
      _roundRect(ctx, x - 2, y + topH - 2, ts + 4, ts - topH + 4, CONFIG.TILE_RADIUS * 0.7);
      ctx.stroke();
    }

    // CROP SPRITE — sway gently (ambient life)
    if (!this.dead) {
      const swayAngle = Math.sin(globalTime * 0.8 + this.swayOffset) * 0.025;
      const cropCX = x + ts / 2 + skew * 0.15;
      const cropCY = y + topH + (ts - topH) * 0.85;
      ctx.save();
      ctx.translate(cropCX, cropCY);
      ctx.rotate(swayAngle);
      ctx.translate(-cropCX, -cropCY);
      Sprites.drawCrop(ctx, cropCX, cropCY, ts, this.cropType, this.stage, this.damaged);
      ctx.restore();
    } else {
      // V5: improved dead tile — wilted crop silhouette
      const cx = x + ts / 2 + skew * 0.1;
      const cy = y + topH + (ts - topH) * 0.58;
      ctx.strokeStyle = '#8B6A3A'; ctx.lineWidth = 3; ctx.lineCap = 'round';
      // Drooping stem
      ctx.beginPath(); ctx.moveTo(cx, cy + 12); ctx.quadraticCurveTo(cx + 4, cy, cx, cy - 8); ctx.stroke();
      // Two wilted leaves
      ctx.strokeStyle = '#7A8A40'; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(cx, cy - 2); ctx.quadraticCurveTo(cx - 12, cy - 16, cx - 8, cy - 24); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, cy - 2); ctx.quadraticCurveTo(cx + 12, cy - 14, cx + 10, cy - 22); ctx.stroke();
      // X
      ctx.strokeStyle = 'rgba(200,30,0,0.65)'; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(cx - 7, cy + 6); ctx.lineTo(cx + 7, cy + 18); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx + 7, cy + 6); ctx.lineTo(cx - 7, cy + 18); ctx.stroke();
    }

    // HP DOTS
    const dotR = Math.max(3.5, Math.round(tileSize * 0.052));
    const dotGap = dotR * 2.8;
    const dotsW  = (this.maxHp - 1) * dotGap;
    const dotX0  = x + ts / 2 - dotsW / 2;
    const dotY   = y + ts - dotR - 3;
    for (let i = 0; i < this.maxHp; i++) {
      const filled = i < this.hp;
      ctx.fillStyle = !filled ? 'rgba(0,0,0,0.2)'
        : this.hp === this.maxHp ? CONFIG.COLORS.hpGreen
        : this.hp === 2          ? CONFIG.COLORS.hpYellow
        : CONFIG.COLORS.hpRed;
      ctx.beginPath(); ctx.arc(dotX0 + i * dotGap, dotY, dotR, 0, Math.PI * 2); ctx.fill();
      // Dot gloss
      if (filled) {
        ctx.fillStyle = 'rgba(255,255,255,0.35)';
        ctx.beginPath(); ctx.arc(dotX0 + i * dotGap - dotR * 0.3, dotY - dotR * 0.3, dotR * 0.4, 0, Math.PI * 2); ctx.fill();
      }
    }

    // TAP RIPPLE
    if (this.rippleTime > 0) {
      const rp   = 1 - this.rippleTime / CONFIG.ANIM.TAP_RIPPLE;
      const rr   = ts * 0.25 + rp * ts * 0.5;
      const ra   = (1 - rp) * 0.65;
      ctx.strokeStyle = `rgba(255,255,255,${ra})`;
      ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(x + ts / 2, y + topH + (ts - topH) / 2, rr, 0, Math.PI * 2); ctx.stroke();
    }

    ctx.restore();
  }
}

// ═══════════════════════════════════════════════
// DOG ENTITY
// ═══════════════════════════════════════════════
class Dog {
  constructor(x, y) {
    this.x = x; this.y = y;
    this.targetX = x; this.targetY = y;
    this.state    = 'idle';
    this.animTime = 0;
    this.barkTime = 0;
    this.barkBubbleAlpha = 0;
    this.size     = 70;
    this.dustParticles = [];
    this.centerX  = x; this.centerY = y;
    this.onArrival = null;
    this.moveQueue = [];
    // C1 fix: properly initialised
    this.lastArrivalTime = null;
    // Anticipation squat before sprint
    this._anticipateTime = 0;
    this._anticipateTarget = null;
    this._anticipateCallback = null;
    // Trail — direction of travel for flip
    this.facingRight = true;
    // Idle bob phase
    this._idlePhase = Math.random() * Math.PI * 2;
  }

  moveTo(tx, ty, onArrival) {
    this.moveQueue = [{ tx, ty, onArrival }];
    // A3: brief anticipation squat before sprinting
    this._anticipateTime     = CONFIG.ANIM.DOG_ANTICIPATE;
    this._anticipateTarget   = { tx, ty, onArrival };
    this._anticipateCallback = null;
    this.state = 'anticipate';
  }

  _startNextMove() {
    if (this.moveQueue.length === 0) return;
    const next     = this.moveQueue.shift();
    this.targetX   = next.tx;
    this.targetY   = next.ty;
    this.onArrival = next.onArrival;
    this.state     = 'running';
    // Set facing direction
    this.facingRight = next.tx >= this.x;
  }

  bark() {
    this.barkTime        = CONFIG.DOG_BARK_DURATION;
    this.barkBubbleAlpha = 1;
    this.state = 'barking';
  }

  update(dt) {
    this.animTime += dt;

    if (this.state === 'anticipate') {
      this._anticipateTime -= dt;
      if (this._anticipateTime <= 0) this._startNextMove();
      return;
    }

    if (this.state === 'running') {
      const dx   = this.targetX - this.x;
      const dy   = this.targetY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const speed = CONFIG.DOG_SPEED_PX;
      this.facingRight = dx >= 0;

      if (dist < speed * dt + 2) {
        this.x = this.targetX; this.y = this.targetY;
        if (this.onArrival) { const cb = this.onArrival; this.onArrival = null; cb(); }
        this.bark();
        // Dust burst on arrival
        for (let i = 0; i < 8; i++) {
          this.dustParticles.push({
            x: this.x + (Math.random() - 0.5) * 24,
            y: this.y + 20,
            vx: (Math.random() - 0.5) * 80,
            vy: -Math.random() * 50 - 15,
            life: 0.6, maxLife: 0.6, r: Math.random() * 6 + 2,
            color: Math.random() > 0.5 ? '#D4A84A' : '#A07830',
          });
        }
        if (this.moveQueue.length > 0) this._startNextMove();
      } else {
        this.x += (dx / dist) * speed * dt;
        this.y += (dy / dist) * speed * dt;
        // Running dust trail
        if (Math.random() < 0.3) {
          this.dustParticles.push({
            x: this.x + (Math.random() - 0.5) * 12,
            y: this.y + 22,
            vx: (Math.random() - 0.5) * 22,
            vy: -Math.random() * 14 - 4,
            life: 0.28, maxLife: 0.28, r: Math.random() * 3.5 + 1.5,
            color: '#D4A84A',
          });
        }
      }
    } else if (this.state === 'barking') {
      if (this.barkTime <= 0) this.state = 'idle';
    } else if (this.state === 'idle') {
      const dx   = this.centerX - this.x;
      const dy   = this.centerY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 5) {
        this.x += (dx / dist) * 55 * dt;
        this.y += (dy / dist) * 55 * dt;
      }
    }

    if (this.barkTime > 0) { this.barkTime -= dt; if (this.barkTime < 0) this.barkTime = 0; }
    if (this.barkTime <= 0 && this.barkBubbleAlpha > 0) {
      this.barkBubbleAlpha = Math.max(0, this.barkBubbleAlpha - dt * 4);
    }

    this.dustParticles = this.dustParticles.filter(p => {
      p.life -= dt;
      p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 90 * dt;
      return p.life > 0;
    });
  }

  draw(ctx) {
    ctx.save();

    // Dust particles
    this.dustParticles.forEach(p => {
      ctx.globalAlpha = (p.life / p.maxLife) * 0.6;
      ctx.fillStyle   = p.color;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
    });
    ctx.globalAlpha = 1;

    // Direction flip
    if (!this.facingRight) {
      ctx.save();
      ctx.translate(this.x * 2, 0);
      ctx.scale(-1, 1);
    }

    // A3: squash when anticipating
    let scaleX = 1, scaleY = 1;
    if (this.state === 'anticipate') {
      const t = 1 - this.anticipateTime / CONFIG.ANIM.DOG_ANTICIPATE;
      scaleX = 1 + Math.sin(t * Math.PI) * 0.12;
      scaleY = 1 - Math.sin(t * Math.PI) * 0.1;
    }

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(scaleX, scaleY);
    ctx.translate(-this.x, -this.y);
    Sprites.drawDog(ctx, this.x, this.y, this.size, this.state, this.animTime);
    ctx.restore();

    if (!this.facingRight) ctx.restore();

    // Bark bubble — relative to dog size (V7)
    if (this.barkBubbleAlpha > 0) {
      ctx.globalAlpha = this.barkBubbleAlpha;
      const bubOff = this.size * 0.9;
      const bx = this.x - this.size * 0.15;
      const by = this.y - bubOff;
      // Bubble background
      ctx.fillStyle   = '#FFFDF0';
      ctx.strokeStyle = '#D0C080';
      ctx.lineWidth   = 2;
      _roundRect(ctx, bx - 38, by - 24, 90, 34, 14);
      ctx.fill(); ctx.stroke();
      // Bubble gloss
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      _roundRect(ctx, bx - 34, by - 20, 82, 14, 10);
      ctx.fill();
      // Bubble tail
      ctx.fillStyle = '#FFFDF0';
      ctx.beginPath(); ctx.moveTo(bx - 2, by + 10); ctx.lineTo(bx - 14, by + 26); ctx.lineTo(bx + 10, by + 10); ctx.fill();
      // Text
      ctx.fillStyle   = '#3A3010';
      ctx.font        = `bold 15px 'Fredoka One', cursive`;
      ctx.textAlign   = 'center';
      ctx.fillText('WOOF! 🐾', bx + 7, by - 2);
      ctx.globalAlpha = 1;
    }

    // G7: direction indicator arrow when running
    if (this.state === 'running') {
      const dx = this.targetX - this.x;
      const dy = this.targetY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 30) {
        const steps = Math.min(3, Math.floor(dist / 40));
        for (let s = 0; s < steps; s++) {
          const t = (s + 0.5) / steps;
          const ax = this.x + dx * t;
          const ay = this.y + dy * t;
          const alpha = (1 - t) * 0.5;
          const r = 5 - s;
          ctx.globalAlpha = alpha;
          ctx.fillStyle   = '#F6D233';
          ctx.beginPath(); ctx.arc(ax, ay, r, 0, Math.PI * 2); ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
    }

    ctx.restore();
  }
}

// ═══════════════════════════════════════════════
// PEST ENTITY
// ═══════════════════════════════════════════════
class Pest {
  constructor(type, tileIndex, tileX, tileY, tileSize) {
    this.type      = type;
    this.tileIndex = tileIndex;
    this.x = tileX + tileSize / 2;
    this.y = tileY + tileSize / 2;
    this.tileSize  = tileSize;
    this.timer     = CONFIG.PEST_TIMERS[type];
    this.maxTimer  = this.timer;
    this.alive     = true;
    this.fleeing   = false;
    this.fleeTime  = 0;
    this.fleeMaxTime = CONFIG.ANIM.PEST_FLEE;
    // Elastic spawn
    this.spawnTime    = 0;
    this.spawnMaxTime = CONFIG.ANIM.PEST_SPAWN;
    this.animTime  = 0;
    this.scale     = 0;
    this.size      = 52;

    // Rabbit
    this.isHopping = false;
    this.settled   = false;
    this.hopPath   = [tileIndex];
    this.hopPathIdx = 0;
    this.hopTimer  = 0;

    // Crow
    this.flyInY  = type === 'crow' ? tileY - 130 : tileY + tileSize / 2;
    this.startY  = tileY + tileSize / 2;
    if (type === 'crow') this.y = this.flyInY;

    this.secondaryTileIndex = null;

    // Flee vectors
    this.fleeVx = (Math.random() - 0.5) * 220;
    this.fleeVy = type === 'crow' ? -(280 + Math.random() * 80) : (Math.random() - 0.5) * 220;
    if (type === 'mole') { this.fleeVy = 180 + Math.random() * 80; this.fleeVx = 0; }
    if (type === 'rabbit') { this.fleeVx = (Math.random() > 0.5 ? 1 : -1) * (180 + Math.random() * 60); this.fleeVy = -60; }

    this.particles = [];

    // Warning state (near expiry)
    this._wasWarning = false;
  }

  startFlee() {
    this.fleeing  = true;
    this.fleeTime = this.fleeMaxTime;
    this.alive    = false;
    // Flee particles
    const colors = { crow: '#1A1A2E', mole: '#C4A35A', cricket: '#4CAF50', rabbit: '#E8E8E8' };
    for (let i = 0; i < 6; i++) {
      this.particles.push({
        x: this.x, y: this.y,
        vx: (Math.random() - 0.5) * 150,
        vy: (Math.random() - 0.5) * 150 - 60,
        life: 0.65, maxLife: 0.65,
        color: colors[this.type], r: Math.random() * 5 + 2,
      });
    }
  }

  update(dt) {
    this.animTime += dt;

    // A1: elastic overshoot spawn scale
    if (this.spawnTime < this.spawnMaxTime) {
      this.spawnTime += dt;
      const t = this.spawnTime / this.spawnMaxTime;
      // Overshoot spring: overshoots to 1.3, bounces to 1.0
      if (t < 0.6)      this.scale = (t / 0.6) * 1.35;
      else if (t < 0.8) this.scale = 1.35 - ((t - 0.6) / 0.2) * 0.4;
      else              this.scale = 0.95 + ((t - 0.8) / 0.2) * 0.05;
    } else {
      this.scale = 1;
    }

    // Crow fly-in
    if (this.type === 'crow' && this.spawnTime < this.spawnMaxTime) {
      const t = Math.min(1, this.spawnTime / this.spawnMaxTime);
      this.y = this.flyInY + (this.startY - this.flyInY) * _easeOutBounce(t);
    }

    // Timer countdown (only when settled / not rabbit hopping)
    if (this.alive && this.scale >= 0.95 && (this.type !== 'rabbit' || this.settled)) {
      this.timer -= dt;
    }

    // Flee movement
    if (this.fleeing) {
      this.fleeTime -= dt;
      this.x += this.fleeVx * dt;
      this.y += this.fleeVy * dt;
      if (this.type === 'crow') this.fleeVy -= 60 * dt; // accelerate upward
    }

    // Particles
    this.particles = this.particles.filter(p => {
      p.life -= dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 90 * dt;
      return p.life > 0;
    });
  }

  get isDone()    { return this.fleeing && this.fleeTime <= 0 && this.particles.length === 0; }
  get timerFrac() { return Math.max(0, this.timer / this.maxTimer); }

  draw(ctx) {
    ctx.save();

    // Flee particles
    this.particles.forEach(p => {
      ctx.globalAlpha = (p.life / p.maxLife);
      ctx.fillStyle   = p.color;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
    });
    ctx.globalAlpha = 1;

    if (!this.alive && !this.fleeing) { ctx.restore(); return; }

    // Shadow under pest
    if (!this.fleeing) {
      ctx.save();
      ctx.globalAlpha = 0.18;
      ctx.fillStyle   = '#000';
      ctx.beginPath();
      ctx.ellipse(this.x, this.y + this.size * 0.5, this.size * 0.35 * this.scale, this.size * 0.1 * this.scale, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    ctx.translate(this.x, this.y);
    ctx.scale(this.scale, this.scale);

    switch (this.type) {
      case 'crow':    Sprites.drawCrow(ctx, 0, 0, this.size, this.animTime); break;
      case 'mole':    Sprites.drawMole(ctx, 0, 0, this.size, this.animTime); break;
      case 'cricket': Sprites.drawCricketSwarm(ctx, 0, 0, this.size, this.animTime); break;
      case 'rabbit':  Sprites.drawRabbit(ctx, 0, 0, this.size, this.animTime, this.isHopping); break;
    }

    // V4 fix + G4 fix: timer ring drawn ABOVE sprite, larger, readable
    if (this.alive && this.scale > 0.6 && (this.type !== 'rabbit' || this.settled)) {
      const ringY  = -this.size * 0.68;
      const r      = 16;
      const frac   = this.timerFrac;
      const isUrgent = frac < 0.35;

      // Ring background
      ctx.fillStyle = isUrgent ? 'rgba(200,0,0,0.85)' : 'rgba(0,0,0,0.45)';
      ctx.beginPath(); ctx.arc(0, ringY, r + 3, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#FFF';
      ctx.beginPath(); ctx.arc(0, ringY, r, 0, Math.PI * 2); ctx.fill();

      // Timer arc
      const arcColor = frac > 0.5 ? '#5CB85C' : frac > 0.25 ? '#F0AD4E' : '#E03030';
      ctx.strokeStyle = arcColor;
      ctx.lineWidth   = 5;
      ctx.lineCap     = 'round';
      ctx.beginPath();
      ctx.arc(0, ringY, r - 2.5, -Math.PI / 2, -Math.PI / 2 + frac * Math.PI * 2);
      ctx.stroke();

      // Seconds text — G4 fix: bigger, readable
      ctx.fillStyle   = isUrgent ? '#E03030' : '#3A3010';
      ctx.font        = `bold 13px 'Fredoka One', cursive`;
      ctx.textAlign   = 'center';
      ctx.fillText(Math.ceil(Math.max(0, this.timer)), 0, ringY + 4.5);

      // Urgent pulse ring
      if (isUrgent && this.animTime % 0.5 < 0.25) {
        ctx.strokeStyle = 'rgba(220,30,0,0.4)';
        ctx.lineWidth   = 2;
        ctx.beginPath();
        ctx.arc(0, ringY, r + 5 + Math.sin(this.animTime * 8) * 3, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    ctx.restore();
  }
}

// ═══════════════════════════════════════════════
// SCORE POPUP
// ═══════════════════════════════════════════════
class ScorePopup {
  constructor(x, y, text, color = '#F6D233') {
    this.x = x; this.y = y; this.text = text; this.color = color;
    this.life = CONFIG.ANIM.SCORE_POPUP;
    this.maxLife = this.life;
  }
  update(dt) { this.life -= dt; }
  get isDone() { return this.life <= 0; }
  draw(ctx) {
    const t = this.life / this.maxLife;
    ctx.save();
    ctx.globalAlpha = Math.min(1, t * 2); // quick fade in, slow fade out
    // A2 fix: proper easing — pops in small, grows to full, then fades
    const sc = t > 0.7 ? 0.6 + (1 - t) / 0.3 * 0.6 : 1.2 - (0.7 - t) / 0.7 * 0.2;
    ctx.translate(this.x, this.y - (1 - t) * 50);
    ctx.scale(sc, sc);
    ctx.font        = `bold 24px 'Fredoka One', cursive`;
    ctx.textAlign   = 'center';
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    ctx.lineWidth   = 5;
    ctx.strokeText(this.text, 0, 0);
    ctx.fillStyle   = this.color;
    ctx.fillText(this.text, 0, 0);
    ctx.restore();
  }
}

// ── HELPERS ──────────────────────────────────────
function _roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function _easeOutBounce(t) {
  if (t < 1/2.75) return 7.5625 * t * t;
  if (t < 2/2.75) { t -= 1.5/2.75;   return 7.5625 * t * t + 0.75; }
  if (t < 2.5/2.75) { t -= 2.25/2.75; return 7.5625 * t * t + 0.9375; }
  t -= 2.625/2.75; return 7.5625 * t * t + 0.984375;
}
