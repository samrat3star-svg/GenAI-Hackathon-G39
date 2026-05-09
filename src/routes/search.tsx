import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search as SearchIcon, Plus } from "lucide-react";
import { AppShell } from "@/components/cinevault/AppShell";
import { useCineVault } from "@/components/cinevault/CineVaultProvider";
import { api } from "@/lib/cinevault/api";
import { reelToast } from "@/components/cinevault/reelToast";
import { reel } from "@/lib/cinevault/reel";
import { inferMoodTags } from "@/lib/cinevault/mood";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/search")({
  component: SearchPage,
});

const GENRE_CHIPS = [
  "Action", "Comedy", "Drama", "Thriller", "Sci-Fi",
  "Horror", "Romance", "Animation", "Documentary", "Crime",
];

const VIBE_CHIPS = [
  "Under 2 hrs", "Classic", "Mind-Bending", "Feel-Good",
  "Dark", "Award-Winning", "Cult Favourite",
];

function matchesVibe(movie: any, vibe: string): boolean {
  const tags = movie.moodTags.map((t) => t.toLowerCase());
  switch (vibe) {
    case "Under 2 hrs":     return movie.runtime < 120;
    case "Classic":         return movie.year < 1990;
    case "Mind-Bending":    return tags.some(t => t.includes("think") || t.includes("mind-bending"));
    case "Feel-Good":       return tags.some(t => t.includes("comfort") || t.includes("light"));
    case "Dark":            return tags.some(t => t.includes("dark") || t.includes("intense"));
    case "Award-Winning":   return tags.some(t => t.includes("acclaimed"));
    case "Cult Favourite":  return tags.some(t => t.includes("cult"));
    default:                return false;
  }
}

