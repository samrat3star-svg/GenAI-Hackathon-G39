# CineVault — G39 Hackathon Build

**Live branch:** `feature/g39-backend-integration`  
**Working directory:** `d:/OutSkill-Hackathon/hackathon-G39-main/`  
**Team:** G39 Hackathon  
**Stack:** React + TypeScript + Vite + TanStack Router + Framer Motion + Tailwind CSS  
**Backend:** n8n (cloud automation) → Airtable (database) + OpenRouter (AI, via llama-3.1-8b)

---

## What This Project Is

CineVault is a personalized movie watchlist app with an AI-powered chat assistant called **Kernel**. Users pick a personality archetype (Void-Gazer, Pulse-Chaser, Empath, Architect), build a vault of saved movies, and let Kernel help them decide what to watch — filtering by mood, searching their vault first, then falling back to TMDB.

---

## Quick Start

```bash
cd d:/OutSkill-Hackathon/hackathon-G39-main
npm install
npm run dev
# → http://localhost:5173 (or next available port)
```

**Required `.env` file** (already present, do NOT commit):
```
VITE_N8N_BASE_URL=https://samrat3star2.app.n8n.cloud/webhook
VITE_TMDB_API_KEY=50afeddfde460da0131380fb18b7e0b9
VITE_GEMINI_API_KEY=AIzaSyCzH4ScZpFbUuNgVp6BQkbOHZTsIVMV6Iw
```

---

## Two Project Folders — Important Context

| Folder | Branch | Role |
|---|---|---|
| `d:/OutSkill-Hackathon/hackathon-G39/` | `feature/kernel-chat-vault-search` | Original working version (our dev branch) |
| `d:/OutSkill-Hackathon/hackathon-G39-main/` | `feature/g39-backend-integration` | **This folder** — main branch UI + our backend grafted in |

The `main` branch had a richer UI (Decision Engine, carousel view, rich movie detail panels, WatchlistStack). Our dev branch had the real backend (n8n auth, Airtable sync, Kernel AI chat). **This folder merges both.**

---

## Architecture Overview

```
User Browser
    │
    ├── TanStack Router (file-based routes)
    │     ├── / (landing + auth)
    │     ├── /onboarding
    │     ├── /watchlist  ← main vault page
    │     ├── /search
    │     ├── /collections
    │     └── /profile
    │
    ├── CineVaultProvider (global state context)
    │     ├── archetype, watchlist, collections
    │     ├── localStorage (instant, always)
    │     └── Airtable via n8n (cloud sync on every mutation)
    │
    └── Kernel (PopChat FAB)
          ├── detectIntent() → search | mood | chat
          ├── searchVault() → checks localStorage cache first
          ├── CustomEvent("kernel-mood") → filters watchlist
          ├── CustomEvent("kernel-search") → pre-fills search
          └── api.kernelChat() → n8n → OpenRouter AI

n8n Cloud (samrat3star2.app.n8n.cloud/webhook)
    ├── /g39-signup → creates Airtable user row
    ├── /g39-login → validates credentials, returns userId
    ├── /g39-sync → pushes watchlist/collections/movieCache to Airtable
    ├── /g39-state → pulls full user state from Airtable
    ├── /g39-kernel → OpenRouter AI chat (llama-3.1-8b-instruct)
    ├── /g39-interpret-mood → AI mood → genre array
    ├── /g39-tmdb-search → TMDB title search proxy
    └── /g39-tmdb-trending → TMDB trending proxy

Airtable (applIrCtwZWptFaw4)
    └── Users table: id, email, password, name, archetype,
                     watchlist (JSON), collections (JSON), movieCache (JSON)
```

---

## What We Changed From the Original Main Branch

### 1. `src/lib/cinevault/api.ts` — NEW FILE (did not exist)

**Original:** Did not exist. All external calls were scattered (OpenAI direct, no auth backend, no sync).

**Now:** Central API module routing all backend calls through n8n webhooks.

