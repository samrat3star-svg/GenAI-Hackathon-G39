import { MOVIES } from "@/lib/cinevault/movies";

export interface PopChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  picks?: { id: string; title: string }[];
}

const pick = (ids: string[]) =>
  ids
    .map((id) => MOVIES.find((m) => m.id === id))
    .filter(Boolean)
    .map((m) => ({ id: m!.id, title: m!.title }));

export function popchatReply(input: string): Omit<PopChatMessage, "id" | "role"> {
  const q = input.toLowerCase();

  if (/thrill|tense|edge/.test(q))
    return {
      text: "If you want your hands sweating — these never miss.",
      picks: pick(["the-prestige", "no-country", "parasite"]),
    };
  if (/cozy|comfort|warm|hug|sad day/.test(q))
    return {
      text: "Wrap yourself in a blanket. Pick one of these.",
      picks: pick(["amelie", "wall-e", "spirited-away"]),
    };
  if (/sci|space|mind|brain|cerebr/.test(q))
    return {
      text: "Your brain is going to do gymnastics. You're welcome.",
      picks: pick(["arrival", "annihilation", "interstellar"]),
    };
  if (/weekend|easy|chill|background|light/.test(q))
    return {
      text: "Low effort, high payoff. Press play, don't think.",
      picks: pick(["knives-out", "game-night", "the-grand-budapest"]),
    };
  if (/sad|cry|tear|emotion/.test(q))
    return {
      text: "Tissues out. These earn the tears honestly.",
      picks: pick(["coco", "her", "moonlight"]),
    };
  if (/funny|laugh|comedy/.test(q))
    return {
      text: "Cheap dopamine, but the good kind.",
      picks: pick(["game-night", "the-grand-budapest", "knives-out"]),
    };
  if (/beautiful|pretty|visual|stunning|cinemato/.test(q))
    return {
      text: "Pause-worthy in every frame. Don't watch on your phone.",
      picks: pick(["in-the-mood", "drive", "spider-verse"]),
    };

  return {
    text: "Tell me a mood — tense, cozy, weird, weepy. I'll do the rest.",
  };
}

export const SUGGESTION_CHIPS = [
  "Recommend a thriller",
  "Easy weekend watch",
  "Something comforting",
  "Mind-bending sci-fi",
];
