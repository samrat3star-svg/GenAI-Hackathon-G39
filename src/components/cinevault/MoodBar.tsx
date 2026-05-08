import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCineVault } from "./CineVaultProvider";
import { MOOD_CHIPS, pickFromMood, tagsForQuery } from "@/lib/cinevault/mood";
import { MOVIES } from "@/lib/cinevault/movies";
import { reel } from "@/lib/cinevault/reel";
import { Sparkles, ArrowRight } from "lucide-react";

export function MoodBar() {
  const { archetype, archetypeData, watchlist } = useCineVault();
  const [query, setQuery] = useState("");
  const [pickId, setPickId] = useState<string | null>(null);
  const [reelLine, setReelLine] = useState<string | null>(null);

  if (!archetype || !archetypeData) return null;

  const unwatched = watchlist
    .filter((w) => !w.watched)
    .map((w) => MOVIES.find((m) => m.id === w.movieId))
    .filter((m): m is NonNullable<typeof m> => !!m);

  const handlePick = (tags: string[]) => {
    if (unwatched.length === 0) {
      setReelLine(reel.emptyWatchlist(archetype));
      setPickId(null);
      return;
    }
    const movie = pickFromMood(unwatched, tags as never);
    if (!movie) return;
    setPickId(movie.id);
    setReelLine(reel.moodPick(archetype, movie));
  };

  const pick = pickId ? MOVIES.find((m) => m.id === pickId) : null;

  return (
    <section className="rounded-3xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
        <Sparkles className="h-3.5 w-3.5" />
        Reel
      </div>
      <h2 className="mt-1 font-display text-2xl leading-snug tracking-tight text-balance">
        {archetypeData.moodPrompt}
      </h2>

      <div className="mt-4 flex flex-wrap gap-2">
        {MOOD_CHIPS.map((c) => (
          <button
            key={c.label}
            onClick={() => handlePick(c.tags)}
            className="rounded-full border border-border bg-background px-3.5 py-1.5 text-sm hover:bg-secondary hover:border-primary/50 transition-colors"
          >
            {c.label}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handlePick(tagsForQuery(query));
        }}
        className="mt-3 flex items-center gap-2 rounded-full border border-border bg-background pl-4 pr-1 py-1 focus-within:border-primary/60"
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="…or just type how you feel"
          className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground/70"
        />
        <button
          type="submit"
          className="rounded-full bg-primary p-2 text-primary-foreground hover:scale-105 transition-transform"
          aria-label="Ask Reel"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      <AnimatePresence mode="wait">
        {reelLine && (
          <motion.div
            key={reelLine + (pick?.id ?? "")}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-5 rounded-2xl bg-reel/95 p-4 text-reel-foreground"
          >
            {pick && (
              <div className="flex gap-3">
                <img
                  src={pick.poster}
                  alt=""
                  className="h-20 w-14 flex-none rounded-md object-cover"
                />
                <div className="flex-1">
                  <div className="text-[10px] uppercase tracking-[0.2em] opacity-70">Reel says</div>
                  <p className="mt-0.5 font-display text-lg leading-snug">{reelLine}</p>
                  <div className="mt-1 text-xs opacity-80">
                    {pick.title} · {pick.year}
                  </div>
                </div>
              </div>
            )}
            {!pick && (
              <p className="font-display text-base leading-snug">{reelLine}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
