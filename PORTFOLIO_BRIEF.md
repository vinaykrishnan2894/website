# Portfolio Redesign Brief — vinaykrishnan.in

## YOUR MISSION
Redesign vinaykrishnan.in from static HTML → Next.js 14 (App Router + TypeScript + Tailwind CSS) with static export for GitHub Pages. Work on branch: redesign/nextjs. Do NOT push — commit locally only.

## TECHNICAL REQUIREMENTS
- Next.js 14+ App Router
- TypeScript
- Tailwind CSS
- Static export: `output: 'export'` in next.config.ts
- `unoptimized: true` for next/image
- NO basePath needed (custom domain via CNAME handles routing)
- /public/CNAME → content: `vinaykrishnan.in`
- /public/.nojekyll → empty file
- No API routes, no ISR, no server components that fetch at runtime

## REPO LOCATION
~/Downloads/website-repo

## ASSETS
- Profile photo: ~/Downloads/profile-photo.jpg → copy to public/images/profile-photo.jpg
- Resume: Vinay_Krishnan_Resume.pdf (already in repo root) → copy to public/
- PokerBoss screenshots: ~/Downloads/PokerBoss\ screenshots/ → copy to public/images/pokerboss/
- Pokerbaazi screenshots: ~/Downloads/Pokerbaazi\ screenshots/ → copy to public/images/pokerbaazi/
- PokerBoss logos: ~/Downloads/pokerboss-logo-image.png, pokerboss-logo-image-container.png → public/images/pokerboss/
- Existing project images: assets/images/ → public/images/

## DESIGN SYSTEM
Inspired by PokerBoss app (dark, premium, product-led) — adapted for professional PM portfolio.

```css
--bg-primary: #0A0E1A       /* deep navy-black */
--bg-secondary: #111827     /* card backgrounds */
--bg-card: rgba(255,255,255,0.05)
--bg-card-hover: rgba(255,255,255,0.08)
--accent-blue: #3B7DED      /* primary CTA, highlights */
--accent-gold: #F5C542      /* achievements, featured badge */
--text-primary: #F0F0F0
--text-secondary: #8899AA
--border-subtle: rgba(255,255,255,0.06)
--radius-card: 14px
```

Typography: Use `next/font` with Inter or Geist Sans.
Section headers: bold, ALL-CAPS, wide letter-spacing.
Cards: rounded-2xl, semi-transparent dark bg, subtle border, blue glow on hover.
Buttons: solid blue primary, ghost outline secondary.
Spacing: generous — this site breathes.

## SITE ARCHITECTURE (5 pages)
1. `/` — Home
2. `/work` — Work / Case Studies
3. `/about` — About
4. `/resume` — Resume
5. `/contact` — Contact

Remove blogs page entirely.

## PAGE CONTENT

### PAGE 1: HOME (/)
**Hero section:**
- Name: Vinay Krishnan
- Title: Senior Product Manager
- Brand statement: "I build product systems that people trust — from real-time multiplayer engines to club ops platforms. I'm drawn to the messy, high-stakes problems where the UX, the architecture, and the business model all have to work together."
- CTA buttons: "See My Work" → /work, "Download Resume" → /resume
- Profile photo (profile-photo.jpg) — circular or subtle framed, right side of hero
- Experience badge: 6+ Years

**Featured Work section (3 cards):**
1. PokerBoss — "Club-based Poker OS, built 0→1" — FEATURED badge in gold
2. Loco Studio — "Creator tools for India's gaming-streaming platform"
3. One more from existing site

**Skills/Tools strip:**
Product Strategy · Roadmapping · PRDs · Real-time Systems · Data Analytics · A/B Testing · Unity (collab) · React/Next.js (back-office) · SQL · Mixpanel · Figma · JIRA · Sprint Planning · GTM

**CTA banner:** "Currently open to Senior PM roles — Remote or Bangalore"

---

### PAGE 2: WORK (/work)
Filter pills: All | 0→1 Builds | Growth | Gaming | B2C

**FLAGSHIP — PokerBoss Case Study (full expanded card or dedicated section):**

One-liner: "A club-based real-money poker ecosystem built from scratch: mobile client + real-time multiplayer backend + back-office control plane."

Why it exists: The real challenge in poker isn't the game — it's the business operating system. PokerBoss was built to be that OS: trustworthy, configurable, scalable infrastructure for clubs, agents, and operators to run private poker communities.

Who uses it (3 persona pills): Players · Club Operators · Agents & Admins

What I owned (ownership list):
- Product vision, strategy & roadmap (0 → launch)
- PRDs across Unity client, SmartFox real-time backend, web admin portal
- Back-office product: support, risk, finance, dispute tooling
- Chip economy design: types, sinks/sources, controls, abuse prevention
- Cross-functional execution: engineering, design, QA, legal, marketing
- Launch planning: soft launch → hard launch readiness
- Metrics, instrumentation, operational feedback loops

System diagram (text-based visual using divs/boxes):
Player App (Unity) → Real-time Server (SmartFox) → Game Engine + Persistence → Admin Portal (Control Plane)

