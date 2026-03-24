// audio.js — Web Audio API sound manager (no file loading required)

class AudioManager {
  constructor() {
    this.ctx = null;
    this.enabled = CONFIG.SOUND_ENABLED;
    this._initialized = false;
  }

  // Must be called on first user gesture (tap)
  init() {
    if (this._initialized) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this._initialized = true;
    } catch (e) {
      this.enabled = false;
    }
  }

  _master(gain = 0.4) {
    // C8 fix: auto-disconnect gain node after 2 seconds to prevent leak
    const g = this.ctx.createGain();
    g.gain.value = gain;
    g.connect(this.ctx.destination);
    setTimeout(() => { try { g.disconnect(); } catch(e) {} }, 2000);
    return g;
  }

  // Dog bark — short noise burst + mid tone
  playChase() {
    if (!this.enabled || !this.ctx) return;
    const t = this.ctx.currentTime;
    const master = this._master(0.35);

    // Bark fundamental
    const osc = this.ctx.createOscillator();
    const env = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(260, t);
    osc.frequency.exponentialRampToValueAtTime(140, t + 0.12);
    env.gain.setValueAtTime(0.6, t);
    env.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    osc.connect(env); env.connect(master);
    osc.start(t); osc.stop(t + 0.15);

    // Noise burst
    const bufSize = this.ctx.sampleRate * 0.12;
    const buf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * 0.3;
    const noise = this.ctx.createBufferSource();
    noise.buffer = buf;
    const noiseEnv = this.ctx.createGain();
    noiseEnv.gain.setValueAtTime(0.4, t);
    noiseEnv.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 800;
    noiseFilter.Q.value = 0.8;
    noise.connect(noiseFilter); noiseFilter.connect(noiseEnv); noiseEnv.connect(master);
    noise.start(t); noise.stop(t + 0.12);
  }

  // Pest missed — sad descending tone + thud
  playMiss() {
    if (!this.enabled || !this.ctx) return;
    const t = this.ctx.currentTime;
    const master = this._master(0.3);

    const osc = this.ctx.createOscillator();
    const env = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, t);
    osc.frequency.exponentialRampToValueAtTime(80, t + 0.4);
    env.gain.setValueAtTime(0.5, t);
    env.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
    osc.connect(env); env.connect(master);
    osc.start(t); osc.stop(t + 0.4);

    // Thud
    const osc2 = this.ctx.createOscillator();
    const env2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(60, t);
    osc2.frequency.exponentialRampToValueAtTime(30, t + 0.1);
    env2.gain.setValueAtTime(0.7, t);
    env2.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    osc2.connect(env2); env2.connect(master);
    osc2.start(t); osc2.stop(t + 0.1);
  }

  // Combo chime — ascending notes
  playCombo(multiplier = 2) {
    if (!this.enabled || !this.ctx) return;
    const t = this.ctx.currentTime;
    const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
    const count = Math.min(multiplier, notes.length);
    for (let i = 0; i < count; i++) {
      const master = this._master(0.2);
      const osc = this.ctx.createOscillator();
      const env = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = notes[i];
      env.gain.setValueAtTime(0, t + i * 0.08);
      env.gain.linearRampToValueAtTime(0.5, t + i * 0.08 + 0.02);
      env.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.25);
      osc.connect(env); env.connect(master);
      osc.start(t + i * 0.08); osc.stop(t + i * 0.08 + 0.3);
    }
  }

  // Victory fanfare
  playVictory() {
    if (!this.enabled || !this.ctx) return;
    const t = this.ctx.currentTime;
    const melody = [523, 659, 784, 1047, 784, 1047, 1568];
    const durations = [0.1, 0.1, 0.1, 0.2, 0.1, 0.1, 0.4];
    let offset = 0;
    melody.forEach((freq, i) => {
      const master = this._master(0.25);
      const osc = this.ctx.createOscillator();
      const env = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      env.gain.setValueAtTime(0, t + offset);
      env.gain.linearRampToValueAtTime(0.5, t + offset + 0.02);
      env.gain.setValueAtTime(0.5, t + offset + durations[i] - 0.02);
      env.gain.linearRampToValueAtTime(0.001, t + offset + durations[i]);
      osc.connect(env); env.connect(master);
      osc.start(t + offset); osc.stop(t + offset + durations[i] + 0.05);
      offset += durations[i];
    });
  }

  // Game over / farm raided
  playGameOver() {
    if (!this.enabled || !this.ctx) return;
    const t = this.ctx.currentTime;
    const notes = [392, 349, 330, 262]; // G, F, E, C descending
    let offset = 0;
    notes.forEach((freq, i) => {
      const master = this._master(0.22);
      const osc = this.ctx.createOscillator();
      const env = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.value = freq;
      env.gain.setValueAtTime(0.4, t + offset);
      env.gain.exponentialRampToValueAtTime(0.001, t + offset + 0.3);
      osc.connect(env); env.connect(master);
      osc.start(t + offset); osc.stop(t + offset + 0.35);
      offset += 0.18;
    });
  }

  // Countdown beep
  playCountdown(isGo = false) {
    if (!this.enabled || !this.ctx) return;
    const t = this.ctx.currentTime;
    const master = this._master(0.3);
    const osc = this.ctx.createOscillator();
    const env = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = isGo ? 880 : 440;
    env.gain.setValueAtTime(0.5, t);
    env.gain.exponentialRampToValueAtTime(0.001, t + (isGo ? 0.4 : 0.15));
    osc.connect(env); env.connect(master);
    osc.start(t); osc.stop(t + (isGo ? 0.45 : 0.2));
  }
}

const Audio = new AudioManager();
