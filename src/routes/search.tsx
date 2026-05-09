import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search as SearchIcon, Plus, Star } from "lucide-react";
import { AppShell } from "@/components/cinevault/AppShell";
import { useCineVault } from "@/components/cinevault/CineVaultProvider";
import { MOVIES, type Movie } from "@/lib/cinevault/movies";
import { reelToast } from "@/components/cinevault/reelToast";
import { reel } from "@/lib/cinevault/reel";
import { motion, AnimatePresence } from "framer-motion";
import { searchTMDB, getTMDBDetails, getTrendingMovies } from "@/lib/tmdb";
import { suggestMoviesByMood } from "@/lib/openai";
import { Sparkles, TrendingUp } from "lucide-react";

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

function matchesVibe(movie: Movie, vibe: string): boolean {
  const tags = (movie.moodTags || []).map((t) => t.toLowerCase());
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

function TrendingCard({ 
  movie, 
  inWatchlist, 
  onAdd, 
  onDetail, 
  delay 
}: { 
  movie: Movie; 
  inWatchlist: boolean; 
  onAdd: () => void; 
  onDetail: () => void;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      onClick={onDetail}
      className="group relative flex gap-4 p-4 rounded-3xl bg-gradient-to-br from-card to-secondary/30 border border-border/50 hover:border-primary/30 transition-all duration-300 cursor-pointer"
    >
      <div 
        className="w-24 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl"
      >
        <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      </div>
      <div className="flex-1 flex flex-col justify-center py-1">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">Trending</span>
          <span className="text-xs text-muted-foreground">{movie.year}</span>
        </div>
        <h3 className="font-display text-lg font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {movie.title}
        </h3>
        <div className="flex items-center gap-2 mt-1 mb-4">
          {movie.rating && (
            <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
              <Star className="w-3 h-3 fill-current" />
              {movie.rating.toFixed(1)}
            </div>
          )}
          <span className="text-xs text-muted-foreground truncate">{movie.genres.slice(0, 2).join(", ")}</span>
        </div>
        
        {inWatchlist ? (
          <span className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">In Your Vault</span>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
            }}
            className="flex items-center gap-2 w-fit px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-bold hover:shadow-[0_0_15px_rgba(var(--primary),0.4)] transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" /> Quick Add
          </button>
        )}
      </div>
    </motion.div>
  );
}

