import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DNA_QUESTIONS, scoreDna } from "@/lib/cinevault/dna";
import { ARCHETYPES, type ArchetypeId } from "@/lib/cinevault/archetypes";
import { useCineVault } from "@/components/cinevault/CineVaultProvider";
import { Logo } from "@/components/cinevault/Logo";
import { ArrowLeft } from "lucide-react";

const IMAGE_MAP: Record<string, string> = {
  "Sparkles": "/onboarding/alive.jpg", // Alive
  "AlertCircle": "/onboarding/cheated.jpg", // Cheated
  "Moon": "/onboarding/alone.png", // Alone
  "Users": "/onboarding/together.jpg", // Together
  "Hourglass": "/onboarding/commitment_new.jpg", // Commitment
  "Zap": "/onboarding/wall.jpg", // Wall
  "Ghost": "/onboarding/disturbed.jpg", // Disturbed
  "Heart": "/onboarding/comforted.jpg", // Comforted
  "Eye": "/onboarding/showme.jpg", // Show me
  "MessageSquare": "/onboarding/tellme.jpg", // Tell me
  "Compass": "/onboarding/commitment.jpg", // Escape
  "Lightbulb": "/onboarding/understand_new.jpg", // Understand
  "Trophy": "/onboarding/understand.jpg", // Masterpiece
  "ShieldAlert": "/onboarding/escape.jpg", // Ambush
};

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

  const goBack = () => {
    if (answers.length > 0) {
      setAnswers(prev => prev.slice(0, -1));
    } else {
      setPhase("intro");
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
            <Logo size={80} className="mb-6 text-primary" />
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
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35 }}
            className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center px-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <button 
                onClick={goBack}
                className="p-2 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Question {qIndex + 1} of {DNA_QUESTIONS.length}
              </p>
            </div>
            <h2 className="mt-3 font-display text-3xl sm:text-5xl leading-tight tracking-tight text-balance">
              {DNA_QUESTIONS[qIndex].prompt}
            </h2>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {DNA_QUESTIONS[qIndex].options.map((opt, i) => (
                <motion.button
                  key={opt.label}
                  whileHover={{ scale: 1.02, translateY: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => choose(i)}
                  className="group relative aspect-[4/3] sm:aspect-square rounded-3xl border-2 border-border bg-card p-0 text-left transition-all duration-500 hover:border-primary overflow-hidden shadow-xl"
                >
                  {/* Thematic Colorful Image Background */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={opt.icon ? IMAGE_MAP[opt.icon] : ""} 
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out" 
                      alt=""
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                  </div>

                  <div className="relative z-20 flex flex-col h-full justify-between p-6">
                    <div className="flex justify-between items-start">
                      <span className="text-xs uppercase tracking-[0.2em] text-white/70 group-hover:text-white transition-colors">
                        {i === 0 ? "Option A" : "Option B"}
                      </span>
                    </div>
                    
                    <span className="font-display text-2xl sm:text-3xl leading-tight tracking-tight text-white drop-shadow-md">
                      {opt.label}
                    </span>
                  </div>
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