```
Functions:
  api.signup(email, password, name)         → POST /g39-signup
  api.login(email, password)                → POST /g39-login
  api.syncState(userId, archetype, ...)     → POST /g39-sync
  api.fetchState(userId)                    → POST /g39-state
  api.interpretMood(mood)                   → POST /g39-interpret-mood → string[]
  api.kernelChat(message, archetype, ...)   → POST /g39-kernel → { reply }
  api.searchMovies(query, page)             → GET /g39-tmdb-search
  api.fetchTrending()                       → GET /g39-tmdb-trending
  api.smartSearch(query, page)              → TMDB Discover API (client-side, genre/keyword detection)
  api.fetchMovieById(tmdbId)                → TMDB movie details (client-side)
```

**Key note:** `api.smartSearch()` uses the TMDB Discover API directly from the browser (not via n8n) for genre/vibe queries. It falls back to `api.searchMovies()` (n8n proxy) for title searches.

---

### 2. `src/lib/openai.ts` — Replaced internals

**Original:** Called OpenAI `gpt-4o-mini` directly. Required `VITE_OPENAI_API_KEY` which was never set → broken for all users.

**Now:** Same exported function names, internals replaced with n8n routing.
- `suggestMoviesByMood(mood)` → `api.interpretMood()` → returns genre names like `["Drama","Romance"]` (NOT movie titles)
- `askKernel(question)` → `api.kernelChat()` → reads `res.reply || res.message || res.text || res.response`

**Critical:** `suggestMoviesByMood` now returns **genre names**, not movie titles. Any code calling this and then searching TMDB by title will break. The correct usage is to treat the return value as genre filters. Currently used in `search.tsx` "Spark AI" button — **this needs verification** (see Wiring Notes below).

---

### 3. `src/routes/index.tsx` — Real authentication

**Original:** `handleSignUp` and `handleLogIn` both just set `localStorage.setItem("cv_authed", "true")` with no validation. Anyone could "log in" with any email/password.

**Now:** Real n8n calls:
- Sign Up → `api.signup()` → creates user row in Airtable → stores `cv_user_id`, `cv_user_name`
- Log In → `api.login()` → validates credentials in Airtable → stores same keys
- Loading state on button (`"Please wait..."` while API call is in flight)
- Error messages shown inline if sign up/login fails

**localStorage keys set on auth:**
- `cv_authed` = `"true"`
- `cv_user_id` = Airtable record ID
- `cv_user_name` = display name

---

### 4. `src/components/cinevault/CineVaultProvider.tsx` — Cloud sync

**Original:** Local state only. `useEffect` saved to localStorage on every mutation. No cloud persistence.

**Now:** Two-phase hydration + auto-sync:

**Phase 1 (instant):** Load from localStorage as before.

**Phase 2 (async):** If `cv_user_id` exists, call `api.fetchState()` and merge cloud data on top. Cloud wins for known entries. Movie caches are merged (local + cloud).

**Auto-sync:** After both hydration phases complete, every state mutation (add movie, mark watched, update collection, set archetype) calls `api.syncState()` to push the full state to Airtable.

**`cloudHydrated` guard:** Sync only fires after cloud data has loaded, preventing a race condition where local state overwrites cloud state.

**Added:** `setDetailMovie(movie)` alias — calls `setDetailMovieId(movie?.id)`. This was needed for compatibility with some components. The primary API is still `setDetailMovieId(id)`.

**Re-exports added at bottom:**
```typescript
export type { WatchlistItem, Collection } from "@/lib/cinevault/storage";
```
This fixes a TypeScript error where `WatchlistViews.tsx` imported these types from `CineVaultProvider`.

---

### 5. `src/lib/cinevault/mood.ts` — Added `CHIP_GENRE_MAP`

**Original:** Only contained mood chip label definitions and colors.

**Now:** Added `CHIP_GENRE_MAP` — maps the mood chip button labels directly to TMDB genre name arrays, bypassing the AI for instant response:

