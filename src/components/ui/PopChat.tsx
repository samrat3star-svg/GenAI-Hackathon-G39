import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useCineVault } from "@/components/cinevault/CineVaultProvider";
import { api } from "@/lib/cinevault/api";
import { ARCHETYPES } from "@/lib/cinevault/archetypes";

const GREETINGS: Record<string, string[]> = {
  "void-gazer": [
    "🍿 What kind of silence are you looking for tonight?",
    "🍿 A film should earn its runtime. What are we facing?",
    "🍿 The deep end awaits. Tell me what you need.",
  ],
  "pulse-chaser": [
    "🍿 Still deciding? Tell me the vibe — we'll find something that moves.",
    "🍿 Your vault's loaded. What kind of night is this?",
    "🍿 Let's not overthink it. What are we working with?",
  ],
  empath: [
    "🍿 What do you need from a film tonight?",
    "🍿 I've been waiting. Tell me what kind of evening it is.",
    "🍿 Your vault has good taste. What's on your heart tonight?",
  ],
  architect: [
    "🍿 Let's find something built right. What's the structure tonight?",
    "🍿 The mechanism or the feeling? Tell me what you're after.",
    "🍿 What kind of puzzle are we solving tonight?",
  ],
};

const DEFAULT_GREETINGS = [
  "🍿 Still deciding? Tell me what kind of evening it is and I'll find the one.",
  "🍿 Your vault has good taste. Let me help you pick tonight's feature.",
  "🍿 Half the fun is the pick. What's the vibe?",
];

const SUGGESTIONS = [
  "I need something easy",
  "Surprise me tonight",
  "Something to think about",
  "I want to feel something",
];

const SEARCH_REPLY: Record<string, string> = {
  "void-gazer": "Searching the depths of cinema for you...",
  "pulse-chaser": "On it. Let's find something that moves.",
  empath: "Looking for something that speaks to that.",
  architect: "Running the search. Let's find the right structure.",
};

const MOOD_REPLY: Record<string, string> = {
  "void-gazer": "Taking you to your vault. Let the mood guide what surfaces.",
  "pulse-chaser": "Heading to your vault. The right pulse is in there.",
  empath: "Going to your vault — the feeling will lead the way.",
  architect: "Filtering your vault by what you need tonight.",
};

/** Extracts the core mood phrase from a free-text sentence, e.g. "I'm very sad today. What should I watch?" → "sad" */
function extractMood(text: string): string {
  const t = text.toLowerCase().trim();
  // Pull out the key emotion word if present
  const MOOD_WORDS = [
    "happy", "sad", "bored", "excited", "tired", "anxious", "romantic",
    "lazy", "energetic", "curious", "melancholy", "dark", "scared",
    "nostalgic", "hopeful", "angry", "lonely", "calm", "gloomy", "upbeat",
  ];
  for (const w of MOOD_WORDS) {
    if (t.includes(w)) return w;
  }
  const CHIP_LABELS = ["comfort", "escape", "intense", "emotional", "beautiful", "smart", "chaotic", "easy", "quiet", "funny"];
  for (const c of CHIP_LABELS) {
    if (t.includes(c)) return c;
  }
  return text; // fallback: full text
}

// Genre keywords → TMDB genre names (for vault search)
const SEARCH_GENRE_MAP: Record<string, string[]> = {
  horror:      ["Horror", "Thriller"],
  scary:       ["Horror"],
  thriller:    ["Thriller", "Crime"],
  comedy:      ["Comedy"],
  funny:       ["Comedy", "Animation"],
  laugh:       ["Comedy"],
  action:      ["Action", "Adventure"],
  adventure:   ["Adventure", "Fantasy"],
  drama:       ["Drama"],
  sad:         ["Drama", "Romance"],
  romance:     ["Romance", "Drama"],
  romantic:    ["Romance"],
  "sci-fi":    ["Sci-Fi"],
  science:     ["Sci-Fi"],
  space:       ["Sci-Fi"],
  alien:       ["Sci-Fi"],
  crime:       ["Crime", "Thriller"],
  animation:   ["Animation"],
  cartoon:     ["Animation", "Family"],
  documentary: ["Documentary"],
  fantasy:     ["Fantasy", "Adventure"],
  mystery:     ["Mystery", "Crime"],
  family:      ["Family", "Animation"],
};

