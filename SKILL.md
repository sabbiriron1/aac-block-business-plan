---
name: aac-block-strategy-presentation
description: >-
  Generate, maintain and extend the Tilottoma Bangla Group "NextBlock AAC" 5-Year Growth
  Strategy board presentation — a premium, self-contained, zero-dependency interactive HTML
  deck (cover + 20 content slides) covering industry analysis, market opportunity, business
  model, financials, stage-gate roadmap, KPI dashboard, risk and an interactive business-case
  simulator. Use this skill whenever the user asks to build, edit, reorder, add a tab/slide to,
  or fix the AAC Block strategy presentation / NextBlock AAC deck / Tilottoma AAC market
  leadership dashboard. Trigger on: AAC presentation, AAC block strategy, NextBlock AAC,
  Tilottoma strategy deck, AAC market leadership, add tab, edit slide, AAC simulator.
---

# AAC Block 5-Year Growth Strategy — Presentation Skill

Prepared & Presented By: **Md. Sabbir Ahmed**

## 1. Purpose

Produce a **board-level, McKinsey/BCG-style consulting dashboard** that answers one question:

> *How can Tilottoma Bangla Group make AAC Block the preferred replacement for traditional
> clay bricks in Bangladesh?*

The deliverable is a single self-contained HTML presentation (no CDN, no build step, no
libraries) that runs fully offline by opening `index.html` in any browser.

## 2. Verified Business Facts (LOCKED — do not fabricate)

These came from the official NextBlock AAC site (`nextblock.build`) and must be preserved:

| Fact | Value |
|---|---|
| Brand | **NextBlock AAC** (of "Eco-Friendly Green Bricks Ltd.", an enterprise of Tilottoma Bangla Group) |
| Market position | **Bangladesh's FIRST AAC manufacturer** |
| Installed capacity | **156,000 m³ / year** (NOT 300,000) |
| Factory | North Lakkhindar Sagordighi, **Ghatail, Tangail** |
| Technology partner | Chao Heng Investment Ltd. (China) — Swedish design · German tech · Chinese expertise |
| Certifications | BUET · MIST · ISO 9001 · HBRI (MoU partner) |
| Award | "Best Process Innovation" — Bangladesh Innovation Award 2023 |
| Performance claims | 40% lighter · ≈5°C thermal advantage · up to 4.5 hr fire rating · up to 20% lower cost · ≈2× faster |
| Block sizes | 600×200× {100 / 110 / 120 / 140} mm + custom |
| Reference projects (blocks supplied — not built by Tilottoma) | Rampal Power Plant · Rupayan City · Lakeshore Hotel · RMG factories · BAT Manikganj · Data Center Jessore |

Tilottoma legacy: ~45 years in construction materials (finishing, bath/spa, ceramics, hardware).

## 3. File Structure

```
aac-block-strategy/
├── index.html              # all 21 slides + nav + inline SVG graphics
├── SKILL.md                # this file
└── assets/
    ├── css/style.css       # full design system (design tokens + components)
    ├── js/main.js          # navigation engine, charts, animations, simulator
    └── icons/favicon.svg
```

## 4. Architecture (how it works)

### 4.1 Navigation — the `order` array (critical)

Slides are stored in **DOM order** inside `.stage`. The **presentation order** is a separate
array in `main.js`:

```js
const order = [0, 1, 2, 3, 7, 4, 5, 6, 18, 8, 9, 10, 11, 12, 13, 14, 20, 15, 16, 17, 19];
```

- `order[pos]` = the DOM index shown at presentation position `pos`.
- Nav item `i` maps to presentation position `i + 1` (position 0 = cover, not in nav).
- `prev/next` + keyboard (`← →`, `Space`, `Home`, `End`, `F` = fullscreen) follow `order`.

**To reorder slides: edit `order` — do NOT physically move the `<section>` blocks.**

### 4.2 Section numbering & footers are DYNAMIC

`renumberSlides()` auto-rewrites each slide's eyebrow ("Section NN") and footer
("Title · NN / 20") from the `order` array. Never hardcode section numbers — they are
regenerated on load.

### 4.3 Abbreviation footnotes are injected

`ABBREV` map (keyed by DOM index) injects an `.abbrev` footnote at the bottom of every slide.
Every tab must have one.

## 5. Design System

- **Tokens** in `:root` — palette `--emerald #34d399`, `--gold #e7b75f`, `--blue #60a5fa`,
  `--violet #a78bfa`, `--rose #fb7185`, `--amber #fbbf24`, dark `--bg-0 #070c16`.
- **Typography** — `--font-display` (Georgia/serif) for headlines; `--font-sans` (Segoe UI) for body.
- **Glassmorphism** — `.card` with backdrop-blur, `--glass-border`, hover glow.
- **Grids** — `.g2/.g3/.g4`, `.g-1-2`, `.g-2-1`, `.g-1-1-2`. **Always add `min-width:0` to grid children** (already set via `.grid > * { min-width: 0 }`) to prevent right-column clipping.
- **Reveal animation** — add class `.reveal` (stagger with `.d1`–`.d5`) to animate on slide entry.

### Component reference

