# CLAUDE.md — Titan Protocol Landing Page

## Project Overview

Build a **world-class landing page** for **Titan Protocol** — a productivity app built around self-optimization, discipline, and gamification (inspired by Solo Leveling XP mechanics). This is NOT a generic SaaS page. This needs to feel like a **tactical command interface** — dark, powerful, precise.

We are using a Framer template ("Landio") as **structural reference only**. The layout patterns, section order, and component hierarchy come from that template. But the visual identity, branding, content, and aesthetic are **100% Titan Protocol**.

**Tech Stack:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion
**Deploy:** Vercel
**Font:** JetBrains Mono (monospace, primary) + Inter (body text, secondary)

---

## Design System — "Titan HUD"

### Core Principles
- Pure black backgrounds — no grays, no off-whites
- White glow accents for emphasis
- Monospace metric displays for data/stats
- Border radius NEVER exceeds 4px
- Everything feels like a heads-up display from a tactical system
- Animations should feel precise and mechanical, not bouncy or playful

### Color Tokens (Tailwind Config)

```js
colors: {
  titan: {
    black: '#000000',        // Primary background — pure black
    surface: '#0A0A0A',      // Card/panel backgrounds
    surface2: '#111111',     // Elevated surfaces
    border: 'rgba(255, 255, 255, 0.08)',  // Subtle borders
    borderHover: 'rgba(255, 255, 255, 0.15)',  // Border on hover
    text: '#E0E0E0',         // Primary text
    textMuted: 'rgba(255, 255, 255, 0.5)',  // Secondary text
    white: '#FFFFFF',        // Headings, emphasis
    glow: '#FFFFFF',         // Glow effects (box-shadow, text-shadow)
    accent: '#A6DAFF',       // Accent blue (from template, can be used sparingly)
    accentGlow: 'rgba(166, 218, 255, 0.15)',  // Subtle accent glow
  }
}
```

### Typography Scale

```js
// Headings — JetBrains Mono
h1: { size: '72px', weight: 500, lineHeight: '1.1', letterSpacing: '-0.02em' }
h2: { size: '44px', weight: 500, lineHeight: '1.2', letterSpacing: '-0.01em' }
h3: { size: '28px', weight: 500, lineHeight: '1.2', letterSpacing: '-0.01em' }
h4: { size: '22px', weight: 700, lineHeight: '1.4', letterSpacing: '-0.02em' }

// Body — Inter
p:    { size: '16px', weight: 400, lineHeight: '1.6', letterSpacing: '-0.01em' }
pSm:  { size: '14px', weight: 400, lineHeight: '1.5', letterSpacing: '-0.01em' }
pXs:  { size: '12px', weight: 400, lineHeight: '1.3', letterSpacing: '0' }
label: { size: '14px', weight: 500, lineHeight: '1.2', letterSpacing: '0.05em', transform: 'uppercase' }
```

### Component Patterns

- **Cards:** Background `surface`, 1px border `border`, 4px radius, hover → border becomes `borderHover` + subtle white glow shadow
- **Buttons (Primary):** White bg, black text, 4px radius, font: JetBrains Mono, uppercase, letter-spacing 0.05em. Hover → subtle glow shadow
- **Buttons (Secondary):** Transparent bg, white border, white text, same radius/font. Hover → fill white, text goes black
- **Section Labels:** Uppercase, monospace, letter-spaced, muted text color, often with a small line or dot prefix
- **Stat/Metric Displays:** JetBrains Mono, large size, white color, with a subtle glow text-shadow
- **Dividers:** 1px solid `border`, full width

### Animation Guidelines (Framer Motion)

**Global Easing:** `[0.25, 0.1, 0.25, 1]` — use everywhere. NO spring/bounce physics.

**Base Animations (defined in `lib/animations.ts`):**
- `fadeUp`: y: 20→0, opacity: 0→1, 0.6s — default for all section entrances
- `fadeDown`: y: -20→0 — for navbar entrance
- `fadeLeft` / `fadeRight`: x: ±30→0 — for side-by-side layouts
- `fadeIn`: opacity only, 0.5s — for overlays and backgrounds
- `scaleIn`: scale 0.95→1, 0.5s — for cards and images
- `staggerContainer`: staggerChildren 0.1s — wrap around groups of animated children

**Per-Section Animation Specs:**