```typescript
export const CHIP_GENRE_MAP: Record<string, string[]> = {
  "Comfort":   ["Animation", "Family", "Comedy", "Romance"],
  "Escape":    ["Adventure", "Fantasy", "Action"],
  "Funny":     ["Comedy", "Animation"],
  "Easy":      ["Comedy", "Animation", "Family"],
  "Quiet":     ["Documentary", "Drama"],
  "Intense":   ["Thriller", "Crime", "Horror", "Action"],
  "Emotional": ["Drama", "Romance"],
  "Beautiful": ["Documentary", "Fantasy", "Romance", "Animation"],
  "Smart":     ["Documentary", "Mystery", "Crime", "Sci-Fi"],
  "Chaotic":   ["Comedy", "Action", "Thriller"],
};
```

**Important:** Chip labels must match exactly (case-sensitive). If `MoodBar.tsx` uses different chip labels, `CHIP_GENRE_MAP` lookups will miss and fall through to the slower AI path.

---

### 6. `src/routes/watchlist.tsx` — Mood filtering overhaul

**Original:** Simple string-match filter on `activeMood`. No AI interpretation. No Kernel chat integration.

**Now — three major additions:**

**A. Kernel chat listener:**
```typescript
useEffect(() => {
  const kernelMood = localStorage.getItem("cv_kernel_mood");
  if (kernelMood) { localStorage.removeItem("cv_kernel_mood"); setActiveMood(kernelMood); }
  const handler = (e: Event) => setActiveMood((e as CustomEvent).detail);
  document.addEventListener("kernel-mood", handler);
  return () => document.removeEventListener("kernel-mood", handler);
}, []);
```
This picks up mood routing from Kernel chat — both cross-page (localStorage) and same-page (CustomEvent).

**B. Two-step mood resolution:**
```
activeMood set
    → CHIP_GENRE_MAP lookup (instant, no API)
    → if miss: api.interpretMood() with 600ms debounce (AI)
    → if AI returns []: keyword regex fallback (local, instant)
    → setMoodGenres(result)
```

**C. Genre-score sorting (replaces simple filter):**
Instead of hiding non-matching movies, the vault now scores each movie by how many genres match, sorts highest-scoring first, and flags top 3 as `isHighlighted`. Non-matching movies stay visible at the bottom (not hidden).

**Added:** `WatchlistCarousel key={activeMood-moodGenres.join(',')}` — forces the carousel to remount and reset position when mood changes.

**Added:** `cv_movie_cache` write — after fetching TMDB details for watchlist movies, results are saved to localStorage so Kernel's vault-first search can find them.

---

### 7. `src/routes/search.tsx` — Kernel search integration

**Original:** No connection to Kernel chat. Search query was always typed by user.

**Now:** Mount `useEffect` reads `cv_kernel_query` from localStorage and listens for `kernel-search` CustomEvent — both set by Kernel when it routes a search request here.

```typescript
useEffect(() => {
  const kernelQuery = localStorage.getItem("cv_kernel_query");
  if (kernelQuery) { localStorage.removeItem("cv_kernel_query"); setQuery(kernelQuery); }
  const handler = (e: Event) => setQuery((e as CustomEvent).detail);
  document.addEventListener("kernel-search", handler);
  return () => document.removeEventListener("kernel-search", handler);
}, []);
```

---

### 8. `src/components/cinevault/WatchlistViews.tsx` — Swipeable stack

**Original:** `WatchlistStack` was a static visual decoration — three stacked cards with no interaction.

**Now:** Fully interactive swipeable card stack:
- Drag left/right to navigate
- Velocity-based snap (fast flick works)
- Left/Right arrow nav buttons with `1 / N` counter
- `AnimatePresence` for card transition animations
- `useMotionValue` + `useTransform` for drag-reactive rotate + opacity

The bottom two cards (background stack) remain static visuals.

---

### 9. `src/components/ui/PopChat.tsx` — Full Kernel AI chat rebuild

**Original:** Basic chat UI that called `askKernel()` from `openai.ts` (broken — no OpenAI key). No intent detection, no vault search, no mood routing, no persona.

**Now — complete rewrite:**

