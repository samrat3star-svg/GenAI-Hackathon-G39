const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export async function suggestMoviesByMood(mood: string): Promise<string[]> {
  if (!mood || !OPENAI_API_KEY) return [];

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // Using a cost-effective model
        messages: [
          {
            role: "system",
            content: "You are a cinematic advisor for CineVault. The user will describe their current mood or what they want to watch. Suggest exactly 5 highly relevant movie titles that fit this vibe perfectly. Return only the titles as a comma-separated list. No other text, no numbers, just the names of the films."
          },
          {
            role: "user",
            content: `I'm feeling like: ${mood}`
          }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error("OpenAI API request failed");
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    return content.split(",").map((title: string) => title.trim());
  } catch (error) {
    console.error("Error fetching AI suggestions:", error);
    return [];
  }
}

export async function askKernel(question: string): Promise<string> {
  if (!question || !OPENAI_API_KEY) return "I'm a bit lost in the popcorn machine right now. Try again?";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are 'Kernel', a cinematic advisor. Keep responses extremely short and specific. Do NOT provide movie summaries or long descriptions unless explicitly asked. If asked for a summary, keep it under 3 lines. Be friendly but efficient. Use emojis sparingly."
          },
          {
            role: "user",
            content: question
          }
        ],
        temperature: 0.8,
      }),
    });

    if (!response.ok) throw new Error("Kernel failed to respond");
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Kernel Error:", error);
    return "The projector seems to be jammed! (AI error). But I'm still here to help if you try again.";
  }
}
