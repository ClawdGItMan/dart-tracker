# Handoff: The White Cube — Collector's Catalogue (mobile)

## Overview
A private, mobile-first catalogue app for a personal collection of cigarette *boxes* gathered around the world. It is **not** about smoking — it is about the objects, the places they came from, and the memory attached to each one. Each box is presented like a single artwork in a MoMA-style "white cube" gallery. The collection is **personal to one collector**, and the collector can **share their stats** with others.

Five connected screens: **World Map** (home), **Gallery Wall**, **Specimen Detail** (the core screen, two layout variants), **Accession** (a 5-step capture flow), and **Index** (personal stats + share).

## About the Design Files
The files in this bundle are **design references created in HTML/JS** — a working prototype that demonstrates the intended look, layout, motion, and behavior. They are **not production code to copy directly**.

The prototype is authored as a single "Design Component" (`The White Cube.dc.html`) that runs on a small in-house runtime (`support.js`) using a custom `<x-dc>` template syntax. **Do not port `support.js` or the `.dc.html` template format.** Instead, **recreate these designs in the target codebase's existing environment** using its established patterns. Given this is a mobile-first app, the natural targets are **React Native / Expo**, **SwiftUI** (iOS), or **Jetpack Compose** (Android). If no codebase exists yet, React Native + Expo is a sensible default. The `ios-frame.jsx` file only draws a fake iPhone bezel/status bar for the prototype — **ignore it**; the real OS provides that chrome.

Read `The White Cube.dc.html` for ground truth on every value below. The template markup (between `<x-dc>` and `</x-dc>`) holds the layout and inline styles; the `class Component extends DCLogic` block at the bottom holds the data, state, and computed values (`renderVals()`).

## Fidelity
**High-fidelity.** Final colors, typography, spacing, layout, copy, and interactions are all resolved. Recreate the UI faithfully (subject to platform-idiomatic adjustments). The one deliberate placeholder is imagery: a single stock box photo (`assets/specimen-photo.jpeg`) is reused for **every** specimen. In production each specimen has its own photo.

---

## Design Language (the "White Cube")
Strictly **black on white**. The box photography is the **only** source of color anywhere in the UI — exactly like art on a white gallery wall. Never introduce accent colors into chrome, buttons, or states. Strength comes from **type scale + weight contrast**, not color. Flat throughout: hairline rules instead of cards. The **only** shadow permitted in the entire app is the soft drop shadow beneath a box photograph (object mounted off the wall). Everything else is flat. No gradients, no glass, no rounded cards, no dark mode, no emoji.

### Design Tokens
**Colors** (the entire palette):
| Token | Hex | Use |
|---|---|---|
| Gallery white | `#FFFFFF` | All backgrounds |
| Ink | `#000000` | Primary text, hairlines, solid fills, pins |
| Secondary text | `#6B6B6B` | Labels, metadata, captions |
| Tertiary / muted | `#9A9A9A` | Quietest captions, placeholders, hints |
| Faint hairline | `#E6E6E6` | Section dividers (the quiet ones) |
| Map land | `#FFFFFF` | World map landmass fill |
| Map borders | `#8C8C8C` | World map country/coast lines (stroke-width 1.5 in a 2000×857 viewBox) |
| Inactive tab/dot grey | `#B4B4B4`, `#C4C4C4`, `#DCDCDC` | Inactive icons, inactive toggle letters, faint frame strokes |

There are two hairline weights: **`#000` (1px)** for the primary section rule directly under a screen title, and **`#E6E6E6` (1px)** for secondary dividers between content blocks.

**Typography** — single family: **Archivo** (Google Fonts; a neo-grotesque standing in for Neue Haas / Söhne). Weights used: 300, 500, 600, 700. Always enable lining + tabular figures: `font-feature-settings: 'tnum' 1, 'lnum' 1`.