**Intent detection** (`detectIntent()`):
- `"search"` — "find me", "show me", "recommend", "movie about X"
- `"mood"` — "I feel", "I'm sad", mood words, chip labels
- `"chat"` — everything else

**Greeting detection** (`isGreeting()`):
- "hi", "hey", "hello", "how are you", etc. → instant archetype-specific greeting, no API call

**Vault-first search** (`searchVault()`):
1. Checks `cv_movie_cache` localStorage for genre keyword matches
2. Falls back to title substring match
3. Returns `{ found, genres }` — if found, routes to watchlist with mood filter; if not, routes to TMDB search

**Mood routing:**
- Extracts core emotion word (`extractMood()`: "I'm very sad today" → "sad")
- Dispatches `CustomEvent("kernel-mood")` + writes `cv_kernel_mood` to localStorage (dual pattern for same-page + cross-page)

**Archetype persona system:**

| Pool | Used when |
|---|---|
| `GREETINGS` | Opening message when chat is first opened |
| `GREETING_REPLIES` | User says "hi", "hey", "how are you" |
| `MOOD_REPLY` | Intent = mood → navigating to vault |
| `VAULT_HIT_REPLY` | Vault search found matching movies |
| `VAULT_MISS_REPLY` | Vault search found nothing → going to TMDB |
| `CHAT_REPLIES` | General chat, AI response truncated or empty |

**Anti-repeat logic:** `_lastReplyIndex` tracker prevents the same reply showing twice in a row.

**AI response quality guard** (`isCompleteSentence()`):
- n8n's AI Agent has a low token limit → often truncates mid-sentence
- If `res.reply` doesn't end in `.!?` or is < 30 chars → swap for persona pool reply
- If AI returns a complete sentence → show it as-is

**Draggable FAB:**
- Drag anywhere on screen
- Snaps to nearest edge on release
- Tap (< 5px movement) = toggle open/close
- Position persisted in `cv_fab_pos` localStorage

---

### 10. `src/components/landing/PopChatPanel.tsx` — Minor fix

**Original:** Had `iterationCount: 1` in a Framer Motion `transition` object — invalid prop, caused a TypeScript warning.

**Now:** Changed to `repeat: 0` (correct Framer Motion API).

---

### 11. `.gitignore` — Added secrets

**Added:**
```
.env
.env.*
!.env.example
cinevault_g39_workflow.json
GEMINI_HANDOFF.md
```

---

## n8n Webhook Reference

All calls go to `BASE_URL = import.meta.env.VITE_N8N_BASE_URL` (= `https://samrat3star2.app.n8n.cloud/webhook`).

| Endpoint | Method | Body | Response |
|---|---|---|---|
| `/g39-signup` | POST | `{ email, password, name }` | `{ success, userId, name }` |
| `/g39-login` | POST | `{ email, password }` | `{ success, userId, name }` |
| `/g39-sync` | POST | `{ userId, archetype, watchlist, collections, movieCache }` | `{ success }` |
| `/g39-state` | POST | `{ userId }` | `{ success, archetype, watchlist, collections, movieCache }` |
| `/g39-kernel` | POST | `{ message, archetype, watchlist, collections }` | `{ success, reply: "..." }` |
| `/g39-interpret-mood` | POST | `{ mood: "something dark" }` | `{ genres: ["Thriller","Horror"] }` |
| `/g39-tmdb-search` | GET | `?q=query&page=1` | `{ total, page, movies[] }` |
| `/g39-tmdb-trending` | GET | — | `{ movies[] }` |

**n8n known limitation:** The `/g39-kernel` AI Agent node has a low max token setting (~100-150 tokens). Responses are often truncated mid-sentence. The frontend handles this via `isCompleteSentence()` — but the real fix is to increase `maxOutputTokens` in the n8n workflow's OpenRouter Chat Model node to 400+.

---

## Data Flow — Adding a Movie

```
User clicks "Add to Watchlist"
    → addMovie() in CineVaultProvider
    → setWatchlist([...prev, newItem])
    → useEffect fires (watchlist changed)
    → saveState() to localStorage (instant)
    → cloudHydrated=true → api.syncState() fires
    → n8n /g39-sync → Airtable row updated
```

