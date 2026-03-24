// config.js — All tunable parameters for Save the Farm

const CONFIG = {
  GAME_DURATION: 120,      // seconds (2 minutes)
  COUNTDOWN_DURATION: 3,
  SPAWN_GRACE_PERIOD: 2.0, // G5: seconds before first pest spawns after GO

  // Grid
  GRID_COLS: 4,
  GRID_ROWS: 4,
  TILE_SIZE: 90,
  TILE_PADDING: 8,
  TILE_RADIUS: 14,

  // Dog — C5: actually used now
  DOG_SPEED_PX: 220,       // px/sec travel speed
  DOG_BARK_DURATION: 0.7,

  // Pest timers (seconds before damage)
  PEST_TIMERS: {
    crow:    2.5,
    mole:    2.0,
    cricket: 3.0,
    rabbit:  1.8,  // slightly more forgiving after settling
  },

  // Pest points — G7: cricket boosted to 30 (covers 2 tiles)
  PEST_POINTS: {
    crow:    10,
    mole:    15,
    cricket: 30,
    rabbit:  25,
  },

  // Rabbit
  RABBIT_HOP_COUNT:    { min: 2, max: 3 },
  RABBIT_HOP_INTERVAL: 0.65,

  // Crop health
  CROP_HP: 3,

  // Scoring
  SURVIVING_CROP_BONUS: 30,
  PERFECT_CROP_BONUS:   10,

  // Combo — G4: wider window so combo feels achievable
  COMBO_WINDOW:     2.2,   // seconds between arrivals to chain
  COMBO_RESET:      3.5,
  COMBO_THRESHOLDS: [3, 6, 10],

  // G3: Reward thresholds rebalanced for 2-min game
  // Typical good run: ~400–700 pest pts + crop bonus
  REWARDS: [
    { name: 'Perfect', score: 900, pct: 20, crops: 8, cosmetic: 'Golden Scarecrow' },
    { name: 'Gold',    score: 600, pct: 15, crops: 8 },
    { name: 'Silver',  score: 400, pct: 10, crops: 5 },
    { name: 'Bronze',  score: 200, pct: 5,  crops: 3 },
  ],

  // Spawn phases (2 min)
  PHASES: [
    { startTime: 0,  endTime: 30,  interval: 3.0, maxSimul: 1, types: ['crow', 'mole'] },
    { startTime: 30, endTime: 60,  interval: 2.2, maxSimul: 1, types: ['crow', 'mole', 'cricket'] },
    { startTime: 60, endTime: 90,  interval: 1.5, maxSimul: 2, types: ['crow', 'mole', 'cricket', 'rabbit'] },
    { startTime: 90, endTime: 120, interval: 1.0, maxSimul: 3, types: ['crow', 'mole', 'cricket', 'rabbit'] },
  ],

  CRICKET_TILE_COUNT: 2,

  ANIM: {
    PEST_SPAWN:      0.3,
    PEST_FLEE:       0.5,
    SCORE_POPUP:     1.0,
    CROP_SHAKE:      0.4,
    BARK_BUBBLE:     0.7,
    COMBO_PULSE:     0.4,
    RESULTS_SLIDE:   0.6,
    TAP_RIPPLE:      0.35, // V8: tile tap ripple
    GAMEOVER_FLASH:  0.5,  // G6: crop-death flash
  },

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

  SOUND_ENABLED: true,
};
