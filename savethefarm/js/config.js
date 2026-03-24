// config.js — All tunable parameters for Save the Farm
// Edit these values to tweak game balance without touching game logic

const CONFIG = {
  // Game duration
  GAME_DURATION: 120, // seconds (2 minutes)
  COUNTDOWN_DURATION: 3, // seconds before game starts

  // Grid
  GRID_COLS: 4,
  GRID_ROWS: 4,
  TILE_SIZE: 90,       // base tile size in px (scaled responsively)
  TILE_PADDING: 8,     // gap between tiles
  TILE_RADIUS: 14,     // rounded corner radius

  // Dog
  DOG_SPEED: 0.3,      // seconds per tile distance
  DOG_BARK_DURATION: 0.7,
  DOG_RETURN_SPEED: 0.15, // tiles/sec toward center (slower, relaxed)

  // Pest timers (seconds before damage)
  PEST_TIMERS: {
    crow:    2.5,
    mole:    2.0,
    cricket: 3.0,
    rabbit:  1.5,  // after settling
  },

  // Pest points
  PEST_POINTS: {
    crow:    10,
    mole:    15,
    cricket: 20,
    rabbit:  25,
  },

  // Rabbit hops before settling
  RABBIT_HOP_COUNT: { min: 2, max: 3 },
  RABBIT_HOP_INTERVAL: 0.7, // seconds per hop

  // Crop health
  CROP_HP: 3,

  // Scoring
  SURVIVING_CROP_BONUS: 30,
  PERFECT_CROP_BONUS: 10,  // extra per undamaged crop

  // Combo system
  COMBO_WINDOW: 1.5,       // seconds to chain combos
  COMBO_RESET: 3.0,        // seconds of inactivity to reset
  COMBO_THRESHOLDS: [3, 6, 10], // combo counts to reach x2, x3, x4

  // Reward thresholds
  REWARDS: [
    { name: 'Perfect', score: 900, pct: 20, crops: 8, cosmetic: 'Golden Scarecrow' },
    { name: 'Gold',    score: 700, pct: 15, crops: 8 },
    { name: 'Silver',  score: 500, pct: 10, crops: 5 },
    { name: 'Bronze',  score: 300, pct: 5,  crops: 3 },
  ],

  // Spawn phases (scaled for 2 min game)
  PHASES: [
    { startTime: 0,  endTime: 30,  interval: 3.0, maxSimul: 1, types: ['crow', 'mole'] },
    { startTime: 30, endTime: 60,  interval: 2.2, maxSimul: 1, types: ['crow', 'mole', 'cricket'] },
    { startTime: 60, endTime: 90,  interval: 1.5, maxSimul: 2, types: ['crow', 'mole', 'cricket', 'rabbit'] },
    { startTime: 90, endTime: 120, interval: 1.0, maxSimul: 3, types: ['crow', 'mole', 'cricket', 'rabbit'] },
  ],

  // Cricket swarm covers 2 adjacent tiles
  CRICKET_TILE_COUNT: 2,

  // Animation durations (seconds)
  ANIM: {
    PEST_SPAWN:    0.3,
    PEST_FLEE:     0.5,
    SCORE_POPUP:   1.0,
    CROP_SHAKE:    0.4,
    BARK_BUBBLE:   0.7,
    COMBO_PULSE:   0.4,
    RESULTS_SLIDE: 0.6,
    COUNTDOWN_SCALE: 0.8,
  },

  // Colours (FarmVille 3 palette)
  COLORS: {
    skyTop:    '#87CEEB',
    skyBot:    '#E8F4FD',
    grass:     '#91BC1B',
    grassDark: '#7A9F16',
    tileBase:  '#C4A35A',
    tileBorder:'#8B6914',
    tileDead:  '#9E8B6E',
    uiPanel:   '#FFFFFF',
    uiBorder:  '#F0DFC8',
    btnGreen:  '#8DDC25',
    btnBlue:   '#4FC3F7',
    btnRed:    '#FF4968',
    textHead:  '#3A4A5C',
    textBody:  '#5A7394',
    ribbon:    '#D4714A',
    ribbonTxt: '#FFF8EB',
    gold:      '#F0B800',
    goldLight: '#F6D233',
    hpGreen:   '#5CB85C',
    hpYellow:  '#F0AD4E',
    hpRed:     '#D9534F',
  },

  // Sound (set to false to disable)
  SOUND_ENABLED: true,
};
