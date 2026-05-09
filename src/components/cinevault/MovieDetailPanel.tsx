import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useCineVault } from "@/components/cinevault/CineVaultProvider";
import { MOVIES } from "@/lib/cinevault/movies";
import { Plus, Clock, Calendar, Check, MessageCircle, Star, X, Share2 } from "lucide-react";
import { reelToast } from "@/components/cinevault/reelToast";
import { reel } from "@/lib/cinevault/reel";
import { useState, useEffect } from "react";
import { getTMDBDetails } from "@/lib/tmdb";
import { Movie } from "@/lib/cinevault/movies";
import { askKernel } from "@/lib/openai";
import { Sparkles } from "lucide-react";

export function MovieDetailPanel() {
  const { archetype, detailMovieId, setDetailMovieId, hasMovie, addMovie } = useCineVault();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  useEffect(() => {
    if (!detailMovieId) {
      setMovie(null);
      return;
    }

    const localMovie = MOVIES.find((m) => m.id === detailMovieId);
    if (localMovie) {
      setMovie(localMovie);
      // Don't return! We still want to fetch deep details (cast/crew) from TMDB
    }

    // Always fetch deep details from TMDB to get cast, crew, and full description
    const fetchTMDB = async () => {
      if (!localMovie) setIsLoading(true);
      setAiSummary(null);
      const m = await getTMDBDetails(detailMovieId);
      if (m) setMovie(m);
      setIsLoading(false);
      
      if (m) {
        setIsAiLoading(true);
        const prompt = `Give me a punchy 3-line summary of why the movie "${m.title}" is a must-watch for someone who is a "${archetype}" movie lover. Use a cinematic, slightly mysterious tone.`;
        const res = await askKernel(prompt);
        // Only show if it's not the fallback error message
        if (res && !res.includes("jammed") && !res.includes("popcorn machine")) {
          setAiSummary(res);
        } else {
          setAiSummary(null);
        }
        setIsAiLoading(false);
      }
    };

    fetchTMDB();
  }, [detailMovieId, archetype]);

  if (!archetype) return null;
  if (!detailMovieId) return null;

  const inWatchlist = movie ? hasMovie(movie.id) : false;

  return (
    <Sheet open={!!detailMovieId} onOpenChange={(open) => !open && setDetailMovieId(null)}>
      <SheetContent side="right" className="w-full md:min-w-[500px] lg:min-w-[600px] p-0 bg-black border-l border-white/10 overflow-y-auto z-[100]">
        <SheetTitle className="sr-only">{movie?.title || "Movie"} Details</SheetTitle>
        
        {!movie && isLoading ? (
          <div className="p-10 space-y-8 animate-in fade-in duration-500">
            <div className="aspect-[16/9] w-full bg-white/5 rounded-3xl animate-pulse" />
            <div className="flex gap-6 items-end">
              <div className="w-28 md:w-36 aspect-[2/3] bg-white/5 rounded-xl animate-pulse" />
              <div className="flex-1 space-y-4">
                <div className="h-8 bg-white/10 rounded-lg w-3/4 animate-pulse" />
                <div className="h-4 bg-white/5 rounded-md w-1/2 animate-pulse" />
              </div>
            </div>
            <div className="space-y-4 pt-10">
              <div className="h-4 bg-white/5 rounded w-full animate-pulse" />
              <div className="h-4 bg-white/5 rounded w-full animate-pulse" />
              <div className="h-4 bg-white/5 rounded w-2/3 animate-pulse" />
            </div>
          </div>
        ) : movie && (
          <>
        {/* Cinematic Backdrop */}
        <div className="relative w-full aspect-[16/9]">
          <img 
            src={movie.poster} 
            alt="" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <button 
            onClick={() => setDetailMovieId(null)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="relative px-8 md:px-10 -mt-20 pb-20">
          <div className="flex gap-6 md:gap-8 items-end mb-8">
            <div className="w-32 md:w-44 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex-shrink-0 bg-muted">
              <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 pb-2">
              <div className="flex flex-wrap gap-2 mb-3">
                {movie.genres?.map(g => (
                  <span key={g} className="px-2.5 py-1 rounded-full bg-white/10 text-white/70 text-[10px] font-bold uppercase tracking-wider">
                    {g}
                  </span>
                ))}
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-2 leading-tight">
                {movie.title}
              </h2>
              <div className="flex items-center gap-4 text-white/60 text-sm font-medium">
                <span>{movie.year}</span>
                {movie.runtime > 0 && (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>{movie.runtime}m</span>
                  </>
                )}
                {movie.ageRating && (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="border border-white/20 px-1.5 rounded text-xs text-white/80">{movie.ageRating}</span>
                  </>
                )}
                {movie.rating ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-bold">{movie.rating.toFixed(1)}</span>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            {inWatchlist ? (
              <button disabled className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full bg-white/10 text-white font-semibold">
                <Check className="w-5 h-5 text-primary" /> In Vault
              </button>
            ) : (
              <button 
                onClick={() => {
                  addMovie(movie.id);
                  reelToast(reel.add(archetype, movie));
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(var(--primary),0.3)]"
              >
                <Plus className="w-5 h-5" /> Add to Watchlist
              </button>
            )}
            <button className="w-14 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-colors">
              <Star className="w-5 h-5" />
            </button>
          </div>

          {/* AI Insight */}
          {(isAiLoading || aiSummary) && (
            <div className="mb-10 p-5 rounded-2xl bg-primary/10 border border-primary/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Kernel's Insight
              </h3>
              {isAiLoading ? (
                <div className="space-y-2 animate-pulse">
                  <div className="h-4 bg-primary/20 rounded w-3/4" />
                  <div className="h-4 bg-primary/20 rounded w-1/2" />
                  <div className="h-4 bg-primary/20 rounded w-2/3" />
                </div>
              ) : (
                <p className="text-sm md:text-base text-white font-medium italic leading-relaxed">
                  "{aiSummary}"
                </p>
              )}
            </div>
          )}

          <p className="text-white/60 text-sm md:text-base leading-relaxed mb-10 border-l-2 border-white/10 pl-4">
            {movie.description || movie.blurb || "No description available for this cinematic journey."}
          </p>

          {/* Streaming Availability */}
          <div className="mb-10">
            <h3 className="font-display text-lg text-white mb-4">Where to Watch</h3>
            <div className="flex flex-wrap gap-3">
              {/* Fake Data */}
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3 pr-6">
                <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center font-bold text-xs tracking-tighter">N</div>
                <div>
                  <div className="text-xs text-white/50 uppercase tracking-widest mb-0.5">Subscription</div>
                  <div className="text-sm font-semibold text-white">Netflix</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3 pr-6">
                <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center font-bold text-xs">P</div>
                <div>
                  <div className="text-xs text-white/50 uppercase tracking-widest mb-0.5">Rent / Buy</div>
                  <div className="text-sm font-semibold text-white">Prime Video</div>
                </div>
              </div>
            </div>
          </div>

          {/* Cast & Crew */}
          {(movie.cast || movie.crew) && (
            <div className="mb-10">
              <h3 className="font-display text-lg text-white mb-4">Cast & Crew</h3>
              <div className="flex flex-wrap gap-x-8 gap-y-4 mb-6">
                {movie.crew?.map((c, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-[10px] text-white/50 uppercase tracking-widest">{c.job}</span>
                    <span className="text-sm font-semibold text-white">{c.name}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                {movie.cast?.map((actor, i) => (
                  <div key={i} className="flex-shrink-0 w-20 text-center">
                    <div className="w-20 h-20 rounded-full bg-white/10 mb-2 overflow-hidden flex items-center justify-center">
                      <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${actor}`} alt={actor} />
                    </div>
                    <div className="text-[10px] font-medium text-white line-clamp-2">{actor}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comments / Discussions */}
          <div>
            <h3 className="font-display text-lg text-white mb-4 flex items-center gap-2">
              <MessageCircle className="w-5 h-5" /> Discussions
            </h3>
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-primary/20" />
                  <span className="text-xs font-semibold text-white/80">Cinophile99</span>
                </div>
                <p className="text-sm text-white/70">Absolutely stunning visuals. Deserves a LIFE SENTENCE verdict.</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><UserIcon className="w-4 h-4 text-white/50" /></div>
                <input placeholder="Add a thought..." className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm outline-none focus:border-primary/50 text-white" />
              </div>
            </div>
          </div>
        </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function UserIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
}