## Data Flow — Kernel Mood Chat

```
User types "I'm feeling sad tonight"
    → detectIntent() → "mood"
    → MOOD_REPLY[archetype] shown instantly
    → extractMood("I'm feeling sad tonight") → "sad"
    → CustomEvent("kernel-mood", { detail: "sad" }) dispatched
    → localStorage("cv_kernel_mood") = "sad"
    → navigate({ to: "/watchlist" })

watchlist.tsx mounts (or is already mounted):
    → CustomEvent handler fires → setActiveMood("sad")
    → CHIP_GENRE_MAP["sad"] → miss
    → api.interpretMood("sad") after 600ms → ["Drama","Romance"]
    → setMoodGenres(["Drama","Romance"])
    → items useMemo re-runs → genre-score sort
    → vault shows Drama/Romance movies first
```

---

## Airtable Schema

**Table:** Users (`applIrCtwZWptFaw4`)

| Field | Type | Notes |
|---|---|---|
| `id` | Auto ID | Airtable record ID, used as `cv_user_id` |
| `email` | Text | Unique login identifier |
| `password` | Text | Plain text (no hashing — hackathon only, not production) |
| `name` | Text | Display name (defaults to email prefix) |
| `archetype` | Text | One of: `void-gazer`, `pulse-chaser`, `empath`, `architect` |
| `watchlist` | Long text | JSON string of `WatchlistItem[]` |
| `collections` | Long text | JSON string of `Collection[]` |
| `movieCache` | Long text | JSON string of `Record<tmdbId, Movie>` |

---

## Things That Need Attention / Wiring Notes

### 1. `suggestMoviesByMood` return type change — VERIFY
**File:** `src/routes/search.tsx` — the "Spark AI" button calls `suggestMoviesByMood(query)`.

**Before:** It returned movie titles → code searched TMDB for those titles.  
**After:** It returns genre names like `["Drama","Romance"]` → code must use these as genre filters, NOT title searches.

**Action needed:** Read the "Spark AI" handler in `search.tsx` and confirm it applies genres as filters (via `smartSearch` or TMDB Discover), not as title search strings. If it still passes the genre names to a title search, fix it.

---

### 2. n8n kernel max tokens — INCREASE
**Where:** n8n workflow `g39-kernel` → OpenRouter Chat Model node → `maxOutputTokens` setting.

**Current behavior:** AI truncates mid-sentence (e.g., *"The void stretches, vast and indifferent, yet"* — no period). Frontend `isCompleteSentence()` catches this and swaps for a persona reply, but the AI replies are never shown.

**Fix:** Log into n8n (`samrat3star2.app.n8n.cloud`), open the `g39-kernel` workflow, find the OpenRouter Chat Model node, and set `maxOutputTokens` to at least **400**.

---

### 3. MoodBar chip labels must match `CHIP_GENRE_MAP` keys
**File:** Wherever `MoodBar` renders its chip buttons.

**Requirement:** The chip label strings passed to `setActiveMood()` must exactly match the keys in `CHIP_GENRE_MAP` in `mood.ts`:
```
"Comfort", "Escape", "Funny", "Easy", "Quiet",
"Intense", "Emotional", "Beautiful", "Smart", "Chaotic"
```
If MoodBar uses different casing or different labels, the fast-path lookup will miss and fall through to the slower AI path every time.

---

### 4. Password security — NOT for production
Airtable stores passwords as plain text. This is acceptable for a hackathon but must be replaced with hashed passwords (bcrypt in n8n) before any real deployment.

---

### 5. `cv_movie_cache` only populated after watchlist loads
The Kernel's `searchVault()` function searches `cv_movie_cache` to find genre/title matches. This cache is only populated when the watchlist page loads and fetches TMDB details for each movie. If a user goes directly to chat without visiting the watchlist, the cache may be empty and vault-first search will always miss (falling back to TMDB). 

**Possible fix:** Trigger TMDB detail fetching in `CineVaultProvider` on mount (after cloud hydration), not just on the watchlist page.

