import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import { useCineVault, type WatchlistItem } from "./CineVaultProvider";
import { type Movie } from "@/lib/cinevault/movies";
import { Check, Trash2, Info, MoreHorizontal, FolderPlus, ChevronLeft, ChevronRight } from "lucide-react";
import { VerdictBadge } from "./VerdictBadge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
  const { setDetailMovie } = useCineVault();
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
      {/* Stack depth cards */}
      <div className="relative h-[580px]">
        {/* Card 3 (deepest) */}
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
                {current.movie.runtime && <><span className="w-1 h-1 rounded-full bg-primary" /><span>{current.movie.runtime}m</span></>}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={current.onMarkWatched}
                  className="flex-1 bg-white text-black py-3 rounded-xl font-bold hover:bg-primary hover:text-white transition-colors"
                >
                  {current.state.watched ? "Change Verdict" : "Mark Watched"}
                </button>
                <button
                  onClick={() => setDetailMovie(current.movie)}
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
          className="group flex items-center gap-4 bg-card p-3 rounded-2xl border border-border hover:border-primary/40 hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 transition-all duration-200"
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
                onClick={item.onMarkWatched}
                className="p-2.5 rounded-xl bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground transition-colors hidden sm:block"
                title="Mark as watched"
              >
                <Check className="w-5 h-5" />
              </button>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
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
                
                {/* Add to Collection -> Popover inside DropdownMenu causes issues, so we use a sub-menu or inline dialog.
                    Actually, we can render the collections directly as a sub-menu if we import DropdownMenuSub.
                    Since we don't have it imported here, we can just use a Popover from a standalone button or a regular DropdownMenu item that opens a dialog.
                    Wait, let's just use Popover on a regular button next to it? 
                    The prompt says: "in the ··· action sheet... add a third option". 
                    Since Radix UI supports SubMenus, let's use a standalone popover trigger or just render the collections inline if few?
                    Let's use a Popover that wraps the DropdownMenuItem. 
                */}
                <Popover>
                  <PopoverTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <FolderPlus className="w-4 h-4 mr-2" /> Add to Collection →
                    </DropdownMenuItem>
                  </PopoverTrigger>
                  <PopoverContent side="left" align="start" className="w-56 p-2 bg-card border-border shadow-xl">
                    <CollectionsList movieId={item.movie.id} />
                  </PopoverContent>
                </Popover>

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
