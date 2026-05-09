import { W as jsxRuntimeExports } from "./server-Bz2IzkDK.js";
import { c as createLucideIcon, M as MOVIES, A as AppShell, F as Film, C as Clock } from "./AppShell-CgZhHdEZ.js";
import { u as useCineVault } from "./router-DhFfcMSV.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./proxy-Dj0UfWx2.js";
const __iconNode$2 = [
  [
    "path",
    {
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
      key: "1i5ecw"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Settings = createLucideIcon("settings", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode$1);
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode);
function ProfilePage() {
  const {
    archetypeData,
    watchlist
  } = useCineVault();
  if (!archetypeData) return null;
  const watched = watchlist.filter((w) => w.watched);
  const recentWatches = watched.slice(0, 4).map((w) => MOVIES.find((m) => m.id === w.movieId)).filter(Boolean);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto pt-12 px-6 pb-32", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col items-center text-center mb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 blur-3xl rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-28 h-28 rounded-full border-2 border-primary p-1 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full rounded-full bg-black/50 overflow-hidden relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://api.dicebear.com/7.x/notionists/svg?seed=cinevault&backgroundColor=transparent", alt: "Avatar", className: "w-full h-full object-cover" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:scale-105 transition-transform", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-4 h-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "relative font-display text-3xl font-bold text-white tracking-tight mb-1", children: "Alex Cinematic" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "relative text-primary font-medium tracking-widest uppercase text-sm mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4" }),
        " ",
        archetypeData.name
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "relative text-white/60 text-sm max-w-sm", children: archetypeData.tagline })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Total Vaulted", value: watchlist.length.toString(), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-4 h-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Watched", value: watched.length.toString(), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Top Verdict", value: "LIFE SENTENCE", valueColor: "text-amber-500", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4 text-amber-500" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Collaborators", value: "3", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-white", children: "Shared Vaults" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "text-sm font-medium text-primary hover:text-primary/80 transition-colors", children: "Create New" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative overflow-hidden rounded-2xl bg-black/40 border border-white/10 hover:border-white/20 p-5 transition-all", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex justify-between items-start mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-6 h-6 text-white/70" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex -space-x-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full border-2 border-black bg-zinc-800" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full border-2 border-black bg-zinc-700" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "relative z-10 font-display text-xl font-semibold text-white mb-1", children: "Sunday Night Cinema" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "relative z-10 text-sm text-white/50", children: "12 Movies · Priya added 'Whiplash'" })
      ] }) })
    ] }),
    recentWatches.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-white mb-6", children: "Recent Watches" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: recentWatches.map((movie) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative rounded-xl overflow-hidden aspect-[2/3]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: movie.poster, alt: movie.title, className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-white font-semibold text-sm line-clamp-1", children: movie.title }) })
      ] }, movie.id)) })
    ] })
  ] }) });
}
function StatCard({
  title,
  value,
  icon,
  valueColor = "text-white"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-black/40 border border-white/10 rounded-2xl p-5 flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-white/50 text-sm font-medium", children: [
      icon,
      " ",
      title
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `font-display text-3xl font-bold ${valueColor}`, children: value })
  ] });
}
export {
  ProfilePage as component
};
