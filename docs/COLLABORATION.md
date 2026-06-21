# Collaboration — How the two of us build this

Neither of us reads code; we both direct Claude Code and judge by outcomes. This doc keeps us from stepping on each other.

## The big idea: own whole features, not shared files
Merge conflicts happen when two people edit the same file at the same time. We avoid that by **each owning whole route folders** (entire screens). Shared foundations are built **once, first**, then we work in parallel on separate features.

## Phase 1 — Foundation (build together / first)
Before splitting up, one of us (or a single Claude Code session) builds the shared base, because everything depends on it:
- Project scaffold (Next.js + Tailwind + shadcn)
- Design tokens (the White Cube palette + type)
- Shared components: app shell + tab bar, the "object stage", specimen card, museum label, hairlines
- Supabase: the `specimens` data model, auth for the two of us, photo storage

Once this is merged to `main`, we split the feature work below.

## Ownership (Phase 2 onward)
| Area | Owner | Routes / folders |
|---|---|---|
| World map (home) | **Max** | home route + map components |
| Accession / add flow | **Max** | `app/add` |
| Collection overview | **Max** | `app/collection` |
| Gallery wall | **Friend** | `app/gallery` |
| Specimen detail | **Friend** | `app/specimen/[id]` |
| Foundation (tokens, schema, shared components) | **Shared — coordinate first** | `components/ui`, `lib/`, design tokens |

Swap as you like — the point is that **each route folder has exactly one owner at a time**.

## The git workflow (just say these to Claude Code)
You never type git yourself — say these in plain language to Claude Code:

**Starting a feature**
> "Pull the latest `main`, then create and switch to a branch called `feature/world-map`."

**While building** — work normally; run the app and click through to check it.

**When it works**
> "Commit my changes with a conventional-commit message and push the branch."
> "Open a pull request to `main` describing what I built."

**Reviewing your friend's work** (this replaces code review)
- Each PR gets a **Vercel preview URL** — a live version of just that feature. Open it on your phone, click through, confirm it works and matches the design.
> "Pull my friend's branch `feature/gallery-wall` and run it so I can look at it."

**Merging**
> "Merge the pull request into `main`."

**After a merge — both of us resync**
> "Switch back to `main` and pull the latest."

**If you hit a merge conflict** — don't panic:
> "Resolve the merge conflicts on this branch, then run the app to make sure it still works."

## Rules of thumb
- **One feature = one branch = one PR.** Keep them small and frequent.
- **Always pull `main`** before starting something new.
- **Never push straight to `main`** — always via a PR. (We turn on branch protection to enforce this.)
- **Coordinate before touching foundation files** (tokens, schema, shared components) — a quick text to each other avoids the worst conflicts.
- **Verify by outcome:** run it before you open a PR; the other person runs the preview before merging.

## Best-practice setup (one-time, recommended)
- **Protect `main`:** require a pull request before merging (GitHub → Settings → Branches).
- **Connect the repo to Vercel** so every PR gets a live preview URL.
- **Keep secrets out of git:** put them in `.env.local` (gitignored) and in Vercel's env settings — never in the repo.
