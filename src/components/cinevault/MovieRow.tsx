import useEmblaCarousel from "embla-carousel-react";
import { Play } from "lucide-react";
import { Movie } from "@/lib/cinevault/movies";
import { useCineVault } from "./CineVaultProvider";

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

export function MovieRow({ title, movies }: MovieRowProps) {
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const { setDetailMovieId } = useCineVault();

  return (
    <div className="py-8 pl-6 md:pl-16 relative z-10">
      <h3 className="font-display text-2xl font-semibold text-white mb-6 tracking-tight drop-shadow-md">
        {title}
      </h3>
      
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 touch-pan-x">
          {movies.map((movie) => (
            <div 
              key={movie.id} 
              className="flex-[0_0_160px] md:flex-[0_0_220px] min-w-0 group relative cursor-pointer"
              onClick={() => setDetailMovieId(movie.id)}
            >
              <div className="aspect-[2/3] rounded-xl overflow-hidden relative shadow-lg transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                <img 
                  src={movie.poster} 
                  alt={movie.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h4 className="text-white font-semibold text-sm leading-tight drop-shadow-md line-clamp-2">{movie.title}</h4>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-white/70">
                    <span>{movie.year}</span>
                    <span className="w-1 h-1 rounded-full bg-white/50" />
                    <span>{movie.runtime}m</span>
                  </div>
                  <button className="mt-3 flex items-center justify-center gap-1.5 w-full py-2 bg-primary/90 text-primary-foreground text-xs font-medium rounded-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <Play className="w-3 h-3" /> Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
