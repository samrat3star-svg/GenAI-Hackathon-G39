import type { ArchetypeId } from "./archetypes";

export interface DnaOption {
  label: string;
  // weights toward each archetype
  weights: Partial<Record<ArchetypeId, number>>;
}

export interface DnaQuestion {
  id: string;
  prompt: string;
  options: [DnaOption, DnaOption];
}

export const DNA_QUESTIONS: DnaQuestion[] = [
  {
    id: "ending",
    prompt: "A film ends ambiguously. You feel…",
    options: [
      { label: "Alive", weights: { "void-gazer": 2, architect: 1 } },
      { label: "Cheated", weights: { "pulse-chaser": 2, empath: 1 } },
    ],
  },
  {
    id: "company",
    prompt: "You watch alone or with someone?",
    options: [
      { label: "Alone — it's sacred", weights: { "void-gazer": 2, architect: 1 } },
      { label: "Together — it's shared", weights: { empath: 2, "pulse-chaser": 1 } },
    ],
  },
  {
    id: "runtime",
    prompt: "A 3-hour runtime is…",
    options: [
      { label: "A commitment I honor", weights: { "void-gazer": 2, architect: 1 } },
      { label: "A wall I won't climb", weights: { "pulse-chaser": 2 } },
    ],
  },
  {
    id: "feeling",
    prompt: "You prefer to feel…",
    options: [
      { label: "Disturbed and changed", weights: { "void-gazer": 2, architect: 1 } },
      { label: "Comforted and safe", weights: { empath: 2, "pulse-chaser": 1 } },
    ],
  },
  {
    id: "show-tell",
    prompt: "Beautiful visuals or sharp dialogue?",
    options: [
      { label: "Show me", weights: { "void-gazer": 2, "pulse-chaser": 1 } },
      { label: "Tell me", weights: { architect: 2, empath: 1 } },
    ],
  },
  {
    id: "purpose",
    prompt: "You watch to…",
    options: [
      { label: "Escape completely", weights: { "pulse-chaser": 2, empath: 1 } },
      { label: "Understand something", weights: { architect: 2, "void-gazer": 1 } },
    ],
  },
  {
    id: "tears",
    prompt: "A film that makes you cry is…",
    options: [
      { label: "A masterpiece", weights: { empath: 2, "void-gazer": 1 } },
      { label: "An ambush", weights: { "pulse-chaser": 2, architect: 1 } },
    ],
  },
];

export function scoreDna(answers: number[]): ArchetypeId {
  const totals: Record<ArchetypeId, number> = {
    "void-gazer": 0,
    "pulse-chaser": 0,
    empath: 0,
    architect: 0,
  };
  answers.forEach((choiceIdx, qIdx) => {
    const opt = DNA_QUESTIONS[qIdx]?.options[choiceIdx];
    if (!opt) return;
    for (const [k, v] of Object.entries(opt.weights)) {
      totals[k as ArchetypeId] += v as number;
    }
  });
  let winner: ArchetypeId = "empath";
  let max = -Infinity;
  (Object.keys(totals) as ArchetypeId[]).forEach((id) => {
    if (totals[id] > max) {
      max = totals[id];
      winner = id;
    }
  });
  return winner;
}
