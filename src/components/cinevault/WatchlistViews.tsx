import { motion } from "framer-motion";
import { Movie } from "@/lib/cinevault/movies";
import { MoreHorizontal, Play } from "lucide-react";
import { useCineVault } from "./CineVaultProvider";

interface WatchlistMovie {
  movie: Movie;
  state: { watched: boolean; verdict?: string };
  isHighlighted?: boolean;
  popchatLine?: string;
  onMarkWatched: () => void;
  onRemove: () => void;
}

interface WatchlistViewProps {
  movies: WatchlistMovie[];
}

export function WatchlistStack({ movies }: WatchlistViewProps) {
  const { setDetailMovieId } = useCineVault();

  return (
    <div className="relative w-full max-w-lg mx-auto h-[600px] perspective-1000 mt-12">
      {movies.map((item, index) => {
        const isHighlighted = item.isHighlighted;
        const depth = isHighlighted ? 0 : index;
        const zIndex = movies.length - depth + (isHighlighted ? 100 : 0);
        
        return (
          <motion.div
            key={item.movie.id}
            layout
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: 1, 
              y: isHighlighted ? -40 : depth * 15,
              scale: isHighlighted ? 1.05 : Math.max(0.85, 1 - depth * 0.05),
              rotateX: isHighlighted ? 0 : 5,
              filter: isHighlighted ? "brightness(1.1)" : `brightness(${Math.max(0.5, 1 - depth * 0.15)})`
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{ zIndex }}
            className={`absolute top-0 left-0 right-0 mx-auto w-64 md:w-72 aspect-[2/3] rounded-2xl shadow-2xl overflow-hidden group cursor-pointer ${
              isHighlighted ? "ring-2 ring-primary shadow-[0_20px_50px_rgba(var(--primary),0.4)]" : "border border-white/10"
            }`}
            onClick={() => setDetailMovieId(item.movie.id)}
          >
            <img 
              src={item.movie.poster} 
              alt={item.movie.title} 
              className="w-full h-full object-cover"
            />

            {/* Hover Actions Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 backdrop-blur-[2px]">
              <div className="flex justify-end">
                <button 
                  onClick={(e) => { e.stopPropagation(); item.onMarkWatched(); }}
                  className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors"
                >
                  <MoreHorizontal className="w-5 h-5 text-white" />
                </button>
              </div>
              <div className="text-center">
                <button className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(var(--primary),0.5)] hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 text-primary-foreground ml-1" />
                </button>
                <h4 className="font-semibold text-white truncate">{item.movie.title}</h4>
              </div>
            </div>

            {/* Verdict Badge */}
            {item.state.verdict && (
              <div className="absolute top-3 left-3 px-2 py-1 bg-black/80 backdrop-blur-md rounded border border-white/20">
                <span className="text-[10px] font-bold tracking-widest text-primary">{item.state.verdict}</span>
              </div>
            )}
          </motion.div>
        );
      })}
      
      {/* PopChat Highlight Commentary */}
      {movies[0]?.isHighlighted && movies[0]?.popchatLine && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-16 left-0 right-0 mx-auto w-max max-w-sm bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-2xl z-50 flex items-center gap-3"
        >
          <span className="text-2xl">🍿</span>
          <p className="text-sm text-white/90 italic font-medium">"{movies[0].popchatLine}"</p>
        </motion.div>
      )}
    </div>
  );
}

export function WatchlistList({ movies }: WatchlistViewProps) {
  const { setDetailMovieId } = useCineVault();

  return (
    <div className="flex flex-col gap-4 mt-8 w-full max-w-3xl mx-auto pb-24">
      {movies.map((item) => (
        <motion.div
          key={item.movie.id}
          layout
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`flex gap-4 p-3 rounded-2xl border transition-all duration-300 group ${
            item.isHighlighted ? "bg-primary/10 border-primary/50 shadow-[0_0_20px_rgba(var(--primary),0.2)]" : "bg-black/40 border-white/5 hover:bg-white/5"
          }`}
        >
          <div 
            className="w-20 md:w-24 aspect-[2/3] rounded-lg overflow-hidden flex-shrink-0 relative cursor-pointer"
            onClick={() => setDetailMovieId(item.movie.id)}
          >
            <img src={item.movie.poster} alt={item.movie.title} className="w-full h-full object-cover" />
            {item.state.watched && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-xs font-bold text-white tracking-widest">WATCHED</span>
              </div>
            )}
          </div>
          
          <div className="flex-1 flex flex-col justify-center py-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 
                  className="font-display text-lg md:text-xl font-semibold text-white group-hover:text-primary transition-colors cursor-pointer"
                  onClick={() => setDetailMovieId(item.movie.id)}
                >
                  {item.movie.title}
                </h3>
                <div className="flex items-center gap-2 text-xs md:text-sm text-white/50 mt-1 font-medium">
                  <span>{item.movie.year}</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span>{item.movie.runtime}m</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span>{item.movie.genres.join(", ")}</span>
                </div>
              </div>
              
              <button 
                onClick={item.onMarkWatched}
                className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            
            {item.state.verdict && (
              <div className="mt-auto pt-3">
                <span className="inline-block px-2.5 py-1 text-[10px] font-bold tracking-widest text-primary border border-primary/30 rounded bg-primary/5">
                  {item.state.verdict}
                </span>
              </div>
            )}
            
            {item.isHighlighted && item.popchatLine && (
              <div className="mt-auto pt-3 flex items-center gap-2">
                <span className="text-sm">🍿</span>
                <span className="text-xs text-primary italic">"{item.popchatLine}"</span>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
