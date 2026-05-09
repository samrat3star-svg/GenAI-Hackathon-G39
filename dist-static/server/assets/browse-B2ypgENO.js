import { W as jsxRuntimeExports } from "./server-Bz2IzkDK.js";
import { c as createLucideIcon, M as MOVIES, A as AppShell } from "./AppShell-CgZhHdEZ.js";
import { M as MovieRow } from "./MovieRow-H7cwGJnL.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./router-DhFfcMSV.js";
import "./proxy-Dj0UfWx2.js";
const __iconNode$1 = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode$1);
const __iconNode = [
  ["path", { d: "M10 5H3", key: "1qgfaw" }],
  ["path", { d: "M12 19H3", key: "yhmn1j" }],
  ["path", { d: "M14 3v4", key: "1sua03" }],
  ["path", { d: "M16 17v4", key: "1q0r14" }],
  ["path", { d: "M21 12h-9", key: "1o4lsq" }],
  ["path", { d: "M21 19h-5", key: "1rlt1p" }],
  ["path", { d: "M21 5h-7", key: "1oszz2" }],
  ["path", { d: "M8 10v4", key: "tgpxqk" }],
  ["path", { d: "M8 12H3", key: "a7s4jb" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
function BrowsePage() {
  const trending = MOVIES.slice(0, 8);
  const criticallyAcclaimed = MOVIES.slice(8, 16);
  const hiddenGems = MOVIES.slice(16, 24);
  const mindBending = MOVIES.filter((m) => m.moodTags.includes("think")).slice(0, 8);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-8 pb-24 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 md:px-16 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-bold text-white tracking-tight", children: "Explore" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-lg mt-2", children: "Curated collections for every mood." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm font-medium transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-4 h-4" }),
          " Genres"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm font-medium transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "w-4 h-4" }),
          " Filters"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MovieRow, { title: "Trending Now", movies: trending }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MovieRow, { title: "Critically Acclaimed", movies: criticallyAcclaimed }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MovieRow, { title: "Mind-Bending", movies: mindBending }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MovieRow, { title: "Hidden Gems", movies: hiddenGems })
    ] })
  ] }) });
}
export {
  BrowsePage as component
};
