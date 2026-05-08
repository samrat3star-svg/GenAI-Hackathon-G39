import { motion } from "framer-motion";
import { Plus, Check } from "lucide-react";
import type { Movie } from "@/lib/cinevault/movies";
import { useCineVault } from "@/components/cinevault/CineVaultProvider";
import { reelToast } from "@/components/cinevault/reelToast";

export function PosterCard({ movie }: { movie: Movie }) {
  const { addMovie, hasMovie } = useCineVault();
  const inList = hasMovie(movie.id);

  const onAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inList) return;
    addMovie(movie.id);
    reelToast(`Added "${movie.title}".`);
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="group relative w-[150px] shrink-0 snap-start sm:w-[180px] md:w-[200px]"
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)] ring-0 transition-all duration-300 group-hover:ring-1 group-hover:ring-primary/40 group-hover:shadow-[0_30px_80px_-20px_var(--primary)]">
        <div className="aspect-[2/3] w-full">
          <img
            src={movie.poster}
            alt={movie.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
        <button
          onClick={onAdd}
          aria-label={inList ? "In watchlist" : "Add to watchlist"}
          className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100"
        >
          {inList ? <Check className="h-4 w-4 text-primary" /> : <Plus className="h-4 w-4" />}
        </button>
      </div>
      <div className="mt-2 px-0.5">
        <p className="line-clamp-1 text-sm font-medium text-white">{movie.title}</p>
        <p className="text-xs text-white/50">{movie.year}</p>
      </div>
    </motion.div>
  );
}
