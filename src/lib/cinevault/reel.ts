import type { ArchetypeId } from "./archetypes";
import type { Movie } from "./movies";

export type VerdictId = "acquitted" | "guilty" | "life" | "contempt";

// Curated lines pulled from the blueprint, fallback templates per archetype.
const ADD_LINES: Record<string, Partial<Record<ArchetypeId, string>>> = {
  "john-wick": { "pulse-chaser": "Iconic. Locked in." },
  coco: { empath: "Bring tissues. You'll thank me." },
  inception: {
    "void-gazer": "This one rewards a second watch more than the first.",
    "pulse-chaser": "Solid pick. Moves the whole time.",
    empath: "It'll make you feel a lot without warning you.",
    architect: "Every frame is load-bearing. Nice choice.",
  },
};

const ADD_FALLBACK: Record<ArchetypeId, (m: Movie) => string> = {
  "void-gazer": (m) => `${m.title}. Patient choice.`,
  "pulse-chaser": (m) => `${m.title}. Locked in.`,
  empath: (m) => `${m.title} — that one's got a heart.`,
  architect: (m) => `${m.title}. Clean addition.`,
};

const VERDICT_FALLBACK: Record<VerdictId, Record<ArchetypeId, string>> = {
  acquitted: {
    "void-gazer": "Earned its runtime.",
    "pulse-chaser": "Delivered. Next.",
    empath: "Glad you spent the evening with it.",
    architect: "Tightly built. Verdict noted.",
  },
  guilty: {
    "void-gazer": "No shame in a quiet pleasure.",
    "pulse-chaser": "Exactly what it needed to be.",
    empath: "Loved for what it was. That counts.",
    architect: "Genre did its job. Moving on.",
  },
  life: {
    "void-gazer": "That film stays in the body.",
    "pulse-chaser": "Didn't expect it to hit that hard, did you.",
    empath: "One of the most human films ever made.",
    architect: "A masterwork. Logged for keeps.",
  },
  contempt: {
    "void-gazer": "A fair ruling. Moving on.",
    "pulse-chaser": "That one hurt a lot of people.",
    empath: "You're not wrong. It took something from everyone.",
    architect: "The structure didn't hold. Honest call.",
  },
};

const MOOD_PICK_LINES: Record<ArchetypeId, (m: Movie) => string> = {
  "void-gazer": (m) => `${m.title}. Sit with it.`,
  "pulse-chaser": (m) => `${m.title}. Press play.`,
  empath: (m) => `${m.title}. It'll meet you where you are.`,
  architect: (m) => `${m.title}. Clean choice for tonight.`,
};

const EMPTY_WATCHLIST: Record<ArchetypeId, string> = {
  "void-gazer": "Nothing yet. Bring me something worth waiting for.",
  "pulse-chaser": "Empty stack. Add something — I'll work fast.",
  empath: "Add something first — I work with what you've got.",
  architect: "Need inputs. Add a film and I'll do the rest.",
};

const REEL_INTRO: Record<ArchetypeId, string> = {
  "void-gazer":
    "Hey. Before we start — let me figure out what kind of movie person you are. Seven choices. No wrong answers.",
  "pulse-chaser":
    "Quick one. Seven taps. No wrong answers. Let's go.",
  empath:
    "Hi. I want to know you a little before we start. Seven questions. Just go with your gut.",
  architect:
    "Calibrating. Seven binaries. Pick fast — first instinct is the data I want.",
};

export const reel = {
  intro: (a: ArchetypeId) => REEL_INTRO[a],
  add: (a: ArchetypeId, m: Movie) =>
    ADD_LINES[m.id]?.[a] ?? ADD_FALLBACK[a](m),
  verdict: (a: ArchetypeId, v: VerdictId) => VERDICT_FALLBACK[v][a],
  moodPick: (a: ArchetypeId, m: Movie) => MOOD_PICK_LINES[a](m),
  emptyWatchlist: (a: ArchetypeId) => EMPTY_WATCHLIST[a],
  verdictsStick: () => "Verdicts stick. You felt what you felt.",
};