| Section | Animation | Details |
|---------|-----------|---------|
| **Navbar** | Slide down on load, blur on scroll | `initial={{ y: -100 }}` then bg transitions to `bg-black/80 backdrop-blur-xl` after 20px scroll. Mobile drawer slides in from right with `AnimatePresence`. |
| **Hero** | Staggered word reveal + grid bg | Split headline into words, stagger each 0.05s with `fadeUp`. Background uses CSS animated grid pattern (60px grid, shifts diagonally over 20s). Optional: scan-line CRT overlay via `::after` pseudo-element. |
| **Logo Strip** | Infinite horizontal marquee | `animate={{ x: ['0%', '-50%'] }}` with `repeat: Infinity, ease: 'linear', duration: 25s`. Duplicate logo array for seamless loop. |
| **Benefits / Features** | Cards stagger in on scroll | Wrap grid in `staggerContainer`, each card uses `fadeUp`. Cards have hover: `y: -2, borderColor: white/0.15, boxShadow: glow`. |
| **App Showcase** | Mockups fade in from sides | Left panel uses `fadeLeft`, right panel uses `fadeRight`. On mobile, both use `fadeUp`. |
| **Process** | Tab switch with content swap | Steps are clickable tabs. Content swaps using `AnimatePresence mode="wait"` — exit: `opacity→0, y→-10`, enter: `opacity→0→1, y→10→0`, 0.3s each. |
| **Testimonials** | Auto-sliding carousel (5s interval) | Directional slide: enter from right (+80px), exit to left (-80px) or vice versa. Uses `AnimatePresence mode="wait"` with `custom={direction}`. Dot indicators animate width (active: w-6, inactive: w-2). |
| **Stats** | Number counters on scroll | `useInView` triggers `requestAnimationFrame` counter from 0→target over 2s with ease-out cubic (`1 - Math.pow(1-progress, 3)`). Numbers in JetBrains Mono with `textShadow: 0 0 30px rgba(255,255,255,0.2)`. |
| **Pricing** | Toggle morph + price swap | Toggle knob slides via `animate={{ x: yearly ? 24 : 0 }}`. "Save 20%" badge pops in with `scaleIn`. Price numbers swap with `key` change triggering `fadeUp` re-animation. |
| **FAQ** | Accordion expand/collapse | `AnimatePresence` with `height: 0→auto` (0.3s) and `opacity: 0→1` (0.2s, 0.1s delay). Icon rotates 180° on open. Only one item open at a time. |
| **Comparison** | Row-by-row staggered reveal | Wrap table in `staggerContainer`, each row uses `fadeUp` on scroll. Checkmarks in white, X marks in muted. |
| **CTA** | Pulsing radial glow background | CSS `radial-gradient` of accent blue at 6% opacity, scales 1→1.2 over 4s with infinite ease-in-out keyframes. Text uses standard `fadeUp`. |
| **Footer** | Simple fade in | Entire footer uses single `fadeIn` on scroll. No stagger needed. |
| **Page Load** | Orchestrated sequence | Hero uses `initial/animate` (immediate). All other sections use `whileInView` (scroll-triggered). Navbar slides down 0.6s after mount. |

---

## Section-by-Section Build Spec

The following sections are based on the Framer "Landio" template structure, remapped to Titan Protocol content and branding.

---

### 1. Navigation

**Structure:** Fixed top, full-width, transparent bg with backdrop-blur on scroll
**Left:** Titan Protocol logo (text-based: "TITAN" in JetBrains Mono, bold, with subtle glow)
**Center:** Nav links — Features, Process, Pricing, Blog (if applicable)
**Right:** Primary CTA button — "Download Now" or "Get Started"
**Mobile:** Hamburger menu icon, slide-in drawer from right

---

### 2. Hero Section

**This is the money section — go all out.**

- **Badge:** Small pill/tag at top — "SELF-OPTIMIZATION OS" — uppercase, monospace, border, muted
- **Headline:** "Level Up Every Day. Dominate Your Life." — H1, white, JetBrains Mono
- **Subtext:** "The tactical productivity system that turns discipline into XP. Track missions. Build streaks. Become unstoppable." — Inter, muted text
- **CTA Buttons:** "Download for Android" (primary) + "View Features" (secondary/ghost)
- **Hero Visual:** App mockup or screenshot floating with subtle parallax. Consider a dark phone mockup with the Titan Protocol UI glowing on screen.
- **Background:** Pure black with subtle animated grid pattern or scan-line effect. Optional: particle field or matrix-rain-style subtle animation behind the hero text.
- **Stats Bar below hero:** Three metrics in a row — "1000+ Missions Completed" / "20+ Beta Testers" / "4.9★ Rating" — monospace numbers with glow

---

### 3. Benefits Section

**Label:** "WHY TITAN PROTOCOL"
**Headline:** "Built for Those Who Refuse to Stay Average"
**Layout:** 3 cards in a row (stack on mobile)

