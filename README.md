# CineVault — G39 Hackathon

> A cinematic personal film vault with AI-powered mood-based recommendations, an archetype-driven chat assistant (Kernel), swipeable watchlist, and cloud sync via n8n + Airtable.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Environment Variables](#3-environment-variables)
4. [Architecture Overview](#4-architecture-overview)
5. [Backend — n8n Webhooks](#5-backend--n8n-webhooks)
6. [Database — Airtable](#6-database--airtable)
7. [Movie Data — TMDB](#7-movie-data--tmdb)
8. [Frontend — Route Structure](#8-frontend--route-structure)
9. [Core State — CineVaultProvider](#9-core-state--cinevaultprovider)
10. [Feature Deep-Dives](#10-feature-deep-dives)
    - [Mood Filtering System](#101-mood-filtering-system)
    - [WatchlistStack — Swipeable Cards](#102-watchliststack--swipeable-cards)
    - [Kernel Chat — AI Assistant](#103-kernel-chat--ai-assistant)
    - [Vault-First Search Logic](#104-vault-first-search-logic)
    - [Collections](#105-collections)
    - [Verdict System](#106-verdict-system)
11. [What Changed (Before → After)](#11-what-changed-before--after)
12. [Data Flow Diagrams](#12-data-flow-diagrams)
13. [Known Issues & Future Work](#13-known-issues--future-work)
14. [For the Next AI](#14-for-the-next-ai)

---

## 1. Project Overview

CineVault is a personal film tracker built for a hackathon (Team G39). Users:

1. Sign up / log in (stored in Airtable via n8n)
2. Pick a **viewer archetype** (Void-Gazer, Pulse-Chaser, Empath, Architect)
3. Search for movies (TMDB-powered, smart discovery mode)
4. Save them to a **Vault** (watchlist)
5. Browse the vault as a **swipeable card stack** or a list
6. Filter by **mood** (chip or free-text → AI interprets via OpenRouter)
7. Mark movies **watched** and assign a **verdict** (Loved / Solid / Mid / Skip)
8. Group movies into **Collections** (shareable, emoji-tagged)
9. Chat with **Kernel** — a floating AI assistant that routes requests to vault or TMDB search

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TanStack Router (file-based, SPA) |
| Styling | Tailwind CSS v4 + shadcn/ui (Radix primitives) |
| Animation | Framer Motion |
| Icons | Lucide React |
| Toasts | Sonner |
| State | React Context (`CineVaultProvider`) + localStorage |
| Backend | n8n cloud (webhook orchestration) |
| Database | Airtable (user accounts + synced state) |
| Movie API | TMDB (The Movie Database) |
| AI | OpenRouter → `meta-llama/llama-3.1-8b-instruct` via n8n AI Agent node |
| Build | Vite + vite-tsconfig-paths |

---

## 3. Environment Variables

Create a `.env` file at project root (never commit this):

```
VITE_N8N_BASE_URL=https://<your-n8n-instance>.app.n8n.cloud/webhook
VITE_TMDB_API_KEY=<your-tmdb-key>
VITE_GEMINI_API_KEY=<your-gemini-key>   # legacy, not actively used
```

All variables are prefixed `VITE_` so Vite exposes them to the browser. Access via `import.meta.env.VITE_*`.

---

## 4. Architecture Overview

```
Browser (React SPA)
    │
    ├── CineVaultProvider (React Context)
    │       localStorage ←→ cloud sync (n8n)
    │
    ├── Routes
    │   ├── /            Landing + auth
    │   ├── /onboarding  Archetype picker
    │   ├── /watchlist   Vault (stack + list + mood filter)
    │   ├── /search      TMDB movie search
    │   ├── /collections Collections CRUD
    │   └── /profile     User profile
    │
    ├── PopChat (Kernel)
    │       ↓ intent detection
    │       ├── search intent → vault check → /watchlist or /search
    │       ├── mood intent   → CustomEvent → watchlist mood filter
    │       └── chat intent   → n8n /g39-kernel → OpenRouter AI
    │
    └── API layer (src/lib/cinevault/api.ts)
            ↓
        n8n webhooks
            ├── Auth: g39-signup, g39-login
            ├── Sync: g39-sync, g39-state
            ├── Movies: g39-tmdb-search, g39-tmdb-trending
            ├── AI Mood: g39-interpret-mood → OpenRouter
            └── AI Chat: g39-kernel → OpenRouter
```

---

## 5. Backend — n8n Webhooks

All webhook paths share the base URL from `VITE_N8N_BASE_URL`. The n8n instance is at `samrat3star2.app.n8n.cloud`.

### Endpoints

#### `POST /g39-signup`
**Purpose:** Register a new user  
**Request body:** `{ email, password, name }`  
**What n8n does:**
1. Checks Airtable for existing email
2. If exists → returns `{ success: false, error: "Email already registered" }`
3. Creates user row in Airtable with `id: "usr_<timestamp>_<random6>"`, empty `watchlist`, `collections`, `archetype`
4. Returns `{ success: true, userId, name }`

#### `POST /g39-login`
**Purpose:** Authenticate user  
**Request body:** `{ email, password }`  
**What n8n does:**
1. Queries Airtable for email match
2. Compares plaintext password (demo only — no bcrypt)
3. Returns `{ success: true, userId, archetype, watchlist, collections, movieCache }` or `{ success: false }`

#### `POST /g39-sync`
**Purpose:** Push local state to cloud  
**Request body:** `{ userId, archetype, watchlist, collections, movieCache }`  
**What n8n does:** Finds user row in Airtable by userId, updates all fields (JSON-stringified).  
**When called:** Automatically after every state mutation in `CineVaultProvider` (debounced via useEffect watching watchlist + collections + archetype).

#### `POST /g39-state`
**Purpose:** Pull cloud state on login  
**Request body:** `{ userId }`  
**Returns:** Full user state + movieCache from Airtable  
**When called:** Once on app hydration if `cv_user_id` exists in localStorage.

#### `GET /g39-tmdb-search?q=<query>&page=<page>`
**Purpose:** Search TMDB by title  
**What n8n does:** Proxies to `https://api.themoviedb.org/3/search/movie`  
**Returns:** `{ total, page, movies: TmdbMovie[] }`

#### `GET /g39-tmdb-trending`
**Purpose:** Fetch trending movies (week)  
**What n8n does:** Proxies to `https://api.themoviedb.org/3/trending/movie/week`  
**Returns:** `{ movies: TmdbMovie[] }`

#### `POST /g39-interpret-mood`
**Purpose:** Convert a free-text mood string into TMDB genre names  
**Request body:** `{ mood: "something intense and dark" }`  
**What n8n does:**
1. AI Agent node receives the mood string
2. Passes to OpenRouter Chat Model (`meta-llama/llama-3.1-8b-instruct`, `temperature: 0.0`)
3. System prompt (few-shot): instructs model to return only a JSON array of genre names from: `["Action","Adventure","Animation","Comedy","Crime","Documentary","Drama","Family","Fantasy","History","Horror","Music","Mystery","Romance","Sci-Fi","Thriller","War","Western"]`
4. Code node parses response, extracts JSON array
5. Returns `{ genres: ["Horror", "Thriller"] }`
**Fallback:** Frontend has a keyword-regex fallback if AI returns empty.

#### `POST /g39-kernel`
**Purpose:** AI chat responses for the Kernel assistant  
**Request body:** `{ message, archetype, watchlist, collections }`  
**What n8n does:** Routes message + archetype context to OpenRouter, returns conversational reply tailored to the user's archetype.  
**Returns:** `{ reply: "..." }` (field name may vary — frontend checks `reply || message || text || response`)

### n8n Workflow File

The full workflow is in `cinevault_g39_workflow.json` (gitignored — contains credentials). To restore it, import the file into n8n via **Workflows → Import from file**.

**Key n8n node types used:**
- `n8n-nodes-base.webhook` — HTTP trigger
- `n8n-nodes-base.airtable` — Airtable read/write
- `n8n-nodes-base.code` — JavaScript transformation
- `n8n-nodes-base.respondToWebhook` — Send HTTP response
- `@n8n/n8n-nodes-langchain.agent` — AI Agent (LangChain)
- `@n8n/n8n-nodes-langchain.lmChatOpenRouter` — OpenRouter Chat Model

**Critical AI Agent connection:** The OpenRouter Chat Model connects to the AI Agent via the `ai_languageModel` connection type (not `main`). This is not obvious in n8n's UI — you must drag from the model's output to the agent's `Language Model` input specifically.

---

## 6. Database — Airtable

**Base ID:** `applIrCtwZWptFaw4`  
**Auth:** Personal Access Token (PAT) stored in n8n credentials — never exposed to frontend.

### Table: `Users`

| Field | Type | Notes |
|---|---|---|
| `id` | Text | `usr_<timestamp>_<random>` — primary key |
| `email` | Text | Lowercase, trimmed |
| `password` | Text | Plaintext (demo only) |
| `name` | Text | Display name |
| `archetype` | Text | One of `void-gazer`, `pulse-chaser`, `empath`, `architect` or `""` |
| `watchlist` | Long text | JSON string of `WatchlistItem[]` |
| `collections` | Long text | JSON string of `Collection[]` |
| `movieCache` | Long text | JSON string of `Record<string, TmdbMovie>` |
| `createdAt` | Text | ISO timestamp |

### localStorage Keys

The frontend mirrors cloud state in localStorage for instant load:

| Key | Value |
|---|---|
| `cv_authed` | `"true"` if logged in |
| `cv_user_id` | userId string |
| `cv_user_name` | Display name |
| `cinevault.v1` | JSON of `{ archetype, watchlist, collections }` |
| `cv_movie_cache` | JSON of `Record<movieId, TmdbMovie>` |
| `cv_fab_pos` | JSON `{ x, y }` — Kernel FAB position |
| `cv_kernel_query` | Cross-page search query from Kernel chat |
| `cv_kernel_mood` | Cross-page mood from Kernel chat |

---

## 7. Movie Data — TMDB

### Static Movies (`src/lib/cinevault/movies.ts`)

A curated list of ~20 hand-picked films with pre-tagged `moodTags`. Used as the initial seed and for fallback. Each movie has:
```typescript
interface Movie {
  id: string;          // e.g. "inception"
  title: string;
  year: number;
  runtime: number;     // minutes
  poster: string;      // URL
  moodTags: MoodTag[]; // "light"|"think"|"beautiful"|"tear"|"comfort"|"intense"|"epic"|"laugh"
  genres: string[];    // TMDB genre names
}
```

### TMDB Movies (dynamic)

When users search, results come from TMDB and are stored in `cv_movie_cache` (localStorage + Airtable). The cache key is the TMDB movie ID as a string (e.g. `"27205"` for Inception).

```typescript
interface TmdbMovie {
  id: string;          // TMDB ID as string
  tmdbId: number;
  title: string;
  year: number | null;
  poster: string | null;
  backdrop: string | null;
  overview: string;
  genres: string[];    // genre names resolved from TMDB genre IDs
  rating: number;      // vote_average × 10 / 10
  popularity: number;
}
```

### Smart Search (`api.smartSearch`)

Before falling back to title search, `smartSearch` tries to interpret the query as a genre/vibe and uses TMDB's **discover** endpoint:

1. Tests query against 18 regex patterns (e.g. `/\b(horror|scary|ghost)\b/` → genres: `["horror"]`)
2. If genres detected → `GET /3/discover/movie?with_genres=<ids>&sort_by=<sort>`
3. Returns `{ movies, isDiscovery: true }` 
4. If no genre detected → falls through to `/3/search/movie` title search

---

## 8. Frontend — Route Structure

All routes live in `src/routes/` and use TanStack Router file-based routing.

| Route file | Path | Description |
|---|---|---|
| `index.tsx` | `/` | Landing page + auth (login/signup) |
| `onboarding.tsx` | `/onboarding` | Archetype selection |
| `watchlist.tsx` | `/watchlist` | Main vault with mood filter, stack/list toggle, watched section |
| `search.tsx` | `/search` | Movie search with genre chips + vibe chips + TMDB results |
| `collections.tsx` | `/collections` | Create/view/manage collections |
| `profile.tsx` | `/profile` | User profile |
| `settings.tsx` | `/settings` | Settings |

### Auth Guard Pattern

Every protected route has this at the top of its component:

```typescript
useEffect(() => {
  const authed = localStorage.getItem("cv_authed");
  if (!authed || authed !== "true") { navigate({ to: "/" }); return; }
  if (!archetype) navigate({ to: "/onboarding" });
}, [archetype, navigate]);
```

### AppShell (`src/components/cinevault/AppShell.tsx`)

Wraps every protected page. Renders:
- **Desktop:** Top nav bar (CineVault logo + Vault/Collections/Search links + Settings gear + Profile avatar)
- **Mobile:** Top-right Settings + Profile icons + bottom tab bar (Search | Vault | Collections)
- **Global overlays:** `<PopChat />` (Kernel FAB) + `<MovieDetailPanel />` (slide-in detail panel)

Settings panel (Sheet) contains: archetype switcher, "Seed 8 demo films" button, Sign Out.

---

## 9. Core State — CineVaultProvider

`src/components/cinevault/CineVaultProvider.tsx` — React Context wrapping the entire app.

### Context Value Shape

```typescript
interface CineVaultContextValue {
  archetype: ArchetypeId | null;
  archetypeData: Archetype | null;      // full archetype object (name, tagline, etc.)
  watchlist: WatchlistItem[];
  detailMovieId: string | null;
  detailMovie: any | null;              // movie object for the detail panel
  setArchetype: (id: ArchetypeId | null) => void;
  setDetailMovie: (movie: any | null) => void;  // opens MovieDetailPanel
  addMovie: (movieId: string) => void;
  removeMovie: (movieId: string) => void;
  markWatched: (movieId: string, verdict: VerdictId) => void;
  hasMovie: (movieId: string) => boolean;
  reset: () => void;
  seedDemo: (movieIds: string[]) => void;
  collections: Collection[];
  createCollection: (name, emoji, description) => void;
  deleteCollection: (id) => void;
  addMovieToCollection: (collectionId, movieId) => void;
  removeMovieFromCollection: (collectionId, movieId) => void;
  addCollaborator: (collectionId, name) => void;
}
```

### Hydration Flow

1. On mount: load `cinevault.v1` from localStorage (instant, synchronous)
2. If `cv_user_id` exists: call `api.fetchState(userId)` to get cloud state
3. Merge cloud state (cloud wins for archetype/watchlist/collections)
4. Fetch any watchlist movies missing from `cv_movie_cache` via `api.fetchMovieById(tmdbId)`
5. Save merged cache back to localStorage

### Sync Flow

A `useEffect` watching `[archetype, watchlist, collections, hydrated, cloudHydrated]` auto-syncs to cloud after every mutation (only once both hydrations complete).

---

## 10. Feature Deep-Dives

### 10.1 Mood Filtering System

**Files:** `src/lib/cinevault/mood.ts`, `src/routes/watchlist.tsx`, `src/components/cinevault/MoodBar.tsx`

#### MoodBar Component

Renders at the top of the vault page:
- A free-text input ("Describe your mood...")
- 10 preset chips: `Comfort | Escape | Funny | Easy | Quiet | Intense | Emotional | Beautiful | Smart | Chaotic`
- On chip click or form submit: calls `onMoodSelect(mood)` → sets `activeMood` state in `watchlist.tsx`

#### CHIP_GENRE_MAP (fast path)

```typescript
// src/lib/cinevault/mood.ts
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

This map bypasses the AI entirely for the 10 preset chips, giving instant response.

#### Mood Resolution Flow (in `watchlist.tsx` useEffect)

```
activeMood set
    │
    ├── Is it a CHIP_GENRE_MAP key? ──YES──► setMoodGenres(CHIP_GENRE_MAP[mood])  ← instant
    │
    └── NO (free text)
            │
            ├── setMoodLoading(true)
            ├── 600ms debounce (prevents rapid API calls while typing)
            └── api.interpretMood(mood) → n8n → OpenRouter
                    │
                    ├── AI returns genres array? ──YES──► setMoodGenres(genres)
                    │
                    └── NO (empty / error)
                            └── Keyword regex fallback:
                                /horror|scary/ → ["Horror","Thriller"]
                                /comedy|funny/ → ["Comedy","Animation"]
                                /drama|sad/    → ["Drama","Romance"]
                                /sci.fi|space/ → ["Sci-Fi"]
                                /romance|love/ → ["Romance","Drama"]
                                /happy|chill/  → ["Comedy","Animation","Family"]
                                ... etc.
```

#### Sorting Logic (in `watchlist.tsx` useMemo)

```typescript
// When activeMood and moodGenres are set:
const moodLower = moodGenres.map(g => g.toLowerCase());
const scored = list.map(item => ({
  ...item,
  score: (item.movie.genres as any[])
    .filter(g => {
      const name = typeof g === "string" ? g : (g?.name ?? "");
      return name && moodLower.includes(name.toLowerCase());
    }).length,
}));
scored.sort((a, b) => b.score - a.score);
// Movies with score > 0 in positions 0-2 get isHighlighted: true
```

Handles both string genres (`"Comedy"`) and object genres (`{ name: "Comedy" }`) from TMDB.

#### Stack Reset on Mood Change

The `WatchlistStack` is keyed: `key={`${activeMood}-${moodGenres.join(',')}`}`. When the key changes, React unmounts and remounts the component, resetting `topIndex` to 0 so the user always sees the top-sorted movie first.

---

### 10.2 WatchlistStack — Swipeable Cards

**File:** `src/components/cinevault/WatchlistViews.tsx`

#### Before (original)

The original stack was a static display — no interaction. Cards were shown stacked visually but could not be navigated.

#### After (current)

Full swipe + arrow + counter navigation:

```typescript
export function WatchlistStack({ movies }: WatchlistProps) {
  const [topIndex, setTopIndex] = useState(0);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-18, 18]);     // tilt on drag
  const opacity = useTransform(x, [-200,-100,0,100,200], [0,1,1,1,0]); // fade at edges

  const total = movies.length;
  const current = movies[topIndex % total];
  const next = movies[(topIndex + 1) % total];      // shown 94% scale below
  const afterNext = movies[(topIndex + 2) % total]; // shown 88% scale, deeper

  const goNext = () => { x.set(0); setTopIndex(i => (i + 1) % total); };
  const goPrev = () => { x.set(0); setTopIndex(i => (i - 1 + total) % total); };

  const handleDragEnd = (_, info) => {
    if (info.offset.x < -80 || info.velocity.x < -500) goNext();      // swipe left
    else if (info.offset.x > 80 || info.velocity.x > 500) goPrev();   // swipe right
    else x.set(0); // snap back
  };
}
```

**Visual stack depth:**
- Card 3 (afterNext): `scale(0.88) translateY(-40px)`, z-index 1, opacity 60%
- Card 2 (next): `scale(0.94) translateY(-20px)`, z-index 2, opacity 80%
- Card 1 (current): full size, z-index 10, draggable, shows title + buttons

**Navigation controls:**
- `ChevronLeft` / `ChevronRight` arrow buttons below the stack
- Position counter: `"3 / 21"`
- Both wrap around (index 0 → total-1 when going back)

#### WatchlistList

List view (toggled via `Layers` / `LayoutList` icons). Shows movie poster thumbnail, title, year, runtime, verdict badge, and a `···` dropdown with:
- Mark as Watched
- Add to Collection → (Popover with user's collections list)
- Remove from Watchlist

---

### 10.3 Kernel Chat — AI Assistant

**File:** `src/components/ui/PopChat.tsx`

The Kernel is a floating action button (FAB) that expands into a chat panel. It is draggable and snaps to the nearest screen edge on release.

#### Before (original)

- Hardcoded greeting from a generic array
- `handleSend` just added a static hardcoded response after 800ms
- No AI, no routing, no archetype awareness

#### After (current)

**Archetype-aware greetings:**
```typescript
const GREETINGS = {
  "void-gazer": ["What kind of silence are you looking for tonight?", ...],
  "pulse-chaser": ["Tell me the vibe — we'll find something that moves.", ...],
  empath: ["What do you need from a film tonight?", ...],
  architect: ["What kind of puzzle are we solving tonight?", ...],
};
```

**Placeholder text:** Uses `ARCHETYPES[archetype].moodPrompt` from archetypes config.

**Header subtitle:** Shows `"tuned for The Void-Gazer"` etc.

**Intent Detection (`detectIntent` function):**

```typescript
function detectIntent(text: string): "search" | "mood" | "chat" {
  const t = text.toLowerCase().trim();

  // Search intent
  if (/\b(find|search|look for|show me|recommend|suggest|get me)\b/.test(t)) return "search";
  if (/\b(movie|film)\b.{0,30}\b(about|with|starring|director|like|similar)\b/.test(t)) return "search";

  // Mood intent
  if (/\b(i (am|feel|m|feeling|need|want|wanna|would like))\b/.test(t)) return "mood";
  if (/\b(happy|sad|bored|excited|tired|anxious|romantic|lazy|energetic|curious|...)\b/.test(t)) return "mood";
  if (MOOD_CHIPS.some(m => t.includes(m))) return "mood";
  if (/\b(something easy|feel something|...)\b/.test(t)) return "mood";

  return "chat"; // → calls api.kernelChat()
}
```

**Mood Extraction (`extractMood` function):**

Extracts the core emotion word from a full sentence to give the mood filter a clean string:
- `"I'm very sad today. What should I watch?"` → `"sad"`
- `"feeling a bit romantic"` → `"romantic"`
- Falls back to full text if no keyword found.

**Routing on intent:**

| Intent | Logic |
|---|---|
| `"mood"` | `extractMood(text)` → dispatch `CustomEvent("kernel-mood", { detail: mood })` + `localStorage.setItem("cv_kernel_mood", mood)` → navigate to `/watchlist` |
| `"search"` | `searchVault(text, watchlist)` → if match → mood filter vault; if no match → navigate to `/search` |
| `"chat"` | `api.kernelChat(text, archetype, watchlist, collections)` → display AI reply |

**Cross-page routing mechanism:**

Two mechanisms are used together to handle both same-page and cross-page navigation:

1. **CustomEvent** (same-page): Fires immediately. The target page listens with `document.addEventListener("kernel-mood", handler)` mounted in a `useEffect`. Works when already on `/watchlist`.

2. **localStorage** (cross-page): Written before `navigate()`. On mount, the target page reads and clears it in a `useEffect([], [])`. Works when navigating from another page.

**Loading state:** Three bouncing dots while waiting for AI response:
```tsx
<span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
<span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
<span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
```

---

### 10.4 Vault-First Search Logic

**File:** `src/components/ui/PopChat.tsx` → `searchVault()` function

When the user types a search query in Kernel chat, the system checks their vault **before** going to TMDB:

```typescript
function searchVault(query, watchlist): { found: boolean; genres: string[] } {
  const cache = JSON.parse(localStorage.getItem("cv_movie_cache") || "{}");
  const q = query.toLowerCase();

  // Step 1: Genre keyword match
  const SEARCH_GENRE_MAP = {
    horror: ["Horror","Thriller"],
    comedy: ["Comedy"],
    action: ["Action","Adventure"],
    drama: ["Drama"],
    sad: ["Drama","Romance"],
    "sci-fi": ["Sci-Fi"],
    // ... 20+ keyword → genre mappings
  };

  let matched = new Set<string>();
  for (const [kw, genres] of Object.entries(SEARCH_GENRE_MAP)) {
    if (q.includes(kw)) genres.forEach(g => matched.add(g));
  }

  if (matched.size > 0) {
    const matchedLower = [...matched].map(g => g.toLowerCase());
    const hasGenreMatch = watchlist.some(w => {
      const movie = cache[w.movieId];
      return movie?.genres?.some(g => matchedLower.includes(g.toLowerCase()));
    });
    if (hasGenreMatch) return { found: true, genres: [...matched] };
  }

  // Step 2: Title substring match
  const hasTitleMatch = watchlist.some(w => {
    const movie = cache[w.movieId];
    return movie?.title?.toLowerCase().includes(q);
  });
  if (hasTitleMatch) return { found: true, genres: [] };

  return { found: false, genres: [] };
}
```

**Outcomes:**

| Vault result | Reply shown | Navigation |
|---|---|---|
| Genre match found | `"You already have something like that in the vault."` (archetype-flavored) | `/watchlist` with genre filter applied |
| Title match found | Same vault reply | `/watchlist` (no genre filter, just navigates) |
| No match | `"Not in your vault yet. Let's find it on TMDB."` | `/search` with query pre-filled |

---

### 10.5 Collections

**File:** `src/routes/collections.tsx`, `src/components/cinevault/WatchlistViews.tsx`

Users can create named, emoji-tagged collections (e.g. "🎃 Spooky Season"). From the watchlist list view, each movie's `···` menu has "Add to Collection →" which opens a Popover showing all collections. Adding calls `addMovieToCollection(collectionId, movieId)` from context.

---

### 10.6 Verdict System

**Files:** `src/components/cinevault/VerdictSheet.tsx`, `src/lib/cinevault/reel.ts`, `src/components/cinevault/VerdictBadge.tsx`

When marking a movie watched, a bottom sheet appears with 4 verdict options:

```typescript
type VerdictId = "loved" | "solid" | "mid" | "skip";
```

Verdicts are shown as colored badges on watched cards. The watched section on `/watchlist` shows a collapsible grid of watched movies with verdict badges.

---

## 11. What Changed (Before → After)

### WatchlistStack

| Before | After |
|---|---|
| Static visual stack, no interaction | Swipe left/right to navigate |
| No navigation controls | ChevronLeft / ChevronRight arrows |
| No position indicator | Counter showing "3 / 21" |
| Info button called non-existent `setDetailMovieId` | Fixed to call `setDetailMovie(movie)` |

### Mood Filtering

| Before | After |
|---|---|
| Chips called Gemini directly (quota exhausted) | Chips use hardcoded `CHIP_GENRE_MAP` (instant, zero API calls) |
| Free text → Gemini (hit daily free tier 429 limit) | Free text → n8n → OpenRouter (`meta-llama/llama-3.1-8b-instruct`) |
| No fallback if AI fails | Keyword-regex fallback covers 10+ common moods |
| No debounce — rapid-fire API calls | 600ms debounce on free-text input |
| Sorting only triggered sometimes | Always sorts by genre score (descending, stable) |
| String genre comparison only | Handles both `"Comedy"` and `{ name: "Comedy" }` format |
| Stack didn't reset on mood change | Stack remounts (key prop) → always shows top match first |

### Kernel Chat (PopChat)

| Before | After |
|---|---|
| Generic greetings for all users | Per-archetype greeting pools (4 sets) |
| Static hardcoded response (800ms timeout) | Real AI via `api.kernelChat()` (n8n → OpenRouter) |
| No intent detection | Detects search / mood / chat intent |
| All queries went to TMDB search | Search checks vault first, falls back to TMDB only if not found |
| No mood routing | Mood phrases route to watchlist with filter applied |
| No archetype in header | Shows "tuned for The Void-Gazer" |
| No loading state | 3-dot bounce animation while AI responds |
| Placeholder: generic | Placeholder uses `ARCHETYPES[archetype].moodPrompt` |

### AI Provider

| Before | After |
|---|---|
| Gemini 2.5-flash (free tier) | OpenRouter → `meta-llama/llama-3.1-8b-instruct` |
| Direct browser → Gemini API calls | Browser → n8n webhook → OpenRouter (API key stays server-side) |
| Hallucinated genre arrays (high temperature) | Few-shot prompt + `temperature: 0.0` |
| No fallback | Multi-level: chip map → AI → keyword regex |

---

## 12. Data Flow Diagrams

### Mood Filter Flow

```
User types "I'm sad" in MoodBar
    → onMoodSelect("I'm sad") → setActiveMood("I'm sad")
    → useEffect fires (watchlist.tsx)
    → CHIP_GENRE_MAP["I'm sad"]? → NO
    → setMoodLoading(true)
    → setTimeout 600ms
    → api.interpretMood("I'm sad")
        → POST /g39-interpret-mood { mood: "I'm sad" }
        → n8n AI Agent → OpenRouter → ["Drama", "Romance"]
    → setMoodGenres(["Drama", "Romance"])
    → useMemo recomputes: scores each vault movie by Drama/Romance genre match
    → sorted list → WatchlistStack re-renders with key reset → shows Drama film first
```

### Kernel Search → Vault Flow

```
User types "find me a horror movie" in Kernel
    → detectIntent("find me a horror movie") → "search"
    → searchVault("find me a horror movie", watchlist)
        → SEARCH_GENRE_MAP: "horror" → ["Horror","Thriller"]
        → check movieCache: any vault movie with Horror/Thriller genre?
        → YES (e.g. "Get Out" is in vault)
    → VAULT_HIT_REPLY[archetype] → "Your vault has exactly what you're after."
    → dispatch CustomEvent("kernel-mood", { detail: "Horror" })
    → localStorage.setItem("cv_kernel_mood", "Horror")
    → setTimeout 700ms → setIsOpen(false) → navigate("/watchlist")

On watchlist:
    → kernel-mood event listener fires → setActiveMood("Horror")
    → mood useEffect: CHIP_GENRE_MAP["Horror"]? → NO
    → 600ms debounce → api.interpretMood("Horror") or keyword fallback
    → moodGenres = ["Horror","Thriller"]
    → vault sorted: horror movies bubble to top
```

---

## 13. Known Issues & Future Work

### Known Issues

1. **`setDetailMovieId` still in `WatchlistList`** — Line 138 of `WatchlistViews.tsx` uses `setDetailMovieId` which doesn't exist in context. Should be `setDetailMovie`. (Pre-existing bug in the original repo.)

2. **`MovieRow.tsx` uses `setDetailMovieId`** — Same issue, line 16.

3. **Plaintext passwords** — Airtable stores passwords in plaintext. Fine for demo, not for production.

4. **n8n rate limiting** — Free n8n tier has execution limits. The 600ms debounce helps but heavy usage may hit limits.

5. **movieCache grows unbounded** — No eviction policy. Will bloat Airtable field over time.

### Suggested Next Steps

- [ ] Fix `setDetailMovieId` in `WatchlistList` and `MovieRow`
- [ ] Add bcrypt to n8n signup/login (use a Code node)
- [ ] Add a `cv_movie_cache` size limit / LRU eviction
- [ ] Add Kernel message history persistence across sessions
- [ ] Add "Surprise me" logic that picks a random high-score vault movie
- [ ] Push notifications for "What are you watching tonight?" (n8n cron → webhook)

---

## 14. For the Next AI

### Where to Find Things

| Thing | Location |
|---|---|
| All API calls | `src/lib/cinevault/api.ts` |
| Archetype definitions | `src/lib/cinevault/archetypes.ts` |
| Mood tag logic | `src/lib/cinevault/mood.ts` |
| localStorage structure | `src/lib/cinevault/storage.ts` |
| Global state | `src/components/cinevault/CineVaultProvider.tsx` |
| Kernel chat | `src/components/ui/PopChat.tsx` |
| Watchlist page | `src/routes/watchlist.tsx` |
| Search page | `src/routes/search.tsx` |
| Card stack + list | `src/components/cinevault/WatchlistViews.tsx` |
| App shell + nav | `src/components/cinevault/AppShell.tsx` |
| Verdict UI | `src/components/cinevault/VerdictSheet.tsx` + `VerdictBadge.tsx` |
| Movie detail panel | `src/components/cinevault/MovieDetailPanel.tsx` |

### Key Patterns

**Opening the movie detail panel:**
```typescript
const { setDetailMovie } = useCineVault();
setDetailMovie(movieObject); // pass full movie object, not just ID
```

**Adding a movie to the vault:**
```typescript
const { addMovie } = useCineVault();
addMovie(movieId); // movieId must exist in MOVIES or cv_movie_cache
```

**Triggering mood filter from anywhere:**
```typescript
// Works even if already on /watchlist
document.dispatchEvent(new CustomEvent("kernel-mood", { detail: "Horror" }));
// For cross-page (navigate to watchlist after this):
localStorage.setItem("cv_kernel_mood", "Horror");
```

**Triggering search pre-fill from anywhere:**
```typescript
document.dispatchEvent(new CustomEvent("kernel-search", { detail: "Inception" }));
localStorage.setItem("cv_kernel_query", "Inception");
```

### Gotchas

1. **Movie genres can be strings OR objects.** TMDB returns `string[]` in our mapping, but older cache entries or static movies may differ. Always normalize: `typeof g === "string" ? g : g?.name ?? ""`

2. **`WatchlistStack` needs `key` prop to reset.** Without it, `topIndex` doesn't reset when the movie list order changes (e.g. after mood filter). In `watchlist.tsx`: `<WatchlistStack key={`${activeMood}-${moodGenres.join(',')}`} />`

3. **TanStack Router does NOT remount on same-route navigation.** If you navigate to `/watchlist` when already on `/watchlist`, no mount effects fire. Use CustomEvents for same-page triggers + localStorage for cross-page.

4. **n8n AI Agent `ai_languageModel` connection.** When building the mood/kernel AI nodes in n8n, the OpenRouter model must connect to the AI Agent via the special `ai_languageModel` port, not `main`. The workflow JSON captures this correctly — import it rather than recreating manually.

5. **`cv_movie_cache` is the bridge between TMDB data and vault display.** If a movie is in the watchlist but not in cache or `MOVIES`, it won't appear in the vault. The provider auto-fetches missing movies on hydration.
