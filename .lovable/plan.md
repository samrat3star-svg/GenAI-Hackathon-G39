
# CineVault — Frontend Build Plan

A fully interactive frontend for the watchlist app described in the blueprint. No backend yet — state lives in localStorage, movie data is a curated mock set, and Reel's lines are scripted from the doc's tables (no live AI calls). Every system is wired so a backend can be slotted in later without redesign.

## Scope (this pass)

- Cinematic DNA onboarding (7 binary questions → 1 of 4 archetypes)
- Archetype-driven theming: 4 distinct color palettes + Reel voice + placeholder copy
- Three core screens: Search, Watchlist, (Verdict modal)
- Mood Bar with chips + free text → mock Reel pick from current watchlist
- Verdict rating sheet (4 verdicts, permanent, with Reel's archetype-voiced toast)
- Reel toast system (one-line, 3s, archetype-voiced)

Out of scope this turn: TMDB API, Supabase, Gemini, auth. Reel toasts use the scripted lines from the blueprint plus a small templated fallback. A short note in code marks the swap-in points.

## Architecture

```text
src/
  routes/
    __root.tsx              # ArchetypeProvider + Toaster mount
    index.tsx               # Gate: onboarding if no archetype, else redirect /watchlist
    onboarding.tsx          # 7-question full-screen flow + archetype reveal
    search.tsx              # Search screen
    watchlist.tsx           # Watchlist + Mood Bar
  components/
    cinevault/
      ArchetypeProvider.tsx # context: archetype, setArchetype, reelLine(situation)
      ReelToast.tsx         # wrapper around sonner with Reel styling
      MoodBar.tsx           # chips + free-text + result card
      MovieCard.tsx         # poster, title, year, runtime, genres, +Add / ··· menu
      VerdictSheet.tsx      # 4 verdict cards
      VerdictBadge.tsx      # shown on watched cards
      ArchetypeReveal.tsx   # end-of-onboarding hero
      AppShell.tsx          # bottom tab bar (Search / Watchlist)
  lib/cinevault/
    archetypes.ts           # 4 archetypes: id, name, palette tokens, placeholder, mood prompt
    dna.ts                  # 7 questions + scoring → archetype id
    reel.ts                 # situation-keyed lines per archetype (from blueprint)
    movies.ts               # ~30 mock movies (poster URL, title, year, runtime, genres, moodTags)
    storage.ts              # typed localStorage: archetype, watchlist[], verdicts{}
    mood.ts                 # map chip/free-text → moodTags → pick from watchlist
  styles.css                # adds [data-archetype="void-gazer"|...] palette overrides
```

### Theming system

`styles.css` defines a default palette via tokens, then four `[data-archetype="..."]` selectors override `--background`, `--foreground`, `--primary`, `--accent`, `--muted`, plus two new tokens `--reel` and `--gradient-hero`. `ArchetypeProvider` sets `data-archetype` on `<html>`. Every component uses tokens only — no hard-coded colors. Switching archetypes (debug menu in settings sheet) instantly re-themes the whole app, which is the demo hook the blueprint calls out.

Palettes (oklch, derived from the blueprint):
- Void-Gazer: deep navy bg, ash-grey foreground, cool slate accent
- Pulse-Chaser: carbon-black bg, amber primary, white text
- Empath: cream bg, terracotta primary, warm brown text
- Architect: slate bg, electric indigo primary, near-white text

### Reel voice

`lib/cinevault/reel.ts` exports `reelLine(archetype, situation, ctx?)`. `situation` is a union: `'add' | 'mood' | 'verdict:acquitted' | 'verdict:guilty' | 'verdict:life' | 'verdict:contempt' | 'mood-prompt'`. Lines are pulled directly from the blueprint tables; a small templated fallback covers movies not in the curated set. Every Reel surface is a single sentence, no hedging.

### Onboarding flow

Full-screen, one question at a time, two giant tap targets, no back button (per spec). Progress dots at top. After Q7 → 1.5s "Reading you…" beat → archetype reveal screen with the archetype name, one-line description, and "Enter CineVault" CTA. Persists archetype to localStorage and routes to `/watchlist`.

Scoring: each question maps to one or two archetype axes (intensity vs comfort, head vs heart, alone vs shared, etc.). Sum into 4-axis vector, pick highest. Deterministic, tested with a few example answer sets.

### Search screen

Top: archetype-styled search input with archetype-specific placeholder. Below: client-side fuzzy filter over `movies.ts`. Each result is a `MovieCard` with `+ Add` (or "✓ Added" disabled state if already in watchlist). Add → soft check animation, Reel toast, no modal.

### Watchlist screen

- Mood Bar pinned at top: archetype-voiced prompt + 4 quick chips (`Something light`, `Make me think`, `I want to laugh`, `Something beautiful`) + free-text input. On submit, deterministically pick the best-matching unwatched film from the watchlist by mood tags and render a "Reel's pick" hero card with the scripted line.
- Stack of `MovieCard`s below, separated into Unwatched / Watched sections.
- Card `···` menu: Mark as Watched / Remove.
- Mark as Watched opens `VerdictSheet` (bottom sheet, 4 cards). Tap one → permanent verdict badge on card + Reel toast. Re-tapping the menu on a watched card no longer offers re-rate (Reel line: "Verdicts stick.").

### Empty / first-run states

- Empty watchlist: Reel one-liner + CTA to Search.
- Empty search: archetype-voiced placeholder prompt.
- Mood Bar with empty watchlist: Reel says "Add something first — I work with what you've got."

## Demo affordance

A small gear icon in the header opens a sheet with: re-take DNA, jump-switch archetype (for the two-phone demo trick), reset data. Pre-seed button loads 8 demo films into the watchlist so judges see a populated stack immediately.

## Technical notes

- Routing: TanStack Start file routes (`index`, `onboarding`, `search`, `watchlist`).
- State: React context + localStorage; no server functions needed yet.
- Toasts: existing `sonner` component, styled via `--reel` token.
- Animations: `framer-motion` for question transitions, archetype reveal, verdict sheet, and toast entrance.
- Accessibility: each binary question is a radiogroup; sheets trap focus; all interactive elements ≥ 44px.
- Mock movie posters: TMDB image CDN URLs hard-coded in `movies.ts` (public, no key needed for image hotlinking in dev). If any fail, a poster-shaped gradient fallback renders.

## Out of scope / next pass

- Real TMDB search → swap `lib/cinevault/movies.ts` for fetch.
- Real Reel via Gemini → swap `reel.ts` for streaming call; interface stays the same.
- Supabase persistence → swap `storage.ts`.
- Auth, sharing, social.

After you approve, I'll implement everything above in one pass.
