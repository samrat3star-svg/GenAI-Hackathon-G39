
# CineVault — Cinematic Landing Redesign

Transform `/` from the current minimal type-led landing into a full cinematic streaming-style experience, while keeping the app's soul as an opinionated, emotionally curated **watchlist** (not a streaming clone). Existing onboarding, watchlist, search, archetype theming, Reel voice, and verdict systems remain untouched.

## Scope

- Replace `src/routes/index.tsx` content (keep the auto-redirect to `/watchlist` only when archetype already exists — actually remove that redirect so the hero is always reachable; add a "Find my Cinematic DNA" CTA inside hero instead).
- Add new components under `src/components/landing/`.
- Add a global PopChat FAB available on the landing route only (mounted inside the page, not the AppShell — to avoid touching authenticated flows).
- Extend `src/styles.css` with cinematic dark tokens scoped to the landing (a new `[data-surface="cinema"]` block) so the rest of the app is unaffected.

Out of scope: real video, real AI, TMDB fetching, route changes other than `/`, modifying onboarding/watchlist/search.

## New components

```text
src/components/landing/
  HeroCarousel.tsx        // fullscreen auto-rotating backdrops + Ken Burns zoom
  HeroSlide.tsx           // single slide: backdrop, gradients, title, meta, tagline, PopChat line, CTAs
  CinemaNavbar.tsx        // floating glass navbar (logo / Home Search Watchlist / avatar)
  FeaturedRow.tsx         // horizontal poster carousel with hover lift + glow
  PosterCard.tsx          // large poster card, minimal meta
  PopChatFab.tsx          // floating popcorn FAB
  PopChatPanel.tsx        // glass chat panel: bubbles, mascot, suggestion chips, input + mic
  PopcornMascot.tsx       // inline SVG popcorn character with subtle idle animation
src/lib/landing/
  featured.ts             // 5 hero movies + 3 curated rows (mock data, backdrop URLs from TMDB image CDN)
  popchat.ts              // scripted opinionated reply generator (keyword → short human line)
```

## Hero carousel — 5 featured films

Each entry: `{ id, title, year, runtime, genres[], backdrop, tagline, popchatLine }`.

1. Blade Runner 2049 — "Best watched after midnight."
2. Dune — "Dark room. Good speakers."
3. Interstellar — "This one stays with people."
4. Spider-Man: Into the Spider-Verse — "Pure momentum from start to finish."
5. Whiplash — "Tension you can feel in your teeth."

Behavior:
- Full `100dvh` section, backdrop as `<img>` with `object-cover`, crossfade between slides via Framer Motion `AnimatePresence` (fade 900ms, slow `scale 1.05 → 1.12` Ken Burns over 7s).
- Auto-advance every 6.5s; pause on hover/focus; manual dot indicators bottom-center.
- Layered overlays: bottom-up `linear-gradient(to top, bg 0%, bg/80 30%, transparent 70%)` + left-to-right `linear-gradient(to right, bg/85, transparent 55%)` + edge vignette (radial). Subtle grain layer reuses existing `.grain`.
- Content stack (left-aligned, max-w-2xl, bottom 1/3 on desktop, centered-bottom on mobile):
  - Eyebrow row: small uppercase "Featured · Tonight"
  - Display title (Fraunces, clamp 2.5rem → 5.5rem)
  - Meta row: `2017 · 2h 43m · Sci-Fi, Drama` separated by hairline dots
  - Tagline (italic serif, large)
  - PopChat line: popcorn glyph + short quoted commentary in muted accent
  - CTAs: primary "+ Add to Watchlist" (gradient + glow shadow), secondary "View Details" (outlined glass)

CTAs are functional against existing storage: primary calls `addToWatchlist(movieLikeFromHero)` and triggers an existing reel/sonner toast. "View Details" opens a lightweight glass dialog with the same backdrop + tagline (no new route).

## Cinema navbar

- Fixed top, `mx-auto max-w-6xl`, inset `top-4`, rounded-full pill on desktop, full-width translucent bar on mobile.
- Background: `bg-background/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]`.
- Left: small reel-icon + "CineVault" wordmark (Fraunces).
- Center (desktop only): `Home / Search / Watchlist` as TanStack `<Link>`s with active underline.
- Right: avatar circle (initial of archetype name, falls back to "C"); on click opens existing AppShell-style sheet (reuse component if cheap, otherwise simple popover with "Retake DNA" + "Reset").
- Mobile: collapse center links into a bottom-sheet menu triggered by hamburger.

## Curated rows

Three rows, rendered below hero with generous vertical spacing (`py-20`):
1. **Perfect Tonight** — 8 mood-curated picks
2. **Visually Stunning** — 8 picks tagged `beautiful`
3. **Easy Watches** — 8 picks tagged `light` / `comfort`

