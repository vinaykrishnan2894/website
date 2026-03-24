// sprites.js — High-quality SVG sprite definitions and loader
// All sprites are inline SVGs converted to data URIs and preloaded as Image objects.
// Design language: FarmVille 3 chibi — path-based characters, expressive faces, warm palette.

const SpriteData = {

  // ─────────────────────────────────────────────
  // REX — Golden Retriever chibi, path-based body
  // Uniform golden coat, white chest, big expressive face, red bandana, no saddle
  // All body/limbs drawn with bezier paths — no ellipses for shapes
  // ─────────────────────────────────────────────
  rex: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 140" width="120" height="140">
  <defs>
    <radialGradient id="rfur" cx="38%" cy="32%" r="62%">
      <stop offset="0%" stop-color="#E8A030"/>
      <stop offset="100%" stop-color="#C07818"/>
    </radialGradient>
    <radialGradient id="rfurDark" cx="38%" cy="32%" r="62%">
      <stop offset="0%" stop-color="#D09028"/>
      <stop offset="100%" stop-color="#A86010"/>
    </radialGradient>
    <radialGradient id="reye" cx="30%" cy="28%" r="65%">
      <stop offset="0%" stop-color="#6B3A10"/>
      <stop offset="100%" stop-color="#2A1005"/>
    </radialGradient>
    <filter id="rsh"><feDropShadow dx="0" dy="3" stdDeviation="3.5" flood-color="#00000030"/></filter>
  </defs>

  <!-- Ground shadow -->
  <ellipse cx="60" cy="136" rx="36" ry="5" fill="#00000020"/>

  <!-- TAIL — sweeping path, not ellipse -->
  <path d="M 92 72 C 108 58, 122 44, 118 30 C 114 18, 104 22, 100 30 C 96 40, 98 54, 88 66 Z"
        fill="url(#rfur)" stroke="#A86010" stroke-width="1"/>
  <!-- Tail tip fluff -->
  <path d="M 100 30 C 104 20, 116 18, 118 28 C 115 22, 108 24, 104 32 Z"
        fill="#F0D890"/>

  <!-- BACK LEGS — path-based haunches -->
  <path d="M 78 88 C 82 80, 88 78, 90 86 C 92 94, 88 108, 84 116 C 80 118, 76 116, 76 110 C 76 102, 76 96, 78 88 Z"
        fill="url(#rfurDark)"/>
  <!-- Back right paw -->
  <path d="M 76 110 C 74 118, 72 124, 78 126 C 84 128, 90 124, 88 118 C 86 114, 82 114, 78 118 Z"
        fill="#E8A030" stroke="#A86010" stroke-width="1"/>

  <path d="M 42 88 C 38 80, 32 78, 30 86 C 28 94, 32 108, 36 116 C 40 118, 44 116, 44 110 C 44 102, 44 96, 42 88 Z"
        fill="url(#rfurDark)"/>
  <!-- Back left paw -->
  <path d="M 44 110 C 46 118, 48 124, 42 126 C 36 128, 30 124, 32 118 C 34 114, 38 114, 42 118 Z"
        fill="#E8A030" stroke="#A86010" stroke-width="1"/>

  <!-- BODY — single flowing path, no ellipse -->
  <path d="M 28 68 C 22 60, 22 48, 30 44 C 36 40, 44 42, 50 46
           C 56 42, 68 38, 82 44 C 94 50, 98 64, 96 76
           C 94 88, 86 94, 76 92 C 64 96, 48 96, 38 90
           C 28 86, 24 78, 28 68 Z"
        fill="url(#rfur)" filter="url(#rsh)"/>

  <!-- WHITE CHEST — path not ellipse -->
  <path d="M 34 68 C 30 62, 32 54, 38 52 C 44 50, 50 54, 52 60
           C 50 68, 46 74, 40 74 C 36 74, 34 72, 34 68 Z"
        fill="#FFF8E8"/>
  <path d="M 36 68 C 34 63, 36 57, 40 56 C 44 55, 48 58, 48 62
           C 47 67, 44 70, 40 70 Z"
        fill="#FFFFFF"/>

  <!-- FRONT LEGS — path-based -->
  <path d="M 38 84 C 34 84, 30 86, 28 96 C 26 106, 28 118, 32 122
           C 36 124, 40 122, 42 116 C 44 108, 44 96, 42 88 C 42 86, 40 84, 38 84 Z"
        fill="url(#rfur)"/>
  <!-- Front left paw -->
  <path d="M 28 118 C 26 124, 28 130, 34 130 C 40 130, 44 126, 42 120 Z"
        fill="#E8A030" stroke="#A86010" stroke-width="1"/>

  <path d="M 58 84 C 62 84, 66 86, 68 96 C 70 106, 68 118, 64 122
           C 60 124, 56 122, 54 116 C 52 108, 52 96, 54 88 C 54 86, 56 84, 58 84 Z"
        fill="url(#rfur)"/>
  <!-- Front right paw -->
  <path d="M 68 118 C 70 124, 68 130, 62 130 C 56 130, 52 126, 54 120 Z"
        fill="#E8A030" stroke="#A86010" stroke-width="1"/>

  <!-- NECK — path -->
  <path d="M 28 62 C 24 54, 26 44, 34 40 C 42 36, 50 38, 52 44
           C 48 42, 40 42, 36 48 C 32 54, 32 62, 34 68 Z"
        fill="url(#rfur)"/>

  <!-- ── HEAD ── -->
  <!-- Left ear — floppy, path-based -->
  <path d="M 14 38 C 8 28, 10 14, 18 10 C 24 8, 30 12, 32 20
           C 30 14, 24 12, 20 16 C 16 22, 16 32, 20 40 Z"
        fill="#C07818"/>
  <path d="M 16 38 C 12 28, 14 16, 20 12 C 26 10, 30 14, 30 22
           C 28 16, 24 14, 20 18 C 17 24, 18 34, 22 40 Z"
        fill="#D08020"/>

  <!-- HEAD — rounded path, not circle -->
  <path d="M 20 44 C 14 38, 12 28, 16 20 C 20 12, 30 8, 42 10
           C 54 12, 64 18, 68 28 C 72 38, 68 50, 60 56
           C 52 62, 38 62, 28 56 C 20 52, 18 48, 20 44 Z"
        fill="url(#rfur)" filter="url(#rsh)"/>

  <!-- Right ear — prick ear -->
  <path d="M 64 22 C 66 12, 72 6, 78 8 C 82 10, 82 18, 78 26
           C 76 22, 74 16, 70 14 C 68 18, 66 24, 66 30 Z"
        fill="#C07818"/>
  <path d="M 66 24 C 68 16, 72 10, 76 12 C 78 16, 78 22, 74 28
           C 72 22, 70 16, 68 16 C 68 20, 68 26, 68 30 Z"
        fill="#D08020"/>

  <!-- SNOUT — path -->
  <path d="M 50 38 C 44 36, 36 38, 34 44 C 32 50, 36 56, 44 58
           C 52 60, 60 56, 62 50 C 64 44, 58 38, 50 38 Z"
        fill="#C07818"/>
  <path d="M 50 40 C 44 38, 38 40, 36 46 C 34 50, 38 54, 46 56
           C 52 58, 58 54, 60 50 C 62 45, 57 40, 50 40 Z"
        fill="#E8C890"/>

  <!-- NOSE — path, not ellipse -->
  <path d="M 46 42 C 44 40, 44 36, 48 35 C 52 34, 56 36, 56 40
           C 56 44, 52 46, 48 46 C 46 46, 46 44, 46 42 Z"
        fill="#1A0800"/>
  <!-- Nose highlight -->
  <path d="M 47 37 C 47 35, 50 34, 52 36 C 50 35, 48 36, 47 38 Z"
        fill="rgba(255,255,255,0.5)"/>

  <!-- OPEN MOUTH -->
  <path d="M 36 52 C 40 58, 52 60, 58 54" stroke="#8B3010" stroke-width="2.2" fill="none" stroke-linecap="round"/>
  <!-- Teeth -->
  <path d="M 38 52 L 38 56 L 44 56 L 44 52 Z" fill="#FFFFFF" rx="1"/>
  <path d="M 44 52 L 44 56 L 50 56 L 50 52 Z" fill="#FFFFFF" rx="1"/>
  <!-- Tongue -->
  <path d="M 40 56 C 40 64, 46 66, 50 62 C 52 58, 50 56, 48 56 Z"
        fill="#FF7878"/>
  <path d="M 44 56 L 44 64" stroke="#E05050" stroke-width="1.5"/>

  <!-- EYES — sclera + iris + pupil + shine, path-based -->
  <!-- Left eye -->
  <path d="M 22 28 C 22 22, 28 18, 34 20 C 38 22, 40 26, 38 30
           C 36 34, 30 36, 26 34 C 22 32, 22 30, 22 28 Z"
        fill="#FFFAF2"/>
  <path d="M 25 28 C 25 24, 29 21, 33 22 C 37 23, 38 27, 36 30
           C 34 33, 28 34, 26 32 C 24 30, 24 29, 25 28 Z"
        fill="url(#reye)"/>
  <path d="M 27 27 C 27 25, 30 23, 33 24 C 35 25, 36 28, 34 30
           C 32 32, 28 32, 27 30 Z"
        fill="#1A0800"/>
  <path d="M 29 24 C 30 23, 32 23, 33 25 C 32 24, 30 24, 29 25 Z"
        fill="rgba(255,255,255,0.95)"/>
  <!-- Left eyelid arc -->
  <path d="M 22 27 C 26 22, 34 22, 38 27" stroke="#5A2808" stroke-width="1.8" fill="none"/>

  <!-- Right eye -->
  <path d="M 50 26 C 50 20, 56 16, 62 18 C 66 20, 68 24, 66 28
           C 64 32, 58 34, 54 32 C 50 30, 50 28, 50 26 Z"
        fill="#FFFAF2"/>
  <path d="M 53 26 C 53 22, 57 19, 61 20 C 65 21, 66 25, 64 28
           C 62 31, 56 32, 54 30 C 52 28, 52 27, 53 26 Z"
        fill="url(#reye)"/>
  <path d="M 55 25 C 55 23, 58 21, 61 22 C 63 23, 64 26, 62 28
           C 60 30, 56 30, 55 28 Z"
        fill="#1A0800"/>
  <path d="M 57 22 C 58 21, 60 21, 61 23 C 60 22, 58 22, 57 23 Z"
        fill="rgba(255,255,255,0.95)"/>
  <!-- Right eyelid -->
  <path d="M 50 25 C 54 20, 62 20, 66 25" stroke="#5A2808" stroke-width="1.8" fill="none"/>

  <!-- Eyebrow spots (expressive) -->
  <path d="M 24 20 C 26 17, 32 17, 34 20 C 30 18, 26 18, 24 20 Z" fill="#A06010"/>
  <path d="M 52 18 C 54 15, 60 15, 62 18 C 58 16, 54 16, 52 18 Z" fill="#A06010"/>

  <!-- RED BANDANA — path, not stroke arc -->
  <path d="M 20 60 C 28 66, 42 70, 58 66 C 52 70, 42 74, 32 72 Z"
        fill="#CC1818"/>
  <path d="M 20 60 C 28 64, 42 68, 58 66 C 42 72, 28 70, 20 64 Z"
        fill="#DD2424"/>
  <!-- Bandana knot -->
  <path d="M 20 60 C 18 56, 16 54, 14 58 C 12 62, 14 68, 18 66 C 16 64, 16 60, 18 60 Z"
        fill="#CC1818"/>
  <path d="M 18 66 L 12 76 M 18 64 L 10 60" stroke="#CC1818" stroke-width="2.5" stroke-linecap="round"/>
  <!-- Gold tag -->
  <path d="M 40 68 C 38 66, 38 62, 40 60 C 42 58, 46 58, 48 60
           C 50 62, 50 66, 48 68 C 46 70, 42 70, 40 68 Z"
        fill="#F6D233" stroke="#C88800" stroke-width="1.5"/>
  <text x="44" y="66" text-anchor="middle" font-size="7" font-weight="bold" fill="#7A5010" font-family="sans-serif">R</text>
</svg>`,

  // ─────────────────────────────────────────────
  // REX RUNNING — gallop pose, all paths
  // ─────────────────────────────────────────────
  rexRun: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" width="160" height="120">
  <defs>
    <radialGradient id="rrfur" cx="38%" cy="32%" r="62%">
      <stop offset="0%" stop-color="#E8A030"/>
      <stop offset="100%" stop-color="#C07818"/>
    </radialGradient>
    <radialGradient id="rreye" cx="30%" cy="28%" r="65%">
      <stop offset="0%" stop-color="#6B3A10"/>
      <stop offset="100%" stop-color="#2A1005"/>
    </radialGradient>
    <filter id="rrsh"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#00000028"/></filter>
  </defs>

  <!-- Elongated shadow when running -->
  <ellipse cx="80" cy="116" rx="56" ry="5" fill="#00000018"/>

  <!-- TAIL — raised high, wagging path -->
  <path d="M 124 52 C 140 36, 156 24, 152 12 C 148 2, 138 4, 134 14
           C 130 24, 132 38, 120 50 Z"
        fill="#E8A030" stroke="#A86010" stroke-width="1"/>
  <path d="M 134 14 C 138 4, 150 2, 152 12 C 148 6, 140 8, 136 18 Z"
        fill="#F0D890"/>

  <!-- BACK LEGS extended rearward -->
  <path d="M 100 68 C 108 62, 118 60, 122 72 C 126 82, 122 98, 116 104
           C 110 108, 104 106, 102 98 C 100 88, 100 76, 100 68 Z"
        fill="#C07818"/>
  <path d="M 116 104 C 112 110, 108 116, 114 118 C 120 120, 128 116, 124 108 Z"
        fill="#E8A030" stroke="#A86010" stroke-width="1"/>

  <path d="M 80 72 C 88 66, 96 64, 98 76 C 100 86, 96 100, 90 106
           C 84 110, 78 108, 76 100 C 74 90, 76 80, 80 72 Z"
        fill="#C07818"/>
  <path d="M 90 106 C 86 112, 82 118, 88 118 C 94 120, 100 116, 96 108 Z"
        fill="#E8A030" stroke="#A86010" stroke-width="1"/>

  <!-- BODY elongated in gallop -->
  <path d="M 30 52 C 24 42, 26 30, 36 26 C 46 22, 60 24, 72 28
           C 84 24, 100 22, 114 28 C 128 34, 134 48, 130 62
           C 126 74, 112 80, 96 78 C 80 82, 60 80, 46 74
           C 32 68, 26 62, 30 52 Z"
        fill="url(#rrfur)" filter="url(#rrsh)"/>

  <!-- White chest (swept back in run) -->
  <path d="M 36 52 C 32 44, 36 36, 44 34 C 52 32, 58 38, 58 46
           C 56 54, 50 60, 44 58 C 38 56, 36 54, 36 52 Z"
        fill="#FFF8E8"/>

  <!-- FRONT LEGS extended forward -->
  <path d="M 42 66 C 34 62, 24 56, 16 64 C 8 72, 10 88, 16 96
           C 22 102, 30 100, 34 92 C 38 84, 38 74, 42 68 Z"
        fill="#C07818"/>
  <path d="M 10 92 C 6 98, 8 106, 14 106 C 20 108, 26 104, 22 96 Z"
        fill="#E8A030" stroke="#A86010" stroke-width="1"/>

  <path d="M 56 70 C 48 66, 40 62, 34 70 C 28 78, 30 92, 36 98
           C 42 102, 50 100, 52 92 C 54 84, 54 76, 56 72 Z"
        fill="#C07818"/>
  <path d="M 30 94 C 26 100, 28 108, 34 108 C 40 108, 46 104, 42 96 Z"
        fill="#E8A030" stroke="#A86010" stroke-width="1"/>

  <!-- Dust puffs -->
  <path d="M 140 106 C 138 100, 144 96, 148 100 C 150 104, 148 110, 144 110 Z"
        fill="#D4A84A" opacity="0.45"/>
  <path d="M 150 100 C 148 95, 154 92, 157 97 C 158 100, 156 104, 153 104 Z"
        fill="#D4A84A" opacity="0.28"/>

  <!-- ── HEAD ── -->
  <!-- Left ear swept back -->
  <path d="M 14 30 C 8 20, 10 8, 18 6 C 24 4, 30 10, 30 20
           C 28 12, 22 10, 18 14 C 14 20, 16 30, 20 38 Z"
        fill="#C07818"/>

  <!-- HEAD -->
  <path d="M 18 44 C 12 36, 12 24, 18 16 C 24 8, 36 4, 48 6
           C 60 8, 70 16, 72 26 C 74 36, 68 48, 58 52
           C 46 58, 28 56, 20 48 Z"
        fill="url(#rrfur)" filter="url(#rrsh)"/>

  <!-- Right ear (forward, alert) -->
  <path d="M 66 18 C 68 8, 74 2, 80 4 C 84 6, 84 14, 80 22
           C 78 16, 74 10, 70 10 C 68 14, 68 22, 70 28 Z"
        fill="#C07818"/>

  <!-- Snout (pushed forward in run) -->
  <path d="M 52 36 C 44 34, 36 36, 34 42 C 32 48, 36 54, 44 56
           C 52 58, 62 54, 64 48 C 66 42, 60 36, 52 36 Z"
        fill="#C07818"/>
  <path d="M 52 38 C 46 36, 40 38, 38 44 C 36 48, 40 52, 48 54
           C 54 56, 62 52, 62 48 C 62 43, 58 38, 52 38 Z"
        fill="#E8C890"/>

  <!-- Nose -->
  <path d="M 48 40 C 46 38, 46 34, 50 33 C 54 32, 58 34, 58 38
           C 58 42, 54 44, 50 44 C 48 44, 48 42, 48 40 Z"
        fill="#1A0800"/>
  <path d="M 49 34 C 50 33, 53 33, 54 35 C 52 34, 50 34, 49 36 Z"
        fill="rgba(255,255,255,0.5)"/>

  <!-- Mouth panting open wide -->
  <path d="M 38 50 C 44 58, 56 60, 64 54" stroke="#8B3010" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M 40 50 L 40 55 L 46 55 L 46 50 Z" fill="#FFFFFF"/>
  <path d="M 46 50 L 46 55 L 52 55 L 52 50 Z" fill="#FFFFFF"/>
  <path d="M 42 55 C 42 64, 48 68, 54 64 C 58 60, 56 56, 52 56 Z"
        fill="#FF7878"/>
  <path d="M 47 55 L 47 64" stroke="#E05050" stroke-width="1.5"/>

  <!-- Eyes (wide excited run) -->
  <path d="M 20 24 C 20 18, 26 14, 32 16 C 36 18, 38 22, 36 26
           C 34 30, 28 32, 24 30 C 20 28, 20 26, 20 24 Z"
        fill="#FFFAF2"/>
  <path d="M 23 24 C 23 20, 27 17, 31 18 C 35 19, 36 23, 34 26
           C 32 29, 26 30, 24 28 C 22 26, 22 25, 23 24 Z"
        fill="url(#rreye)"/>
  <path d="M 25 23 C 25 21, 28 19, 31 20 C 33 21, 34 24, 32 26 C 30 28, 26 28, 25 26 Z"
        fill="#1A0800"/>
  <path d="M 27 20 C 28 19, 30 19, 31 21 C 30 20, 28 20, 27 21 Z"
        fill="rgba(255,255,255,0.95)"/>
  <path d="M 20 23 C 24 18, 32 18, 36 23" stroke="#5A2808" stroke-width="1.8" fill="none"/>

  <path d="M 46 22 C 46 16, 52 12, 58 14 C 62 16, 64 20, 62 24
           C 60 28, 54 30, 50 28 C 46 26, 46 24, 46 22 Z"
        fill="#FFFAF2"/>
  <path d="M 49 22 C 49 18, 53 15, 57 16 C 61 17, 62 21, 60 24
           C 58 27, 52 28, 50 26 C 48 24, 48 23, 49 22 Z"
        fill="url(#rreye)"/>
  <path d="M 51 21 C 51 19, 54 17, 57 18 C 59 19, 60 22, 58 24 C 56 26, 52 26, 51 24 Z"
        fill="#1A0800"/>
  <path d="M 53 18 C 54 17, 56 17, 57 19 C 56 18, 54 18, 53 19 Z"
        fill="rgba(255,255,255,0.95)"/>
  <path d="M 46 21 C 50 16, 58 16, 62 21" stroke="#5A2808" stroke-width="1.8" fill="none"/>

  <!-- Bandana swept back -->
  <path d="M 16 52 C 24 58, 40 62, 60 58 C 54 64, 38 66, 26 62 Z"
        fill="#CC1818"/>
  <path d="M 16 52 C 24 56, 40 60, 60 58 C 40 64, 24 62, 16 58 Z"
        fill="#DD2424"/>
  <path d="M 16 52 C 14 48, 12 46, 10 50 C 8 54, 10 60, 14 58 C 12 56, 12 52, 14 52 Z"
        fill="#CC1818"/>
  <path d="M 14 58 L 8 70 M 14 56 L 6 52" stroke="#CC1818" stroke-width="2.5" stroke-linecap="round"/>
</svg>`,


  // ─────────────────────────────────────────────
  // CROW — Glossy black bird, menacing on tile
  // ─────────────────────────────────────────────
  crow: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 100" width="90" height="100">
  <defs>
    <radialGradient id="cwing" cx="30%" cy="25%" r="70%">
      <stop offset="0%" stop-color="#2A2A4E"/>
      <stop offset="100%" stop-color="#0D0D1E"/>
    </radialGradient>
    <radialGradient id="chead" cx="35%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#1E1E38"/>
      <stop offset="100%" stop-color="#0A0A18"/>
    </radialGradient>
    <linearGradient id="csheen" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(80,100,255,0.3)"/>
      <stop offset="100%" stop-color="rgba(80,100,255,0)"/>
    </linearGradient>
    <filter id="cs"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#00000040"/></filter>
  </defs>

  <!-- Shadow -->
  <ellipse cx="45" cy="97" rx="28" ry="5" fill="#00000022"/>

  <!-- LEFT WING -->
  <path d="M 35 55 Q 5 35 8 60 Q 15 72 35 65 Z" fill="url(#cwing)"/>
  <path d="M 35 55 Q 5 35 8 60" stroke="#0A0A18" stroke-width="1" fill="none"/>
  <!-- Wing feather detail -->
  <path d="M 15 52 Q 12 60 20 62" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" fill="none"/>
  <path d="M 10 56 Q 9 64 16 66" stroke="rgba(255,255,255,0.06)" stroke-width="1.5" fill="none"/>

  <!-- RIGHT WING -->
  <path d="M 55 55 Q 85 35 82 60 Q 75 72 55 65 Z" fill="url(#cwing)"/>
  <path d="M 55 55 Q 85 35 82 60" stroke="#0A0A18" stroke-width="1" fill="none"/>

  <!-- BODY -->
  <ellipse cx="45" cy="68" rx="20" ry="25" fill="#16163A" filter="url(#cs)"/>
  <!-- Body sheen -->
  <ellipse cx="38" cy="58" rx="10" ry="8" fill="url(#csheen)"/>

  <!-- TAIL FEATHERS -->
  <path d="M 36 90 Q 45 96 54 90 Q 50 82 45 84 Q 40 82 36 90 Z" fill="#0A0A18"/>
  <path d="M 42 88 L 42 95" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  <path d="M 45 87 L 45 96" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  <path d="M 48 88 L 48 95" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>

  <!-- HEAD -->
  <circle cx="45" cy="34" r="22" fill="url(#chead)" filter="url(#cs)"/>
  <!-- Iridescent head sheen -->
  <ellipse cx="38" cy="26" rx="11" ry="7" fill="url(#csheen)"/>

  <!-- BEAK -->
  <path d="M 58 32 L 74 35 L 58 40 Z" fill="#E8C21A"/>
  <path d="M 58 32 L 74 35" stroke="#B89010" stroke-width="1"/>
  <!-- Beak nostril -->
  <ellipse cx="63" cy="34" rx="2" ry="1.5" fill="#B89010"/>

  <!-- EYE -->
  <circle cx="55" cy="28" r="8" fill="#FFF"/>
  <circle cx="56" cy="28" r="5.5" fill="#1A1A1A"/>
  <circle cx="57.5" cy="26.5" r="2" fill="#FFF"/>
  <!-- Eye ring -->
  <circle cx="55" cy="28" r="8" fill="none" stroke="#0A0A18" stroke-width="1.5"/>

  <!-- FEET -->
  <line x1="38" y1="92" x2="38" y2="100" stroke="#D87818" stroke-width="3" stroke-linecap="round"/>
  <line x1="38" y1="100" x2="30" y2="104" stroke="#D87818" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="38" y1="100" x2="38" y2="106" stroke="#D87818" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="38" y1="100" x2="46" y2="104" stroke="#D87818" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="52" y1="92" x2="52" y2="100" stroke="#D87818" stroke-width="3" stroke-linecap="round"/>
  <line x1="52" y1="100" x2="44" y2="104" stroke="#D87818" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="52" y1="100" x2="52" y2="106" stroke="#D87818" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="52" y1="100" x2="60" y2="104" stroke="#D87818" stroke-width="2.5" stroke-linecap="round"/>
</svg>`,

  // ─────────────────────────────────────────────
  // MOLE — Round, cute, emerging from dirt
  // ─────────────────────────────────────────────
  mole: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 110" width="100" height="110">
  <defs>
    <radialGradient id="mbody" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#A07848"/>
      <stop offset="100%" stop-color="#6A4E28"/>
    </radialGradient>
    <radialGradient id="mhead" cx="38%" cy="32%" r="60%">
      <stop offset="0%" stop-color="#A07848"/>
      <stop offset="100%" stop-color="#7A5A30"/>
    </radialGradient>
    <radialGradient id="mdirt" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#B88A3A"/>
      <stop offset="100%" stop-color="#7A5A14"/>
    </radialGradient>
    <filter id="ms"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#00000040"/></filter>
  </defs>

  <!-- DIRT MOUND -->
  <ellipse cx="50" cy="95" rx="44" ry="16" fill="#7A5A14"/>
  <ellipse cx="50" cy="90" rx="40" ry="14" fill="#9A7428"/>
  <ellipse cx="50" cy="86" rx="36" ry="12" fill="url(#mdirt)"/>
  <!-- Dirt texture dots -->
  <circle cx="32" cy="88" r="2.5" fill="#6A4A10" opacity="0.6"/>
  <circle cx="58" cy="90" r="2" fill="#6A4A10" opacity="0.5"/>
  <circle cx="70" cy="87" r="2" fill="#6A4A10" opacity="0.6"/>
  <circle cx="22" cy="90" r="1.5" fill="#6A4A10" opacity="0.4"/>

  <!-- BODY (emerging) -->
  <ellipse cx="50" cy="62" rx="28" ry="30" fill="url(#mbody)" filter="url(#ms)"/>
  <!-- Belly -->
  <ellipse cx="50" cy="68" rx="15" ry="20" fill="#C4A882"/>
  <ellipse cx="50" cy="70" rx="10" ry="15" fill="#D4B892"/>

  <!-- CLAWS (left) -->
  <ellipse cx="22" cy="72" rx="12" ry="8" transform="rotate(-20 22 72)" fill="#FFCDD2"/>
  <ellipse cx="16" cy="76" rx="4" ry="5.5" transform="rotate(-15 16 76)" fill="#E0B0B0"/>
  <ellipse cx="22" cy="79" rx="4" ry="5.5" fill="#E0B0B0"/>
  <ellipse cx="28" cy="76" rx="4" ry="5.5" transform="rotate(15 28 76)" fill="#E0B0B0"/>

  <!-- CLAWS (right) -->
  <ellipse cx="78" cy="72" rx="12" ry="8" transform="rotate(20 78 72)" fill="#FFCDD2"/>
  <ellipse cx="72" cy="76" rx="4" ry="5.5" transform="rotate(-15 72 76)" fill="#E0B0B0"/>
  <ellipse cx="78" cy="79" rx="4" ry="5.5" fill="#E0B0B0"/>
  <ellipse cx="84" cy="76" rx="4" ry="5.5" transform="rotate(15 84 76)" fill="#E0B0B0"/>

  <!-- HEAD -->
  <circle cx="50" cy="32" r="30" fill="url(#mhead)" filter="url(#ms)"/>

  <!-- BIG PINK NOSE -->
  <ellipse cx="50" cy="38" rx="13" ry="9" fill="#FFB6C1"/>
  <ellipse cx="50" cy="36" rx="10" ry="7" fill="#FFC8D0"/>
  <!-- Nostrils -->
  <ellipse cx="45" cy="38" rx="3" ry="2" fill="#E890A0"/>
  <ellipse cx="55" cy="38" rx="3" ry="2" fill="#E890A0"/>
  <!-- Nose highlight -->
  <ellipse cx="43" cy="34" rx="3.5" ry="2" fill="rgba(255,255,255,0.4)"/>

  <!-- EYES with glasses rims -->
  <circle cx="36" cy="24" r="10" fill="none" stroke="#5A3020" stroke-width="2.5"/>
  <circle cx="36" cy="24" r="8" fill="#F0E8D8"/>
  <circle cx="36" cy="24" r="5" fill="#1A0800"/>
  <circle cx="38" cy="22" r="2.2" fill="rgba(255,255,255,0.85)"/>

  <circle cx="64" cy="24" r="10" fill="none" stroke="#5A3020" stroke-width="2.5"/>
  <circle cx="64" cy="24" r="8" fill="#F0E8D8"/>
  <circle cx="64" cy="24" r="5" fill="#1A0800"/>
  <circle cx="66" cy="22" r="2.2" fill="rgba(255,255,255,0.85)"/>

  <!-- Glasses bridge -->
  <line x1="46" y1="24" x2="54" y2="24" stroke="#5A3020" stroke-width="2.5"/>

  <!-- Ears (tiny, round) -->
  <ellipse cx="26" cy="10" rx="8" ry="7" fill="#8B6040"/>
  <ellipse cx="26" cy="10" rx="5" ry="4.5" fill="#C4826A"/>
  <ellipse cx="74" cy="10" rx="8" ry="7" fill="#8B6040"/>
  <ellipse cx="74" cy="10" rx="5" ry="4.5" fill="#C4826A"/>

  <!-- Smile -->
  <path d="M 42 46 Q 50 52 58 46" stroke="#8B5030" stroke-width="2" fill="none" stroke-linecap="round"/>
</svg>`,

  // ─────────────────────────────────────────────
  // RABBIT — White fluffy bunny, alert and cute
  // ─────────────────────────────────────────────
  rabbit: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 130" width="90" height="130">
  <defs>
    <radialGradient id="rbody" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#F8F8F8"/>
      <stop offset="100%" stop-color="#D8D8D8"/>
    </radialGradient>
    <radialGradient id="rhead" cx="38%" cy="32%" r="60%">
      <stop offset="0%" stop-color="#FAFAFA"/>
      <stop offset="100%" stop-color="#E0E0E0"/>
    </radialGradient>
    <filter id="rs"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#00000035"/></filter>
  </defs>

  <!-- Shadow -->
  <ellipse cx="45" cy="127" rx="30" ry="5" fill="#00000018"/>

  <!-- BACK LEGS (large, strong) -->
  <ellipse cx="25" cy="100" rx="12" ry="18" transform="rotate(-15 25 100)" fill="#D8D8D8"/>
  <ellipse cx="20" cy="114" rx="14" ry="7" transform="rotate(-10 20 114)" fill="#E8E8E8"/>
  <ellipse cx="65" cy="100" rx="12" ry="18" transform="rotate(15 65 100)" fill="#D8D8D8"/>
  <ellipse cx="70" cy="114" rx="14" ry="7" transform="rotate(10 70 114)" fill="#E8E8E8"/>

  <!-- BODY -->
  <ellipse cx="45" cy="82" rx="26" ry="32" fill="url(#rbody)" filter="url(#rs)"/>
  <!-- Belly fluff -->
  <ellipse cx="45" cy="88" rx="16" ry="20" fill="#FFF"/>
  <!-- Fluffy tail -->
  <circle cx="68" cy="82" r="10" fill="#FFF"/>
  <circle cx="69" cy="80" r="7" fill="#F8F8F8"/>

  <!-- FRONT PAWS -->
  <ellipse cx="30" cy="108" rx="9" ry="12" fill="#D8D8D8"/>
  <ellipse cx="30" cy="118" rx="11" ry="5" fill="#E8E8E8"/>
  <ellipse cx="56" cy="108" rx="9" ry="12" fill="#D8D8D8"/>
  <ellipse cx="56" cy="118" rx="11" ry="5" fill="#E8E8E8"/>

  <!-- HEAD -->
  <circle cx="45" cy="38" r="28" fill="url(#rhead)" filter="url(#rs)"/>

  <!-- LEFT EAR -->
  <ellipse cx="28" cy="10" rx="9" ry="26" transform="rotate(-8 28 10)" fill="#E8E8E8"/>
  <ellipse cx="28" cy="10" rx="5" ry="21" transform="rotate(-8 28 10)" fill="#F8C0CC"/>
  <!-- Ear vein detail -->
  <path d="M 26 -4 Q 28 8 27 20" stroke="rgba(220,120,140,0.5)" stroke-width="1.5" fill="none" transform="rotate(-8 28 10)"/>

  <!-- RIGHT EAR -->
  <ellipse cx="62" cy="10" rx="9" ry="26" transform="rotate(8 62 10)" fill="#E8E8E8"/>
  <ellipse cx="62" cy="10" rx="5" ry="21" transform="rotate(8 62 10)" fill="#F8C0CC"/>
  <path d="M 60 -4 Q 62 8 61 20" stroke="rgba(220,120,140,0.5)" stroke-width="1.5" fill="none" transform="rotate(8 62 10)"/>

  <!-- EYES -->
  <ellipse cx="34" cy="34" rx="9" ry="8.5" fill="#F0F0F0"/>
  <circle cx="34" cy="35" r="6.5" fill="#3A1850"/>
  <circle cx="34" cy="35" r="4.5" fill="#1A0830"/>
  <circle cx="36" cy="32.5" r="2.5" fill="rgba(255,255,255,0.9)"/>
  <circle cx="33" cy="37" r="1" fill="rgba(255,255,255,0.5)"/>

  <ellipse cx="56" cy="34" rx="8" ry="8" fill="#F0F0F0"/>
  <circle cx="56" cy="35" r="6" fill="#3A1850"/>
  <circle cx="56" cy="35" r="4" fill="#1A0830"/>
  <circle cx="57.5" cy="32.5" r="2.2" fill="rgba(255,255,255,0.9)"/>

  <!-- Eyelid / lash arcs -->
  <path d="M 27 31 Q 34 26 41 31" stroke="#888" stroke-width="1.5" fill="none"/>
  <path d="M 49 31 Q 56 26 63 31" stroke="#888" stroke-width="1.5" fill="none"/>

  <!-- NOSE -->
  <ellipse cx="45" cy="46" rx="6" ry="4.5" fill="#FF9999"/>
  <ellipse cx="43" cy="44" rx="3" ry="2" fill="rgba(255,255,255,0.4)"/>

  <!-- MOUTH / TEETH -->
  <path d="M 39 51 Q 45 57 51 51" stroke="#C08080" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <!-- Teeth -->
  <rect x="40" y="51" width="7" height="7" rx="2" fill="#FFF" stroke="#D0D0D0" stroke-width="0.8"/>
  <rect x="48" y="51" width="7" height="7" rx="2" fill="#FFF" stroke="#D0D0D0" stroke-width="0.8"/>

  <!-- Cheek fluff -->
  <circle cx="24" cy="44" r="8" fill="rgba(255,200,200,0.3)"/>
  <circle cx="66" cy="44" r="8" fill="rgba(255,200,200,0.3)"/>
  <!-- Whiskers -->
  <line x1="18" y1="46" x2="38" y2="46" stroke="#C0C0C0" stroke-width="1.2"/>
  <line x1="16" y1="42" x2="36" y2="44" stroke="#C0C0C0" stroke-width="1.2"/>
  <line x1="16" y1="50" x2="36" y2="48" stroke="#C0C0C0" stroke-width="1.2"/>
  <line x1="52" y1="46" x2="72" y2="46" stroke="#C0C0C0" stroke-width="1.2"/>
  <line x1="54" y1="44" x2="74" y2="42" stroke="#C0C0C0" stroke-width="1.2"/>
  <line x1="54" y1="48" x2="74" y2="50" stroke="#C0C0C0" stroke-width="1.2"/>
</svg>`,

  // ─────────────────────────────────────────────
  // CRICKET SWARM — Vibrant green swarm cloud
  // ─────────────────────────────────────────────
  cricket: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 90" width="110" height="90">
  <defs>
    <radialGradient id="ccloud" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="rgba(100,200,80,0.5)"/>
      <stop offset="100%" stop-color="rgba(60,140,40,0)"/>
    </radialGradient>
    <filter id="cglow">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- Swarm cloud glow -->
  <ellipse cx="55" cy="45" rx="50" ry="38" fill="url(#ccloud)"/>

  <!-- Individual crickets — arranged in loose swarm pattern -->
  <!-- Cricket helper: body oval + head + antennae + legs -->

  <!-- Cricket 1 (large, center) -->
  <g transform="translate(55,42) rotate(-10)">
    <ellipse cx="0" cy="0" rx="12" ry="7" fill="#4CAF50"/>
    <ellipse cx="-9" cy="-2" rx="6" ry="5.5" fill="#388E3C"/>
    <circle cx="-12" cy="-4" r="2" fill="#FFF" opacity="0.9"/>
    <circle cx="-12" cy="-4" r="1.2" fill="#111"/>
    <path d="M -14 -6 Q -20 -16 -16 -22" stroke="#2E7D32" stroke-width="1.5" fill="none"/>
    <path d="M -12 -7 Q -18 -14 -22 -16" stroke="#2E7D32" stroke-width="1.5" fill="none"/>
    <line x1="-4" y1="5" x2="-12" y2="12" stroke="#2E7D32" stroke-width="1.5"/>
    <line x1="0" y1="6" x2="-2" y2="14" stroke="#2E7D32" stroke-width="1.5"/>
    <line x1="5" y1="5" x2="8" y2="12" stroke="#2E7D32" stroke-width="1.5"/>
    <line x1="-4" y1="-5" x2="-12" y2="-12" stroke="#2E7D32" stroke-width="1.5"/>
    <line x1="0" y1="-6" x2="-2" y2="-14" stroke="#2E7D32" stroke-width="1.5"/>
    <line x1="5" y1="-5" x2="8" y2="-11" stroke="#2E7D32" stroke-width="1.5"/>
    <!-- Wing -->
    <ellipse cx="4" cy="-2" rx="8" ry="5" fill="rgba(100,200,80,0.4)" stroke="#4CAF50" stroke-width="0.8"/>
  </g>

  <!-- Cricket 2 (top-left) -->
  <g transform="translate(22,22) rotate(15)">
    <ellipse cx="0" cy="0" rx="10" ry="6" fill="#66BB6A"/>
    <ellipse cx="-8" cy="-1.5" rx="5" ry="4.5" fill="#43A047"/>
    <circle cx="-11" cy="-3" r="1.8" fill="#FFF" opacity="0.9"/>
    <circle cx="-11" cy="-3" r="1" fill="#111"/>
    <path d="M -13 -5 Q -18 -13 -15 -18" stroke="#2E7D32" stroke-width="1.3" fill="none"/>
    <path d="M -11 -6 Q -16 -12 -19 -14" stroke="#2E7D32" stroke-width="1.3" fill="none"/>
    <line x1="-3" y1="4" x2="-9" y2="10" stroke="#388E3C" stroke-width="1.3"/>
    <line x1="1" y1="5" x2="0" y2="11" stroke="#388E3C" stroke-width="1.3"/>
    <line x1="5" y1="4" x2="7" y2="10" stroke="#388E3C" stroke-width="1.3"/>
    <ellipse cx="3" cy="-1.5" rx="6" ry="4" fill="rgba(100,200,80,0.35)" stroke="#4CAF50" stroke-width="0.7"/>
  </g>

  <!-- Cricket 3 (top-right) -->
  <g transform="translate(82,18) rotate(-20)">
    <ellipse cx="0" cy="0" rx="10" ry="6" fill="#4CAF50"/>
    <ellipse cx="-7" cy="-1.5" rx="5" ry="4.5" fill="#388E3C"/>
    <circle cx="-10" cy="-3" r="1.8" fill="#FFF" opacity="0.9"/>
    <circle cx="-10" cy="-3" r="1" fill="#111"/>
    <path d="M -12 -5 Q -17 -12 -14 -17" stroke="#2E7D32" stroke-width="1.3" fill="none"/>
    <line x1="-2" y1="4" x2="-8" y2="9" stroke="#388E3C" stroke-width="1.3"/>
    <line x1="2" y1="5" x2="1" y2="10" stroke="#388E3C" stroke-width="1.3"/>
    <line x1="5" y1="4" x2="7" y2="9" stroke="#388E3C" stroke-width="1.3"/>
    <ellipse cx="3" cy="-1" rx="6" ry="3.8" fill="rgba(100,200,80,0.35)" stroke="#4CAF50" stroke-width="0.7"/>
  </g>

  <!-- Cricket 4 (bottom-left) -->
  <g transform="translate(20,65) rotate(5)">
    <ellipse cx="0" cy="0" rx="10" ry="6" fill="#66BB6A"/>
    <ellipse cx="-7" cy="-1.5" rx="5" ry="4.5" fill="#43A047"/>
    <circle cx="-10" cy="-3" r="1.8" fill="#FFF" opacity="0.9"/>
    <circle cx="-10" cy="-3" r="1" fill="#111"/>
    <path d="M -12 -5 Q -17 -12 -13 -17" stroke="#2E7D32" stroke-width="1.3" fill="none"/>
    <line x1="-2" y1="4" x2="-8" y2="9" stroke="#388E3C" stroke-width="1.3"/>
    <line x1="2" y1="5" x2="0" y2="10" stroke="#388E3C" stroke-width="1.3"/>
    <line x1="5" y1="4" x2="7" y2="9" stroke="#388E3C" stroke-width="1.3"/>
    <ellipse cx="3" cy="-1" rx="6" ry="3.8" fill="rgba(100,200,80,0.3)" stroke="#4CAF50" stroke-width="0.7"/>
  </g>

  <!-- Cricket 5 (bottom-right) -->
  <g transform="translate(85,68) rotate(-8)">
    <ellipse cx="0" cy="0" rx="11" ry="6.5" fill="#4CAF50"/>
    <ellipse cx="-8" cy="-1.5" rx="5.5" ry="5" fill="#388E3C"/>
    <circle cx="-11" cy="-3" r="2" fill="#FFF" opacity="0.9"/>
    <circle cx="-11" cy="-3" r="1.2" fill="#111"/>
    <path d="M -13 -5 Q -19 -13 -15 -19" stroke="#2E7D32" stroke-width="1.4" fill="none"/>
    <path d="M -11 -6 Q -17 -13 -20 -14" stroke="#2E7D32" stroke-width="1.4" fill="none"/>
    <line x1="-3" y1="4.5" x2="-9" y2="11" stroke="#388E3C" stroke-width="1.4"/>
    <line x1="1" y1="5.5" x2="0" y2="12" stroke="#388E3C" stroke-width="1.4"/>
    <line x1="5" y1="4.5" x2="8" y2="11" stroke="#388E3C" stroke-width="1.4"/>
    <ellipse cx="4" cy="-1.5" rx="7" ry="4.5" fill="rgba(100,200,80,0.4)" stroke="#4CAF50" stroke-width="0.8"/>
  </g>

  <!-- Small background crickets (less detail, just shapes) -->
  <ellipse cx="40" cy="55" rx="7" ry="4" transform="rotate(25 40 55)" fill="#81C784" opacity="0.7"/>
  <ellipse cx="70" cy="32" rx="6" ry="3.5" transform="rotate(-15 70 32)" fill="#66BB6A" opacity="0.7"/>
  <ellipse cx="35" cy="35" rx="5" ry="3" transform="rotate(10 35 35)" fill="#81C784" opacity="0.6"/>
  <ellipse cx="75" cy="60" rx="5.5" ry="3.2" transform="rotate(-20 75 60)" fill="#4CAF50" opacity="0.65"/>

  <!-- Motion blur streaks for swarm energy -->
  <line x1="10" y1="45" x2="25" y2="42" stroke="#4CAF50" stroke-width="2" opacity="0.25"/>
  <line x1="95" y1="40" x2="80" y2="38" stroke="#4CAF50" stroke-width="2" opacity="0.25"/>
  <line x1="55" y1="10" x2="52" y2="22" stroke="#4CAF50" stroke-width="2" opacity="0.2"/>
</svg>`,

};

