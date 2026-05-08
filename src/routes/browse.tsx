import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/cinevault/AppShell";
import { MovieRow } from "@/components/cinevault/MovieRow";
import { MOVIES } from "@/lib/cinevault/movies";
import { Filter, SlidersHorizontal } from "lucide-react";

export const Route = createFileRoute("/browse")({
  component: BrowsePage,
});

function BrowsePage() {
  const trending = MOVIES.slice(0, 8);
  const criticallyAcclaimed = MOVIES.slice(8, 16);
  const hiddenGems = MOVIES.slice(16, 24);
  const mindBending = MOVIES.filter(m => m.moodTags.includes("think")).slice(0, 8);

  return (
    <AppShell>
      <div className="pt-8 pb-24 max-w-7xl mx-auto">
        {/* Browse Header & Filters */}
        <div className="px-6 md:px-16 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">Explore</h1>
            <p className="text-white/50 text-lg mt-2">Curated collections for every mood.</p>
          </div>
          
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm font-medium transition-colors">
              <Filter className="w-4 h-4" /> Genres
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm font-medium transition-colors">
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
          </div>
        </div>

        {/* Cinematic Horizontal Rows */}
        <div className="space-y-4">
          <MovieRow title="Trending Now" movies={trending} />
          <MovieRow title="Critically Acclaimed" movies={criticallyAcclaimed} />
          <MovieRow title="Mind-Bending" movies={mindBending} />
          <MovieRow title="Hidden Gems" movies={hiddenGems} />
        </div>
      </div>
    </AppShell>
  );
}
