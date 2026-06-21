# Dart Tracker — Project Instructions for Claude Code

> Read this first. There are **two collaborators**, each directing Claude Code in their own sessions. This file keeps every session aligned on what we're building, how it must look, and how we work together.

## What this is
A private, two-person collector's catalogue of cigarette boxes gathered from around the world. It is **not** about smoking — it's about the journey of acquiring beautiful objects and reliving the memories attached to them. Two curators share one cabinet. Mobile-first web app.

- Full design brief: [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md)
- What we're building & in what order: [docs/ROADMAP.md](docs/ROADMAP.md)
- How the two of us split work & use branches: [docs/COLLABORATION.md](docs/COLLABORATION.md)

## The two of us
Two collaborators, each directing Claude Code. **Neither of us reads or writes code** — we evaluate by *outcomes* (does the screen work, does it match the design). When you finish something, report what works in plain language, not code diffs, and **always verify by actually running the app** before claiming it's done.

## Design direction — "The White Cube" (non-negotiable)
A MoMA-style white-cube gallery, made interactive. Strict rules:
- **Pure black on white.** Background `#FFFFFF`, text/lines `#000000`, secondary text `#6B6B6B`, faint hairline `#E6E6E6`. **No other color in the UI — color comes ONLY from the cigarette-box photography.**
- **One shadow only:** a soft drop shadow beneath each box photo (an object mounted on a wall). Nothing else casts a shadow; everything else is flat.
- **Type:** a confident neo-grotesque (Helvetica Now / Söhne; fallback Inter / Archivo). Strength comes from extreme scale + weight contrast and generous whitespace, never from color. Museum-label metadata in small UPPERCASE, tracked ~0.14em.
- **Avoid:** accent colors, warm tones, paper texture, gradients, glassmorphism, rounded cards with heavy shadows, emoji in the UI, dark mode, centered-hero-with-big-CTA, generic dashboard/startup looks.

If a request would break these rules, flag it before proceeding.

## Stack (provisional until the design is locked)
- Next.js (App Router) + TypeScript, mobile-first
- TailwindCSS + shadcn/ui
- Supabase (Postgres + Auth + Storage for photos)
- Vercel (hosting + per-PR preview deployments)

## How we work together
- **Feature-folder ownership:** each person owns whole route folders to avoid collisions. Ownership table + git workflow in [docs/COLLABORATION.md](docs/COLLABORATION.md).
- **Branches + PRs:** never commit straight to `main`. One feature = one branch (`feature/<name>`) = one pull request.
- **Conventional commits:** `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`. Explain *why*, not just *what*.
- **Shared foundation files** (design tokens, Supabase schema, shared components) change rarely — coordinate with each other before editing them.
- **Verify by outcome:** run the app and click through the feature before opening a PR.

## Guardrails
- Private project. Never commit secrets — env vars only (`.env.local`, which is gitignored).
- This is a personal memory project, not a commercial product. Keep it intimate and simple; resist scope creep.
