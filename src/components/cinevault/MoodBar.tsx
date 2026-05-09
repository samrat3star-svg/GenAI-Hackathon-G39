import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Popcorn, Sparkles } from "lucide-react";

export const MOOD_CHIPS = [
  "Comfort", "Escape", "Funny", "Easy", "Quiet", "Intense", "Emotional", "Beautiful", "Smart", "Chaotic"
];

interface MoodBarProps {
  onMoodSelect: (mood: string) => void;
  onDecide?: () => void;
  showDecide?: boolean;
}

export function MoodBar({ onMoodSelect, onDecide, showDecide }: MoodBarProps) {
  const [query, setQuery] = useState("");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handlePick = (mood: string) => {
    const newMood = selectedMood === mood ? null : mood;
    setSelectedMood(newMood);
    setQuery("");
    onMoodSelect(newMood || "");
  };

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "morning";
    if (hour >= 12 && hour < 17) return "afternoon";
    return "evening";
  };

  const timeOfDay = getTimeOfDay();
  const companionText = selectedMood
    ? "Setting the mood for..."
    : `What's the ${timeOfDay} calling for?`;

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
            className="text-lg md:text-xl font-display text-foreground drop-shadow-sm text-center"
          >
            {companionText} <span className="font-semibold text-primary">{selectedMood}</span>
          </motion.p>
        </AnimatePresence>

        {/* Input Field & Decide Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-2xl">
          <div className="relative flex-1 w-full">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 focus-within:opacity-100 transition-opacity duration-500" />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (query.trim()) handlePick(query.trim());
              }}
              className="relative flex items-center bg-card backdrop-blur-md border border-border rounded-full px-5 py-3.5 focus-within:border-primary/50 transition-colors shadow-md"
            >
              <Popcorn className="w-5 h-5 text-primary/80 mr-3 flex-shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Describe your mood..."
                className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground font-medium"
              />
            </form>
          </div>

          {showDecide && onDecide && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDecide}
              className="flex items-center gap-2 px-6 py-4 rounded-full bg-primary text-primary-foreground font-bold shadow-[0_0_25px_rgba(var(--primary),0.4)] whitespace-nowrap group"
            >
              <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
              Decide for Me
            </motion.button>
          )}
        </div>

        {/* Scrollable Chips */}
        <div className="w-full overflow-x-auto pb-4 hide-scrollbar">
          <div className="flex items-center justify-center gap-3 min-w-max px-4">
            {MOOD_CHIPS.map((chip) => (
              <motion.button
                key={chip}
                onClick={() => handlePick(chip)}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                  selectedMood === chip
                    ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(var(--primary),0.5)] scale-105"
                    : "bg-secondary text-foreground/80 border-border hover:bg-secondary hover:border-primary/40"
                }`}
              >
                {chip}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
