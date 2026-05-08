import type { Movie, MoodTag } from "./movies";

export const MOOD_CHIPS: { label: string; tags: MoodTag[] }[] = [
  { label: "Something light", tags: ["light", "comfort"] },
  { label: "Make me think", tags: ["think"] },
  { label: "I want to laugh", tags: ["laugh", "light"] },
  { label: "Something beautiful", tags: ["beautiful"] },
];

const KEYWORDS: { match: RegExp; tags: MoodTag[] }[] = [
  { match: /laugh|funny|comedy|fun/i, tags: ["laugh", "light"] },
  { match: /think|smart|cerebr|puzzle|twist/i, tags: ["think"] },
  { match: /beauti|stun|gorgeous|visual/i, tags: ["beautiful"] },
  { match: /cry|sad|emotion|heart|tear/i, tags: ["tear"] },
  { match: /tired|comfort|cozy|easy|gentle/i, tags: ["comfort", "light"] },
  { match: /intense|dark|heavy|disturb/i, tags: ["intense"] },
  { match: /epic|big|grand|long/i, tags: ["epic"] },
  { match: /light|short|quick|nothing serious/i, tags: ["light"] },
];

export function tagsForQuery(query: string): MoodTag[] {
  const found = new Set<MoodTag>();
  for (const k of KEYWORDS) if (k.match.test(query)) k.tags.forEach((t) => found.add(t));
  return Array.from(found);
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
