import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useCineVault } from "@/components/cinevault/CineVaultProvider";
import { motion } from "framer-motion";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { archetype } = useCineVault();
  const navigate = useNavigate();

  useEffect(() => {
    if (archetype) {
      const t = setTimeout(() => navigate({ to: "/watchlist" }), 50);
      return () => clearTimeout(t);
    }
  }, [archetype, navigate]);

  return (
    <div className="relative min-h-dvh overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 grain opacity-40" />
      <div className="pointer-events-none absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-primary/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-accent/30 blur-3xl" />

      <main className="relative mx-auto flex min-h-dvh max-w-2xl flex-col justify-between px-6 py-10">
        <header className="flex items-center justify-between">
          <div className="font-display text-lg font-semibold tracking-tight">CineVault</div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">est. tonight</div>
        </header>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex-1 flex flex-col justify-center py-16"
        >
          <p className="text-sm uppercase tracking-[0.22em] text-primary">A watchlist with taste</p>
          <h1 className="mt-4 font-display text-5xl sm:text-7xl font-semibold leading-[0.95] tracking-tight text-balance">
            Stop scrolling.
            <br />
            <span className="italic text-primary">Start watching.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground text-balance">
            CineVault is the watchlist app that finally has opinions — and knows your taste well enough to use them.
          </p>

          <div className="mt-10 flex items-center gap-3">
            <button
              onClick={() => navigate({ to: "/onboarding" })}
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-medium text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-[1.03] active:scale-95"
            >
              Find my Cinematic DNA
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </button>
            <span className="text-xs text-muted-foreground hidden sm:inline">7 questions · under a minute</span>
          </div>
        </motion.section>

        <footer className="flex items-end justify-between text-sm text-muted-foreground">
          <p className="max-w-xs italic">
            “Every other app gives you more movies to choose from. CineVault gives you the courage to choose one.”
          </p>
          <div className="text-right text-xs uppercase tracking-[0.2em]">
            Meet <span className="text-primary not-italic">Reel</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
