import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search as SearchIcon, Mic, Clock, TrendingUp, Play, Plus } from "lucide-react";
import { AppShell } from "@/components/cinevault/AppShell";
import { useCineVault } from "@/components/cinevault/CineVaultProvider";
import { MOVIES, Movie } from "@/lib/cinevault/movies";
import { reelToast } from "@/components/cinevault/reelToast";
import { reel } from "@/lib/cinevault/reel";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/search")({
  component: SearchPage,
});

const RECENT_SEARCHES = ["Dune", "Sci-Fi", "Christopher Nolan"];
const TRENDING = ["Blade Runner 2049", "Everything Everywhere", "Interstellar"];

function SearchPage() {
  const { archetype, addMovie, watchlist, setDetailMovieId } = useCineVault();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!archetype) navigate({ to: "/onboarding" });
  }, [archetype, navigate]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return MOVIES.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.genres.some((g) => g.toLowerCase().includes(q)) ||
        String(m.year).includes(q)
    );
  }, [query]);

  if (!archetype) return null;

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto pt-8">
        
        {/* Cinematic Search Bar */}
        <div className="relative group">
          <div className={`absolute inset-0 bg-primary/20 blur-2xl rounded-full transition-opacity duration-700 ${isFocused ? 'opacity-100' : 'opacity-0'}`} />
          <div className="relative flex items-center bg-black/60 backdrop-blur-xl border border-white/20 rounded-full px-6 py-4 shadow-2xl focus-within:border-primary/50 transition-colors">
            <SearchIcon className={`w-6 h-6 mr-4 transition-colors ${isFocused ? 'text-primary' : 'text-white/40'}`} />
            <input
              autoFocus
              value={query}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, director, genre, or feeling..."
              className="flex-1 bg-transparent text-lg text-white outline-none placeholder:text-white/30 font-medium"
            />
            <button className="text-white/40 hover:text-white transition-colors ml-4 p-2 rounded-full hover:bg-white/10">
              <Mic className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Empty State: Recent & Trending */}
        {!query && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
            <div>
              <h3 className="flex items-center gap-2 font-display text-lg text-white/70 mb-4">
                <Clock className="w-5 h-5" /> Recent Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {RECENT_SEARCHES.map(term => (
                  <button 
                    key={term} 
                    onClick={() => setQuery(term)}
                    className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-white/80 hover:bg-white/10 hover:border-white/30 transition-all"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="flex items-center gap-2 font-display text-lg text-white/70 mb-4">
                <TrendingUp className="w-5 h-5" /> Trending Now
              </h3>
              <div className="flex flex-col gap-2">
                {TRENDING.map((term, i) => (
                  <button 
                    key={term}
                    onClick={() => setQuery(term)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/5 transition-all group text-left"
                  >
                    <span className="text-primary font-bold text-sm">0{i+1}</span>
                    <span className="text-white/80 group-hover:text-white font-medium">{term}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Live Search Results */}
        {query && (
          <div className="mt-12">
            <h2 className="font-display text-2xl font-semibold mb-6 px-4">
              Results for <span className="text-primary italic">"{query}"</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence>
                {results.map((movie, i) => {
                  const inWatchlist = watchlist.some(w => w.movieId === movie.id);
                  return (
                    <motion.div
                      key={movie.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="group relative flex gap-4 p-3 rounded-2xl bg-black/40 border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all"
                    >
                      <div 
                        className="w-24 aspect-[2/3] rounded-lg overflow-hidden relative shadow-lg cursor-pointer"
                        onClick={() => setDetailMovieId(movie.id)}
                      >
                        <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Play className="w-8 h-8 text-white" />
                        </div>
                      </div>

                      <div className="flex-1 flex flex-col justify-center py-1">
                        <h3 
                          className="font-display text-lg font-semibold text-white group-hover:text-primary transition-colors line-clamp-1 cursor-pointer"
                          onClick={() => setDetailMovieId(movie.id)}
                        >
                          {movie.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-white/50 mt-1 mb-2">
                          <span>{movie.year}</span>
                          <span className="w-1 h-1 rounded-full bg-white/20" />
                          <span>{movie.runtime}m</span>
                        </div>
                        
                        {/* Fake Streaming Badges */}
                        <div className="flex gap-2 mb-3">
                          <span className="text-[9px] font-bold tracking-widest px-2 py-0.5 rounded border border-white/10 text-white/70">NETFLIX</span>
                          <span className="text-[9px] font-bold tracking-widest px-2 py-0.5 rounded border border-white/10 text-white/70">PRIME</span>
                        </div>

                        {inWatchlist ? (
                          <span className="text-xs font-semibold text-primary/80 uppercase tracking-widest mt-auto">In Vault</span>
                        ) : (
                          <button
                            onClick={() => {
                              addMovie(movie.id);
                              reelToast(reel.add(archetype, movie));
                            }}
                            className="flex items-center gap-1.5 w-fit px-4 py-2 rounded-full bg-white/10 text-white text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-colors mt-auto"
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
                  <SearchIcon className="w-12 h-12 text-white/10 mx-auto mb-4" />
                  <p className="text-xl font-display text-white/80">No transmissions found.</p>
                  <p className="text-sm text-white/40">Try a different title, director, or genre.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