function SearchPage() {
  const { archetype, addMovie, watchlist, setDetailMovie } = useCineVault();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null);
  const [tmdbResults, setTmdbResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDiscovery, setIsDiscovery] = useState(false);

  useEffect(() => {
    const authed = localStorage.getItem("cv_authed");
    if (!authed || authed !== "true") { navigate({ to: "/" }); return; }
    if (!archetype) navigate({ to: "/onboarding" });
  }, [archetype, navigate]);

  // Pick up query routed from Kernel chat (localStorage = cross-page, event = same-page)
  useEffect(() => {
    const kernelQuery = localStorage.getItem("cv_kernel_query");
    if (kernelQuery) {
      localStorage.removeItem("cv_kernel_query");
      setQuery(kernelQuery);
    }
    const handler = (e: Event) => setQuery((e as CustomEvent).detail);
    document.addEventListener("kernel-search", handler);
    return () => document.removeEventListener("kernel-search", handler);
  }, []);

  // Initial load: Trending
  useEffect(() => {
    setLoading(true);
    api.fetchTrending().then(res => {
      setTmdbResults(res.movies || []);
      setLoading(false);
    });
  }, []);

  // Search logic
  useEffect(() => {
    if (query.trim().length < 2) {
      if (!query.trim()) {
        setIsDiscovery(false);
        api.fetchTrending().then(res => setTmdbResults(res.movies || []));
      }
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      const res = await api.smartSearch(query);
      setTmdbResults(res.movies || []);
      setIsDiscovery(res.isDiscovery || false);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [query]);

  const results = useMemo(() => {
    return tmdbResults.filter(m => {
      const genreMatch = !selectedGenre || 
        m.genres.some((g: string) => g.toLowerCase().includes(selectedGenre.toLowerCase()));
      return genreMatch;
    });
  }, [tmdbResults, selectedGenre]);

  if (!archetype) return null;

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-4 pt-8 pb-24">

        {/* Search Bar */}
        <div className="relative group">
          <div className={`absolute inset-0 bg-primary/20 blur-2xl rounded-full transition-opacity duration-700 ${isFocused ? "opacity-100" : "opacity-0"}`} />
          <div className="relative flex items-center bg-card backdrop-blur-xl border border-border rounded-full px-6 py-4 shadow-md focus-within:border-primary/50 transition-colors">
            <SearchIcon className={`w-6 h-6 mr-4 transition-colors ${isFocused ? "text-primary" : "text-muted-foreground"}`} />
            <input
              autoFocus
              value={query}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title..."
              className="flex-1 bg-transparent text-lg text-foreground outline-none placeholder:text-muted-foreground font-medium"
            />
            {loading && <div className="mr-3 animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />}
            {(query || selectedGenre || selectedVibe) && (
              <button
                onClick={() => { setQuery(""); setSelectedGenre(null); setSelectedVibe(null); }}
                className="ml-3 text-xs text-muted-foreground hover:text-foreground transition-colors font-medium px-2 py-1 rounded-full hover:bg-secondary"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filter Chips */}
        <div className="mt-6 space-y-4">
          {/* Genre Row */}
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 px-1">Genre</p>
            <div className="overflow-x-auto hide-scrollbar" style={{ scrollbarWidth: "none" }}>
              <div className="flex gap-2 min-w-max">
                {GENRE_CHIPS.map((chip) => {
                  const active = selectedGenre === chip;
                  return (
                    <button
                      key={chip}
                      onClick={() => setSelectedGenre(active ? null : chip)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 whitespace-nowrap ${
                        active
                          ? "bg-primary text-primary-foreground border-primary scale-105 shadow-[0_0_12px_rgba(var(--primary),0.4)]"
                          : "bg-secondary text-foreground border-border hover:border-primary/50"
                      }`}
                    >
                      {chip}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mt-10">
          {/* Results heading */}
          {query.trim() ? (
            <h2 className="font-display text-2xl font-semibold mb-6 text-foreground">
              {isDiscovery
                ? <><span className="text-primary italic">"{query}"</span> — showing best matches</>
                : <>Results for <span className="text-primary italic">"{query}"</span></>}
            </h2>
          ) : (
            <h2 className="font-display text-2xl font-semibold mb-6 text-foreground">
              Trending <span className="text-primary italic">This Week</span>
            </h2>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {results.map((movie, i) => {
                const inWatchlist = watchlist.some((w) => w.movieId === movie.id);
                return (
                  <motion.div
                    key={movie.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, delay: i * 0.03 }}
                    className="group relative flex gap-4 p-3 rounded-2xl bg-card border border-border hover:border-primary/30 hover:bg-secondary transition-all duration-200"
                  >
                    <div
                      className="w-24 aspect-[2/3] rounded-xl overflow-hidden relative shadow-lg cursor-pointer flex-shrink-0 bg-muted"
                      onClick={() => setDetailMovie(movie)}
                    >
                      {movie.poster && (
                        <img
                          src={movie.poster}
                          alt={movie.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                      )}
                    </div>

                    <div className="flex-1 flex flex-col justify-center py-1 min-w-0">
                      <h3
                        className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1 cursor-pointer"
                        onClick={() => setDetailMovie(movie)}
                      >
                        {movie.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1 mb-3">
                        <span>{movie.year}</span>
                        <span className="w-1 h-1 rounded-full bg-border flex-shrink-0" />
                        <span className="truncate">{movie.genres.slice(0, 2).join(", ")}</span>
                        {movie.rating > 0 && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-border flex-shrink-0" />
                            <span className="text-primary/80">★ {movie.rating.toFixed(1)}</span>
                          </>
                        )}
                      </div>

                      {inWatchlist ? (
                        <span className="text-xs font-semibold text-primary/80 uppercase tracking-widest">
                          In Vault
                        </span>
                      ) : (
                        <button
                          onClick={() => {
                            addMovie(movie.id);
                            // Cache movie data (with inferred moodTags) so vault can display and filter it
                            const cache = JSON.parse(localStorage.getItem("cv_movie_cache") || "{}");
                            cache[movie.id] = { ...movie, moodTags: inferMoodTags(movie) };
                            localStorage.setItem("cv_movie_cache", JSON.stringify(cache));
                            reelToast(reel.add(archetype, movie));
                          }}
                          className="flex items-center gap-1.5 w-fit px-4 py-2 rounded-full bg-secondary text-foreground text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-colors border border-border hover:border-primary"
                        >
                          <Plus className="w-4 h-4" /> Add
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {!loading && results.length === 0 && (
              <div className="col-span-2 text-center py-20">
                <SearchIcon className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-xl font-display text-foreground/80">Nothing matched.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
