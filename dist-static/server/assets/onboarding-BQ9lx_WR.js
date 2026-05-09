import { r as reactExports, W as jsxRuntimeExports } from "./server-Bz2IzkDK.js";
import { a as useNavigate, u as useCineVault, A as ARCHETYPES } from "./router-DhFfcMSV.js";
import { A as AnimatePresence, m as motion } from "./proxy-Dj0UfWx2.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const DNA_QUESTIONS = [
  {
    id: "ending",
    prompt: "A film ends ambiguously. You feel…",
    options: [
      { label: "Alive", weights: { "void-gazer": 2, architect: 1 } },
      { label: "Cheated", weights: { "pulse-chaser": 2, empath: 1 } }
    ]
  },
  {
    id: "company",
    prompt: "You watch alone or with someone?",
    options: [
      { label: "Alone — it's sacred", weights: { "void-gazer": 2, architect: 1 } },
      { label: "Together — it's shared", weights: { empath: 2, "pulse-chaser": 1 } }
    ]
  },
  {
    id: "runtime",
    prompt: "A 3-hour runtime is…",
    options: [
      { label: "A commitment I honor", weights: { "void-gazer": 2, architect: 1 } },
      { label: "A wall I won't climb", weights: { "pulse-chaser": 2 } }
    ]
  },
  {
    id: "feeling",
    prompt: "You prefer to feel…",
    options: [
      { label: "Disturbed and changed", weights: { "void-gazer": 2, architect: 1 } },
      { label: "Comforted and safe", weights: { empath: 2, "pulse-chaser": 1 } }
    ]
  },
  {
    id: "show-tell",
    prompt: "Beautiful visuals or sharp dialogue?",
    options: [
      { label: "Show me", weights: { "void-gazer": 2, "pulse-chaser": 1 } },
      { label: "Tell me", weights: { architect: 2, empath: 1 } }
    ]
  },
  {
    id: "purpose",
    prompt: "You watch to…",
    options: [
      { label: "Escape completely", weights: { "pulse-chaser": 2, empath: 1 } },
      { label: "Understand something", weights: { architect: 2, "void-gazer": 1 } }
    ]
  },
  {
    id: "tears",
    prompt: "A film that makes you cry is…",
    options: [
      { label: "A masterpiece", weights: { empath: 2, "void-gazer": 1 } },
      { label: "An ambush", weights: { "pulse-chaser": 2, architect: 1 } }
    ]
  }
];
function scoreDna(answers) {
  const totals = {
    "void-gazer": 0,
    "pulse-chaser": 0,
    empath: 0,
    architect: 0
  };
  answers.forEach((choiceIdx, qIdx) => {
    const opt = DNA_QUESTIONS[qIdx]?.options[choiceIdx];
    if (!opt) return;
    for (const [k, v] of Object.entries(opt.weights)) {
      totals[k] += v;
    }
  });
  let winner = "empath";
  let max = -Infinity;
  Object.keys(totals).forEach((id) => {
    if (totals[id] > max) {
      max = totals[id];
      winner = id;
    }
  });
  return winner;
}
function Onboarding() {
  const navigate = useNavigate();
  const {
    setArchetype
  } = useCineVault();
  const [phase, setPhase] = reactExports.useState("intro");
  const [answers, setAnswers] = reactExports.useState([]);
  const [result, setResult] = reactExports.useState(null);
  const qIndex = answers.length;
  const choose = (choiceIdx) => {
    const next = [...answers, choiceIdx];
    setAnswers(next);
    if (next.length === DNA_QUESTIONS.length) {
      setPhase("reading");
      setTimeout(() => {
        const r = scoreDna(next);
        setResult(r);
        setArchetype(r);
        setPhase("reveal");
      }, 1500);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-dvh overflow-hidden bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 grain opacity-40" }),
    phase === "questions" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-6 left-0 right-0 flex justify-center gap-1.5", children: DNA_QUESTIONS.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-1 rounded-full transition-all ${i < qIndex ? "w-8 bg-primary" : i === qIndex ? "w-12 bg-primary" : "w-8 bg-border"}` }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
      phase === "intro" && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.section, { initial: {
        opacity: 0
      }, animate: {
        opacity: 1
      }, exit: {
        opacity: 0
      }, className: "mx-auto flex min-h-dvh max-w-xl flex-col justify-center px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-primary", children: "Reel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-display text-3xl sm:text-4xl leading-tight tracking-tight text-balance", children: "Hey. Before we start — let me figure out what kind of movie person you are." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "Seven choices. No wrong answers. Go." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setPhase("questions"), className: "mt-10 self-start rounded-full bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:scale-[1.03] active:scale-95 transition-transform", children: "Begin" })
      ] }, "intro"),
      phase === "questions" && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.section, { initial: {
        opacity: 0,
        y: 24
      }, animate: {
        opacity: 1,
        y: 0
      }, exit: {
        opacity: 0,
        y: -24
      }, transition: {
        duration: 0.35
      }, className: "mx-auto flex min-h-dvh max-w-2xl flex-col justify-center px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: [
          "Question ",
          qIndex + 1,
          " of ",
          DNA_QUESTIONS.length
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-3xl sm:text-5xl leading-tight tracking-tight text-balance", children: DNA_QUESTIONS[qIndex].prompt }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid gap-4 sm:grid-cols-2", children: DNA_QUESTIONS[qIndex].options.map((opt, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.button, { whileHover: {
          scale: 1.02
        }, whileTap: {
          scale: 0.98
        }, onClick: () => choose(i), className: "group relative aspect-[3/2] sm:aspect-square rounded-3xl border-2 border-border bg-card p-6 text-left transition-colors hover:border-primary hover:bg-secondary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-4 right-5 text-xs uppercase tracking-[0.2em] text-muted-foreground group-hover:text-primary", children: i === 0 ? "A" : "B" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-6 left-6 right-6 font-display text-2xl sm:text-3xl leading-tight tracking-tight", children: opt.label })
        ] }, opt.label)) })
      ] }, `q-${qIndex}`),
      phase === "reading" && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.section, { initial: {
        opacity: 0
      }, animate: {
        opacity: 1
      }, exit: {
        opacity: 0
      }, className: "mx-auto flex min-h-dvh max-w-xl flex-col justify-center px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { animate: {
        opacity: [0.4, 1, 0.4]
      }, transition: {
        duration: 1.4,
        repeat: Infinity
      }, className: "font-display text-3xl tracking-tight", children: "Reading you…" }) }, "reading"),
      phase === "reveal" && result && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.section, { initial: {
        opacity: 0,
        scale: 0.96
      }, animate: {
        opacity: 1,
        scale: 1
      }, transition: {
        duration: 0.6
      }, className: "mx-auto flex min-h-dvh max-w-xl flex-col justify-center px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.22em] text-primary", children: "Your Cinematic DNA" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-5xl sm:text-7xl font-semibold leading-[0.95] tracking-tight", children: ARCHETYPES[result].name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 font-display text-2xl italic text-foreground/80", children: ARCHETYPES[result].tagline }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-lg text-muted-foreground text-balance", children: ARCHETYPES[result].description }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
          to: "/watchlist"
        }), className: "mt-10 self-start rounded-full bg-primary px-6 py-3.5 text-base font-medium text-primary-foreground shadow-lg shadow-primary/30 hover:scale-[1.03] active:scale-95 transition-transform", children: "Enter CineVault →" })
      ] }, "reveal")
    ] })
  ] });
}
export {
  Onboarding as component
};