Cards:
1. **XP-Driven Progress** — "Every task you complete earns XP. Watch yourself level up in real time. Discipline becomes a game you actually want to play."
2. **Mission-Based Productivity** — "Forget boring to-do lists. Break your goals into missions with deadlines, priorities, and tactical execution paths."
3. **Streak & Discipline Engine** — "Build unbreakable habits with streak tracking. Miss a day? Your rank drops. Stay consistent? You ascend."

Each card: icon/illustration at top, H4 title, body text, dark surface bg, subtle border, hover glow.

---

### 4. Features Section

**Label:** "FEATURES"
**Headline:** "Your Complete Tactical Operating System"
**Layout:** 2x3 grid of feature cards

Features:
1. **Mission Control** — "Create, organize, and execute missions with military precision."
2. **XP & Rank System** — "Earn XP for completed tasks. Level up from Recruit to Titan."
3. **Streak Tracker** — "Build daily discipline with visual streak tracking and penalties."
4. **Daily Briefing** — "Start each day with a tactical overview of your priorities."
5. **Progress Analytics** — "Deep stats on your productivity patterns and growth."
6. **Dark Tactical UI** — "Designed for focus. Zero distractions. Pure execution."

---

### 5. App Showcase / Services Section

**Label:** "HOW IT WORKS"
**Headline:** "See Titan Protocol in Action"

This section replaces the "Services" section from the template. Show 3-4 panels/cards with app screenshots or mockup images demonstrating key workflows:
- Creating a mission
- The XP dashboard / rank screen
- Streak calendar view
- Daily briefing screen

Use dark phone mockups. Each panel has a title + short description alongside the mockup.

---

### 6. Process Section

**Label:** "THE PROTOCOL"
**Headline:** "Your Path from Recruit to Titan"
**Layout:** 3 steps with step indicators (01, 02, 03)

Steps:
1. **Define Your Missions** — "Set your goals. Break them into actionable missions. Assign priorities and deadlines."
2. **Execute Daily** — "Complete tasks, earn XP, maintain streaks. The system tracks everything."
3. **Level Up** — "Watch your rank climb. Analyze your patterns. Become the most disciplined version of yourself."

Include a large visual/screenshot for the active step (tabbed or stepped interaction).

---

### 7. Testimonials / Social Proof

**Label:** "EARLY ADOPTERS"
**Headline:** "What Beta Testers Are Saying"

Use a carousel or grid of review cards. Since this is early-stage, can use testimonial-style quotes from beta testers (real or representative).

Each card: quote text, user avatar, name, role/descriptor (e.g., "Beta Tester since Day 1"), star rating.

---

### 8. Stats / Metrics Section

A horizontal band with 4 key metrics, animated number counters:
- "1,000+" Missions Created
- "20+" Beta Users
- "95%" Daily Return Rate
- "4.9" Average Rating

Monospace font, large numbers, white glow text-shadow, black background.

---

### 9. Pricing Section (Optional — include if Titan Protocol has tiers)

**Label:** "PRICING"
**Headline:** "Choose Your Tier"
**Toggle:** Monthly / Yearly (with save badge)

Tiers (from Titan War Room model, adapt if needed):
1. **Recruit (Free)** — Basic missions, limited XP tracking, ads
2. **Operator ($X/month)** — Full features, unlimited missions, streak analytics
3. **Titan ($X/month)** — Everything + priority features, exclusive rank badges, early access

Cards: dark surface bg, border, feature checkmark list, CTA button. "Popular" badge on middle tier.

---

### 10. FAQ Section

**Label:** "FAQ"
**Headline:** "Questions? Answered."

Accordion-style FAQ items:
- "What is Titan Protocol?"
- "Is it free?"
- "What platforms is it available on?"
- "How does the XP system work?"
- "Can I use it for team productivity?"

Dark accordion items, subtle border, expand/collapse with Framer Motion.

---

### 11. Comparison Section (Optional)

**Label:** "WHY US"
**Headline:** "Titan Protocol vs. The Rest"

Simple comparison table:
- Titan Protocol vs Generic To-Do Apps
- Features: XP System ✓/✗, Streaks ✓/✗, Dark Tactical UI ✓/✗, Gamification ✓/✗, Mission Hierarchy ✓/✗

---

### 12. CTA Section

Full-width dark section with centered text:
- **Headline:** "Ready to Level Up?"
- **Subtext:** "Join the protocol. Start earning XP today."
- **CTA Button:** "Download Now" (primary, large)
- Optional: subtle animated background (grid, particles, or scan lines)

---

### 13. Footer

**Layout:** Logo left, link columns center, social icons right
**Links:** Features, Pricing, Blog, Privacy, Terms
**Bottom:** "© 2026 Titan Protocol. Built with discipline."
**Style:** Minimal, dark, 1px top border

---

## Asset Requirements

