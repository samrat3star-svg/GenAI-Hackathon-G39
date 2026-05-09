import { r as reactExports, W as jsxRuntimeExports } from "./server-Bz2IzkDK.js";
import { u as useCineVault, a as useNavigate } from "./router-DhFfcMSV.js";
import { c as createLucideIcon, M as MOVIES, A as AppShell, f as Search, g as Mic, C as Clock, a as Play, h as Plus, r as reelToast, i as reel } from "./AppShell-CgZhHdEZ.js";
import { A as AnimatePresence, m as motion } from "./proxy-Dj0UfWx2.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
const RECENT_SEARCHES = ["Dune", "Sci-Fi", "Christopher Nolan"];
const TRENDING = ["Blade Runner 2049", "Everything Everywhere", "Interstellar"];
function SearchPage() {
  const {
    archetype,
    addMovie,
    watchlist,
    setDetailMovieId
  } = useCineVault();
  const navigate = useNavigate();
  const [query, setQuery] = reactExports.useState("");
  const [isFocused, setIsFocused] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!archetype) navigate({
      to: "/onboarding"
    });
  }, [archetype, navigate]);
  const results = reactExports.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return MOVIES.filter((m) => m.title.toLowerCase().includes(q) || m.genres.some((g) => g.toLowerCase().includes(q)) || String(m.year).includes(q));
  }, [query]);
  if (!archetype) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto pt-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute inset-0 bg-primary/20 blur-2xl rounded-full transition-opacity duration-700 ${isFocused ? "opacity-100" : "opacity-0"}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center bg-black/60 backdrop-blur-xl border border-white/20 rounded-full px-6 py-4 shadow-2xl focus-within:border-primary/50 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: `w-6 h-6 mr-4 transition-colors ${isFocused ? "text-primary" : "text-white/40"}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { autoFocus: true, value: query, onFocus: () => setIsFocused(true), onBlur: () => setIsFocused(false), onChange: (e) => setQuery(e.target.value), placeholder: "Search by title, director, genre, or feeling...", className: "flex-1 bg-transparent text-lg text-white outline-none placeholder:text-white/30 font-medium" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "text-white/40 hover:text-white transition-colors ml-4 p-2 rounded-full hover:bg-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "w-5 h-5" }) })
      ] })
    ] }),
    !query && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "flex items-center gap-2 font-display text-lg text-white/70 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5" }),
          " Recent Searches"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: RECENT_SEARCHES.map((term) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQuery(term), className: "px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-white/80 hover:bg-white/10 hover:border-white/30 transition-all", children: term }, term)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "flex items-center gap-2 font-display text-lg text-white/70 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5" }),
          " Trending Now"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: TRENDING.map((term, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setQuery(term), className: "flex items-center gap-3 px-4 py-3 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/5 transition-all group text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-bold text-sm", children: [
            "0",
            i + 1
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/80 group-hover:text-white font-medium", children: term })
        ] }, term)) })
      ] })
    ] }),
    query && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-2xl font-semibold mb-6 px-4", children: [
        "Results for ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary italic", children: [
          '"',
          query,
          '"'
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: results.map((movie, i) => {
          const inWatchlist = watchlist.some((w) => w.movieId === movie.id);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
            opacity: 0,
            y: 20
          }, animate: {
            opacity: 1,
            y: 0
          }, transition: {
            delay: i * 0.05
          }, className: "group relative flex gap-4 p-3 rounded-2xl bg-black/40 border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-24 aspect-[2/3] rounded-lg overflow-hidden relative shadow-lg cursor-pointer", onClick: () => setDetailMovieId(movie.id), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: movie.poster, alt: movie.title, className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-8 h-8 text-white" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col justify-center py-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-white group-hover:text-primary transition-colors line-clamp-1 cursor-pointer", onClick: () => setDetailMovieId(movie.id), children: movie.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-white/50 mt-1 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: movie.year }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1 h-1 rounded-full bg-white/20" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  movie.runtime,
                  "m"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold tracking-widest px-2 py-0.5 rounded border border-white/10 text-white/70", children: "NETFLIX" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold tracking-widest px-2 py-0.5 rounded border border-white/10 text-white/70", children: "PRIME" })
              ] }),
              inWatchlist ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-primary/80 uppercase tracking-widest mt-auto", children: "In Vault" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
                addMovie(movie.id);
                reelToast(reel.add(archetype, movie));
              }, className: "flex items-center gap-1.5 w-fit px-4 py-2 rounded-full bg-white/10 text-white text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-colors mt-auto", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                " Add"
              ] })
            ] })
          ] }, movie.id);
        }) }),
        results.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 text-center py-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-12 h-12 text-white/10 mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-display text-white/80", children: "No transmissions found." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/40", children: "Try a different title, director, or genre." })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  SearchPage as component
};