type WatchlistItemLike = { movieId: string };

/**
 * Checks if the user's vault has movies matching the search query.
 * Returns { found, genres } — genres to apply as mood filter, or [] for a title match.
 */
function searchVault(query: string, watchlist: WatchlistItemLike[]): { found: boolean; genres: string[] } {
  try {
    const cache: Record<string, any> = JSON.parse(localStorage.getItem("cv_movie_cache") || "{}");
    const q = query.toLowerCase();

    // Genre-based match
    const matched = new Set<string>();
    for (const [kw, genres] of Object.entries(SEARCH_GENRE_MAP)) {
      if (q.includes(kw)) genres.forEach(g => matched.add(g));
    }

    if (matched.size > 0) {
      const matchedLower = Array.from(matched).map(g => g.toLowerCase());
      const hasGenreMatch = watchlist.some(w => {
        const m = cache[w.movieId];
        if (!m) return false;
        const genres: string[] = (m.genres || []).map((g: any) =>
          typeof g === "string" ? g.toLowerCase() : (g?.name ?? "").toLowerCase()
        );
        return genres.some(g => matchedLower.includes(g));
      });
      if (hasGenreMatch) return { found: true, genres: Array.from(matched) };
    }

    // Title-based match
    const hasTitleMatch = watchlist.some(w => {
      const m = cache[w.movieId];
      return m?.title?.toLowerCase().includes(q);
    });
    if (hasTitleMatch) return { found: true, genres: [] };

    return { found: false, genres: [] };
  } catch {
    return { found: false, genres: [] };
  }
}

const VAULT_HIT_REPLY: Record<string, string> = {
  "void-gazer": "You already have something like that in the vault. Let it surface.",
  "pulse-chaser": "Your vault has exactly what you're after. Let's go.",
  empath: "Something in your vault speaks to that. I'll show you.",
  architect: "Already in your collection. Filtering now.",
};

const VAULT_MISS_REPLY: Record<string, string> = {
  "void-gazer": "Nothing in your vault for that — searching TMDB.",
  "pulse-chaser": "Not in your vault yet. Let's find it on TMDB.",
  empath: "Your vault doesn't have that yet. Let me search for it.",
  architect: "Not in your collection — running a TMDB search.",
};

function detectIntent(text: string): "search" | "mood" | "chat" {
  const t = text.toLowerCase().trim();

  // Explicit search triggers
  if (/\b(find|search|look for|show me|recommend|suggest|get me)\b/.test(t)) return "search";
  if (/\b(movie|film)\b.{0,30}\b(about|with|starring|director|like|similar)\b/.test(t)) return "search";
  if (/\b(i (am|feel|m|feeling|need|want|wanna|would like))\b/.test(t)) return "mood";
  if (/\b(happy|sad|bored|excited|tired|anxious|romantic|lazy|energetic|curious|melancholy|dark|light|funny|scared|nostalgic|chill|cozy|hopeful)\b/.test(t)) return "mood";

  const MOOD_CHIPS = ["comfort", "escape", "intense", "emotional", "beautiful", "smart", "chaotic", "easy", "quiet", "funny"];
  if (MOOD_CHIPS.some(m => t.includes(m))) return "mood";

  // Suggestions that are mood-like
  if (/\b(something easy|feel something|something light|make me think|something beautiful|surprise me)\b/.test(t)) return "mood";

  return "chat";
}

