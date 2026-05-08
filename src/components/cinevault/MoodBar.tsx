import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Popcorn } from "lucide-react";

export const MOOD_CHIPS = [
  "Comfort", "Escape", "Funny", "Easy", "Quiet", "Intense", "Emotional", "Beautiful", "Smart", "Chaotic"
];

interface MoodBarProps {
  onMoodSelect: (mood: string) => void;
}

export function MoodBar({ onMoodSelect }: MoodBarProps) {
  const [query, setQuery] = useState("");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handlePick = (mood: string) => {
    setSelectedMood(mood);
    setQuery("");
    onMoodSelect(mood);
  };

  const companionText = selectedMood 
    ? "Setting the mood for..." 
    : "What's the evening calling for?";

  return (
    <section className="relative z-10 w-full mb-12">
      <div className="flex flex-col items-center max-w-2xl mx-auto space-y-6">
        {/* Companion Text */}
        <AnimatePresence mode="wait">
          <motion.p
            key={companionText}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-lg md:text-xl font-display text-white/90 drop-shadow-md text-center"
          >
            {companionText} <span className="font-semibold text-primary">{selectedMood}</span>
          </motion.p>
        </AnimatePresence>

        {/* Input Field */}
        <div className="relative w-full max-w-md">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 focus-within:opacity-100 transition-opacity duration-500" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (query.trim()) handlePick(query.trim());
            }}
            className="relative flex items-center bg-black/60 backdrop-blur-md border border-white/20 rounded-full px-5 py-3.5 focus-within:border-primary/50 transition-colors shadow-2xl"
          >
            <Popcorn className="w-5 h-5 text-primary/80 mr-3" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Describe your mood..."
              className="flex-1 bg-transparent text-white outline-none placeholder:text-white/40 font-medium"
            />
          </form>
        </div>

        {/* Scrollable Chips */}
        <div className="w-full overflow-x-auto pb-4 hide-scrollbar">
          <div className="flex items-center justify-center gap-3 min-w-max px-4">
            {MOOD_CHIPS.map((chip) => (
              <button
                key={chip}
                onClick={() => handlePick(chip)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                  selectedMood === chip
                    ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(var(--primary),0.5)] scale-105"
                    : "bg-white/5 text-white/80 border-white/10 hover:bg-white/10 hover:border-white/30"
                }`}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