Claude Code should create placeholder components for:
- App mockup images (use dark rectangles with "APP SCREENSHOT" text as placeholder)
- Logo (text-based "TITAN" in JetBrains Mono with CSS glow — no image needed)
- Icons (use Lucide React icons throughout)
- Team photos (if team section is included — use placeholder avatars)

Screenshots will be provided separately and dropped into `/public/screenshots/`.

---

## File Structure

```
titan-protocol-landing/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout, fonts, metadata
│   │   ├── page.tsx            # Home page composing all sections
│   │   └── globals.css         # Global styles, CSS variables
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── Benefits.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── AppShowcase.tsx
│   │   │   ├── Process.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── Stats.tsx
│   │   │   ├── Pricing.tsx
│   │   │   ├── FAQ.tsx
│   │   │   ├── Comparison.tsx
│   │   │   └── CTA.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Badge.tsx
│   │       ├── SectionLabel.tsx
│   │       ├── AnimatedCounter.tsx
│   │       └── GlowText.tsx
│   └── lib/
│       └── animations.ts       # Shared Framer Motion variants
├── public/
│   ├── screenshots/            # App screenshots go here
│   └── og-image.png
├── tailwind.config.ts
├── next.config.ts
├── package.json
├── tsconfig.json
└── CLAUDE.md
```

---

## Phased Build Plan

### Phase 1 — Scaffold & Design System
- `create-next-app` with TypeScript + Tailwind + App Router
- Configure Tailwind with Titan color tokens, fonts (JetBrains Mono + Inter via next/font)
- Create `globals.css` with CSS variables, base styles
- Build reusable UI components: Button, Card, Badge, SectionLabel, GlowText
- Create shared Framer Motion animation variants in `lib/animations.ts`
- Verify: run dev server, confirm fonts load, colors render, components display

### Phase 2 — Navbar + Hero
- Build fixed Navbar with scroll-aware backdrop blur
- Build Hero section with badge, headline, subtext, CTAs, stats bar
- Add hero background effect (grid pattern or subtle particle animation)
- Add placeholder for app mockup
- Verify: responsive at 375px, 768px, 1280px+

### Phase 3 — Benefits + Features
- Build Benefits section (3-card grid)
- Build Features section (2x3 grid)
- Add scroll-triggered entrance animations
- Add card hover effects (border glow, subtle scale)
- Verify: animations trigger correctly, cards stack on mobile

### Phase 4 — App Showcase + Process
- Build App Showcase section with mockup panels
- Build Process section with stepped layout (01/02/03)
- Add step interaction (click step → show corresponding content/image)
- Verify: responsive, interactions work

### Phase 5 — Testimonials + Stats
- Build Testimonials carousel or grid
- Build Stats section with animated number counters
- Add scroll-triggered counter animation
- Verify: counters animate on scroll into view

### Phase 6 — Pricing + FAQ
- Build Pricing section with monthly/yearly toggle
- Build FAQ accordion with Framer Motion expand/collapse
- Verify: toggle switches plans, FAQ items expand/collapse smoothly

### Phase 7 — Comparison + CTA + Footer
- Build Comparison table
- Build CTA section with background animation
- Build Footer with links and branding
- Verify: all sections complete, page scrolls smoothly

### Phase 8 — Polish & Deploy
- Full responsive audit (mobile, tablet, desktop)
- Performance optimization (lazy load images, optimize fonts)
- SEO: meta tags, OG image, structured data
- Accessibility: focus states, aria labels, semantic HTML
- Smooth scroll behavior for anchor links
- Deploy to Vercel
- Verify: Lighthouse score 90+, all links work, OG preview correct

---

## Content Tone

- **Voice:** Direct, confident, no fluff. Like a drill sergeant who also happens to be a productivity expert.
- **Keywords:** Missions, XP, Rank, Streak, Protocol, Execute, Level Up, Discipline, Tactical
- **Avoid:** "Boost your productivity!" / "Stay organized!" — these are weak. Use language that makes the reader feel like they're joining an elite system.

---

## Reference

The Framer template "Landio" (published at contextual-noodles-420293.framer.app) was used as **structural reference** for section ordering, layout patterns, and component hierarchy. The visual identity, content, and aesthetic are entirely Titan Protocol's "Titan HUD" design language.

### Template Design Tokens (for reference only — DO NOT use directly)
- Template BG: rgb(4, 7, 13) → We use: #000000
- Template Text: rgb(213, 219, 230) → We use: #E0E0E0
- Template Accent: rgb(166, 218, 255) → We keep this as subtle accent
- Template Font: Inter → We use: JetBrains Mono (headings) + Inter (body)
- Template Border: rgba(216, 231, 242, 0.07) → We use: rgba(255, 255, 255, 0.08)