Type roles:
| Role | Size | Weight | Tracking | Transform |
|---|---|---|---|---|
| Display heading (brand name, flow titles) | 30–39px | 300 | −0.025em | none |
| Big stat numerals | 30–54px | 300 | −0.03em | none |
| Body / memory | 16–19px | 300 | normal | none (`text-wrap: pretty`) |
| Notes body | 13px | 400 | normal | none |
| Wall-label caps (metadata, the "gallery voice") | 9–11px | 600–700 | **0.14–0.18em** | UPPERCASE |
| Specimen number | 10–10.5px | 600 | 0.16em | UPPERCASE (e.g. `No. 042`) |
| Button labels | 9.5–11px | 600 | 0.16–0.18em | UPPERCASE |
| Tab labels | 8.5px | 600 | 0.14em | UPPERCASE |

The signature move: **very large light (300) headings against tiny tracked-out UPPERCASE caps**. Metadata always reads as museum wall text, e.g. `BUENOS AIRES · ARGENTINA`, `AUTUMN 2023`.

**Spacing** — screen side gutter is **26px** (some full-bleed regions use 0–16px). Vertical rhythm between blocks ~24–30px, separated by hairlines. Tap targets ≥ 44px.

**The one shadow** — box photo: `drop-shadow(0 26px 30px rgba(0,0,0,.26))` on the detail stage; lighter variants on smaller frames (`0 16px 20px rgba(0,0,0,.18)` gallery, `0 14px 18px rgba(0,0,0,.22)` map card). Apply as a CSS `filter` on the photo element so the shadow hugs the photo's rectangle.

**Motion** — crisp, decisive, never bouncy/springy. Standard easing `cubic-bezier(.2,.8,.25,1)`, ~300–500ms.
- `pindrop` (0.5s): pins fall in and settle — `translateY(-14px) scale(.4) opacity 0` → overshoot `scale(1.05)` at 70% → `scale(1)`. Stagger each pin by `index * 0.045s`.
- `sheetup` (0.34s): bottom cards/sheets slide up from `translateY(110%)`.
- `fadeup` (0.42s): screens enter with opacity 0→1, `translateY(10px)`→0.
- `fade` (0.3–0.4s): tab cross-fades and sub-view swaps.
- Selecting a map pin scales it up crisply (9px → 16px) with a faint `0 0 0 6px rgba(0,0,0,.08)` halo, 0.2s.

---

## Map Projection (important, reusable math)
The world map (`assets/world-map.svg`, viewBox `0 0 2000 857`, a near-equirectangular projection) was calibrated so any city can be plotted from longitude/latitude. Place a pin at:

```
x_fraction = (5.408 * lon + 989.21) / 2000      // → CSS left %
y_fraction = (-6.502 * lat + 506.63) / 857       // → CSS top %
```

Pins are absolutely positioned with `transform: translate(-50%, -50%)` inside a box that holds the map at the **exact 2000:857 aspect ratio** (`aspect-ratio: 2000 / 857`, `object-fit: fill`). Keep that aspect or the pins drift. This formula is used identically on the map home screen, the detail mini-locator, the accession locate step, and the share card mini-map.

The recolored map (white land, `#8C8C8C` borders) lives in `assets/world-map.svg`; the untouched source is `uploads/world.svg` in the project.

---

## Data Model
Each **specimen** (see `SPECIMENS` array in the file):
```
id           string   stable id
no           string   catalogue number, e.g. "No. 042" (NOT sequential count)
brand        string   box brand / wordmark — the large heading
city         string
country      string
lat, lon     number   used by the projection above
year         number
season        string   "Spring" | "Summer" | "Autumn" | "Winter"
region       string   "EUROPE" | "ASIA" | "AMERICAS" | "AFRICA"
memory       string   the personal note ("The Memory")
note         string   restrained object notes ("Notes")
mark         number   1–5 condition rating (rendered as 5 dots, filled up to mark)
photo        (NEW)    per-specimen image — prototype reuses one stock photo for all
```
Copy tone is **curatorial and spare**, like exhibition wall text ("Acquired in Lisbon, autumn 2023"). Never marketing voice.

> **Concept note:** an earlier version had two co-curators sharing one cabinet (a `curator: 'M' | 'J'` field, distinct pin styles, an "Acquired by" line, a custody split). The product is now **single-collector**. The Index has already been updated (custody removed). The `curator` field and its UI still linger in three places — see "Known leftovers" at the end — and should be removed in production.