export function PopChat() {
  const { archetype, watchlist, collections } = useCineVault();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Dragging State
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const dragStartPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("cv_fab_pos");
    if (saved) {
      try { setPos(JSON.parse(saved)); } catch {}
    } else {
      setPos({ x: window.innerWidth - 140, y: window.innerHeight - 80 });
    }
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const pool = archetype ? (GREETINGS[archetype] ?? DEFAULT_GREETINGS) : DEFAULT_GREETINGS;
      const greeting = pool[Math.floor(Math.random() * pool.length)];
      setMessages([{ role: "assistant", text: greeting }]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;

    setMessages(prev => [...prev, { role: "user", text }]);
    setInput("");
    setIsLoading(true);

    const intent = detectIntent(text);

    if (intent === "search") {
      const vaultResult = searchVault(text, watchlist);

      if (vaultResult.found) {
        // Vault has matching movies — filter it like a mood
        const reply = archetype ? (VAULT_HIT_REPLY[archetype] ?? VAULT_HIT_REPLY["pulse-chaser"]) : VAULT_HIT_REPLY["pulse-chaser"];
        setMessages(prev => [...prev, { role: "assistant", text: reply }]);
        setIsLoading(false);
        const moodKey = vaultResult.genres.length > 0 ? vaultResult.genres[0] : text;
        document.dispatchEvent(new CustomEvent("kernel-mood", { detail: moodKey }));
        localStorage.setItem("cv_kernel_mood", moodKey);
        setTimeout(() => { setIsOpen(false); navigate({ to: "/watchlist" }); }, 700);
      } else {
        // Not in vault — go to TMDB search
        const reply = archetype ? (VAULT_MISS_REPLY[archetype] ?? VAULT_MISS_REPLY["pulse-chaser"]) : VAULT_MISS_REPLY["pulse-chaser"];
        setMessages(prev => [...prev, { role: "assistant", text: reply }]);
        setIsLoading(false);
        document.dispatchEvent(new CustomEvent("kernel-search", { detail: text }));
        localStorage.setItem("cv_kernel_query", text);
        setTimeout(() => { setIsOpen(false); navigate({ to: "/search" }); }, 700);
      }
      return;
    }

    if (intent === "mood") {
      const reply = archetype ? (MOOD_REPLY[archetype] ?? MOOD_REPLY["pulse-chaser"]) : MOOD_REPLY["pulse-chaser"];
      setMessages(prev => [...prev, { role: "assistant", text: reply }]);
      setIsLoading(false);
      // Extract core mood word for cleaner filtering
      const moodPhrase = extractMood(text);
      // CustomEvent for same-page; localStorage for cross-page navigation
      document.dispatchEvent(new CustomEvent("kernel-mood", { detail: moodPhrase }));
      localStorage.setItem("cv_kernel_mood", moodPhrase);
      setTimeout(() => {
        setIsOpen(false);
        navigate({ to: "/watchlist" });
      }, 700);
      return;
    }

    // General chat — call the Kernel AI
    try {
      const res = await api.kernelChat(text, archetype, watchlist, collections);
      const reply = res.reply || res.message || res.text || res.response;
      if (reply) {
        setMessages(prev => [...prev, { role: "assistant", text: reply }]);
      } else {
        setMessages(prev => [...prev, { role: "assistant", text: "That sounds like a plan. Your vault has what you need — let me find it." }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: "assistant", text: "Something went wrong. Try again?" }]);
    }
    setIsLoading(false);
  };

  const handleSuggestion = (text: string) => {
    setInput(text);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  // Drag Handlers
  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    setDragging(true);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  const onPointerMove = (e: PointerEvent) => {
    const fabWidth = 120;
    const fabHeight = 50;
    let newX = e.clientX - dragOffset.current.x;
    let newY = e.clientY - dragOffset.current.y;
    newX = Math.max(0, Math.min(newX, window.innerWidth - fabWidth));
    newY = Math.max(0, Math.min(newY, window.innerHeight - fabHeight));
    setPos({ x: newX, y: newY });
  };

  const onPointerUp = (e: PointerEvent) => {
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
    setDragging(false);

    const distMoved = Math.sqrt(
      Math.pow(e.clientX - dragStartPos.current.x, 2) +
      Math.pow(e.clientY - dragStartPos.current.y, 2)
    );

    if (distMoved < 5) {
      setIsOpen(prev => !prev);
    }

    setPos(currentPos => {
      const fabW = 120;
      const fabH = 50;
      const distLeft = currentPos.x;
      const distRight = window.innerWidth - currentPos.x - fabW;
      const distTop = currentPos.y;
      const distBottom = window.innerHeight - currentPos.y - fabH;
      const minDist = Math.min(distLeft, distRight, distTop, distBottom);
      let finalX = currentPos.x;
      let finalY = currentPos.y;
      const padding = 16;
      if (minDist === distLeft) finalX = padding;
      else if (minDist === distRight) finalX = window.innerWidth - fabW - padding;
      else if (minDist === distTop) finalY = padding;
      else finalY = window.innerHeight - fabH - padding;
      const snapped = { x: finalX, y: finalY };
      localStorage.setItem("cv_fab_pos", JSON.stringify(snapped));
      return snapped;
    });
  };

  const archetypeName = archetype ? ARCHETYPES[archetype]?.name : null;

  return (
    <>
      <AnimatePresence>
        {!isOpen && mounted && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onPointerDown={onPointerDown}
            style={{
              position: "fixed",
              left: pos.x,
              top: pos.y,
              transition: dragging ? "none" : "left 0.3s ease, top 0.3s ease",
              cursor: dragging ? "grabbing" : "grab",
              zIndex: 50,
              userSelect: "none",
              touchAction: "none",
            }}
            className="group relative flex items-center gap-2 bg-primary text-primary-foreground rounded-full shadow-xl hover:scale-105 transition-transform flex-row px-4 py-2.5"
          >
            <span className="text-base leading-none">🍿</span>
            <span className="text-sm font-display font-bold tracking-wide leading-none">Kernel</span>
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-background rounded-full flex items-center justify-center pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </span>
          </motion.button>
        )}

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 w-80 md:w-96 bg-card border border-border shadow-2xl rounded-3xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-card/50 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.5, repeat: 0 }}
                  className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-base"
                >
                  🍿
                </motion.div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground leading-none">Kernel</h3>
                  <p className="text-xs text-muted-foreground italic mt-0.5">
                    {archetypeName ? `tuned for ${archetypeName}` : "pops up when you need a pick"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div
              ref={scrollRef}
              className="min-h-[220px] max-h-[320px] overflow-y-auto p-4 flex flex-col gap-3 hide-scrollbar bg-card"
            >
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "assistant" ? "justify-start" : "justify-end"}`}>
                  <div className={`px-4 py-3 rounded-2xl text-sm max-w-[85%] leading-relaxed ${
                    msg.role === "assistant"
                      ? "bg-secondary text-foreground rounded-tl-sm"
                      : "bg-primary text-primary-foreground rounded-tr-sm shadow-sm"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-secondary text-foreground text-sm flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions Grid */}
            <div className="px-4 pb-4 grid grid-cols-2 gap-2 bg-card">
              {SUGGESTIONS.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleSuggestion(chip)}
                  className="text-[11px] px-3 py-2 rounded-full border border-border bg-secondary text-foreground hover:border-primary hover:text-primary transition-colors text-left truncate"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-border bg-card">
              <form onSubmit={handleSend} className="flex items-center gap-2 bg-secondary/50 border border-border rounded-full px-4 py-2 focus-within:border-primary/50 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={archetype ? ARCHETYPES[archetype]?.moodPrompt : "Tell Kernel your mood..."}
                  className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-primary text-primary-foreground px-3 py-1.5 text-xs font-semibold rounded-full hover:scale-105 transition-transform disabled:opacity-50"
                >
                  Pop
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