// ─────────────────────────────────────────────
// SPRITE LOADER — preloads all SVGs as Images
// ─────────────────────────────────────────────
const SpriteImages = {};
let _spritesLoaded = 0;
let _spritesTotal  = 0;
let _onSpritesReady = null;

function loadSprites(onReady) {
  _onSpritesReady = onReady;
  const entries = Object.entries(SpriteData);
  _spritesTotal = entries.length;
  _spritesLoaded = 0;

  entries.forEach(([key, svg]) => {
    const img = new Image();
    img.onload  = () => { _spritesLoaded++; if (_spritesLoaded >= _spritesTotal && _onSpritesReady) _onSpritesReady(); };
    img.onerror = () => { _spritesLoaded++; console.warn('Sprite failed:', key); if (_spritesLoaded >= _spritesTotal && _onSpritesReady) _onSpritesReady(); };
    img.src = 'data:image/svg+xml,' + encodeURIComponent(svg);
    SpriteImages[key] = img;
  });
}

// ─────────────────────────────────────────────
// HIGH-LEVEL DRAW FUNCTIONS using loaded sprites
// These replace the canvas-drawing equivalents in entities.js Sprites object
// ─────────────────────────────────────────────
const SpriteRenderer = {

  drawDog(ctx, x, y, size, state, animTime) {
    const isRun  = state === 'running';
    const img    = isRun ? SpriteImages.rexRun : SpriteImages.rex;
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Fallback to canvas drawing if not loaded
      Sprites.drawDog(ctx, x, y, size, state, animTime);
      return;
    }

    ctx.save();
    const scale  = size / (isRun ? 140 : 120);
    const natW   = isRun ? 140 : 120;
    const natH   = isRun ? 110 : 130;
    const drawW  = natW * scale;
    const drawH  = natH * scale;

    // Idle bob
    const bob = (state === 'idle')
      ? Math.sin(animTime * 2.5) * 2.5
      : 0;

    // Running leg bob
    const runBob = isRun ? Math.abs(Math.sin(animTime * 18)) * 4 : 0;

    ctx.translate(x, y + bob + runBob);

    // For running, anchor at belly/legs (y = natH*0.85 from top)
    // For idle, anchor at bottom (y = natH from top)
    const anchorY = isRun ? drawH * 0.9 : drawH * 0.92;
    ctx.drawImage(img, -drawW / 2, -anchorY, drawW, drawH);

    // Bark bubble (drawn separately by Dog.draw)
    ctx.restore();
  },

  drawCrow(ctx, x, y, size, animTime) {
    const img = SpriteImages.crow;
    if (!img || !img.complete || img.naturalWidth === 0) {
      Sprites.drawCrow(ctx, x, y, size, animTime);
      return;
    }
    ctx.save();
    const scale = size / 90;
    const w = 90 * scale, h = 100 * scale;
    // Wing flap: slight vertical bob
    const flapBob = Math.sin(animTime * 7) * 3 * scale;
    ctx.translate(x, y + flapBob);
    ctx.drawImage(img, -w / 2, -h * 0.88, w, h);
    ctx.restore();
  },

  drawMole(ctx, x, y, size, animTime) {
    const img = SpriteImages.mole;
    if (!img || !img.complete || img.naturalWidth === 0) {
      Sprites.drawMole(ctx, x, y, size, animTime);
      return;
    }
    ctx.save();
    const scale = size / 100;
    const w = 100 * scale, h = 110 * scale;
    // Pop up: slight vertical bob
    const bob = Math.sin(animTime * 3.5) * 2.5 * scale;
    ctx.translate(x, y + bob);
    ctx.drawImage(img, -w / 2, -h * 0.82, w, h);
    ctx.restore();
  },

  drawRabbit(ctx, x, y, size, animTime, isHopping) {
    const img = SpriteImages.rabbit;
    if (!img || !img.complete || img.naturalWidth === 0) {
      Sprites.drawRabbit(ctx, x, y, size, animTime, isHopping);
      return;
    }
    ctx.save();
    const scale   = size / 90;
    const w = 90 * scale, h = 130 * scale;
    // Hop squash/stretch
    let sx = 1, sy = 1;
    if (isHopping) {
      const hop = Math.abs(Math.sin(animTime * 12));
      sx = 1 - hop * 0.15;
      sy = 1 + hop * 0.2;
    } else {
      // Idle ear twitch
      const twitch = Math.sin(animTime * 1.8) * 0.02;
      sx = 1 + twitch; sy = 1 - twitch * 0.5;
    }
    ctx.translate(x, y);
    ctx.scale(sx, sy);
    ctx.drawImage(img, -w / 2, -h * 0.90, w, h);
    ctx.restore();
  },

  drawCricketSwarm(ctx, x, y, size, animTime) {
    const img = SpriteImages.cricket;
    if (!img || !img.complete || img.naturalWidth === 0) {
      Sprites.drawCricketSwarm(ctx, x, y, size, animTime);
      return;
    }
    ctx.save();
    const scale = size / 110;
    const w = 110 * scale, h = 90 * scale;
    // Swarm vibration
    const vx = Math.sin(animTime * 11) * 2.5 * scale;
    const vy = Math.cos(animTime * 9)  * 2   * scale;
    ctx.translate(x + vx, y + vy);
    ctx.drawImage(img, -w / 2, -h * 0.6, w, h);
    ctx.restore();
  },
};
