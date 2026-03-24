// sprites.js — High-quality SVG sprite definitions and loader
// All sprites are inline SVGs converted to data URIs and preloaded as Image objects.
// Design language: FarmVille 3 chibi — big rounded shapes, warm colors, expressive faces.

const SpriteData = {

  // ─────────────────────────────────────────────
  // REX — Border Collie, front-facing chibi style
  // Brown saddle, white blaze, red bandana, big round eyes, happy mouth
  // ─────────────────────────────────────────────
  rex: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 130" width="120" height="130">
  <defs>
    <radialGradient id="bodyGrad" cx="40%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#D87030"/>
      <stop offset="100%" stop-color="#A84818"/>
    </radialGradient>
    <radialGradient id="headGrad" cx="40%" cy="35%" r="55%">
      <stop offset="0%" stop-color="#D87030"/>
      <stop offset="100%" stop-color="#B05020"/>
    </radialGradient>
    <radialGradient id="eyeGrad" cx="35%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#7B3810"/>
      <stop offset="100%" stop-color="#3A1808"/>
    </radialGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#00000033"/>
    </filter>
  </defs>

  <!-- Ground shadow -->
  <ellipse cx="60" cy="126" rx="38" ry="6" fill="#00000020"/>

  <!-- TAIL (behind body) -->
  <g transform="translate(96,68) rotate(-35)">
    <ellipse cx="0" cy="-16" rx="5" ry="16" fill="#A04010"/>
    <ellipse cx="1" cy="-32" rx="8" ry="11" fill="#EDE8DF"/>
    <ellipse cx="0" cy="-34" rx="5" ry="7" fill="#FFF"/>
  </g>

  <!-- BODY -->
  <ellipse cx="62" cy="80" rx="32" ry="22" fill="url(#bodyGrad)" filter="url(#shadow)"/>
  <!-- White belly -->
  <ellipse cx="52" cy="88" rx="20" ry="15" fill="#F5F0E8"/>
  <ellipse cx="48" cy="85" rx="13" ry="11" fill="#FFF"/>
  <!-- White shoulder patch -->
  <ellipse cx="38" cy="68" rx="12" ry="9" fill="#EDE8DF"/>

  <!-- BACK LEGS -->
  <ellipse cx="78" cy="102" rx="7" ry="13" fill="#A04010"/>
  <ellipse cx="78" cy="114" rx="8" ry="5" fill="#EDE8DF"/>
  <ellipse cx="44" cy="102" rx="7" ry="13" fill="#A04010"/>
  <ellipse cx="44" cy="114" rx="8" ry="5" fill="#EDE8DF"/>

  <!-- NECK -->
  <ellipse cx="34" cy="72" rx="14" ry="12" fill="#B84C14"/>
  <!-- White chest ruff -->
  <ellipse cx="28" cy="80" rx="12" ry="17" fill="#F5F0E8"/>
  <ellipse cx="24" cy="77" rx="8" ry="13" fill="#FFF"/>

  <!-- FRONT LEGS -->
  <ellipse cx="26" cy="102" rx="7" ry="13" fill="#A04010"/>
  <ellipse cx="26" cy="114" rx="8" ry="5" fill="#EDE8DF"/>
  <ellipse cx="40" cy="102" rx="7" ry="13" fill="#A04010"/>
  <ellipse cx="40" cy="114" rx="8" ry="5" fill="#EDE8DF"/>

  <!-- ── HEAD ── -->
  <!-- Left floppy ear -->
  <ellipse cx="12" cy="36" rx="10" ry="18" transform="rotate(-10 12 36)" fill="#8B3208"/>
  <ellipse cx="13" cy="37" rx="6" ry="13" transform="rotate(-10 13 37)" fill="#C05018"/>

  <!-- HEAD base -->
  <circle cx="42" cy="38" r="28" fill="url(#headGrad)" filter="url(#shadow)"/>

  <!-- Right semi-prick ear -->
  <ellipse cx="64" cy="18" rx="10" ry="16" transform="rotate(15 64 18)" fill="#8B3208"/>
  <ellipse cx="64" cy="17" rx="6" ry="11" transform="rotate(15 64 17)" fill="#C05018"/>
  <!-- Folded white ear tip -->
  <ellipse cx="67" cy="8" rx="7" ry="7" fill="#EDE8DF"/>

  <!-- WIDE WHITE BLAZE — the Buddy trademark -->
  <ellipse cx="44" cy="42" rx="16" ry="26" fill="#EDE8DF"/>
  <ellipse cx="44" cy="42" rx="12" ry="21" fill="#FFF"/>
  <!-- Brown eye patches on blaze -->
  <ellipse cx="36" cy="30" rx="9" ry="6" transform="rotate(-10 36 30)" fill="#C05018"/>
  <ellipse cx="52" cy="31" rx="7" ry="5.5" transform="rotate(10 52 31)" fill="#C05018"/>

  <!-- SNOUT -->
  <ellipse cx="58" cy="44" rx="13" ry="10" fill="#C86030"/>
  <ellipse cx="59" cy="45" rx="10" ry="8" fill="#EDE8DF"/>

  <!-- NOSE -->
  <ellipse cx="66" cy="42" rx="6" ry="5" fill="#100800"/>
  <ellipse cx="64" cy="40" rx="2.5" ry="1.8" fill="rgba(255,255,255,0.45)"/>

  <!-- OPEN HAPPY MOUTH -->
  <path d="M 52 52 Q 60 60 70 56" stroke="#AA1818" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <!-- Tongue -->
  <ellipse cx="64" cy="59" rx="6" ry="8" fill="#FF7070"/>
  <line x1="64" y1="52" x2="64" y2="66" stroke="#E04848" stroke-width="1.5"/>
  <!-- Teeth -->
  <rect x="52" y="52" width="18" height="5" rx="2" fill="#FFF"/>

  <!-- EYES -->
  <!-- White sclera -->
  <ellipse cx="34" cy="26" rx="9" ry="8" fill="#FFF8F0"/>
  <ellipse cx="50" cy="27" rx="8" ry="7.5" fill="#FFF8F0"/>
  <!-- Iris warm brown -->
  <circle cx="35" cy="27" r="6.5" fill="url(#eyeGrad)"/>
  <circle cx="51" cy="27" r="6" fill="url(#eyeGrad)"/>
  <!-- Pupil -->
  <circle cx="36" cy="27" r="3.8" fill="#080400"/>
  <circle cx="52" cy="27" r="3.5" fill="#080400"/>
  <!-- Shine -->
  <circle cx="37.5" cy="25" r="2.2" fill="rgba(255,255,255,0.9)"/>
  <circle cx="53.5" cy="25" r="2" fill="rgba(255,255,255,0.9)"/>
  <!-- Eyelid arc -->
  <path d="M 28 24 Q 35 19 42 24" stroke="#4A1804" stroke-width="2" fill="none"/>
  <path d="M 44 25 Q 50 20 57 25" stroke="#4A1804" stroke-width="2" fill="none"/>
  <!-- Eyebrow spots -->
  <ellipse cx="35" cy="19" rx="5" ry="3" fill="#8B3010"/>
  <ellipse cx="51" cy="20" rx="4.5" ry="2.8" fill="#8B3010"/>

  <!-- RED BANDANA / COLLAR -->
  <path d="M 22 62 Q 42 70 60 62" stroke="#CC1818" stroke-width="5" stroke-linecap="round" fill="none"/>
  <!-- Bandana knot + tails -->
  <circle cx="22" cy="62" r="5" fill="#DD2020"/>
  <path d="M 18 62 L 12 72 M 18 62 L 14 58" stroke="#DD2020" stroke-width="3" stroke-linecap="round"/>
  <!-- Gold tag -->
  <circle cx="42" cy="68" r="5" fill="#F6D233" stroke="#C88800" stroke-width="1.5"/>
  <text x="42" y="72" text-anchor="middle" font-size="6" font-weight="bold" fill="#7A5010">R</text>
</svg>`,

  // ─────────────────────────────────────────────
  // REX RUNNING — elongated pose, legs extended
  // ─────────────────────────────────────────────
  rexRun: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 110" width="140" height="110">
  <defs>
    <radialGradient id="bGr" cx="40%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#D87030"/><stop offset="100%" stop-color="#A84818"/>
    </radialGradient>
    <radialGradient id="hGr" cx="40%" cy="35%" r="55%">
      <stop offset="0%" stop-color="#D87030"/><stop offset="100%" stop-color="#B05020"/>
    </radialGradient>
    <radialGradient id="eGr" cx="35%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#7B3810"/><stop offset="100%" stop-color="#3A1808"/>
    </radialGradient>
  </defs>

  <!-- Shadow (elongated when running) -->
  <ellipse cx="70" cy="106" rx="48" ry="5" fill="#00000018"/>

  <!-- TAIL (raised high, wagging) -->
  <g transform="translate(118,52) rotate(-60)">
    <ellipse cx="0" cy="-14" rx="5" ry="14" fill="#A04010"/>
    <ellipse cx="2" cy="-27" rx="9" ry="12" fill="#EDE8DF"/>
    <ellipse cx="1" cy="-29" rx="5.5" ry="7.5" fill="#FFF"/>
  </g>

  <!-- BACK LEGS (extended back) -->
  <ellipse cx="100" cy="84" rx="6" ry="18" transform="rotate(25 100 84)" fill="#A04010"/>
  <ellipse cx="108" cy="97" rx="9" ry="5" fill="#EDE8DF"/>
  <ellipse cx="84" cy="84" rx="6" ry="16" transform="rotate(15 84 84)" fill="#904010"/>
  <ellipse cx="90" cy="96" rx="8" ry="4.5" fill="#EDE8DF"/>

  <!-- BODY (elongated) -->
  <ellipse cx="74" cy="66" rx="38" ry="19" fill="url(#bGr)"/>
  <!-- White belly -->
  <ellipse cx="62" cy="74" rx="26" ry="13" fill="#F5F0E8"/>
  <ellipse cx="55" cy="71" rx="17" ry="10" fill="#FFF"/>

  <!-- NECK -->
  <ellipse cx="38" cy="60" rx="14" ry="11" fill="#B84C14"/>
  <!-- White chest ruff -->
  <ellipse cx="30" cy="67" rx="13" ry="16" fill="#F5F0E8"/>
  <ellipse cx="26" cy="65" rx="8.5" ry="12" fill="#FFF"/>

  <!-- FRONT LEGS (extended forward) -->
  <ellipse cx="22" cy="82" rx="6" ry="18" transform="rotate(-25 22 82)" fill="#A04010"/>
  <ellipse cx="14" cy="93" rx="9" ry="5" fill="#EDE8DF"/>
  <ellipse cx="36" cy="84" rx="6" ry="16" transform="rotate(-15 36 84)" fill="#904010"/>
  <ellipse cx="30" cy="94" rx="8" ry="4.5" fill="#EDE8DF"/>

  <!-- DUST PUFFS -->
  <circle cx="120" cy="100" r="5" fill="#D4A84A" opacity="0.4"/>
  <circle cx="130" cy="95" r="3.5" fill="#D4A84A" opacity="0.25"/>

  <!-- HEAD -->
  <!-- Left floppy ear (swept back when running) -->
  <ellipse cx="16" cy="30" rx="9" ry="17" transform="rotate(20 16 30)" fill="#8B3208"/>
  <ellipse cx="17" cy="31" rx="5.5" ry="12" transform="rotate(20 17 31)" fill="#C05018"/>

  <!-- Head -->
  <circle cx="38" cy="34" r="27" fill="url(#hGr)"/>

  <!-- Right ear (swept back) -->
  <ellipse cx="56" cy="14" rx="9" ry="15" transform="rotate(30 56 14)" fill="#8B3208"/>
  <ellipse cx="57" cy="13" rx="5.5" ry="10" transform="rotate(30 57 13)" fill="#C05018"/>
  <ellipse cx="60" cy="6" rx="6" ry="6" fill="#EDE8DF"/>

  <!-- White blaze -->
  <ellipse cx="40" cy="38" rx="15" ry="24" fill="#EDE8DF"/>
  <ellipse cx="40" cy="38" rx="11" ry="19" fill="#FFF"/>
  <!-- Brown eye patches -->
  <ellipse cx="33" cy="27" rx="8.5" ry="5.5" transform="rotate(-8 33 27)" fill="#C05018"/>
  <ellipse cx="47" cy="28" rx="7" ry="5" transform="rotate(8 47 28)" fill="#C05018"/>

  <!-- Snout -->
  <ellipse cx="54" cy="40" rx="12" ry="9" fill="#C86030"/>
  <ellipse cx="55" cy="41" rx="9.5" ry="7.5" fill="#EDE8DF"/>

  <!-- Nose -->
  <ellipse cx="62" cy="38" rx="5.5" ry="4.5" fill="#100800"/>
  <ellipse cx="60.5" cy="36.5" rx="2" ry="1.5" fill="rgba(255,255,255,0.45)"/>

  <!-- Open mouth (tongue out, panting) -->
  <path d="M 48 48 Q 56 56 66 52" stroke="#AA1818" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <ellipse cx="60" cy="55" rx="5.5" ry="7.5" fill="#FF7070"/>
  <line x1="60" y1="49" x2="60" y2="62" stroke="#E04848" stroke-width="1.5"/>
  <rect x="48" y="48" width="16" height="4.5" rx="2" fill="#FFF"/>

  <!-- Eyes (excited, wide) -->
  <ellipse cx="30" cy="23" rx="8.5" ry="8" fill="#FFF8F0"/>
  <ellipse cx="45" cy="24" rx="7.5" ry="7" fill="#FFF8F0"/>
  <circle cx="31" cy="24" r="6" fill="url(#eGr)"/>
  <circle cx="46" cy="24" r="5.5" fill="url(#eGr)"/>
  <circle cx="32" cy="24" r="3.5" fill="#080400"/>
  <circle cx="47" cy="24" r="3.2" fill="#080400"/>
  <circle cx="33.5" cy="22" r="2" fill="rgba(255,255,255,0.9)"/>
  <circle cx="48.5" cy="22" r="1.8" fill="rgba(255,255,255,0.9)"/>
  <path d="M 24 21 Q 31 16 38 21" stroke="#4A1804" stroke-width="1.8" fill="none"/>
  <path d="M 39 22 Q 45 17 52 22" stroke="#4A1804" stroke-width="1.8" fill="none"/>

  <!-- Bandana -->
  <path d="M 18 57 Q 36 65 54 57" stroke="#CC1818" stroke-width="4.5" stroke-linecap="round" fill="none"/>
  <circle cx="18" cy="57" r="4.5" fill="#DD2020"/>
  <path d="M 14 57 L 8 67 M 14 57 L 10 53" stroke="#DD2020" stroke-width="2.5" stroke-linecap="round"/>
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
