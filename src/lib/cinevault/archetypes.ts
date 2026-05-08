export type ArchetypeId = "void-gazer" | "pulse-chaser" | "empath" | "architect";

export interface Archetype {
  id: ArchetypeId;
  name: string;
  tagline: string;
  description: string;
  searchPlaceholder: string;
  moodPrompt: string;
}

export const ARCHETYPES: Record<ArchetypeId, Archetype> = {
  "void-gazer": {
    id: "void-gazer",
    name: "The Void-Gazer",
    tagline: "Drawn to the deep end.",
    description:
      "You watch films like you read poetry — slowly, with the lights off. Stillness, weight, the long stare.",
    searchPlaceholder: "Find something that lingers…",
    moodPrompt: "What's the evening calling for?",
  },
  "pulse-chaser": {
    id: "pulse-chaser",
    name: "The Pulse-Chaser",
    tagline: "Momentum or nothing.",
    description:
      "You want movement, payoff, a film that knows where it's going. Cinema as a heartbeat.",
    searchPlaceholder: "What are we watching tonight?",
    moodPrompt: "What are we working with tonight?",
  },
  empath: {
    id: "empath",
    name: "The Empath",
    tagline: "Cinema is a feeling.",
    description:
      "You watch for the people, the small moments, the quiet ache. Stories that stay with you.",
    searchPlaceholder: "Looking for someone's story?",
    moodPrompt: "What do you need tonight?",
  },
  architect: {
    id: "architect",
    name: "The Architect",
    tagline: "Show me how it's built.",
    description:
      "You love the machinery — the twist, the structure, the puzzle that locks into place on the rewatch.",
    searchPlaceholder: "Title, director, mechanism…",
    moodPrompt: "What kind of structure tonight?",
  },
};

export const ARCHETYPE_IDS: ArchetypeId[] = [
  "void-gazer",
  "pulse-chaser",
  "empath",
  "architect",
];
