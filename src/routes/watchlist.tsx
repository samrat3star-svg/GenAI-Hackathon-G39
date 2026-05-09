import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { MoodBar } from "@/components/cinevault/MoodBar";
import { WatchlistStack, WatchlistList } from "@/components/cinevault/WatchlistViews";
import { VerdictSheet, type VerdictId } from "@/components/cinevault/VerdictSheet";
import { useCineVault } from "@/components/cinevault/CineVaultProvider";
import { MOVIES } from "@/lib/cinevault/movies";
import { AppShell } from "@/components/cinevault/AppShell";
import { LayoutList, Layers, Film, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { VerdictBadge } from "@/components/cinevault/VerdictBadge";

export const Route = createFileRoute("/watchlist")({
  component: WatchlistPage,
});

function WatchlistPage() {
  const { archetype, watchlist, removeMovie, markWatched } = useCineVault();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"stack" | "list">("stack");
  const [verdictTarget, setVerdictTarget] = useState<string | null>(null);
  const [activeMood, setActiveMood] = useState<string | null>(null);
  const [watchedExpanded, setWatchedExpanded] = useState(true);

  useEffect(() => {
    if (!archetype) navigate({ to: "/onboarding" });
    const authed = localStorage.getItem("cv_authed");
    if (!authed || authed !== "true") navigate({ to: "/auth" });
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

  const unwatchedItems = items.filter(i => !i.state.watched);
  const watchedItems = items.filter(i => i.state.watched);

  return (
    <AppShell>
      <div className="relative min-h-dvh">
        <main className="relative z-10 px-4 max-w-5xl mx-auto pt-6 pb-24">
          {/* Compact stats line */}
          <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground uppercase tracking-widest mb-6">
            <span className="text-foreground">{unwatchedItems.length} TO WATCH</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="text-primary">{watchedItems.length} WATCHED</span>
          </div>

          <MoodBar onMoodSelect={setActiveMood} />

          {/* UNWATCHED SECTION */}
          {unwatchedItems.length === 0 && watchedItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Film className="w-16 h-16 text-muted-foreground mb-6" />
              <p className="font-display text-2xl text-foreground/80 mb-2">Your vault is empty.</p>
              <p className="text-muted-foreground mb-8 max-w-sm">Every obsession starts with one film. Add something worth saving.</p>
              <Link to="/search" className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold shadow-[0_0_20px_rgba(var(--primary),0.4)] hover:scale-105 transition-transform">
                Find a Film
              </Link>
            </div>
          ) : unwatchedItems.length === 0 && watchedItems.length > 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="font-display text-xl text-foreground">Your vault is empty.</p>
              <p className="text-muted-foreground text-sm mt-1">Everything's been watched.</p>
              <Link to="/search" className="text-primary underline text-sm mt-3">
                Add more films →
              </Link>
            </div>
          ) : (
            <div className="mt-4">
              {/* View Toggles */}
              <div className="flex justify-end mb-8 max-w-3xl mx-auto">
                <div className="flex p-1 bg-secondary border border-border rounded-full">
                  <button
                    onClick={() => setViewMode("stack")}
                    className={`p-2 rounded-full transition-colors ${viewMode === "stack" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    <Layers className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-full transition-colors ${viewMode === "list" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    <LayoutList className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {viewMode === "stack" ? (
                  <motion.div key="stack" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                    <WatchlistStack movies={unwatchedItems} />
                  </motion.div>
                ) : (
                  <motion.div key="list" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
                    <WatchlistList movies={unwatchedItems} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* WATCHED SECTION */}
          {watchedItems.length > 0 && (
            <div className="mt-8">
              <div className="w-full h-px bg-border my-8" />
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <h2 className="font-display text-xl font-semibold text-foreground">Watched</h2>
                  <span className="bg-secondary text-muted-foreground text-xs rounded-full px-2 py-0.5 ml-2 font-medium">
                    {watchedItems.length}
                  </span>
                </div>
                <button 
                  onClick={() => setWatchedExpanded(!watchedExpanded)}
                  className="p-1.5 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                >
                  {watchedExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>
              
              <AnimatePresence initial={false}>
                {watchedExpanded && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 pt-2">
                      <AnimatePresence>
                        {watchedItems.map(item => (
                          <motion.div 
                            key={item.movie.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            layout
                            className="group relative flex flex-col"
                          >
                            <div className="aspect-[2/3] w-full rounded-xl overflow-hidden relative group">
                              <img src={item.movie.poster} alt={item.movie.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <VerdictBadge verdict={item.state.verdict!} size="md" />
                              </div>
                            </div>
                            <p className="text-xs text-foreground truncate font-medium mt-2 mb-1">{item.movie.title}</p>
                            <div>
                              <VerdictBadge verdict={item.state.verdict!} size="sm" />
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
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
