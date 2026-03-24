// config.js — All tunable game parameters

const CONFIG = {
  GAME_DURATION:      120,
  COUNTDOWN_DURATION: 3,
  SPAWN_GRACE_PERIOD: 2.0,

  GRID_COLS: 4,
  GRID_ROWS: 4,
  TILE_SIZE: 90,
  TILE_PADDING: 10,
  TILE_RADIUS: 16,

  // Dog — used by Dog.update
  DOG_SPEED_PX:     230,
  DOG_BARK_DURATION: 0.8,

  // Pest timers (seconds before crop damage)
  PEST_TIMERS: { crow: 2.5, mole: 2.0, cricket: 3.0, rabbit: 1.8 },

  // Pest points
  PEST_POINTS: { crow: 10, mole: 15, cricket: 30, rabbit: 25 },

  // Rabbit
  RABBIT_HOP_COUNT:    { min: 2, max: 3 },
  RABBIT_HOP_INTERVAL: 0.6,

  CROP_HP: 3,

  SURVIVING_CROP_BONUS: 30,
  PERFECT_CROP_BONUS:   10,

  // Combo
  COMBO_WINDOW:     2.2,
  COMBO_RESET:      3.5,
  COMBO_THRESHOLDS: [3, 6, 10],

  // Reward thresholds (rebalanced for 2-min game)
  REWARDS: [
    { name: 'Perfect', score: 900, pct: 20, crops: 8, cosmetic: 'Golden Scarecrow' },
    { name: 'Gold',    score: 600, pct: 15, crops: 8 },
    { name: 'Silver',  score: 400, pct: 10, crops: 5 },
    { name: 'Bronze',  score: 200, pct:  5, crops: 3 },
  ],

  PHASES: [
    { startTime:  0, endTime:  30, interval: 3.0, maxSimul: 1, types: ['crow','mole'] },
    { startTime: 30, endTime:  60, interval: 2.2, maxSimul: 1, types: ['crow','mole','cricket'] },
    { startTime: 60, endTime:  90, interval: 1.5, maxSimul: 2, types: ['crow','mole','cricket','rabbit'] },
    { startTime: 90, endTime: 120, interval: 1.0, maxSimul: 3, types: ['crow','mole','cricket','rabbit'] },
  ],

  ANIM: {
    PEST_SPAWN:      0.35,  // elastic overshoot spawn
    PEST_FLEE:       0.55,
    SCORE_POPUP:     1.1,
    CROP_SHAKE:      0.45,
    BARK_BUBBLE:     0.8,
    COMBO_PULSE:     0.5,
    RESULTS_SLIDE:   0.55,
    TAP_RIPPLE:      0.4,
    DAMAGE_FLASH:    0.5,
    DOG_ANTICIPATE:  0.12, // squat before sprint
  },

  // FarmVille 3 palette
  COLORS: {
    skyTop:     '#3AAEE0',
    skyMid:     '#62C8F0',
    skyBot:     '#C8EAF8',
    grass:      '#7DC428',
    grassLight: '#92D835',
    grassDark:  '#5A9B18',
    tileBase:   '#C8A850',
    tileDark:   '#A88030',
    tileBorder: '#7A5010',
    tileDead:   '#A09070',
    uiPanel:    '#FFFDF0',
    uiBorder:   '#E8D4A0',
    btnGreen:   '#6DC425',
    btnGreenDk: '#4A8E10',
    btnBlue:    '#3DB8F0',
    btnBlueDk:  '#1A88C0',
    btnRed:     '#FF4968',
    btnRedDk:   '#C82040',
    textHead:   '#3A3010',
    textBody:   '#6A5828',
    textLight:  '#F5EDD8',
    ribbon:     '#D4714A',
    gold:       '#F0B800',
    goldLight:  '#F8D840',
    goldDark:   '#C88800',
    hpGreen:    '#5CB85C',
    hpYellow:   '#F0AD4E',
    hpRed:      '#E03030',
  },

  SOUND_ENABLED: true,
};