function SearchPage() {
  const { archetype, addMovie, watchlist, setDetailMovieId } = useCineVault();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null);
  const [tmdbResults, setTmdbResults] = useState<Movie[]>([]);
  const [trendingResults, setTrendingResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isAiResults, setIsAiResults] = useState(false);

  useEffect(() => {
    if (!archetype) navigate({ to: "/onboarding" });
    const authed = localStorage.getItem("cv_authed");
    if (!authed || authed !== "true") navigate({ to: "/" });

    // Fetch trending on mount
    const fetchTrending = async () => {
      const trending = await getTrendingMovies();
      setTrendingResults(trending);
    };
    fetchTrending();
  }, [archetype, navigate]);

  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setTmdbResults([]);
      setIsAiResults(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      const results = await searchTMDB(q);
      setTmdbResults(results);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const handleAiMood = async () => {
    if (!query.trim()) return;
    setIsAiLoading(true);
    setIsLoading(true);
    try {
      const titles = await suggestMoviesByMood(query);
      const movies: Movie[] = [];
      for (const title of titles) {
        const results = await searchTMDB(title);
        if (results.length > 0) {
          // Get the best match
          movies.push(results[0]);
        }
      }
      setTmdbResults(movies);
      setIsAiResults(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiLoading(false);
      setIsLoading(false);
    }
  };

  const hasFilter = !!query.trim() || !!selectedGenre || !!selectedVibe;

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const source = q ? tmdbResults : MOVIES;

    return source.filter((m) => {
      // Genre chip match
      const genreMatch = !selectedGenre ||
        (m.genres || []).some((g) => g.toLowerCase().includes(selectedGenre.toLowerCase()));

      // Vibe chip match
      const vibeMatch = !selectedVibe || matchesVibe(m, selectedVibe);

      return genreMatch && vibeMatch;
    });
  }, [query, selectedGenre, selectedVibe, tmdbResults]);

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
              placeholder="Search by title, director, genre, or feeling..."
              className="flex-1 bg-transparent text-lg text-foreground outline-none placeholder:text-muted-foreground font-medium"
            />
            {query.trim().length > 3 && (
              <button
                onClick={handleAiMood}
                disabled={isAiLoading}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  isAiLoading 
                    ? "bg-secondary text-muted-foreground" 
                    : "bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
                }`}
                title="Use AI to find movies based on this mood"
              >
                {isAiLoading ? (
                  <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
                Spark AI
              </button>
            )}
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

          {/* Vibe Row */}
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 px-1">Vibe</p>
            <div className="overflow-x-auto hide-scrollbar" style={{ scrollbarWidth: "none" }}>
              <div className="flex gap-2 min-w-max">
                {VIBE_CHIPS.map((chip) => {
                  const active = selectedVibe === chip;
                  return (
                    <button
                      key={chip}
                      onClick={() => setSelectedVibe(active ? null : chip)}
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

        {/* Empty State — trending movies */}
        {!hasFilter && (
          <div className="mt-16">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="font-display text-xl font-semibold text-foreground tracking-tight">Trending Now</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trendingResults.slice(0, 4).map((movie, i) => {
                const inWatchlist = watchlist.some((w) => w.movieId === movie.id);
                return (
                  <TrendingCard 
                    key={movie.id} 
                    movie={movie} 
                    inWatchlist={inWatchlist} 
                    onAdd={() => {
                      addMovie(movie.id);
                      reelToast(reel.add(archetype, movie));
                    }}
                    onDetail={() => setDetailMovieId(movie.id)}
                    delay={i * 0.1}
                  />
                );
              })}
            </div>


          </div>
        )}

        {/* Results */}
        {hasFilter && (
          <div className="mt-10">
            {isLoading && (
              <div className="flex justify-center py-10">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            
            {!isLoading && (
              <>
            {/* Results heading — only when there's a text query */}
            {query.trim() && (
              <h2 className="font-display text-2xl font-semibold mb-6 text-foreground">
                {isAiResults ? (
                  <>AI Mood Recommendations for <span className="text-primary italic">"{query}"</span></>
                ) : (
                  <>Results for <span className="text-primary italic">"{query}"</span></>
                )}
                {(selectedGenre || selectedVibe) && (
                  <span className="text-muted-foreground text-base font-normal ml-2">
                    · filtered
                  </span>
                )}
              </h2>
            )}
            {!query.trim() && (selectedGenre || selectedVibe) && (
              <h2 className="font-display text-xl font-semibold mb-6 text-foreground">
                {[selectedGenre, selectedVibe].filter(Boolean).join(" · ")}
              </h2>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence>
                {results.map((movie, i) => {
                  const inWatchlist = watchlist.some((w) => w.movieId === movie.id);
                  return (
                    <motion.div
                      key={movie.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ delay: i * 0.04 }}
                      onClick={() => setDetailMovieId(movie.id)}
                      className="group relative flex gap-4 p-3 rounded-2xl bg-card border border-border hover:border-primary/30 hover:bg-secondary hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 cursor-pointer"
                    >
                      <div
                        className="w-24 aspect-[2/3] rounded-xl overflow-hidden relative shadow-lg flex-shrink-0"
                      >
                        <img
                          src={movie.poster}
                          alt={movie.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-center py-1 min-w-0">
                        <h3
                          className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1"
                        >
                          {movie.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1 mb-3">
                          <span>{movie.year}</span>
                          <span className="w-1 h-1 rounded-full bg-border flex-shrink-0" />
                          {movie.rating ? (
                            <>
                              <div className="flex items-center gap-0.5 text-amber-500 font-semibold">
                                <Star className="w-3 h-3 fill-current" />
                                {movie.rating.toFixed(1)}
                              </div>
                              <span className="w-1 h-1 rounded-full bg-border flex-shrink-0" />
                            </>
                          ) : null}
                          <span>{movie.runtime > 0 ? `${movie.runtime}m` : ""}</span>
                          {movie.runtime > 0 && <span className="w-1 h-1 rounded-full bg-border flex-shrink-0" />}
                          <span className="truncate">{movie.genres.slice(0, 2).join(", ")}</span>
                        </div>

                        {inWatchlist ? (
                          <span className="text-xs font-semibold text-primary/80 uppercase tracking-widest">
                            In Vault
                          </span>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addMovie(movie.id);
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

              {results.length === 0 && (
                <div className="col-span-2 text-center py-20">
                  <SearchIcon className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-xl font-display text-foreground/80">Nothing matched.</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Try a different title, genre, or adjust your filters.
                  </p>
                </div>
              )}
            </div>
              </>
            )}
          </div>
        )}
      </div>
    </AppShell>
  );
}
