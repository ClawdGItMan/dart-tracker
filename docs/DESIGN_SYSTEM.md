# Design System — "The White Cube"

The canonical look & feel for Dart Tracker. This doubles as the brief we feed to **Claude Design** — paste the prompt block at the bottom to regenerate or extend screens.

## The idea
A MoMA-style white-cube gallery, made interactive. Pure white walls, true black text, vast negative space. Each cigarette box is mounted like a single artwork. Minimal but **strong** — never sparse or timid. The only color in the entire room is the art on the walls (here: the box photography).

## Principles
1. **Strict black on white.** The UI never introduces color. All color comes from the box photos.
2. **One shadow only.** A soft drop shadow beneath each box photo — the single bit of depth in the whole app. Everything else is flat.
3. **Strength through contrast, not color.** Extreme type scale/weight contrast and generous whitespace carry the visual force.
4. **Curatorial, spare copy.** Like exhibition wall text. "Acquired in Lisbon, autumn 2023."

## Tokens
| Role | Value |
|---|---|
| Background | `#FFFFFF` |
| Ink / text / lines | `#000000` |
| Secondary text | `#6B6B6B` |
| Faint hairline | `#E6E6E6` |
| Box-photo shadow | soft, diffuse, low-opacity black (the only shadow) |
| Primary typeface | Neo-grotesque — Helvetica Now / Söhne (fallback Inter / Archivo) |
| Label style | UPPERCASE, letter-spacing ~0.14em |

## The Claude Design prompt (canonical)

```text
PRODUCT
A private, two-person collector's catalogue of cigarette boxes gathered from
around the world. It is NOT about smoking — it's about the journey of acquiring
beautiful objects and reliving the memories attached to them. Two curators
(me and a friend) share one cabinet. Mobile-first.

THE FEELING — "THE WHITE CUBE"
A MoMA-style white-cube gallery, made interactive. Pure white walls, true black
text, vast negative space. Each cigarette box is mounted like a single artwork.
Minimal, but STRONG and confident — never sparse or timid. It should feel like
walking through a modern art museum where the only color in the entire room is
the art on the walls.

CORE PRINCIPLE
The interface is strictly black on white. The cigarette box photography is the
ONLY source of color anywhere in the app — exactly like art on a white gallery
wall. Never introduce accent colors into the UI; let the objects supply all color.

COLOR
- Background:        #FFFFFF  (pure gallery white)
- Ink / text / lines:#000000  (true black)
- Secondary text:    #6B6B6B  (neutral cool grey — never warm)
- Faint hairline:    #E6E6E6
No other color in the UI. Ever.

THE ONE PERMITTED SHADOW
A soft, diffuse, realistic drop shadow beneath each box photograph, as if the
object is mounted slightly off the white wall / resting on a white plinth.
Nothing else in the entire interface casts a shadow. Everything else is flat.

TYPOGRAPHY (strength comes from contrast, not color)
- Primary typeface: a confident neo-grotesque (Helvetica Now, Neue Haas Grotesk,
  or Söhne; accessible alternative: Inter or Archivo).
- Use EXTREME scale + weight contrast: very large, light/regular headings set
  against tiny UPPERCASE tracked-out caps (letter-spacing ~0.14em) for labels.
- Museum labels / metadata: same grotesque, UPPERCASE, small, tracked-out
  (e.g. "ACQUIRED · LISBON · 2023"). This is the gallery wall-text voice.
- Specimen number set large and confident: "No. 042". Tabular/lining figures.

LAYOUT
- Treat every screen like a gallery room: imagery floats on white with generous
  air around it. Asymmetric, editorial, lots of margin.
- Flat. Hairline rules (#000 or #E6E6E6) instead of cards. No boxes-with-shadows
  (the box-photo shadow is the only exception).

SCREENS TO DESIGN (mobile-first, in this order)
1. SPECIMEN DETAIL (design this first — it's the soul)
   - Top: an "OBJECT STAGE" — the box photographed on pure white, large and
     centered, with its soft mounting shadow. Generous white around it.
     IMPORTANT: design this frame so it can later hold a 3D drag-to-rotate model
     instead of a photo. Include a small, subtle rotate affordance in the frame.
   - Specimen number "No. 042" + brand as a large grotesque heading.
   - PLACE & DATE given strong weight via tracked-out caps: city, country, date
     acquired, and a tiny minimal map locator (black line, white ground).
   - Below, quieter sections: "THE MEMORY" (a personal note), "TASTING NOTES"
     (short, restrained rating), and which curator acquired it.

2. WORLD MAP (home tab)
   - A minimal monochrome map: thin black coastlines/borders on pure white — a
     fine printed-diagram look, NOT a parchment or satellite map.
   - A small solid-black dot pin for every box; nearby pins cluster gently.
   - Tapping a pin raises the box's photo thumbnail (the only color on screen)
     in a small specimen card: photo, brand, place, date.
   - Slim top bar: "THE COLLECTION · 47 SPECIMENS". Quiet region filter.
   - Two curators shown via two subtle pin styles (e.g. filled vs ring).
   - Pins drop and settle on load; selected pin scales up crisply.

3. GALLERY WALL (second tab)
   - Boxes hung like a gallery wall on white — a refined justified grid with
     real air between pieces, each floating with its soft shadow.
   - Under each, a tiny museum label: brand, country, "No. 0XX", year.

4. ADD / ACCESSION FLOW (mobile capture)
   - Fast but ceremonial — "accessioning a new specimen." Snap photo on white →
     drop pin (auto location or manual) → brand, place, date → optional memory +
     tasting notes. One step per screen, large type, few fields.

5. COLLECTION OVERVIEW
   - Countries collected, totals, a subtle "yours / theirs / ours" split. All
     black-on-white, set like an exhibition checklist.

MOTION (minimal but STRONG and interactive)
Crisp and confident: state changes via solid black fills, decisive transitions,
drag-to-pan on the map, smooth tab cross-fades, imagery that scales up cleanly
when opened, pins that drop and settle. Fast and precise — never bouncy, springy,
or playful. The interactivity should feel tactile and exact.

AVOID (hard constraints)
- No accent colors in the UI — color comes ONLY from the box photos.
- No warm tones, no paper texture, no gradients, no glassmorphism.
- No rounded cards with heavy shadows (the box-photo shadow is the sole exception).
- No emoji in the UI. No generic Inter-as-decoration. No dark mode.
- No centered hero with a giant CTA button. No "dashboard" / startup look.
- Nothing that glamorizes smoking — this is about objects, places, and memory.

TONE OF COPY
Curatorial and spare, like exhibition wall text. "Acquired in Lisbon, autumn
2023." Never marketing-speak.
```
