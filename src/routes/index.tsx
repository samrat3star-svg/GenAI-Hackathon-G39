import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CinemaNavbar } from "@/components/landing/CinemaNavbar";
import { HeroCarousel } from "@/components/landing/HeroCarousel";
import { FeaturedRow } from "@/components/landing/FeaturedRow";
import { PopChatFab } from "@/components/landing/PopChatFab";
import { FEATURED } from "@/lib/landing/featured";
import { MOVIES, type Movie } from "@/lib/cinevault/movies";

export const Route = createFileRoute("/")({
  component: Index,
});

const byTags = (...tags: string[]) =>
  MOVIES.filter((m) => m.moodTags.some((t) => tags.includes(t)));

const dedupe = (arr: Movie[]) => {
  const seen = new Set<string>();
  return arr.filter((m) => (seen.has(m.id) ? false : (seen.add(m.id), true)));
};

function Index() {
  const tonight = dedupe([
    ...byTags("intense", "think"),
    ...byTags("epic"),
  ]).slice(0, 10);
  const stunning = dedupe(byTags("beautiful")).slice(0, 10);
  const easy = dedupe(byTags("light", "comfort", "laugh")).slice(0, 10);

  return (
    <div data-surface="cinema" className="min-h-dvh bg-background text-foreground">
      <CinemaNavbar />
      <HeroCarousel slides={FEATURED} />

      <main className="relative">
        <div className="pointer-events-none absolute inset-x-0 -top-32 h-32 bg-gradient-to-b from-transparent to-black" />
        <div className="mx-auto max-w-7xl space-y-16 px-4 pb-24 pt-16 sm:px-6 sm:pb-32 sm:pt-20">
          <FeaturedRow title="Perfect Tonight" subtitle="Picked by mood, not by algorithm." movies={tonight} />
          <FeaturedRow title="Visually Stunning" subtitle="Pause-worthy in every frame." movies={stunning} />
          <FeaturedRow title="Easy Watches" subtitle="Low effort. High payoff." movies={easy} />

          {/* DNA CTA strip */}
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
              <p className="text-[11px] uppercase tracking-[0.28em] text-primary">Find your taste</p>
              <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl text-balance">
                What's your <span className="italic text-primary">Cinematic DNA?</span>
              </h3>
              <p className="mt-4 max-w-lg text-white/70">
                Seven questions, one minute, a watchlist that finally knows you.
              </p>
              <Link
                to="/onboarding"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black shadow-lg transition-transform hover:scale-[1.02]"
              >
                Take the test →
              </Link>
            </div>
          </motion.section>
        </div>

        <footer className="border-t border-white/5 bg-black/60 py-10">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 sm:flex-row sm:items-center">
            <p className="font-display text-sm text-white/60 italic">
              "Stop scrolling. Start watching."
            </p>
            <p className="text-xs uppercase tracking-[0.22em] text-white/40">CineVault · est. tonight</p>
          </div>
        </footer>
      </main>

      <PopChatFab />
    </div>
  );
}
