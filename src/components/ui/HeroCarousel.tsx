import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Plus, Clock, Calendar, Film, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";

// Mock Data for Hero Carousel
const HERO_MOVIES = [
  {
    id: "br2049",
    title: "Blade Runner 2049",
    year: 2017,
    runtime: 164,
    genres: ["Sci-Fi", "Mystery"],
    poster: "https://image.tmdb.org/t/p/original/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
    tagline: "Dark room. Good speakers.",
    popchat: "Visually stunning but requires your full attention. Clear your evening.",
    rating: 8.1,
  },
  {
    id: "dune",
    title: "Dune",
    year: 2021,
    runtime: 155,
    genres: ["Sci-Fi", "Adventure"],
    poster: "https://image.tmdb.org/t/p/original/jYEW5xZkZk2WTrdbMGAPFuBqbDc.jpg",
    tagline: "Pure momentum from start to finish.",
    popchat: "An absolute scale monster. You'll feel the sand.",
    rating: 8.0,
  },
  {
    id: "interstellar",
    title: "Interstellar",
    year: 2014,
    runtime: 169,
    genres: ["Sci-Fi", "Drama"],
    poster: "https://image.tmdb.org/t/p/original/xJHokMbljvjEVAZS3xZZIsq8PEw.jpg",
    tagline: "This one stays with people.",
    popchat: "Have tissues ready. The score alone is a religious experience.",
    rating: 8.7,
  },
  {
    id: "spiderverse",
    title: "Spider-Man: Into the Spider-Verse",
    year: 2018,
    runtime: 117,
    genres: ["Animation", "Action"],
    poster: "https://image.tmdb.org/t/p/original/7MgziEGA17HIf4pWezP1K5cE4H2.jpg",
    tagline: "A masterclass in style.",
    popchat: "Every frame is a painting. Perfect for when you need energy.",
    rating: 8.4,
  },
  {
    id: "whiplash",
    title: "Whiplash",
    year: 2014,
    runtime: 106,
    genres: ["Drama", "Music"],
    poster: "https://image.tmdb.org/t/p/original/6bbZ6XyvgfjhQwbplnUh1lsj1ky.jpg",
    tagline: "Best watched after midnight.",
    popchat: "Stressful in the best way possible. Don't blink.",
    rating: 8.5,
  }
];

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 40 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  // Autoplay functionality
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 6000); // 6 seconds
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <div className="relative w-full h-dvh overflow-hidden bg-black text-white" ref={emblaRef}>
      <div className="flex h-full touch-pan-y">
        {HERO_MOVIES.map((movie, index) => {
          const isActive = index === selectedIndex;
          return (
            <div key={movie.id} className="relative flex-[0_0_100%] min-w-0 h-full">
              {/* Background Image */}
              <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${movie.poster})` }}
                initial={{ scale: 1.1, filter: "blur(4px)" }}
                animate={{ 
                  scale: isActive ? 1 : 1.1,
                  filter: isActive ? "blur(0px)" : "blur(4px)",
                }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />

              {/* Cinematic Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 grain opacity-30" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full px-6 pb-24 md:px-16 md:pb-32 max-w-4xl">
                <AnimatePresence mode="popLayout">
                  {isActive && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="flex flex-col gap-4"
                    >
                      <h2 className="text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-primary drop-shadow-md">
                        {movie.tagline}
                      </h2>
                      
                      <h1 className="font-display text-5xl md:text-8xl font-bold tracking-tighter text-balance drop-shadow-2xl">
                        {movie.title}
                      </h1>

                      <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-white/80 font-medium">
                        <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {movie.year}</div>
                        <div className="w-1 h-1 rounded-full bg-white/50" />
                        <div className="flex items-center gap-1.5 text-amber-400"><Star className="w-4 h-4 fill-current" /> {movie.rating}</div>
                        <div className="w-1 h-1 rounded-full bg-white/50" />
                        <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {movie.runtime}m</div>
                        <div className="w-1 h-1 rounded-full bg-white/50" />
                        <div className="flex items-center gap-1.5"><Film className="w-4 h-4" /> {movie.genres.join(" · ")}</div>
                      </div>

                      <div className="flex items-center gap-3 mt-2 bg-black/40 backdrop-blur-md rounded-2xl p-3 border border-white/10 w-fit max-w-md shadow-2xl">
                        <span className="text-xl">🍿</span>
                        <p className="text-sm text-white/90 italic leading-snug">"{movie.popchat}"</p>
                      </div>

                      <div className="flex items-center gap-4 mt-6">
                        <button className="flex items-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-full font-semibold shadow-[0_0_20px_rgba(var(--primary),0.4)] hover:scale-105 transition-transform">
                          <Plus className="w-5 h-5" />
                          Add to Watchlist
                        </button>
                        <Link to="/onboarding" className="flex items-center gap-2 px-6 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-medium hover:bg-white/20 transition-colors">
                          <Play className="w-5 h-5" />
                          View Details
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 right-8 flex gap-2">
        {HERO_MOVIES.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === selectedIndex ? "w-8 bg-primary" : "w-2 bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
