import { r as reactExports, W as jsxRuntimeExports } from "./server-Bz2IzkDK.js";
import { L as Link } from "./router-DhFfcMSV.js";
import { j as Calendar, C as Clock, F as Film, h as Plus, a as Play, M as MOVIES, A as AppShell } from "./AppShell-CgZhHdEZ.js";
import { u as useEmblaCarousel, M as MovieRow } from "./MovieRow-H7cwGJnL.js";
import { m as motion, A as AnimatePresence } from "./proxy-Dj0UfWx2.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const HERO_MOVIES = [
  {
    id: "br2049",
    title: "Blade Runner 2049",
    year: 2017,
    runtime: 164,
    genres: ["Sci-Fi", "Mystery"],
    poster: "https://image.tmdb.org/t/p/original/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
    tagline: "Dark room. Good speakers.",
    popchat: "Visually stunning but requires your full attention. Clear your evening."
  },
  {
    id: "dune",
    title: "Dune",
    year: 2021,
    runtime: 155,
    genres: ["Sci-Fi", "Adventure"],
    poster: "https://image.tmdb.org/t/p/original/jYEW5xZkZk2WTrdbMGAPFuBqbDc.jpg",
    tagline: "Pure momentum from start to finish.",
    popchat: "An absolute scale monster. You'll feel the sand."
  },
  {
    id: "interstellar",
    title: "Interstellar",
    year: 2014,
    runtime: 169,
    genres: ["Sci-Fi", "Drama"],
    poster: "https://image.tmdb.org/t/p/original/xJHokMbljvjEVAZS3xZZIsq8PEw.jpg",
    tagline: "This one stays with people.",
    popchat: "Have tissues ready. The score alone is a religious experience."
  },
  {
    id: "spiderverse",
    title: "Spider-Man: Into the Spider-Verse",
    year: 2018,
    runtime: 117,
    genres: ["Animation", "Action"],
    poster: "https://image.tmdb.org/t/p/original/7MgziEGA17HIf4pWezP1K5cE4H2.jpg",
    tagline: "A masterclass in style.",
    popchat: "Every frame is a painting. Perfect for when you need energy."
  },
  {
    id: "whiplash",
    title: "Whiplash",
    year: 2014,
    runtime: 106,
    genres: ["Drama", "Music"],
    poster: "https://image.tmdb.org/t/p/original/6bbZ6XyvgfjhQwbplnUh1lsj1ky.jpg",
    tagline: "Best watched after midnight.",
    popchat: "Stressful in the best way possible. Don't blink."
  }
];
function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 40 });
  const [selectedIndex, setSelectedIndex] = reactExports.useState(0);
  const onSelect = reactExports.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);
  reactExports.useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);
  reactExports.useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 6e3);
    return () => clearInterval(interval);
  }, [emblaApi]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-dvh overflow-hidden bg-black text-white", ref: emblaRef, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full touch-pan-y", children: HERO_MOVIES.map((movie, index) => {
      const isActive = index === selectedIndex;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-[0_0_100%] min-w-0 h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute inset-0 bg-cover bg-center",
            style: { backgroundImage: `url(${movie.poster})` },
            initial: { scale: 1.1, filter: "blur(4px)" },
            animate: {
              scale: isActive ? 1 : 1.1,
              filter: isActive ? "blur(0px)" : "blur(4px)"
            },
            transition: { duration: 1.2, ease: "easeOut" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grain opacity-30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 w-full px-6 pb-24 md:px-16 md:pb-32 max-w-4xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: isActive && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -20 },
            transition: { duration: 0.8, delay: 0.2 },
            className: "flex flex-col gap-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-primary drop-shadow-md", children: movie.tagline }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl md:text-8xl font-bold tracking-tighter text-balance drop-shadow-2xl", children: movie.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4 text-sm md:text-base text-white/80 font-medium", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
                  " ",
                  movie.year
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1 h-1 rounded-full bg-white/50" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
                  " ",
                  movie.runtime,
                  "m"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1 h-1 rounded-full bg-white/50" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-4 h-4" }),
                  " ",
                  movie.genres.join(" · ")
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-2 bg-black/40 backdrop-blur-md rounded-2xl p-3 border border-white/10 w-fit max-w-md shadow-2xl", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "🍿" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-white/90 italic leading-snug", children: [
                  '"',
                  movie.popchat,
                  '"'
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex items-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-full font-semibold shadow-[0_0_20px_rgba(var(--primary),0.4)] hover:scale-105 transition-transform", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-5 h-5" }),
                  "Add to Watchlist"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/onboarding", className: "flex items-center gap-2 px-6 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-medium hover:bg-white/20 transition-colors", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-5 h-5" }),
                  "View Details"
                ] })
              ] })
            ]
          },
          "content"
        ) }) })
      ] }, movie.id);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-8 right-8 flex gap-2", children: HERO_MOVIES.map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `h-1.5 rounded-full transition-all duration-500 ${index === selectedIndex ? "w-8 bg-primary" : "w-2 bg-white/30"}`
      },
      index
    )) })
  ] });
}
function Index() {
  const perfectTonight = MOVIES.filter((m) => m.moodTags.includes("comfort") || m.moodTags.includes("light")).slice(0, 8);
  const visuallyStunning = MOVIES.filter((m) => m.moodTags.includes("beautiful") || m.moodTags.includes("epic")).slice(0, 8);
  const easyWatches = MOVIES.filter((m) => m.runtime < 110).slice(0, 8);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative min-h-dvh", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex flex-col pb-24 md:pb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroCarousel, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative -mt-32 pt-32 bg-gradient-to-t from-background via-background to-transparent z-10 space-y-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MovieRow, { title: "Perfect Tonight", movies: perfectTonight }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MovieRow, { title: "Visually Stunning", movies: visuallyStunning }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MovieRow, { title: "Easy Watches", movies: easyWatches }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 md:px-16 max-w-7xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.section, { initial: {
        opacity: 0,
        y: 20
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        duration: 0.6
      }, className: "relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-8 sm:p-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.28em] text-primary font-bold", children: "Find your taste" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl text-balance", children: [
            "What's your ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-primary", children: "Cinematic DNA?" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-lg text-white/70", children: "Seven questions, one minute, a watchlist that finally knows you." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/onboarding", className: "mt-7 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-black shadow-lg transition-transform hover:scale-[1.05]", children: "Take the test →" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "mt-24 border-t border-white/5 bg-black/60 py-12 px-6 md:px-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg text-white/60 italic", children: '"Stop scrolling. Start watching."' }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.22em] text-white/30", children: "CineVault · est. tonight" })
    ] }) })
  ] }) }) });
}
export {
  Index as component
};