---

## Screens / Views

### 1. World Map  (home tab)
**Purpose:** see the whole collection geographically; tap a pin to peek a specimen, then open it.
**Layout (top→bottom):**
- Status bar clearance: content starts ~58px from top.
- Title row, 26px gutter: left `THE COLLECTION` (caps 0.16em, 700); right `12 SPECIMENS` (caps, 500, `#6B6B6B`). Count = `SPECIMENS.length`, zero-padded.
- Primary hairline `#000`, 1px, inset 26px.
- **Region filter**: horizontal scroll row of caps buttons `ALL · EUROPE · ASIA · AMERICAS · AFRICA` (10.5px, 0.14em, 600). Active = `#000` with a 1px `#000` underline; inactive = `#9A9A9A`, no underline. Filtering removes non-matching pins.
- **Map region (full-bleed):** flex-fills remaining height, `overflow: hidden`. The map image is rendered at **150% width** (`MAPSCALE = 1.5`), `aspect-ratio: 2000/857`, centered both axes via `top/left: 50%` + `transform: translate(calc(-50% + {panX}px), -50%)`. This makes the map large and tall (~258px band on a 402px-wide screen) and it overflows horizontally so it is **drag-to-pannable**.
- Footer hint, centered: `DRAG TO PAN · TAP A PIN` (9.5px caps, `#9A9A9A`).

**Pins:** one solid black dot per specimen (9px), `box-shadow: 0 0 0 2px #fff` separation from the map lines, placed via the projection. On select: grows to 16px with the faint halo and `z-index` raise. Pins drop+settle on load (staggered `pindrop`).

**Raised specimen card** (appears on pin tap, `sheetup` from bottom, 14px side inset, sits above nothing else / over the map): a `1px #000` bordered white card, 16px padding, containing — left: 96×120 box photo (`object-fit: cover`, drop-shadow); right column: `No. 0XX` (caps grey) · brand (23px, 600) · `CITY · COUNTRY` caps · `SEASON YEAR` caps · a solid black `VIEW SPECIMEN` button (9.5px caps, `#fff` on `#000`, 9×16px padding). A `✕` close at top-right. Tapping the photo or button → Specimen Detail.

### 2. Gallery Wall  (tab)
**Purpose:** browse the collection hung like a gallery wall.
**Layout:** title row `GALLERY WALL` / `12 WORKS` + primary hairline. Then a **CSS multi-column masonry** (`columns: 2`, `column-gap: 22px`, 22px gutter; column count is a tweakable option — see Tweaks). Each item (`break-inside: avoid`, 30px bottom margin) is a button:
- Photo frame: full column width, **varied heights** cycling through `[232,266,210,252,224,272,214,258,228,248,218,262]px` to create the irregular gallery-wall rhythm. `object-fit: cover`, white bg, drop-shadow `0 16px 20px rgba(0,0,0,.18)`.
- Museum label beneath: brand (13px, 500); `COUNTRY` (9px caps 0.14em, `#6B6B6B`); `No. 0XX · YEAR` (9px caps, `#9A9A9A`).
- Tap → Specimen Detail.

### 3. Specimen Detail  (pushed view — the core screen)
**Purpose:** the soul of the app — one box presented as a single artwork. **Two layout variants (A/B)** toggled by a tiny `LAYOUT A B` control in the header (top-right; active letter `#000`, inactive `#C4C4C4`). Default variant is a tweakable prop.
**Header:** back affordance (chevron + `THE COLLECTION` caps) left; layout toggle right; content starts ~54px down.

**The OBJECT STAGE (both variants):** the box photo, large, mounted on pure white with its soft drop shadow and generous air. **Drag-to-rotate**: pressing and dragging horizontally rotates the photo via `transform: perspective(1100px) rotateY(<deg>)`, clamped to ±40°, `0.45°` per px dragged. A subtle rotate affordance sits in the frame: a circular-arrow glyph + `DRAG TO ROTATE` caps (8.5px). **This frame is designed to later hold a 3D drag-to-rotate model in place of the photo** — keep the gesture and the rotate affordance when you swap in a real 3D viewer.

