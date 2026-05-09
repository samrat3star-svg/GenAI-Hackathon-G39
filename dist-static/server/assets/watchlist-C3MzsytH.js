import { r as reactExports, W as jsxRuntimeExports } from "./server-Bz2IzkDK.js";
import { u as useCineVault, a as useNavigate, L as Link } from "./router-DhFfcMSV.js";
import { A as AnimatePresence, m as motion } from "./proxy-Dj0UfWx2.js";
import { c as createLucideIcon, P as Popcorn, a as Play, S as Sheet, b as SheetContent, d as SheetHeader, e as SheetTitle, M as MOVIES, A as AppShell, F as Film } from "./AppShell-CgZhHdEZ.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
  ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
];
const Ellipsis = createLucideIcon("ellipsis", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "m14 13-8.381 8.38a1 1 0 0 1-3.001-3l8.384-8.381", key: "pgg06f" }],
  ["path", { d: "m16 16 6-6", key: "vzrcl6" }],
  ["path", { d: "m21.5 10.5-8-8", key: "a17d9x" }],
  ["path", { d: "m8 8 6-6", key: "18bi4p" }],
  ["path", { d: "m8.5 7.5 8 8", key: "1oyaui" }]
];
const Gavel = createLucideIcon("gavel", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
];
const Layers = createLucideIcon("layers", __iconNode$1);
const __iconNode = [
  ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1", key: "1g98yp" }],
  ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" }],
  ["path", { d: "M14 4h7", key: "3xa0d5" }],
  ["path", { d: "M14 9h7", key: "1icrd9" }],
  ["path", { d: "M14 15h7", key: "1mj8o2" }],
  ["path", { d: "M14 20h7", key: "11slyb" }]
];
const LayoutList = createLucideIcon("layout-list", __iconNode);
const MOOD_CHIPS = [
  "Comfort",
  "Escape",
  "Funny",
  "Easy",
  "Quiet",
  "Intense",
  "Emotional",
  "Beautiful",
  "Smart",
  "Chaotic"
];
function MoodBar({ onMoodSelect }) {
  const [query, setQuery] = reactExports.useState("");
  const [selectedMood, setSelectedMood] = reactExports.useState(null);
  const handlePick = (mood) => {
    setSelectedMood(mood);
    setQuery("");
    onMoodSelect(mood);
  };
  const companionText = selectedMood ? "Setting the mood for..." : "What's the evening calling for?";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative z-10 w-full mb-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center max-w-2xl mx-auto space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.p,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        className: "text-lg md:text-xl font-display text-white/90 drop-shadow-md text-center",
        children: [
          companionText,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: selectedMood })
        ]
      },
      companionText
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 focus-within:opacity-100 transition-opacity duration-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: (e) => {
            e.preventDefault();
            if (query.trim()) handlePick(query.trim());
          },
          className: "relative flex items-center bg-black/60 backdrop-blur-md border border-white/20 rounded-full px-5 py-3.5 focus-within:border-primary/50 transition-colors shadow-2xl",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Popcorn, { className: "w-5 h-5 text-primary/80 mr-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                value: query,
                onChange: (e) => setQuery(e.target.value),
                placeholder: "Describe your mood...",
                className: "flex-1 bg-transparent text-white outline-none placeholder:text-white/40 font-medium"
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full overflow-x-auto pb-4 hide-scrollbar", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-3 min-w-max px-4", children: MOOD_CHIPS.map((chip) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => handlePick(chip),
        className: `px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${selectedMood === chip ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(var(--primary),0.5)] scale-105" : "bg-white/5 text-white/80 border-white/10 hover:bg-white/10 hover:border-white/30"}`,
        children: chip
      },
      chip
    )) }) })
  ] }) });
}
function WatchlistStack({ movies }) {
  const { setDetailMovieId } = useCineVault();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-lg mx-auto h-[600px] perspective-1000 mt-12", children: [
    movies.map((item, index) => {
      const isHighlighted = item.isHighlighted;
      const depth = isHighlighted ? 0 : index;
      const zIndex = movies.length - depth + (isHighlighted ? 100 : 0);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          layout: true,
          initial: { opacity: 0, y: 50 },
          animate: {
            opacity: 1,
            y: isHighlighted ? -40 : depth * 15,
            scale: isHighlighted ? 1.05 : Math.max(0.85, 1 - depth * 0.05),
            rotateX: isHighlighted ? 0 : 5,
            filter: isHighlighted ? "brightness(1.1)" : `brightness(${Math.max(0.5, 1 - depth * 0.15)})`
          },
          transition: { type: "spring", stiffness: 300, damping: 25 },
          style: { zIndex },
          className: `absolute top-0 left-0 right-0 mx-auto w-64 md:w-72 aspect-[2/3] rounded-2xl shadow-2xl overflow-hidden group cursor-pointer ${isHighlighted ? "ring-2 ring-primary shadow-[0_20px_50px_rgba(var(--primary),0.4)]" : "border border-white/10"}`,
          onClick: () => setDetailMovieId(item.movie.id),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: item.movie.poster,
                alt: item.movie.title,
                className: "w-full h-full object-cover"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 backdrop-blur-[2px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: (e) => {
                    e.stopPropagation();
                    item.onMarkWatched();
                  },
                  className: "w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "w-5 h-5 text-white" })
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "w-12 h-12 rounded-full bg-primary flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(var(--primary),0.5)] hover:scale-110 transition-transform", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-5 h-5 text-primary-foreground ml-1" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-white truncate", children: item.movie.title })
              ] })
            ] }),
            item.state.verdict && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3 px-2 py-1 bg-black/80 backdrop-blur-md rounded border border-white/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold tracking-widest text-primary", children: item.state.verdict }) })
          ]
        },
        item.movie.id
      );
    }),
    movies[0]?.isHighlighted && movies[0]?.popchatLine && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        className: "absolute -bottom-16 left-0 right-0 mx-auto w-max max-w-sm bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-2xl z-50 flex items-center gap-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "🍿" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-white/90 italic font-medium", children: [
            '"',
            movies[0].popchatLine,
            '"'
          ] })
        ]
      }
    )
  ] });
}
function WatchlistList({ movies }) {
  const { setDetailMovieId } = useCineVault();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4 mt-8 w-full max-w-3xl mx-auto pb-24", children: movies.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      layout: true,
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      className: `flex gap-4 p-3 rounded-2xl border transition-all duration-300 group ${item.isHighlighted ? "bg-primary/10 border-primary/50 shadow-[0_0_20px_rgba(var(--primary),0.2)]" : "bg-black/40 border-white/5 hover:bg-white/5"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "w-20 md:w-24 aspect-[2/3] rounded-lg overflow-hidden flex-shrink-0 relative cursor-pointer",
            onClick: () => setDetailMovieId(item.movie.id),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.movie.poster, alt: item.movie.title, className: "w-full h-full object-cover" }),
              item.state.watched && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/50 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-white tracking-widest", children: "WATCHED" }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col justify-center py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h3",
                {
                  className: "font-display text-lg md:text-xl font-semibold text-white group-hover:text-primary transition-colors cursor-pointer",
                  onClick: () => setDetailMovieId(item.movie.id),
                  children: item.movie.title
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs md:text-sm text-white/50 mt-1 font-medium", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.movie.year }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1 h-1 rounded-full bg-white/20" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  item.movie.runtime,
                  "m"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1 h-1 rounded-full bg-white/20" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.movie.genres.join(", ") })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: item.onMarkWatched,
                className: "p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-colors",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "w-5 h-5" })
              }
            )
          ] }),
          item.state.verdict && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto pt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block px-2.5 py-1 text-[10px] font-bold tracking-widest text-primary border border-primary/30 rounded bg-primary/5", children: item.state.verdict }) }),
          item.isHighlighted && item.popchatLine && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto pt-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "🍿" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-primary italic", children: [
              '"',
              item.popchatLine,
              '"'
            ] })
          ] })
        ] })
      ]
    },
    item.movie.id
  )) });
}
const VERDICTS = [
  {
    id: "acquitted",
    label: "ACQUITTED",
    desc: "It deserved my time.",
    color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30 hover:bg-emerald-500/20"
  },
  {
    id: "guilty",
    label: "GUILTY PLEASURE",
    desc: "Loved it for exactly what it was.",
    color: "bg-pink-500/10 text-pink-500 border-pink-500/30 hover:bg-pink-500/20"
  },
  {
    id: "life",
    label: "LIFE SENTENCE",
    desc: "I'll come back to this forever.",
    color: "bg-amber-500/10 text-amber-500 border-amber-500/30 hover:bg-amber-500/20"
  },
  {
    id: "contempt",
    label: "CONTEMPT",
    desc: "It took something from me.",
    color: "bg-red-500/10 text-red-500 border-red-500/30 hover:bg-red-500/20"
  }
];
function VerdictSheet({ open, movieTitle, onOpenChange, onPick }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "bottom", className: "bg-black/90 backdrop-blur-xl border-t border-white/10 rounded-t-3xl sm:max-w-xl sm:mx-auto p-6 md:p-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { className: "text-left mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-12 h-12 rounded-full bg-white/5 mb-4 border border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Gavel, { className: "w-6 h-6 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetTitle, { className: "font-display text-2xl md:text-3xl text-white", children: [
        "How did ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary italic", children: movieTitle }),
        " land?"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-sm", children: "Select a verdict. This replaces star ratings." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 pb-8", children: VERDICTS.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.button,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.1 },
        onClick: () => onPick(v.id),
        className: `flex flex-col items-start p-4 rounded-xl border transition-all duration-300 ${v.color} group`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-lg tracking-widest", children: v.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm opacity-80 mt-1", children: v.desc })
        ]
      },
      v.id
    )) })
  ] }) });
}
function WatchlistPage() {
  const {
    archetype,
    watchlist,
    removeMovie,
    markWatched
  } = useCineVault();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = reactExports.useState("stack");
  const [verdictTarget, setVerdictTarget] = reactExports.useState(null);
  const [activeMood, setActiveMood] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!archetype) navigate({
      to: "/onboarding"
    });
  }, [archetype, navigate]);
  const items = reactExports.useMemo(() => {
    let list = watchlist.map((w) => ({
      state: w,
      movie: MOVIES.find((m) => m.id === w.movieId)
    })).filter((x) => !!x.movie).map((item) => ({
      ...item,
      isHighlighted: false,
      popchatLine: "",
      onMarkWatched: () => setVerdictTarget(item.movie.id),
      onRemove: () => removeMovie(item.movie.id)
    }));
    if (activeMood) {
      const tag = activeMood.toLowerCase();
      const matches = list.filter((i) => i.movie.moodTags.some((t) => tag.includes(t)) || i.movie.genres.some((g) => tag.includes(g.toLowerCase())));
      const top3 = matches.slice(0, 3).map((i) => ({
        ...i,
        isHighlighted: true,
        popchatLine: "This feels right for tonight."
      }));
      const rest = list.filter((i) => !top3.find((t) => t.movie.id === i.movie.id));
      list = [...top3, ...rest];
    }
    return list;
  }, [watchlist, activeMood, removeMovie]);
  if (!archetype) return null;
  const totalCount = items.length;
  const watchedCount = items.filter((i) => i.state.watched).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-dvh", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative pt-32 pb-16 px-6 max-w-4xl mx-auto text-center z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-primary/10 blur-3xl rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "relative font-display text-5xl md:text-6xl font-bold tracking-tight text-white mb-4", children: "Your Watchlist" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "relative text-lg text-white/60 italic font-display", children: '"A vault of future obsessions."' }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-center gap-4 mt-6 text-sm font-medium text-white/50 uppercase tracking-widest", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          totalCount,
          " Total"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1 h-1 rounded-full bg-white/20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary", children: [
          watchedCount,
          " Watched"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-24 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto mt-8" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "relative z-10 px-6 max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MoodBar, { onMoodSelect: setActiveMood }),
      items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-20 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-16 h-16 text-white/10 mb-6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl text-white/80 mb-2", children: "Your vault is empty." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 mb-8 max-w-sm", children: "Every obsession starts with one film. Add something worth saving." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/search", className: "px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold shadow-[0_0_20px_rgba(var(--primary),0.4)] hover:scale-105 transition-transform", children: "Find a Film" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end mb-8 max-w-3xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex p-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setViewMode("stack"), className: `p-2 rounded-full transition-colors ${viewMode === "stack" ? "bg-white/20 text-white" : "text-white/40 hover:text-white/80"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setViewMode("list"), className: `p-2 rounded-full transition-colors ${viewMode === "list" ? "bg-white/20 text-white" : "text-white/40 hover:text-white/80"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutList, { className: "w-4 h-4" }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: viewMode === "stack" ? /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          opacity: 0,
          scale: 0.95
        }, animate: {
          opacity: 1,
          scale: 1
        }, exit: {
          opacity: 0,
          scale: 0.95
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(WatchlistStack, { movies: items }) }, "stack") : /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, exit: {
          opacity: 0,
          y: 20
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(WatchlistList, { movies: items }) }, "list") })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(VerdictSheet, { open: !!verdictTarget, movieTitle: items.find((i) => i.movie.id === verdictTarget)?.movie.title ?? "", onOpenChange: (o) => {
      if (!o) setVerdictTarget(null);
    }, onPick: (v) => {
      if (!verdictTarget) return;
      markWatched(verdictTarget, v);
      setVerdictTarget(null);
    } })
  ] }) });
}
export {
  WatchlistPage as component
};