---

### 6. `routeTree.gen.ts` — auto-generated, do not edit
This file is auto-generated by TanStack Router. It will regenerate on `npm run dev`. Any manual edits will be overwritten.

---

### 7. Auth guard is disabled on landing page
In `src/routes/index.tsx`, the `beforeLoad` redirect (auto-skip to `/watchlist` if already logged in) is commented out. Users who are already logged in will always see the landing page on hard refresh.

**To re-enable:**
```typescript
beforeLoad: () => {
  const authed = localStorage.getItem("cv_authed");
  const archetype = localStorage.getItem("cv_archetype");
  if (authed === "true") {
    throw redirect({ to: archetype ? "/watchlist" : "/onboarding" });
  }
},
```

---

### 8. Gemini API key is present but unused
`VITE_GEMINI_API_KEY` is in `.env` but is not used anywhere in the codebase. It was set up for a future Gemini integration. If you plan to use it, create a `src/lib/gemini.ts` module.

---

## File Map — What We Own vs Original

| File | Status | What changed |
|---|---|---|
| `src/lib/cinevault/api.ts` | NEW | Entire file — all n8n webhook calls |
| `src/lib/openai.ts` | REPLACED | Internals replaced; exports unchanged |
| `src/lib/cinevault/mood.ts` | MODIFIED | Added `CHIP_GENRE_MAP` export |
| `src/routes/index.tsx` | MODIFIED | Real auth (signup/login via n8n) |
| `src/routes/watchlist.tsx` | MODIFIED | Kernel listener, mood resolution, genre scoring, cache write |
| `src/routes/search.tsx` | MODIFIED | Kernel search listener |
| `src/components/cinevault/CineVaultProvider.tsx` | MODIFIED | Cloud sync, `setDetailMovie` alias, type re-exports |
| `src/components/cinevault/WatchlistViews.tsx` | MODIFIED | Swipeable WatchlistStack |
| `src/components/ui/PopChat.tsx` | REBUILT | Full Kernel chat with persona, intent, vault search, mood routing |
| `src/components/landing/PopChatPanel.tsx` | MINOR FIX | `iterationCount` → `repeat` |
| `.gitignore` | MODIFIED | Added `.env`, secrets |
| `KERNEL_CHAT_FIX.md` | NEW | Internal fix notes |
| `GEMINI_HANDOFF.md` | NEW | AI handoff plan (gitignored) |
| `.env` | NEW | Secrets (gitignored) |

**Original files — do not touch without reading first:**
- `src/components/cinevault/MovieDetailPanel.tsx`
- `src/components/cinevault/MoodBar.tsx`
- `src/components/cinevault/VerdictSheet.tsx`
- `src/components/cinevault/DecisionEngine.tsx`
- `src/routes/onboarding.tsx`
- `src/routes/collections.tsx`
- `src/routes/profile.tsx`
- `src/lib/cinevault/storage.ts`
- `src/lib/cinevault/archetypes.ts`
- `src/lib/cinevault/reel.ts`

---

## Archetypes Reference

| ID | Name | Personality |
|---|---|---|
| `void-gazer` | The Void-Gazer | Cerebral, slow cinema, confrontational films |
| `pulse-chaser` | The Pulse-Chaser | High-energy, fast decisions, what's trending |
| `empath` | The Empath | Emotional depth, character-driven, feeling-led |
| `architect` | The Architect | Structure, craft, narrative mechanics |

Each archetype has its own greeting pool, chat reply pool, and mood/search reply strings in `PopChat.tsx`.

---

## VerdictId Reference

```typescript
type VerdictId = "acquitted" | "guilty" | "life" | "contempt";
```

| Verdict | Meaning |
|---|---|
| `acquitted` | Watched, didn't like it |
| `guilty` | Watched, guilty pleasure |
| `life` | Watched, loved it |
| `contempt` | Did not finish |

This type is defined in `src/lib/cinevault/reel.ts` and is identical in both project folders.

---

*Last updated: 2026-05-09 | Built by G39 Hackathon Team*