- **Variant A — centered gallery mount:** stage centered (≈172–188px wide); below, left-aligned: `No. 0XX` (caps grey) → brand (39px, weight 300) → a row with `CITY · COUNTRY` / `SEASON YEAR` caps on the left and a tiny **map locator** on the right (84×36px, `1px #000` border, the world map + a single 7px black dot at the specimen's coordinates). Then faint hairlines separate three quiet sections: **THE MEMORY** (label + 16px/300 body), **NOTES** (label + 13px body, with the 5-dot condition mark on the right), **ACQUIRED BY** (label + curator — *leftover, see end*).
- **Variant B — editorial wall-text:** stage smaller (≈132–150px) on a full-width plinth (a horizontal `#000` rule behind/under it); then `No. 0XX` → brand (30px/300); then a **definition list** with `1px #000` top border and `#E6E6E6` row dividers: `PLACE`, `ACQUIRED`, `CURATOR`*, `NOTES` (label left caps `#6B6B6B`, value right caps 700 / dots). Then the object notes (13px), then **THE MEMORY** as a larger 19px/300 closing block.

The 5-dot **condition mark**: five 7px circles, filled `#000` with `1px #000` up to `mark`, empty white with `1px #C9C9C9` beyond.

### 4. Accession  (modal flow, no tab bar)
**Purpose:** "accession a new specimen" — fast but ceremonial, one step per screen. Header: left `CANCEL`/`BACK`, right `ACCESSION · 0X / 05`. A 5-segment progress bar (each segment `flex:1`, 2px; filled `#000` up to current step, else `#E6E6E6`). A pinned full-width black `CONTINUE` button at the bottom (becomes `ACCESSION SPECIMEN` on the last step).
Steps:
1. **Photograph the object.** Big light heading + instruction; a dashed-border 182×220 capture target with a camera glyph + `TAP TO CAPTURE`.
2. **Where was it acquired?** The world map (full aspect) with a centered pin; `USE CURRENT LOCATION` outline button; hint "or drag the pin to place it manually".
3. **Identify the specimen.** Four underlined text fields (border-bottom `1px #000`, 21px/300 value, caps label above): BRAND, CITY, COUNTRY, DATE ACQUIRED.
4. **Record the memory.** `THE MEMORY` textarea (16px/300), `NOTES` input, `CONDITION` tappable 5-dot selector, `ACQUIRED BY` M/J toggle (*leftover*).
5. **Accession.** Review summary card (`No. 048` = next number) showing the drafted brand/place/date; the big `ACCESSION SPECIMEN` button commits and returns to the Gallery.
All draft fields are controlled inputs held in a `draft` object; `accStep` (0–4) drives the flow.

### 5. Index  (tab — personal stats + share)
**Purpose:** the collector's personal profile/stats, and the entry point to **sharing**.
**Layout:** title row `THE COLLECTION` left, a `SHARE` text+icon button right (upload glyph); primary hairline. Then:
- **Collector identity:** `PRIVATE COLLECTION` (9.5px caps, `#9A9A9A`) → collector name (38px, weight 300). Name is the editable `collectorName` tweak (default `M. Vesper`).
- **Big stats row:** three equal columns — `12 SPECIMENS`, `12 COUNTRIES`, `04 REGIONS` (54px/300 numerals over 9px caps labels).
- `ACQUIRED 2020–2025` caps line (computed min–max year).
- **Share callout:** full-width `1px #000` outline button `SHARE YOUR COLLECTION` (inverts to `#000`/`#fff` on hover).
- **BY REGION:** label + rows (region caps left, count right, `#E6E6E6` dividers).
- **EXHIBITION CHECKLIST:** label + a `1px #000` topped list; each row is a button → Detail: `No. 0XX` (caps grey, fixed 50px) · brand (13.5px, 500, ellipsis) · `COUNTRY` caps · `YEAR`, divided by `#E6E6E6`.

**Share sheet** (full-screen overlay, `z-index 80`, `fadeup` in): header `SHARE` + `✕`; primary hairline. A centered **shareable wall-card** (max 320px, `1px #000` border, 26px padding):
- `THE COLLECTION OF` caps (left) · `@handle` (right, derived from name).
- Collector name (30px/300).
- A **mini world map** (full 2000:857 aspect, `1px #E6E6E6` border) plotting **all** specimen pins (6px black dots with 2px white separation).
- A `1px #000` topped 3-stat row (specimens / countries / regions, 30px numerals).
- Footer: `ACQUIRED 2020–2025` (left) · `THE WHITE CUBE` (right), both tiny caps.
- Caption beneath card: "A printable wall-card of your collection."
Actions pinned at bottom: `COPY LINK` (outline; copies `whitecube.app/c/<slug>` and the label flips to `LINK COPIED` for ~1.7s) and `SHARE CARD` (solid black — wire to the native share sheet in production).

---

## Navigation & Tab Bar
Flat bottom tab bar: `1px #000` top border, white, four items: **MAP**, **GALLERY**, **ACCESSION** (a `+` glyph — opens the modal flow, not a persistent tab), **INDEX**. Active icon+label `#000`, inactive `#B4B4B4` (8.5px caps labels). The tab bar is **hidden** on Specimen Detail (pushed view with back), on the Accession flow, and under the Share sheet. Detail and the share sheet are pushed/overlay views, not tabs.

## State (prototype `state` object — map to your store/router)
- `screen`: `'map' | 'gallery' | 'detail' | 'accession' | 'overview'(=Index)` — top-level route.
- `selectedId`: specimen shown in Detail.
- `detailVariant`: `'A' | 'B' | null` (null → falls back to the `specimenLayout` prop default).
- `mapSelectedId`: specimen whose raised card is showing on the map (`null` = none).
- `region`: active map filter (`'ALL'` + the four regions).
- `rot`: degrees for the drag-to-rotate object stage.
- `panX`: horizontal pan offset (px) of the map, clamped to `±(W*MAPSCALE − W)/2`.
- `accStep` (0–4) and `draft` (`{brand, city, country, date, memory, note, mark, curator}`) for the Accession flow.
- `shareOpen` (bool), `linkCopied` (bool, transient) for the Share sheet.

## Tweakable parameters (prototype props → make these configurable/feature-flagged as useful)
- `collectorName` (text, default `M. Vesper`) — drives the Index identity, the share handle, and the share card.
- `mapLabels` (bool, default false) — render the city name beside each unselected map pin.
- `specimenLayout` (`A`/`B`, default `A`) — default Specimen Detail layout.
- `galleryColumns` (`2`/`3`, default `2`) — Gallery Wall density.

## Assets
- `assets/world-map.svg` — world map, recolored to white land + `#8C8C8C` borders, viewBox `2000×857`. (Original untouched source: `uploads/world.svg`.) Use any equivalent equirectangular world map in production, but re-derive the projection constants if its viewBox/projection differs.
- `assets/specimen-photo.jpeg` — single stock box photo (202×355) reused for every specimen in the prototype. **Replace with per-specimen photography**, each shot on pure white.
- Font: **Archivo** (Google Fonts), weights 300/500/600/700.
- All icons (chevron, share/upload, camera, map pin, rotate arrow, tab glyphs, plus/check) are simple inline SVG strokes — reproduce with your icon system at 1.4–1.6px stroke, color `currentColor`.

## Files in this bundle
- `The White Cube.dc.html` — **the source of truth**: full markup, inline styles, data, state, and computed logic. Open in a browser to interact with the live prototype.
- `support.js` — the prototype runtime. **Reference only — do not port.**
- `ios-frame.jsx` — fake iPhone bezel for the prototype. **Ignore for production.**
- `assets/world-map.svg`, `assets/specimen-photo.jpeg` — see Assets.

## Known leftovers to clean up (single-collector migration)
The app is now single-collector, but the retired two-curator concept still appears in three spots and should be removed/neutralized in production:
1. **Map pins** — code still distinguishes curators (filled vs. ringed dot). Use one uniform pin style.
2. **Specimen Detail** — the `ACQUIRED BY · Curator X` line (variant A) and the `CURATOR` row (variant B).
3. **Accession step 4** — the `ACQUIRED BY` M/J toggle.
Drop the `curator` field from the data model once these are gone.
