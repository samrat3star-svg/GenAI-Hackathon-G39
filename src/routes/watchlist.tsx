import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { MoodBar } from "@/components/cinevault/MoodBar";
import { WatchlistStack, WatchlistList } from "@/components/cinevault/WatchlistViews";
import { VerdictSheet, type VerdictId } from "@/components/cinevault/VerdictSheet";
import { useCineVault } from "@/components/cinevault/CineVaultProvider";
import { MOVIES } from "@/lib/cinevault/movies";
import { AppShell } from "@/components/cinevault/AppShell";
import { LayoutList, Layers, Film } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/watchlist")({
  component: WatchlistPage,
});

function WatchlistPage() {
  const { archetype, watchlist, removeMovie, markWatched } = useCineVault();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"stack" | "list">("stack");
  const [verdictTarget, setVerdictTarget] = useState<string | null>(null);
  const [activeMood, setActiveMood] = useState<string | null>(null);

  useEffect(() => {
    if (!archetype) navigate({ to: "/onboarding" });
  }, [archetype, navigate]);

  const items = useMemo(() => {
    let list = watchlist
      .map((w) => ({ state: w, movie: MOVIES.find((m) => m.id === w.movieId) }))
      .filter((x): x is { state: typeof watchlist[number]; movie: NonNullable<typeof x.movie> } => !!x.movie)
      .map(item => ({
        ...item,
        isHighlighted: false,
        popchatLine: "",
        onMarkWatched: () => setVerdictTarget(item.movie.id),
        onRemove: () => removeMovie(item.movie.id)
      }));

    if (activeMood) {
      // Mock matching logic
      const tag = activeMood.toLowerCase();
      const matches = list.filter(i => 
        i.movie.moodTags.some(t => tag.includes(t)) || 
        i.movie.genres.some(g => tag.includes(g.toLowerCase()))
      );
      
      const top3 = matches.slice(0, 3).map(i => ({
        ...i,
        isHighlighted: true,
        popchatLine: "This feels right for tonight."
      }));
      
      const rest = list.filter(i => !top3.find(t => t.movie.id === i.movie.id));
      list = [...top3, ...rest];
    }

    return list;
  }, [watchlist, activeMood, removeMovie]);

  if (!archetype) return null;

  const totalCount = items.length;
  const watchedCount = items.filter(i => i.state.watched).length;

  return (
    <AppShell>
      <div className="relative min-h-dvh">
        {/* Cinematic Header */}
        <header className="relative pt-32 pb-16 px-6 max-w-4xl mx-auto text-center z-10">
          <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" />
          <h1 className="relative font-display text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Your Watchlist
          </h1>
          <p className="relative text-lg text-white/60 italic font-display">
            "A vault of future obsessions."
          </p>
          <div className="relative flex items-center justify-center gap-4 mt-6 text-sm font-medium text-white/50 uppercase tracking-widest">
            <span>{totalCount} Total</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-primary">{watchedCount} Watched</span>
          </div>
          <div className="relative w-24 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto mt-8" />
        </header>

        <main className="relative z-10 px-6 max-w-5xl mx-auto">
        <MoodBar onMoodSelect={setActiveMood} />

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Film className="w-16 h-16 text-white/10 mb-6" />
            <p className="font-display text-2xl text-white/80 mb-2">Your vault is empty.</p>
            <p className="text-white/40 mb-8 max-w-sm">Every obsession starts with one film. Add something worth saving.</p>
            <Link to="/search" className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold shadow-[0_0_20px_rgba(var(--primary),0.4)] hover:scale-105 transition-transform">
              Find a Film
            </Link>
          </div>
        ) : (
          <div className="mt-12">
            {/* View Toggles */}
            <div className="flex justify-end mb-8 max-w-3xl mx-auto">
              <div className="flex p-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
                <button 
                  onClick={() => setViewMode("stack")}
                  className={`p-2 rounded-full transition-colors ${viewMode === "stack" ? "bg-white/20 text-white" : "text-white/40 hover:text-white/80"}`}
                >
                  <Layers className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-full transition-colors ${viewMode === "list" ? "bg-white/20 text-white" : "text-white/40 hover:text-white/80"}`}
                >
                  <LayoutList className="w-4 h-4" />
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {viewMode === "stack" ? (
                <motion.div key="stack" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                  <WatchlistStack movies={items} />
                </motion.div>
              ) : (
                <motion.div key="list" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
                  <WatchlistList movies={items} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
        </main>

        <VerdictSheet
          open={!!verdictTarget}
          movieTitle={items.find(i => i.movie.id === verdictTarget)?.movie.title ?? ""}
          onOpenChange={(o) => { if (!o) setVerdictTarget(null); }}
          onPick={(v: VerdictId) => {
            if (!verdictTarget) return;
            markWatched(verdictTarget, v);
            setVerdictTarget(null);
          }}
        />
      </div>
    </AppShell>
  );
}
