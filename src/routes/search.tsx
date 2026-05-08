import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { AppShell } from "@/components/cinevault/AppShell";
import { MovieCard } from "@/components/cinevault/MovieCard";
import { useCineVault } from "@/components/cinevault/CineVaultProvider";
import { MOVIES } from "@/lib/cinevault/movies";
import { reel } from "@/lib/cinevault/reel";
import { reelToast } from "@/components/cinevault/reelToast";

export const Route = createFileRoute("/search")({
  component: SearchPage,
});

function SearchPage() {
  const { archetype, archetypeData, addMovie, watchlist } = useCineVault();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!archetype) navigate({ to: "/onboarding" });
  }, [archetype, navigate]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MOVIES.slice(0, 12);
    return MOVIES.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.genres.some((g) => g.toLowerCase().includes(q)) ||
        String(m.year).includes(q),
    );
  }, [query]);

  if (!archetype || !archetypeData) return null;

  return (
    <AppShell>
      <div className="relative">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={archetypeData.searchPlaceholder}
          className="w-full rounded-2xl border border-border bg-card py-4 pl-12 pr-4 text-base outline-none placeholder:text-muted-foreground/70 focus:border-primary"
        />
      </div>

      <div className="mt-2 px-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {results.length} {results.length === 1 ? "result" : "results"}
      </div>

      <div className="mt-4 grid gap-3">
        {results.map((m) => {
          const item = watchlist.find((w) => w.movieId === m.id);
          return (
            <MovieCard
              key={m.id}
              movie={m}
              state={item}
              variant="search"
              onAdd={() => {
                addMovie(m.id);
                reelToast(reel.add(archetype, m));
              }}
            />
          );
        })}
        {results.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
            Nothing matched. Try a director, a year, a feeling.
          </div>
        )}
      </div>
    </AppShell>
  );
}
