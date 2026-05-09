// src/lib/openai.ts
// Replaces direct OpenAI calls with our n8n/OpenRouter backend.
import { api } from "@/lib/cinevault/api";

/**
 * Interprets a mood string and returns movie genre suggestions.
 * Previously called OpenAI; now routes through n8n → OpenRouter.
 * Returns genre names (e.g. ["Drama","Romance"]) not movie titles.
 */
export async function suggestMoviesByMood(mood: string): Promise<string[]> {
  if (!mood) return [];
  return api.interpretMood(mood);
}

/**
 * Kernel AI chat response.
 * Previously called OpenAI gpt-4o-mini; now routes through n8n → OpenRouter.
 */
export async function askKernel(question: string): Promise<string> {
  if (!question) return "I'm a bit lost in the popcorn machine right now. Try again?";
  try {
    const res = await api.kernelChat(question, null, [], []);
    return res.reply || res.message || res.text || res.response ||
      "The projector seems jammed. Try again?";
  } catch {
    return "The projector seems jammed. Try again?";
  }
}