| Component | Class(es) | Notes |
|---|---|---|
| Stat/KPI card | `.card .stat-row .stat-value.counter` | `data-count`, `data-suffix` animate on entry |
| Bar chart | `.bar-chart .bar` | `data-h="NN"` = height % |
| Horizontal fill | `.carbon-bar .cb-fill` | `data-h="NN"` = width % |
| Donut | `.donut` | `data-p1/p2/p3` (4th = remainder), `--c1..--c4`, `data-center` |
| Gauge | `.gauge .fill` | `data-val="NN" data-r="42"` |
| SVG line chart | `[data-line]` | `data-line="1,2,3" data-labels="A|B|C" data-color data-max` |
| Comparison table | `.compare .compare-row` | each `.compare-row` MUST span `grid-column:1/-1` |
| BMC canvas | `.bmc .bmc-block.bmc-*` | 9 blocks, revenue block highlighted |
| Roadmap | `.timeline .tl-item` | |
| Flow | `.flow .flow-step` | GTM / revenue engine |
| Ecosystem | `.eco .eco-pillar` | supply / demand / enabling |
| Risk | `.risk-grid .risk-item.risk-{high,med,low}` | |
| Persona | `.persona` | |
| Simulator | `.sim-wrap` + `#sim-util/price/vcost/fcost` | see §8 |

## 6. Data Conventions (NON-NEGOTIABLE)

- Currency: **BDT**; large numbers in **Crore (Cr)** (1 Cr = 10M).
- Any non-verified market/financial figure MUST carry a flag:
  - `<span class="data-flag">Estimated Industry Data · Requires Market Validation</span>`
  - `<span class="data-flag">Estimated Financial Data · Requires Validation</span>`
- Never invent precise statistics. Use ≈ ranges and explicit "estimated" labels.

## 7. Financial Model (156,000 m³ base — directional estimates)

- Utilisation ramp ≈35% → 90%: revenue **51 → 82 → 106 → 127 → 142 Cr** (Y1–Y5).
- EBITDA margin 10% → **26%** (Y5 ≈ 37 Cr); 5-yr cumulative EBITDA ≈ 107 Cr; CAGR ≈ 29%.
- Unit economics: price BDT 9,500/m³ · variable BDT 6,900/m³ · contribution **BDT 2,600/m³** ·
  fixed ≈ BDT 16 Cr/yr · break-even ≈ 61,500 m³ (~39%) / ≈ BDT 58 Cr / ≈ Year 2.
- Phase-2 expansion (+156,000 m³ second line) is a Year 4–5 board decision, not part of base case.

## 8. Business Case Simulator

- 4 sliders → live compute: `#sim-util` (10–100%), `#sim-price` (8,000–11,000 BDT),
  `#sim-vcost` (5,500–8,000 BDT), `#sim-fcost` (10–25 Cr).
- Outputs: `#sim-volume`, `#sim-revenue`, `#sim-ebitda`, `#sim-margin`, `#sim-contrib`, `#sim-be`, `#sim-status`.
- **Bug note:** revenue/EBITDA are computed in Crore already — do NOT re-divide by 1e7
  (previously caused "0.0 Cr" output). Use `.toFixed(1)` directly.

## 9. Slide Inventory (21 total: cover + 20 content)

01 Executive Summary · 02 Industry Landscape (Bangladesh map) · 03 Market Opportunity (TAM/SAM/SOM) ·
04 Customer Segmentation · 05 Product & Brand · 06 Competitor Analysis (positioning map + share donuts) ·
07 Strategic Analysis (PESTEL/SWOT/VRIO/CPM) · 08 Business Model (BMC + revenue donut) ·
09 Marketing (4P & 4C) · 10 GTM · 11 RTM · 12 PMSD (ecosystem + named partners) ·
13 Sustainability & ESG (SDG/carbon/green finance) · 14 Financial Model · 15 5-Year Roadmap ·
16 Year-by-Year Commitments (stage-gate) · 17 KPI Dashboard · 18 Risk Management ·
19 Board Recommendation · 20 Business Case Simulator.

## 10. How to ADD a new slide/tab (the full checklist)

1. **HTML** — append `<section class="slide" id="slide-N">` (N = next free DOM index) inside `.stage`,
   before its closing `</div>`. Include `.slide-head`, content, `.slide-footer` (with
   `Prepared & Presented By: Md. Sabbir Ahmed`), and leave `.abbrev` to be injected.
2. **Nav** — add `<div class="nav-item" data-icon="..." data-slide or index>...</div>` in the
   desired logical position; renumber subsequent `n-num`.
3. **`order` array** — insert the new DOM index at the correct presentation position in `main.js`.
4. **`ABBREV` map** — add an entry keyed by the new DOM index.
5. **Counts** — update slide-count (`01 / NN`) and the cover "NN Sections" badge.
6. **Icons** — if using a new `data-icon`, add the SVG to the `icons` object in `main.js`.
7. **Verify** — `node --check assets/js/main.js` and confirm tag balance
   (`section`, `div`, `span`, `svg` open/close counts must match).

## 11. How to EDIT content

- **Text/numbers** — edit directly in `index.html` (or `ABBREV` for footnotes).
- **Reorder** — change `order` array only.
- **Restyle** — edit tokens/components in `assets/css/style.css`.
- **Charts/animations/simulator logic** — `assets/js/main.js`.

## 12. Non-negotiables

- Keep it **fully offline / zero-dependency** (all SVG inline, no CDN fonts/libraries).
- Footer on **every** slide: `Prepared & Presented By: Md. Sabbir Ahmed`.
- Never fabricate market/financial data — flag estimates explicitly.
- Preserve the verified 156,000 m³ capacity and NextBlock AAC facts.
