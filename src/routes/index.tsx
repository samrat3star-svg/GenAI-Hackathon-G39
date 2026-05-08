import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/cinevault/AppShell";
import { HeroCarousel } from "@/components/ui/HeroCarousel";
import { MovieRow } from "@/components/cinevault/MovieRow";
import { MOVIES } from "@/lib/cinevault/movies";
import { motion } from "framer-motion";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const perfectTonight = MOVIES.filter(m => m.moodTags.includes("comfort") || m.moodTags.includes("light")).slice(0, 8);
  const visuallyStunning = MOVIES.filter(m => m.moodTags.includes("beautiful") || m.moodTags.includes("epic")).slice(0, 8);
  const easyWatches = MOVIES.filter(m => m.runtime < 110).slice(0, 8);

  return (
    <AppShell>
      <div className="relative min-h-dvh">
        <main className="flex flex-col pb-24 md:pb-8">
          <HeroCarousel />
          
          <div className="relative -mt-32 pt-32 bg-gradient-to-t from-background via-background to-transparent z-10 space-y-16">
            <MovieRow title="Perfect Tonight" movies={perfectTonight} />
            <MovieRow title="Visually Stunning" movies={visuallyStunning} />
            <MovieRow title="Easy Watches" movies={easyWatches} />

            {/* Cinematic DNA CTA - Incorporated from remote */}
            <div className="px-6 md:px-16 max-w-7xl mx-auto">
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-8 sm:p-12"
              >
                <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
                <div className="relative max-w-2xl">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-primary font-bold">Find your taste</p>
                  <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl text-balance">
                    What's your <span className="italic text-primary">Cinematic DNA?</span>
                  </h3>
                  <p className="mt-4 max-w-lg text-white/70">
                    Seven questions, one minute, a watchlist that finally knows you.
                  </p>
                  <Link
                    to="/onboarding"
                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-black shadow-lg transition-transform hover:scale-[1.05]"
                  >
                    Take the test →
                  </Link>
                </div>
              </motion.section>
            </div>
          </div>
          
          {/* Footer */}
          <footer className="mt-24 border-t border-white/5 bg-black/60 py-12 px-6 md:px-16">
            <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <p className="font-display text-lg text-white/60 italic">
                "Stop scrolling. Start watching."
              </p>
              <p className="text-xs uppercase tracking-[0.22em] text-white/30">CineVault · est. tonight</p>
            </div>
          </footer>
        </main>
      </div>
    </AppShell>
  );
}