Key problem → solution cards (5 cards):
1. Real-time Reliability — Server-authoritative state, reconnect logic, session recovery
2. Dispute Resolution — Hand history logs, action timelines, admin decision tooling
3. Chip Economy Control — Sources/sinks, transfer limits, role-based adjustments, abuse prevention
4. Back-office Permissions — Role-based access: support vs risk vs finance vs super-admin
5. Configurable Tables — Game toggles (Bomb Pot, VPIP, CallTime) with guardrails to prevent broken states

Impact:
- Shipped a full multiplayer poker ecosystem from 0 → soft launch
- Admin portal reduced manual ops load across support, risk, and finance teams
- Server-authoritative validation improved table stability and fairness
- Configurable club controls enabled operators to self-serve game management

Tech stack chips: Unity · SmartFox · React/Next.js · Tailwind · shadcn/ui · Node.js

Use PokerBoss screenshots from public/images/pokerboss/ as visual evidence.

**Other Projects (cards):**
Use content from existing site's projects.html for: Loco Studio, and any others. Make them proper case study cards with: role, problem, what I did, impact.

---

### PAGE 3: ABOUT (/about)

**Hero:**
"I build product systems people trust."

**Personal brand statement:**
"I'm a Senior Product Manager who gravitates toward high-complexity, high-stakes product problems — the kind where user experience, system architecture, and business mechanics all have to click together perfectly. I've spent 6+ years building products in competitive, real-time, and operationally complex domains: gaming platforms, streaming tools, and poker ecosystems.

What drives me is simple: I genuinely care about how people experience the products I build. I'm not satisfied with shipping features — I want to ship systems that feel trustworthy, performant, and human.

Outside of work, I play chess, poker, and basketball. I run deep on strategy games (Dota 2, Elden Ring). I read about neuroscience, decision theory, and body language — because understanding how people think is the most useful skill a PM can have. I bring that same curiosity to every product I work on."

**Career Timeline (vertical, dark cards):**
- Senior Product Manager — Baazi Games (PokerBoss) | 2023 – 2026
- Product Manager — Loco | [dates from resume]
- [Other roles from resume]

**Values section (3-4 cards):**
1. Systems over features — "I think in feedback loops, not task lists."
2. Trust is the product — "In real-time systems, fairness and reliability aren't features. They're the product."
3. Complexity is a gift — "The messiest problems are where the most interesting PM work lives."
4. Ship to learn — "A soft launch teaches you more than 6 months of planning."

---

### PAGE 4: RESUME (/resume)
- Embedded PDF viewer (iframe or object tag pointing to /Vinay_Krishnan_Resume.pdf)
- Download button prominent at top
- Note: "Last updated Feb 2026"

---

### PAGE 5: CONTACT (/contact)
- Short intro: "Open to Senior PM roles (Remote or Bangalore). Let's talk."
- Email: [from existing contact.html or resume]
- LinkedIn: [from existing site]
- Simple contact form (name, email, message) — static, mailto action
- Availability badge: "Available from March 2026"

---

## NAVIGATION
Top navbar: Logo (VK) | Work | About | Resume | Contact
Mobile: hamburger menu
Active state: blue underline/highlight
CTA in nav: "Hire Me" button (blue, small)

## FOOTER
Minimal dark footer: © 2026 Vinay Krishnan · LinkedIn · GitHub · Email

## COMPONENT STRUCTURE
```
src/
  app/
    layout.tsx          # root layout, fonts, metadata
    page.tsx            # Home
    work/page.tsx       # Work/Case Studies
    about/page.tsx      # About
    resume/page.tsx     # Resume
    contact/page.tsx    # Contact
  components/
    layout/
      Navbar.tsx
      Footer.tsx
    ui/
      Button.tsx
      Card.tsx
      Badge.tsx
      SectionHeader.tsx
    home/
      Hero.tsx
      FeaturedWork.tsx
      SkillsStrip.tsx
      CTABanner.tsx
    work/
      ProjectFilter.tsx
      PokerBossCase.tsx
      ProjectCard.tsx
      SystemDiagram.tsx
      ProblemSolutionCards.tsx
    about/
      AboutHero.tsx
      Timeline.tsx
      Values.tsx
    resume/
      ResumeViewer.tsx
    contact/
      ContactForm.tsx
```

## EXECUTION ORDER
1. git checkout -b redesign/nextjs
2. Copy assets (photos, logos, screenshots, resume, CNAME)
3. npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*" --yes (or init manually if conflicts)
4. Configure next.config.ts for static export
5. Set up design tokens in tailwind.config.ts
6. Build components bottom-up: UI → layout → page sections
7. Wire up pages
8. Test build: npm run build (must succeed with no errors)
9. Commit everything with clear messages

## IMPORTANT NOTES
- Write REAL content — no lorem ipsum anywhere
- PokerBoss is the hero — it must be unmissably prominent
- The site should make a hiring manager think "this person ships real, complex products"
- Keep it fast and accessible
- All images must have alt text

When completely finished, run:
openclaw system event --text "Done: Next.js portfolio redesign complete on redesign/nextjs branch — ready for Vinay to review" --mode now
