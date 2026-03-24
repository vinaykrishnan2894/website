// audio.js — Web Audio API sound + background music manager
// Music: procedural looping track, 4 intensity tiers matching game phases
// SFX: bark, miss, combo, countdown, victory, gameover

class AudioManager {
  constructor() {
    this.ctx          = null;
    this.enabled      = CONFIG.SOUND_ENABLED;
    this._initialized = false;

    // Music state
    this._musicNodes  = [];   // active oscillators/buffers for cleanup
    this._musicGain   = null; // master music gain
    this._beatTimer   = null; // setTimeout handle
    this._musicTick   = 0;    // beat counter
    this._intensity   = 0;    // 0–3 matching phases
    this._musicPlaying = false;
    this._lastIntensity = -1;
  }

  // Must be called on first user gesture
  init() {
    if (this._initialized) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this._initialized = true;
    } catch (e) {
      this.enabled = false;
    }
  }

  // ── MASTER GAIN ─────────────────────────────────
  _masterGain(vol = 0.4, fadeIn = 0) {
    const g = this.ctx.createGain();
    if (fadeIn > 0) {
      g.gain.setValueAtTime(0, this.ctx.currentTime);
      g.gain.linearRampToValueAtTime(vol, this.ctx.currentTime + fadeIn);
    } else {
      g.gain.value = vol;
    }
    g.connect(this.ctx.destination);
    return g;
  }

  _autoRelease(gainNode, delay = 2.0) {
    setTimeout(() => { try { gainNode.disconnect(); } catch(e) {} }, (delay + 0.2) * 1000);
  }

  // ── MUSIC SYSTEM ────────────────────────────────
  // Four intensity levels, each adds more layers
  // Level 0 — gentle acoustic feel (phase 1: 0–30s)
  // Level 1 — bass joins, slightly faster (phase 2: 30–60s)
  // Level 2 — full rhythm, chord pad (phase 3: 60–90s)
  // Level 3 — urgent, dissonant undertone (phase 4: 90–120s)

  startMusic() {
    if (!this.enabled || !this.ctx || this._musicPlaying) return;
    this._musicPlaying = true;
    this._musicTick    = 0;
    this._intensity    = 0;

    // Create master music bus
    this._musicGain = this.ctx.createGain();
    this._musicGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this._musicGain.gain.linearRampToValueAtTime(0.55, this.ctx.currentTime + 1.5);
    this._musicGain.connect(this.ctx.destination);

    this._scheduleBeat();
  }

  stopMusic(fadeOut = 1.2) {
    if (!this._musicPlaying) return;
    this._musicPlaying = false;
    if (this._beatTimer) { clearTimeout(this._beatTimer); this._beatTimer = null; }
    if (this._musicGain) {
      const g = this._musicGain;
      g.gain.setValueAtTime(g.gain.value, this.ctx.currentTime);
      g.gain.linearRampToValueAtTime(0, this.ctx.currentTime + fadeOut);
      setTimeout(() => { try { g.disconnect(); } catch(e) {} }, (fadeOut + 0.3) * 1000);
      this._musicGain = null;
    }
    // Stop all active music nodes
    this._musicNodes.forEach(n => { try { n.stop(); n.disconnect(); } catch(e) {} });
    this._musicNodes = [];
  }

  // Called by game when phase changes (0–3)
  setMusicIntensity(level) {
    if (level === this._intensity) return;
    this._intensity = Math.max(0, Math.min(3, level));
    // Cross-fade the master gain slightly to mark the transition
    if (this._musicGain) {
      const t = this.ctx.currentTime;
      this._musicGain.gain.setValueAtTime(this._musicGain.gain.value, t);
      this._musicGain.gain.linearRampToValueAtTime(0.38, t + 0.3);
      this._musicGain.gain.linearRampToValueAtTime(0.58 + this._intensity * 0.06, t + 1.0);
    }
  }

  // ── BEAT SCHEDULER ──────────────────────────────
  // BPM ramps: 88 → 96 → 108 → 124
  _bpm() {
    return [88, 96, 108, 124][this._intensity];
  }

  _beatInterval() {
    return (60 / this._bpm()) * 1000; // ms
  }

  _scheduleBeat() {
    if (!this._musicPlaying) return;
    const t = this.ctx.currentTime;
    this._playBeat(t);
    this._beatTimer = setTimeout(() => this._scheduleBeat(), this._beatInterval() * 0.97);
  }

  _playBeat(t) {
    if (!this._musicGain) return;
    const i    = this._intensity;
    const beat = this._musicTick % 16; // 16-step pattern
    const bar  = Math.floor(this._musicTick / 16) % 4;
    this._musicTick++;

    const conn = (node) => { node.connect(this._musicGain); this._musicNodes.push(node); };

    // ── MELODY ──────────────────────────────────────
    // C major pentatonic: C4 E4 G4 A4 C5 E5 G5
    const PENT = [261.63, 329.63, 392.00, 440.00, 523.25, 659.25, 783.99];
    // Simple upbeat melody pattern (step index into PENT)
    const melPat = [
      [0,0,2,0, 1,0,2,0, 3,0,2,0, 1,0,4,0], // bar 0
      [2,0,3,0, 4,0,3,0, 2,0,1,0, 0,0,2,0], // bar 1
      [4,0,4,0, 3,0,2,0, 3,0,4,0, 5,0,4,0], // bar 2 — higher feel
      [4,0,3,0, 2,0,1,0, 0,0,1,0, 2,0,0,0], // bar 3 — resolve
    ];
    const melStep = melPat[bar][beat];
    if (melStep !== 0 && beat % 2 === 0) {
      const freq = PENT[Math.min(melStep, PENT.length - 1)];
      this._playTone(t, freq, i >= 2 ? 'triangle' : 'sine', 0.18, 0.08, 0.28, conn);
    }

    // ── COUNTER-MELODY (intensity ≥1) ───────────────
    if (i >= 1 && beat % 4 === 2) {
      const cFreq = PENT[(beat / 4 + 2) % PENT.length] * 0.5; // lower octave
      this._playTone(t, cFreq, 'sine', 0.12, 0.06, 0.4, conn);
    }

    // ── BASS (intensity ≥1) ─────────────────────────
    // Root C2 / G2 pattern
    if (i >= 1) {
      const bassNotes = [65.41, 65.41, 98.00, 65.41, 65.41, 87.31, 65.41, 98.00,
                         65.41, 65.41, 98.00, 73.42, 65.41, 73.42, 87.31, 65.41];
      if (beat % 2 === 0) {
        const bFreq = bassNotes[beat];
        this._playTone(t, bFreq, 'sawtooth', 0.22, 0.02, 0.35, conn);
      }
    }

    // ── CHORD PAD (intensity ≥2) ────────────────────
    if (i >= 2 && beat % 8 === 0) {
      const chords = [
        [261.63, 329.63, 392.00], // C major
        [196.00, 246.94, 293.66], // G major
        [220.00, 261.63, 329.63], // A minor
        [174.61, 220.00, 261.63], // F major
      ];
      const chord = chords[bar];
      chord.forEach((freq, ci) => {
        const osc = this.ctx.createOscillator();
        const env = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        env.gain.setValueAtTime(0, t);
        env.gain.linearRampToValueAtTime(0.08, t + 0.12);
        env.gain.setValueAtTime(0.08, t + 0.55);
        env.gain.linearRampToValueAtTime(0, t + 0.9);
        osc.connect(env); env.connect(this._musicGain);
        this._musicNodes.push(osc);
        osc.start(t); osc.stop(t + 1.0);
        setTimeout(() => { try { env.disconnect(); } catch(e) {} }, 1200);
      });
    }

    // ── PERCUSSION ──────────────────────────────────
    // Kick on 1 & 9 (every half bar)
    if (beat === 0 || beat === 8) {
      this._playKick(t, i, conn);
    }
    // Hi-hat: every 2 steps from intensity 1
    if (i >= 1 && beat % 2 === 0) {
      this._playHihat(t, 0.06 + i * 0.015, conn);
    }
    // Open hi-hat on beat 5 & 13 from intensity 2
    if (i >= 2 && (beat === 4 || beat === 12)) {
      this._playHihat(t, 0.09, conn, true);
    }
    // Snare on 5 & 13 from intensity 1
    if (i >= 1 && (beat === 4 || beat === 12)) {
      this._playSnare(t, i, conn);
    }

    // ── URGENCY LAYER (intensity 3) ─────────────────
    // Dissonant stinger on offbeats + tremolo bass
    if (i >= 3 && beat % 4 === 2) {
      const urgFreq = 116.54; // Bb2 — tense
      this._playTone(t, urgFreq, 'sawtooth', 0.10, 0.02, 0.18, conn);
    }
    if (i >= 3 && beat % 8 === 1) {
      // Extra snare ghost
      this._playSnare(t, 1, conn);
    }

    // Prune dead nodes periodically
    if (this._musicTick % 32 === 0) {
      this._musicNodes = this._musicNodes.filter(n => {
        try { return n.context && n.context.state !== 'closed'; } catch(e) { return false; }
      });
    }
  }

  // ── PERCUSSION HELPERS ──────────────────────────
  _playKick(t, intensity, conn) {
    const buf  = this.ctx.createBuffer(1, Math.ceil(this.ctx.sampleRate * 0.25), this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      const env = Math.exp(-i / (this.ctx.sampleRate * 0.08));
      data[i] = Math.sin(2 * Math.PI * (60 - 55 * (i / data.length)) * i / this.ctx.sampleRate) * env;
    }
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    const g = this.ctx.createGain();
    g.gain.value = 0.5 + intensity * 0.08;
    src.connect(g); conn(g);
    src.start(t); src.stop(t + 0.26);
    setTimeout(() => { try { g.disconnect(); } catch(e) {} }, 400);
  }

  _playSnare(t, intensity, conn) {
    const dur  = 0.18;
    const buf  = this.ctx.createBuffer(1, Math.ceil(this.ctx.sampleRate * dur), this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      const env = Math.exp(-i / (this.ctx.sampleRate * 0.06));
      data[i] = (Math.random() * 2 - 1) * env * 0.7
              + Math.sin(2 * Math.PI * 180 * i / this.ctx.sampleRate) * env * 0.3;
    }
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    const flt = this.ctx.createBiquadFilter();
    flt.type = 'highpass'; flt.frequency.value = 1200;
    const g = this.ctx.createGain();
    g.gain.value = 0.22 + intensity * 0.04;
    src.connect(flt); flt.connect(g); conn(g);
    src.start(t); src.stop(t + dur + 0.02);
    setTimeout(() => { try { flt.disconnect(); g.disconnect(); } catch(e) {} }, 300);
  }

  _playHihat(t, vol, conn, open = false) {
    const dur  = open ? 0.14 : 0.05;
    const buf  = this.ctx.createBuffer(1, Math.ceil(this.ctx.sampleRate * dur), this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * (open ? 0.06 : 0.02)));
    }
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    const flt = this.ctx.createBiquadFilter();
    flt.type = 'highpass'; flt.frequency.value = 8000;
    const g = this.ctx.createGain();
    g.gain.value = vol;
    src.connect(flt); flt.connect(g); conn(g);
    src.start(t); src.stop(t + dur + 0.01);
    setTimeout(() => { try { flt.disconnect(); g.disconnect(); } catch(e) {} }, 250);
  }

  _playTone(t, freq, type, vol, attack, decay, conn) {
    const osc = this.ctx.createOscillator();
    const env = this.ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    env.gain.setValueAtTime(0, t);
    env.gain.linearRampToValueAtTime(vol, t + attack);
    env.gain.exponentialRampToValueAtTime(0.001, t + attack + decay);
    osc.connect(env); conn(env);
    osc.start(t); osc.stop(t + attack + decay + 0.05);
    setTimeout(() => { try { env.disconnect(); } catch(e) {} }, (attack + decay + 0.2) * 1000);
  }

  // ── SFX ─────────────────────────────────────────
  _sfxGain(vol = 0.35) {
    const g = this.ctx.createGain();
    g.gain.value = vol;
    g.connect(this.ctx.destination);
    setTimeout(() => { try { g.disconnect(); } catch(e) {} }, 2000);
    return g;
  }

  playChase() {
    if (!this.enabled || !this.ctx) return;
    const t = this.ctx.currentTime;
    const m = this._sfxGain(0.38);

    const osc = this.ctx.createOscillator();
    const env = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(280, t);
    osc.frequency.exponentialRampToValueAtTime(140, t + 0.13);
    env.gain.setValueAtTime(0.65, t);
    env.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    osc.connect(env); env.connect(m);
    osc.start(t); osc.stop(t + 0.16);

    const bufSize = Math.ceil(this.ctx.sampleRate * 0.12);
    const buf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * 0.3;
    const noise = this.ctx.createBufferSource();
    noise.buffer = buf;
    const nEnv = this.ctx.createGain();
    nEnv.gain.setValueAtTime(0.4, t);
    nEnv.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    const nFlt = this.ctx.createBiquadFilter();
    nFlt.type = 'bandpass'; nFlt.frequency.value = 900; nFlt.Q.value = 0.8;
    noise.connect(nFlt); nFlt.connect(nEnv); nEnv.connect(m);
    noise.start(t); noise.stop(t + 0.13);
  }

  playMiss() {
    if (!this.enabled || !this.ctx) return;
    const t = this.ctx.currentTime;
    const m = this._sfxGain(0.3);

    const osc = this.ctx.createOscillator();
    const env = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, t);
    osc.frequency.exponentialRampToValueAtTime(80, t + 0.4);
    env.gain.setValueAtTime(0.5, t);
    env.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
    osc.connect(env); env.connect(m);
    osc.start(t); osc.stop(t + 0.42);

    const osc2 = this.ctx.createOscillator();
    const env2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(60, t);
    osc2.frequency.exponentialRampToValueAtTime(30, t + 0.1);
    env2.gain.setValueAtTime(0.7, t);
    env2.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    osc2.connect(env2); env2.connect(m);
    osc2.start(t); osc2.stop(t + 0.12);
  }

  playCombo(multiplier = 2) {
    if (!this.enabled || !this.ctx) return;
    const t = this.ctx.currentTime;
    const notes = [523, 659, 784, 1047];
    const count = Math.min(multiplier, notes.length);
    for (let i = 0; i < count; i++) {
      const m = this._sfxGain(0.22);
      const osc = this.ctx.createOscillator();
      const env = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = notes[i];
      env.gain.setValueAtTime(0, t + i * 0.08);
      env.gain.linearRampToValueAtTime(0.5, t + i * 0.08 + 0.02);
      env.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.26);
      osc.connect(env); env.connect(m);
      osc.start(t + i * 0.08); osc.stop(t + i * 0.08 + 0.3);
    }
  }

  playVictory() {
    if (!this.enabled || !this.ctx) return;
    this.stopMusic(0.3);
    const t = this.ctx.currentTime + 0.35;
    const melody    = [523, 659, 784, 1047, 784, 1047, 1568];
    const durations = [0.1, 0.1, 0.1, 0.2, 0.1, 0.1, 0.5];
    let offset = 0;
    melody.forEach((freq, i) => {
      const m = this._sfxGain(0.28);
      const osc = this.ctx.createOscillator();
      const env = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      env.gain.setValueAtTime(0, t + offset);
      env.gain.linearRampToValueAtTime(0.5, t + offset + 0.02);
      env.gain.setValueAtTime(0.5, t + offset + durations[i] - 0.02);
      env.gain.linearRampToValueAtTime(0.001, t + offset + durations[i]);
      osc.connect(env); env.connect(m);
      osc.start(t + offset); osc.stop(t + offset + durations[i] + 0.05);
      offset += durations[i];
    });
  }

  playGameOver() {
    if (!this.enabled || !this.ctx) return;
    this.stopMusic(0.3);
    const t = this.ctx.currentTime + 0.35;
    const notes = [392, 349, 330, 262];
    let offset = 0;
    notes.forEach((freq) => {
      const m = this._sfxGain(0.25);
      const osc = this.ctx.createOscillator();
      const env = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.value = freq;
      env.gain.setValueAtTime(0.4, t + offset);
      env.gain.exponentialRampToValueAtTime(0.001, t + offset + 0.3);
      osc.connect(env); env.connect(m);
      osc.start(t + offset); osc.stop(t + offset + 0.35);
      offset += 0.2;
    });
  }

  playCountdown(isGo = false) {
    if (!this.enabled || !this.ctx) return;
    const t = this.ctx.currentTime;
    const m = this._sfxGain(0.32);
    const osc = this.ctx.createOscillator();
    const env = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = isGo ? 880 : 440;
    env.gain.setValueAtTime(0.5, t);
    env.gain.exponentialRampToValueAtTime(0.001, t + (isGo ? 0.4 : 0.15));
    osc.connect(env); env.connect(m);
    osc.start(t); osc.stop(t + (isGo ? 0.45 : 0.2));
  }
}

const Audio = new AudioManager();
