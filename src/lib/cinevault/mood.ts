import type { Movie, MoodTag } from "./movies";

export const MOOD_CHIPS: { label: string; tags: MoodTag[] }[] = [
  { label: "Something light", tags: ["light", "comfort"] },
  { label: "Make me think", tags: ["think"] },
  { label: "I want to laugh", tags: ["laugh", "light"] },
  { label: "Something beautiful", tags: ["beautiful"] },
];

// Maps MoodBar chip labels → TMDB genre names (for direct filtering without Gemini)
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

// Maps MoodBar chip labels → mood tags
export const CHIP_MOOD_MAP: Record<string, MoodTag[]> = {
  "Comfort":   ["comfort", "light"],
  "Escape":    ["epic", "light"],
  "Funny":     ["laugh", "light"],
  "Easy":      ["light", "comfort"],
  "Quiet":     ["beautiful", "think"],
  "Intense":   ["intense"],
  "Emotional": ["tear", "beautiful"],
  "Beautiful": ["beautiful"],
  "Smart":     ["think"],
  "Chaotic":   ["intense", "laugh"],
};

// Maps TMDB genres → mood tags
const GENRE_MOOD_MAP: Record<string, MoodTag[]> = {
  "Action":      ["intense", "epic"],
  "Adventure":   ["epic", "light"],
  "Animation":   ["comfort", "light", "beautiful"],
  "Comedy":      ["laugh", "light"],
  "Crime":       ["think", "intense"],
  "Documentary": ["think", "beautiful"],
  "Drama":       ["tear", "think"],
  "Family":      ["comfort", "light"],
  "Fantasy":     ["epic", "beautiful"],
  "History":     ["think", "epic"],
  "Horror":      ["intense"],
  "Music":       ["beautiful", "light"],
  "Mystery":     ["think"],
  "Romance":     ["tear", "beautiful", "comfort"],
  "Sci-Fi":      ["think", "epic"],
  "Thriller":    ["intense", "think"],
  "War":         ["intense", "epic", "tear"],
  "Western":     ["epic"],
};

const KEYWORDS: { match: RegExp; tags: MoodTag[] }[] = [
  { match: /laugh|funny|comedy|fun/i,           tags: ["laugh", "light"] },
  { match: /think|smart|cerebr|puzzle|twist/i,  tags: ["think"] },
  { match: /beauti|stun|gorgeous|visual/i,       tags: ["beautiful"] },
  { match: /cry|sad|emotion|heart|tear/i,        tags: ["tear"] },
  { match: /tired|comfort|cozy|easy|gentle/i,    tags: ["comfort", "light"] },
  { match: /intense|dark|heavy|disturb/i,        tags: ["intense"] },
  { match: /epic|big|grand|long/i,               tags: ["epic"] },
  { match: /light|short|quick|nothing serious/i, tags: ["light"] },
  { match: /escape|action|thrill/i,              tags: ["epic", "intense"] },
  { match: /quiet|calm|slow|gentle/i,            tags: ["beautiful", "think"] },
];

export function tagsForQuery(query: string): MoodTag[] {
  const found = new Set<MoodTag>();
  for (const k of KEYWORDS) if (k.match.test(query)) k.tags.forEach((t) => found.add(t));
  return Array.from(found);
}

/** Resolves a mood string (chip label or free text) into MoodTags */
export function tagsForMood(mood: string): MoodTag[] {
  if (CHIP_MOOD_MAP[mood]) return CHIP_MOOD_MAP[mood];
  return tagsForQuery(mood);
}

/** Infers moodTags for a TMDB movie using genres + overview */
export function inferMoodTags(movie: { genres?: string[]; overview?: string }): MoodTag[] {
  const found = new Set<MoodTag>();
  for (const genre of (movie.genres || [])) {
    (GENRE_MOOD_MAP[genre] || []).forEach(t => found.add(t));
  }
  tagsForQuery(movie.overview || "").forEach(t => found.add(t));
  return Array.from(found);
}

/** Scores a movie against mood tags — works for both static and TMDB movies */
export function scoreMovieForMood(
  movie: { moodTags?: MoodTag[]; genres?: string[]; overview?: string },
  tags: MoodTag[]
): number {
  const effectiveTags = (movie.moodTags && movie.moodTags.length > 0)
    ? movie.moodTags
    : inferMoodTags(movie);
  return effectiveTags.filter(t => tags.includes(t)).length;
}

export function pickFromMood(unwatched: Movie[], tags: MoodTag[]): Movie | null {
  if (unwatched.length === 0) return null;
  if (tags.length === 0) return unwatched[Math.floor(Math.random() * unwatched.length)];
  const scored = unwatched.map((m) => ({
    m,
    score: m.moodTags.filter((t) => tags.includes(t)).length,
  }));
  scored.sort((a, b) => b.score - a.score);
  if (scored[0].score === 0) return scored[0].m;
  const top = scored.filter((s) => s.score === scored[0].score);
  return top[Math.floor(Math.random() * top.length)].m;
}
