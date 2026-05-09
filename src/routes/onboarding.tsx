import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DNA_QUESTIONS, scoreDna } from "@/lib/cinevault/dna";
import { ARCHETYPES, type ArchetypeId } from "@/lib/cinevault/archetypes";
import { useCineVault } from "@/components/cinevault/CineVaultProvider";

export const Route = createFileRoute("/onboarding")({
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    const authed = localStorage.getItem("cv_authed");
    if (!authed || authed !== "true") {
      throw redirect({ to: "/" });
    }
  },
  component: Onboarding,
});

type Phase = "intro" | "questions" | "reading" | "reveal";

function Onboarding() {
  const navigate = useNavigate();
  const { setArchetype } = useCineVault();
  const [phase, setPhase] = useState<Phase>("intro");
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<ArchetypeId | null>(null);

  const qIndex = answers.length;

  const choose = (choiceIdx: number) => {
    const next = [...answers, choiceIdx];
    setAnswers(next);
    if (next.length === DNA_QUESTIONS.length) {
      setPhase("reading");
      setTimeout(() => {
        const r = scoreDna(next);
        setResult(r);
        setArchetype(r); // theme switches now — reveal screen shows in archetype palette
        setPhase("reveal");
      }, 1500);
    }
  };

  return (
    <div className="relative min-h-dvh overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 grain opacity-40" />

      {/* progress dots */}
      {phase === "questions" && (
        <div className="absolute top-6 left-0 right-0 flex justify-center gap-1.5">
          {DNA_QUESTIONS.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all ${
                i < qIndex ? "w-8 bg-primary" : i === qIndex ? "w-12 bg-primary" : "w-8 bg-border"
              }`}
            />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <motion.section
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center px-6"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Reel</p>
            <p className="mt-3 font-display text-3xl sm:text-4xl leading-tight tracking-tight text-balance">
              Hey. Before we start — let me figure out what kind of movie person you are.
            </p>
            <p className="mt-4 text-muted-foreground">Seven choices. No wrong answers. Go.</p>
            <button
              onClick={() => setPhase("questions")}
              className="mt-10 self-start rounded-full bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:scale-[1.03] active:scale-95 transition-transform"
            >
              Begin
            </button>
          </motion.section>
        )}

        {phase === "questions" && (
          <motion.section
            key={`q-${qIndex}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35 }}
            className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center px-6"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Question {qIndex + 1} of {DNA_QUESTIONS.length}
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-5xl leading-tight tracking-tight text-balance">
              {DNA_QUESTIONS[qIndex].prompt}
            </h2>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {DNA_QUESTIONS[qIndex].options.map((opt, i) => (
                <motion.button
                  key={opt.label}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => choose(i)}
                  className="group relative aspect-[3/2] sm:aspect-square rounded-3xl border-2 border-border bg-card p-6 text-left transition-colors hover:border-primary hover:bg-secondary"
                >
                  <span className="absolute top-4 right-5 text-xs uppercase tracking-[0.2em] text-muted-foreground group-hover:text-primary">
                    {i === 0 ? "A" : "B"}
                  </span>
                  <span className="absolute bottom-6 left-6 right-6 font-display text-2xl sm:text-3xl leading-tight tracking-tight">
                    {opt.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.section>
        )}

        {phase === "reading" && (
          <motion.section
            key="reading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center px-6"
          >
            <motion.p
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="font-display text-3xl tracking-tight"
            >
              Reading you…
            </motion.p>
          </motion.section>
        )}

        {phase === "reveal" && result && (
          <motion.section
            key="reveal"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center px-6"
          >
            <p className="text-xs uppercase tracking-[0.22em] text-primary">Your Cinematic DNA</p>
            <h1 className="mt-3 font-display text-5xl sm:text-7xl font-semibold leading-[0.95] tracking-tight">
              {ARCHETYPES[result].name}
            </h1>
            <p className="mt-4 font-display text-2xl italic text-foreground/80">
              {ARCHETYPES[result].tagline}
            </p>
            <p className="mt-6 text-lg text-muted-foreground text-balance">
              {ARCHETYPES[result].description}
            </p>
            <button
              onClick={() => navigate({ to: "/watchlist" })}
              className="mt-10 self-start rounded-full bg-primary px-6 py-3.5 text-base font-medium text-primary-foreground shadow-lg shadow-primary/30 hover:scale-[1.03] active:scale-95 transition-transform"
            >
              Enter CineVault →
            </button>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
