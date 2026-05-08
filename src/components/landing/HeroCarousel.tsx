import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Plus, Info } from "lucide-react";
import type { FeaturedSlide } from "@/lib/landing/featured";
import { PopcornMascot } from "./PopcornMascot";
import { useCineVault } from "@/components/cinevault/CineVaultProvider";
import { reelToast } from "@/components/cinevault/reelToast";

export function HeroCarousel({ slides }: { slides: FeaturedSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [details, setDetails] = useState<FeaturedSlide | null>(null);
  const { addMovie, hasMovie } = useCineVault();

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  const slide = slides[index];

  const onAdd = (s: FeaturedSlide) => {
    if (hasMovie(s.id)) {
      reelToast(`"${s.title}" is already in your vault.`);
      return;
    }
    addMovie(s.id);
    reelToast(`Added "${s.title}". Reel approves.`);
  };

  return (
    <section
      className="relative h-[100dvh] min-h-[640px] w-full overflow-hidden bg-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Backdrops */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1.12 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 0.9, ease: "easeInOut" }, scale: { duration: 7, ease: "linear" } }}
          className="absolute inset-0"
        >
          <img
            src={slide.backdrop}
            alt=""
            className="h-full w-full object-cover"
            draggable={false}
            loading="eager"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(120%_70%_at_50%_50%,transparent_55%,#000_100%)]" />
      <div className="pointer-events-none absolute inset-0 grain opacity-[0.07]" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-20 pt-24 sm:px-8 sm:pb-24 md:pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-primary">
              Featured · Tonight
            </p>
            <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[0.95] tracking-tight text-white text-balance">
              {slide.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/70">
              <span>{slide.year}</span>
              <span className="h-1 w-1 rounded-full bg-white/40" />
              <span>{slide.runtime}</span>
              <span className="h-1 w-1 rounded-full bg-white/40" />
              <span>{slide.genres.join(" · ")}</span>
            </div>
            <p className="mt-5 max-w-xl font-display text-lg italic text-white/85 sm:text-xl text-balance">
              {slide.tagline}
            </p>
            <div className="mt-5 flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 backdrop-blur-md w-fit max-w-full">
              <PopcornMascot size={26} />
              <span className="text-sm text-white/80">
                <span className="text-primary">PopChat</span> — “{slide.popchatLine}”
              </span>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onAdd(slide)}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-primary to-accent px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_10px_40px_-10px_var(--primary)] transition-shadow hover:shadow-[0_14px_60px_-10px_var(--primary)]"
              >
                <Plus className="h-4 w-4" />
                Add to Watchlist
              </motion.button>
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setDetails(slide)}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/10"
              >
                <Info className="h-4 w-4" />
                View Details
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Indicators */}
        <div className="mt-10 flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIndex(i)}
              className="group h-1.5 overflow-hidden rounded-full bg-white/15"
              style={{ width: i === index ? 36 : 16 }}
              aria-label={`Show ${s.title}`}
            >
              <span
                className={`block h-full ${i === index ? "bg-primary" : "bg-white/30 group-hover:bg-white/50"}`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Details modal */}
      <AnimatePresence>
        {details && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center px-4"
            onClick={() => setDetails(null)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-black/80 backdrop-blur-2xl"
            >
              <div className="relative aspect-video w-full">
                <img src={details.backdrop} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-3xl font-semibold text-white">{details.title}</h3>
                <p className="mt-1 text-sm text-white/60">
                  {details.year} · {details.runtime} · {details.genres.join(" · ")}
                </p>
                <p className="mt-4 font-display italic text-white/85">{details.tagline}</p>
                <p className="mt-2 text-sm text-white/70">🍿 {details.popchatLine}</p>
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => { onAdd(details); setDetails(null); }}
                    className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
                  >
                    Add to Watchlist
                  </button>
                  <button
                    onClick={() => setDetails(null)}
                    className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-white"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
