import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { MoodBar } from "@/components/cinevault/MoodBar";
import { WatchlistList, WatchlistCarousel } from "@/components/cinevault/WatchlistViews";
import { VerdictSheet, type VerdictId } from "@/components/cinevault/VerdictSheet";
import { DecisionEngine } from "@/components/cinevault/DecisionEngine";
import { useCineVault } from "@/components/cinevault/CineVaultProvider";
import { MOVIES, type Movie } from "@/lib/cinevault/movies";
import { getTMDBDetails } from "@/lib/tmdb";
import { AppShell } from "@/components/cinevault/AppShell";
import { LayoutList, Film, ChevronDown, ChevronUp, Play, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { VerdictBadge } from "@/components/cinevault/VerdictBadge";
import { CHIP_GENRE_MAP } from "@/lib/cinevault/mood";
import { api } from "@/lib/cinevault/api";

export const Route = createFileRoute("/watchlist")({
  component: WatchlistPage,
});

function WatchlistPage() {
  const { archetype, watchlist, removeMovie, markWatched, setDetailMovieId } = useCineVault();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"list" | "carousel">("carousel");
  const [verdictTarget, setVerdictTarget] = useState<string | null>(null);
  const [activeMood, setActiveMood] = useState<string | null>(null);
  const [isDecisionMode, setIsDecisionMode] = useState(false);
  const [watchedExpanded, setWatchedExpanded] = useState(true);
  const [fetchedMovies, setFetchedMovies] = useState<Record<string, Movie>>({});
  const [moodGenres, setMoodGenres] = useState<string[]>([]);
  const [moodLoading, setMoodLoading] = useState(false);

  useEffect(() => {
    if (!archetype) navigate({ to: "/onboarding" });
    const authed = localStorage.getItem("cv_authed");
    if (!authed || authed !== "true") navigate({ to: "/" });
  }, [archetype, navigate]);

  // Pick up mood routed from Kernel chat (same-page and cross-page)
  useEffect(() => {
    const kernelMood = localStorage.getItem("cv_kernel_mood");
    if (kernelMood) {
      localStorage.removeItem("cv_kernel_mood");
      setActiveMood(kernelMood);
    }
    const handler = (e: Event) => setActiveMood((e as CustomEvent).detail);
    document.addEventListener("kernel-mood", handler);
    return () => document.removeEventListener("kernel-mood", handler);
  }, []);

  useEffect(() => {
    const missingIds = watchlist
      .map((w) => w.movieId)
      .filter((id) => !MOVIES.find((m) => m.id === id) && !fetchedMovies[id]);

    if (missingIds.length === 0) return;

    const fetchAll = async () => {
      const results: Record<string, Movie> = {};
      for (const id of missingIds) {
        const m = await getTMDBDetails(id);
        if (m) results[id] = m;
      }
      // Merge with current state to avoid stale closure overwriting existing entries
      setFetchedMovies(prev => ({ ...prev, ...results }));

      // ← TASK 10: persist to localStorage so Kernel vault-search can find them
      const existing = JSON.parse(localStorage.getItem("cv_movie_cache") || "{}");
      localStorage.setItem("cv_movie_cache", JSON.stringify({ ...existing, ...results }));
    };

    fetchAll();
  }, [watchlist]); // Only re-run when watchlist changes, not fetchedMovies

  // Step 1: Resolve activeMood → moodGenres
  useEffect(() => {
    if (!activeMood) { setMoodGenres([]); return; }

    // Fast path: preset chips
    if (CHIP_GENRE_MAP[activeMood]) {
      setMoodGenres(CHIP_GENRE_MAP[activeMood]);
      setMoodLoading(false);
      return;
    }

    // Slow path: free text → AI → fallback
    setMoodLoading(true);
    const timer = setTimeout(() => {
      api.interpretMood(activeMood).then(genres => {
        if (genres.length > 0) {
          setMoodGenres(genres);
        } else {
          // Keyword fallback
          const q = activeMood.toLowerCase();
          const fb: string[] = [];
          if (/horror|scary|ghost|creep|terror/.test(q))      fb.push("Horror", "Thriller");
          if (/comedy|funny|laugh|fun|humor/.test(q))         fb.push("Comedy", "Animation");
          if (/action|fight|war|battle/.test(q))              fb.push("Action", "Adventure");
          if (/adventure|quest|explore|journey/.test(q))      fb.push("Adventure", "Fantasy");
          if (/drama|sad|emotion|cry|tear/.test(q))           fb.push("Drama", "Romance");
          if (/sci.fi|space|future|alien/.test(q))            fb.push("Sci-Fi");
          if (/thrill|suspense|tense|crime|mystery/.test(q))  fb.push("Thriller", "Crime");
          if (/romance|love|romantic|date/.test(q))           fb.push("Romance", "Drama");
          if (/happy|fun|light|easy|comfort|chill/.test(q))   fb.push("Comedy", "Animation", "Family");
          if (fb.length > 0) setMoodGenres(fb);
        }
        setMoodLoading(false);
      });
    }, 600);
    return () => clearTimeout(timer);
  }, [activeMood]);

  const items = useMemo(() => {
    let list = watchlist
      .map((w) => ({ 
        state: w, 
        movie: MOVIES.find((m) => m.id === w.movieId) || fetchedMovies[w.movieId] 
      }))
      .filter((x): x is { state: typeof watchlist[number]; movie: NonNullable<typeof x.movie> } => !!x.movie)
      .map(item => ({
        ...item,
        isHighlighted: false,
        popchatLine: "",
        onMarkWatched: () => setVerdictTarget(item.movie.id),
        onRemove: () => removeMovie(item.movie.id)
      }));

    if (activeMood && moodGenres.length > 0) {
      const moodLower = moodGenres.map(g => g.toLowerCase());
      const scored = list.map(i => ({
        ...i,
        score: ((i.movie as any).genres as string[] || [])
          .filter(g => {
            const name = typeof g === "string" ? g : ((g as any)?.name ?? "");
            return name && moodLower.includes(name.toLowerCase());
          }).length,
      }));
      scored.sort((a, b) => b.score - a.score);
      list = scored.map((item, idx) => ({
        ...item,
        isHighlighted: idx < 3 && item.score > 0,
        popchatLine: idx < 3 && item.score > 0 ? "This feels right for tonight." : "",
      }));
    }

    return list;
  // fetchedMovies MUST be in deps so vault re-renders when async movie data arrives
  }, [watchlist, fetchedMovies, activeMood, moodGenres, removeMovie]);

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

          <MoodBar 
            onMoodSelect={setActiveMood} 
            showDecide={unwatchedItems.length > 0}
            onDecide={() => setIsDecisionMode(true)}
          />

          {moodLoading && (
            <p className="text-center text-xs text-primary animate-pulse mb-4">Reading your mood...</p>
          )}

          {/* UNWATCHED SECTION */}
          {/* Show a loading indicator if watchlist has items but none are resolved yet */}
          {watchlist.length > 0 && items.length === 0 && (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          {unwatchedItems.length === 0 && watchedItems.length === 0 && watchlist.length === 0 ? (
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
                <div className="flex p-1 bg-secondary border border-border rounded-full shadow-inner">
                  <button
                    onClick={() => setViewMode("carousel")}
                    className={`p-2 rounded-full transition-all duration-300 ${viewMode === "carousel" ? "bg-primary text-primary-foreground shadow-lg scale-110" : "text-muted-foreground hover:text-foreground"}`}
                    title="Carousel View"
                  >
                    <Play className="w-4 h-4 rotate-0" />
                  </button>

                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-full transition-all duration-300 ${viewMode === "list" ? "bg-primary text-primary-foreground shadow-lg scale-110" : "text-muted-foreground hover:text-foreground"}`}
                    title="List View"
                  >
                    <LayoutList className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {viewMode === "carousel" ? (
                  <motion.div key="carousel" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }}>
                    <WatchlistCarousel key={`${activeMood}-${moodGenres.join(',')}`} movies={unwatchedItems} />
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

        <AnimatePresence>
          {isDecisionMode && (
            <DecisionEngine 
              movies={unwatchedItems.map(i => i.movie).sort(() => Math.random() - 0.5)}
              onClose={() => setIsDecisionMode(false)}
              onPick={(movie) => {
                setIsDecisionMode(false);
                if (setDetailMovieId) setDetailMovieId(movie.id);
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </AppShell>
  );
}
