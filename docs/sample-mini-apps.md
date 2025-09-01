# Lightweight Mini‑Apps (Visitor‑Friendly)

Below is the working list of small, visual mini‑apps that quickly communicate product + engineering craft to non‑technical visitors. Each is scoped to run locally in your Next.js + TypeScript + Tailwind stack with optional stretch goals.

## 1) Landing Page Hero Composer

- What it is: A playful builder to pick vibe, headline, CTA, and color theme; renders a polished hero instantly.
- Why it clicks: Everyone imagines their app’s homepage. Seeing it appear in seconds feels magical.
- Core features:
  - Themes: bold / minimal / playful (3–4)
  - Headline presets (6)
  - CTA styles (2) and subheading text
  - Color palettes (4) + light/dark
  - Export PNG (dom‑to‑image) + shareable URL state
- Stretch: Copy HTML snippet; add background shapes/gradients.

## 2) App Flow Mapper (Snap‑To Screens)

- What it is: Drag prefab nodes (Signup, Feed, Profile, Checkout) and connect arrows; auto‑layout for a clean flow.
- Why it clicks: Turns fuzzy ideas into a concrete “first version.”
- Core features: 10 prefab nodes, snap‑to grid, labels, share URL, export PNG.
- Stretch: Simple step timing / friction notes per edge.

## 3) Brand Moodboard in a Minute

- What it is: Choose 3 adjectives + a color seed; generates palette, type pairing, and UI preview with a compact brand card.
- Why it clicks: Makes a “vibe” tangible.
- Core features: Curated combos, copy tokens, export brand card.
- Stretch: Save/load presets.

## 4) Pricing Page Visualizer

- What it is: Toggle audience and features; generates a clean pricing table with tier names, highlights, and badges.
- Why it clicks: Pricing feels daunting; this makes it approachable.
- Core features: 3–4 presets, badges/icons, share URL, export PNG.
- Stretch: Simple revenue/conversion heuristic overlay.

## 5) Testimonial Card Composer

- What it is: Choose tone, rating, and prompt; outputs attractive testimonial cards ready for a landing page.
- Why it clicks: Social proof sells; polished cards feel real.
- Core features: 6 templates, copy HTML snippet, image export.
- Stretch: Avatar generator / placeholder picker.

## 6) Micro‑Interactions Playground

- What it is: Preview delightful buttons, loaders, hovers, and toasts with theme + motion toggle.
- Why it clicks: Tangible craft. Subtle polish anyone can feel.
- Core features: 6–8 components, prefers‑reduced‑motion toggle, theme switcher.
- Stretch: Export CSS variables / tokens.

---

Next up to implement: 1) Landing Page Hero Composer (/play/hero-composer).


## Polish Ideas Backlog (per mini‑app)

### 1) Landing Page Hero Composer — polish

- URL state and "Copy Share URL" action.
- Export PNG (html‑to‑image) with transparent background option.
- Copy full HTML + minimal CSS snippet for no‑Tailwind consumers.
- Add background shapes/gradients toggle and density slider.
- Preset manager: save/load named hero presets.
- Accessibility: focus styles on palette chips, reduced‑motion variant of playful gradients.

### 2) App Flow Mapper — polish

- Snap‑to + auto‑routing for edges to avoid overlaps.
- Node library search and keyboard shortcuts (add, connect, delete).
- Export SVG/PNG and shareable URL.
- Per‑edge annotations (notes, friction level, expected time).
- Simple layout algorithms (grid/force/vertical flow).
- Cypress tests for drag/zoom/connect interactions.

### 3) Brand Moodboard — polish

- Type pairings with live specimen (headings, body, buttons).
- Palette contrast checks and accessible alternatives.
- Export brand card (PNG/PDF) and tokens JSON.
- Randomize button for quick inspiration.
- Save/load favorite combos.

### 4) Pricing Page Visualizer — polish

- Toggle monthly/annual with pro‑rated savings.
- Add feature comparison table and “most popular” badge logic.
- Simple conversion/revenue overlay (heuristic) with sliders.
- Export PNG and copy HTML/CSS snippet.
- URL presets for audiences (solo/team/startup).

### 5) Testimonial Card Composer — polish

- Multiple layout templates with avatar styles.
- Copy HTML snippet and export image.
- Tone presets with microcopy suggestions.
- Optional placeholder avatar picker.
- Grid preview for carousel mock.

### 6) Micro‑Interactions Playground — polish

- Theme switcher + token export (CSS variables JSON).
- prefers‑reduced‑motion toggle and motion intensity slider.
- Variants gallery for buttons/loaders/toasts.
- Copy code snippets per component.

---

## Shared Backlog (cross‑cutting)

- URL state + deep linking for all mini‑apps.
- Export helpers (PNG/SVG/HTML) utilities as shared lib.
- Snapshot tests for visual regressions (Cypress + Percy alternative or local diffs).
- Keyboard navigation and focus management patterns.
- Lightweight analytics (page time, interactions) with a privacy‑first approach.
