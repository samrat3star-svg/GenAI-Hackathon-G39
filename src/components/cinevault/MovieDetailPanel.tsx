import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useCineVault } from "@/components/cinevault/CineVaultProvider";
import { MOVIES } from "@/lib/cinevault/movies";
import { Play, Plus, Clock, Calendar, Check, MessageCircle, Star } from "lucide-react";
import { reelToast } from "@/components/cinevault/reelToast";
import { reel } from "@/lib/cinevault/reel";

export function MovieDetailPanel() {
  const { archetype, detailMovie, setDetailMovie, hasMovie, addMovie } = useCineVault();
  
  const movie = detailMovie;

  if (!movie || !archetype) return null;

  const inWatchlist = hasMovie(movie.id);
  const displayBlurb = movie.blurb || movie.overview;

  return (
    <Sheet open={!!movie} onOpenChange={(open) => !open && setDetailMovie(null)}>
      <SheetContent side="right" className="w-full md:min-w-[500px] lg:min-w-[600px] p-0 bg-black border-l border-white/10 overflow-y-auto">
        <SheetTitle className="sr-only">{movie.title} Details</SheetTitle>
        
        {/* Cinematic Backdrop */}
        <div className="relative w-full aspect-[16/9]">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
          <img src={movie.poster} alt="" className="w-full h-full object-cover" />
          <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 hover:scale-110 transition-transform">
            <Play className="w-6 h-6 text-white ml-1" />
          </button>
        </div>

        {/* Detail Content */}
        <div className="px-6 md:px-10 pb-20 relative z-20 -mt-16">
          <div className="flex gap-6 items-end mb-6">
            <img src={movie.poster} alt={movie.title} className="w-28 md:w-36 rounded-xl shadow-2xl border border-white/10" />
            <div className="flex-1 pb-2">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">{movie.title}</h1>
              <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-white/60 font-medium">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {movie.year}</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {movie.runtime}m</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>{movie.genres.join(", ")}</span>
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

          <p className="text-white/80 text-sm md:text-base leading-relaxed mb-10">
            {displayBlurb}
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

          {/* Cast & Crew (Mocked) */}
          <div className="mb-10">
            <h3 className="font-display text-lg text-white mb-4">Cast & Crew</h3>
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex-shrink-0 w-20 text-center">
                  <div className="w-20 h-20 rounded-full bg-white/10 mb-2 overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${movie.id}${i}`} alt="Actor" />
                  </div>
                  <div className="text-xs font-medium text-white truncate">Actor Name</div>
                  <div className="text-[10px] text-white/50 truncate">Character</div>
                </div>
              ))}
            </div>
          </div>

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
      </SheetContent>
    </Sheet>
  );
}

function UserIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
}
