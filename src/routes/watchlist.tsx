import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/cinevault/AppShell";
import { MoodBar } from "@/components/cinevault/MoodBar";
import { MovieCard } from "@/components/cinevault/MovieCard";
import { VerdictSheet } from "@/components/cinevault/VerdictSheet";
import { useCineVault } from "@/components/cinevault/CineVaultProvider";
import { MOVIES } from "@/lib/cinevault/movies";
import { reel, type VerdictId } from "@/lib/cinevault/reel";
import { reelToast } from "@/components/cinevault/reelToast";

export const Route = createFileRoute("/watchlist")({
  component: WatchlistPage,
});

function WatchlistPage() {
  const { archetype, watchlist, removeMovie, markWatched } = useCineVault();
  const navigate = useNavigate();
  const [verdictTarget, setVerdictTarget] = useState<string | null>(null);

  useEffect(() => {
    if (!archetype) navigate({ to: "/onboarding" });
  }, [archetype, navigate]);

  const items = useMemo(
    () =>
      watchlist
        .map((w) => ({ state: w, movie: MOVIES.find((m) => m.id === w.movieId) }))
        .filter((x): x is { state: typeof watchlist[number]; movie: NonNullable<typeof x.movie> } => !!x.movie),
    [watchlist],
  );

  const unwatched = items.filter((i) => !i.state.watched);
  const watched = items.filter((i) => i.state.watched);
  const target = verdictTarget ? MOVIES.find((m) => m.id === verdictTarget) : null;

  if (!archetype) return null;

  return (
    <AppShell>
      <MoodBar />

      {items.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-border p-10 text-center">
          <p className="font-display text-xl text-balance">
            Empty stack. Bring me something to work with.
          </p>
          <Link
            to="/search"
            className="mt-5 inline-block rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Find a film
          </Link>
        </div>
      ) : (
        <>
          {unwatched.length > 0 && (
            <Section title="To watch" count={unwatched.length}>
              {unwatched.map((i) => (
                <MovieCard
                  key={i.movie.id}
                  movie={i.movie}
                  state={i.state}
                  variant="watchlist"
                  onRemove={() => removeMovie(i.movie.id)}
                  onMarkWatched={() => setVerdictTarget(i.movie.id)}
                />
              ))}
            </Section>
          )}

          {watched.length > 0 && (
            <Section title="Watched" count={watched.length}>
              {watched.map((i) => (
                <MovieCard
                  key={i.movie.id}
                  movie={i.movie}
                  state={i.state}
                  variant="watchlist"
                  onRemove={() => removeMovie(i.movie.id)}
                  onMarkWatched={() => reelToast(reel.verdictsStick())}
                />
              ))}
            </Section>
          )}
        </>
      )}

      <VerdictSheet
        open={!!target}
        movieTitle={target?.title ?? ""}
        onOpenChange={(o) => { if (!o) setVerdictTarget(null); }}
        onPick={(v: VerdictId) => {
          if (!target) return;
          markWatched(target.id, v);
          reelToast(reel.verdict(archetype, v));
          setVerdictTarget(null);
        }}
      />
    </AppShell>
  );
}

function Section({ title, count, children }: { title: string; count: number; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <div className="mb-3 flex items-baseline justify-between px-1">
        <h2 className="font-display text-xl tracking-tight">{title}</h2>
        <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{count}</span>
      </div>
      <div className="grid gap-3">{children}</div>
    </section>
  );
}
