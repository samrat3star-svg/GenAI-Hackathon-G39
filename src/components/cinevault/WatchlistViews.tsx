import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useCineVault, type WatchlistItem } from "./CineVaultProvider";
import { type Movie } from "@/lib/cinevault/movies";
import { Check, Trash2, Clock, Info, MoreHorizontal, Star, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { VerdictBadge } from "./VerdictBadge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

interface WatchlistProps {
  movies: {
    state: WatchlistItem;
    movie: Movie;
    isHighlighted: boolean;
    popchatLine: string;
    onMarkWatched: () => void;
    onRemove: () => void;
  }[];
}

export function WatchlistStack({ movies }: WatchlistProps) {
  const { setDetailMovieId } = useCineVault();
  const [topIndex, setTopIndex] = useState(0);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-18, 18]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const total = movies.length;
  const current = movies[topIndex % total];
  const next = movies[(topIndex + 1) % total];
  const afterNext = movies[(topIndex + 2) % total];

  const goNext = () => { x.set(0); setTopIndex(i => (i + 1) % total); };
  const goPrev = () => { x.set(0); setTopIndex(i => (i - 1 + total) % total); };

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x < -80 || info.velocity.x < -500) goNext();
    else if (info.offset.x > 80 || info.velocity.x > 500) goPrev();
    else x.set(0);
  };

  if (!current) return null;

  return (
    <div className="relative w-full max-w-sm mx-auto select-none">
      <div className="relative h-[580px]">
        {/* Card 3 — deepest */}
        {afterNext && (
          <div className="absolute inset-0 rounded-3xl overflow-hidden border border-border bg-card shadow-lg"
            style={{ transform: "scale(0.88) translateY(-40px)", zIndex: 1 }}>
            <img src={afterNext.movie.poster} alt="" className="w-full h-full object-cover opacity-60" />
          </div>
        )}
        {/* Card 2 */}
        {next && (
          <div className="absolute inset-0 rounded-3xl overflow-hidden border border-border bg-card shadow-xl"
            style={{ transform: "scale(0.94) translateY(-20px)", zIndex: 2 }}>
            <img src={next.movie.poster} alt="" className="w-full h-full object-cover opacity-80" />
          </div>
        )}
        {/* Top card — draggable */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.movie.id + topIndex}
            className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border border-border bg-card cursor-grab active:cursor-grabbing"
            style={{ x, rotate, opacity, zIndex: 10 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={handleDragEnd}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <img
              src={current.movie.poster}
              alt={current.movie.title}
              className="w-full h-full object-cover pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
              {current.state.watched && (
                <div className="mb-2"><VerdictBadge verdict={current.state.verdict!} size="sm" /></div>
              )}
              <h3 className="font-display text-3xl font-bold text-white mb-1 leading-tight">
                {current.movie.title}
              </h3>
              <div className="flex items-center gap-3 text-white/70 text-sm mb-5">
                <span>{current.movie.year}</span>
                {current.movie.runtime && (
                  <><span className="w-1 h-1 rounded-full bg-primary" /><span>{current.movie.runtime}m</span></>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={current.onMarkWatched}
                  className="flex-1 bg-white text-black py-3 rounded-xl font-bold hover:bg-primary hover:text-white transition-colors"
                >
                  {current.state.watched ? "Change Verdict" : "Mark Watched"}
                </button>
                <button
                  onClick={() => setDetailMovieId(current.movie.id)}
                  className="w-12 h-12 bg-white/10 backdrop-blur-md text-white rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Info className="w-6 h-6" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-5 px-2">
        <button onClick={goPrev} className="p-3 rounded-full bg-secondary border border-border hover:bg-primary hover:text-primary-foreground transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-sm text-muted-foreground font-medium">
          {(topIndex % total) + 1} / {total}
        </span>
        <button onClick={goNext} className="p-3 rounded-full bg-secondary border border-border hover:bg-primary hover:text-primary-foreground transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export function WatchlistCarousel({ movies }: WatchlistProps) {
  const { setDetailMovieId } = useCineVault();
  
  return (
    <div className="relative w-full overflow-x-auto pb-8 hide-scrollbar snap-x snap-mandatory">
      <div className="flex gap-6 px-4 min-w-max">
        {movies.map((item, i) => (
          <motion.div
            key={item.movie.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setDetailMovieId(item.movie.id)}
            className="w-72 snap-center cursor-pointer"
          >
            <div className="group relative aspect-[2/3] rounded-3xl overflow-hidden shadow-xl border border-border bg-card">
              <img 
                src={item.movie.poster} 
                alt={item.movie.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center gap-2 mb-2">
                  {item.state.watched && <VerdictBadge verdict={item.state.verdict!} size="xs" />}
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-2 line-clamp-2">
                  {item.movie.title}
                </h3>
                <div className="flex items-center gap-3 text-white/70 text-xs mb-4">
                  <span>{item.movie.year}</span>
                  {item.movie.rating && (
                    <div className="flex items-center gap-1 text-amber-400 font-bold">
                      <Star className="w-3 h-3 fill-current" />
                      {item.movie.rating.toFixed(1)}
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-30">
                  <button 
                    onClick={(e) => { e.stopPropagation(); item.onMarkWatched(); }}
                    className="flex-1 bg-primary text-primary-foreground py-2.5 rounded-xl text-xs font-bold hover:shadow-[0_0_15px_rgba(var(--primary),0.4)] transition-all"
                  >
                    {item.state.watched ? "Verdict" : "Watched"}
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setDetailMovieId(item.movie.id); }}
                    className="px-3 bg-white/10 backdrop-blur-md text-white rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); item.onRemove(); }}
                    className="px-3 bg-red-500/20 text-red-400 rounded-xl flex items-center justify-center hover:bg-red-500/40 transition-colors"
                    title="Remove from Vault"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function WatchlistList({ movies }: WatchlistProps) {
  const { setDetailMovieId } = useCineVault();

  return (
    <div className="grid gap-4 max-w-3xl mx-auto">
      {movies.map((item) => (
        <motion.div
          layout
          key={item.movie.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          transition={{ duration: 0.3 }}
          onClick={() => setDetailMovieId(item.movie.id)}
          className="group flex items-center gap-4 bg-card p-3 rounded-2xl border border-border hover:border-primary/40 hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
        >
          <div 
            className="w-16 h-24 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer transition-transform duration-300 group-hover:scale-105"
            onClick={() => setDetailMovieId(item.movie.id)}
          >
            <img 
              src={item.movie.poster} 
              alt={item.movie.title} 
              className="w-full h-full object-cover transition-transform duration-500 ease-out" 
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-lg font-bold text-foreground truncate">{item.movie.title}</h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
              <span>{item.movie.year}</span>
              <span>·</span>
              {item.movie.rating ? (
                <>
                  <div className="flex items-center gap-0.5 text-amber-500 font-bold">
                    <Star className="w-3 h-3 fill-current" />
                    {item.movie.rating.toFixed(1)}
                  </div>
                  <span>·</span>
                </>
              ) : null}
              <span>{item.movie.runtime}m</span>
            </div>
            {item.state.watched && (
              <div className="mt-2">
                <VerdictBadge verdict={item.state.verdict!} size="xs" />
              </div>
            )}
          </div>

          <div className="flex gap-2">
            {!item.state.watched && (
              <button
                onClick={(e) => { e.stopPropagation(); item.onMarkWatched(); }}
                className="p-2.5 rounded-xl bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground transition-colors hidden sm:block"
                title="Mark as watched"
              >
                <Check className="w-5 h-5" />
              </button>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="p-2.5 rounded-xl bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  title="More actions"
                >
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {!item.state.watched && (
                  <DropdownMenuItem onClick={item.onMarkWatched}>
                    <Check className="w-4 h-4 mr-2" /> Mark as Watched
                  </DropdownMenuItem>
                )}
                
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={item.onRemove} className="text-destructive focus:text-destructive">
                  <Trash2 className="w-4 h-4 mr-2" /> Remove from Watchlist
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function CollectionsList({ movieId }: { movieId: string }) {
  const { collections, addMovieToCollection } = useCineVault();
  
  if (collections.length === 0) {
    return (
      <div className="py-3 px-2 text-center">
        <Link to="/collections" className="text-sm font-medium text-primary hover:underline">
          Create a collection first
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 max-h-48 overflow-y-auto hide-scrollbar">
      <p className="text-xs text-muted-foreground px-2 py-1 uppercase tracking-wider font-semibold">Your Collections</p>
      {collections.map(c => {
        const isAdded = c.movieIds.includes(movieId);
        return (
          <button
            key={c.id}
            disabled={isAdded}
            onClick={() => {
              addMovieToCollection(c.id, movieId);
              toast.success(`Added to ${c.name}`);
            }}
            className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-secondary text-sm text-left transition-colors disabled:opacity-50"
          >
            <span className="text-base">{c.emoji}</span>
            <span className="flex-1 truncate">{c.name}</span>
            {isAdded && <Check className="w-3 h-3 text-muted-foreground" />}
          </button>
        );
      })}
    </div>
  );
}