Built from existing `MOVIES` filtered by `moodTags`. `FeaturedRow` uses native horizontal scroll with `snap-x snap-mandatory`, fades on left/right edges, no nav arrows on mobile, arrows on desktop hover. `PosterCard` is `aspect-[2/3]`, hover: `scale-[1.04] + ring-1 ring-primary/40 + shadow-[0_20px_60px_-20px_var(--primary)]`, with title + year fading in below on hover.

## PopChat companion

`PopChatFab`:
- Bottom-right, `fixed bottom-6 right-6`, 56px circle, gradient bg + soft glow, popcorn mascot SVG inside with gentle `y: [0,-2,0]` idle loop (3s).
- Tooltip on hover: "PopChat 🍿 — Your Movie Buddy".

`PopChatPanel` (Framer scale+slide-in from FAB):
- 380px wide × ~560px tall on desktop, full-width bottom sheet on mobile.
- Glass: `bg-background/70 backdrop-blur-2xl border border-white/10`.
- Header: mascot + name + close.
- Suggestion chips above input: "Recommend a thriller", "Easy weekend watch", "Something comforting", "Mind-bending sci-fi".
- Message list: assistant bubbles have small mascot beside them; user bubbles right-aligned, primary tinted.
- Input row: textarea, mic button (uses `window.SpeechRecognition` if present; otherwise just a styled toggle that surfaces a small "voice not supported" hint), send button.
- Replies: scripted via `popchat.ts` — keyword match (thriller / cozy / sci-fi / weekend / sad / funny) → short opinionated line + 1–2 movie titles from `MOVIES`. No API.

Tone constraint enforced in `popchat.ts`: max 2 sentences, no "As an AI", no bullet lists, always opinionated.

## Visual system additions (`src/styles.css`)

Add a scoped block (does not touch existing archetype tokens):

```css
[data-surface="cinema"] {
  --background: oklch(0.13 0.01 260);
  --foreground: oklch(0.96 0.005 250);
  --card: oklch(0.17 0.012 260);
  --primary: oklch(0.72 0.17 35);          /* warm amber */
  --primary-foreground: oklch(0.13 0.01 260);
  --accent: oklch(0.78 0.12 55);
  --muted-foreground: oklch(0.7 0.015 250);
  --border: color-mix(in oklab, white 8%, transparent);
}
```

New utilities: `.glass`, `.glow-primary`, `.fade-edges-x`, `.cinema-vignette`. The landing route sets `data-surface="cinema"` on its root wrapper so the rest of the app keeps archetype palettes.

Typography stays Fraunces display + Inter body. Hero title uses `font-display` with `tracking-tight` and `text-balance`.

## Motion

- Framer Motion already installed.
- Hero transitions: `easeInOut`, 900ms fade, Ken Burns scale interpolation per slide.
- Section reveals on scroll via `whileInView` with 60ms stagger across row cards.
- Buttons: `whileHover={{ y: -1 }}`, `whileTap={{ scale: 0.97 }}`.
- Respect `prefers-reduced-motion` — disable Ken Burns + autoplay (still allow manual nav).

## Responsive

- Mobile (≤640): hero content centered-bottom, title clamp ~`text-4xl`, CTAs stack full-width, navbar becomes top translucent bar with hamburger, PopChat panel becomes bottom sheet, rows show 2.2 cards in viewport.
- Tablet (≥768): hero content left-aligned mid-bottom, navbar pill centered, rows show ~3.5 cards.
- Desktop (≥1024): full layered hero, navbar floats with center links, rows show ~5.5 cards with hover arrows.

## Index page composition

```tsx
<div data-surface="cinema" className="min-h-dvh bg-background text-foreground">
  <CinemaNavbar />
  <HeroCarousel slides={FEATURED} />
  <main className="mx-auto max-w-7xl px-4 sm:px-6 space-y-16 py-20">
    <FeaturedRow title="Perfect Tonight" movies={...} />
    <FeaturedRow title="Visually Stunning" movies={...} />
    <FeaturedRow title="Easy Watches" movies={...} />
    <section className="cta-strip"> Find my Cinematic DNA → /onboarding </section>
  </main>
  <PopChatFab />
</div>
```

The existing archetype redirect on mount is removed so the hero is always the entry point; the DNA CTA inside hero/strip continues to drive users into onboarding.

## Validation

- Visual QA via browser tools at 390px, 820px, 1440px after build.
- Confirm no regressions on `/onboarding`, `/search`, `/watchlist` (archetype tokens unchanged).
- Confirm autoplay pauses on hover and respects reduced motion.
