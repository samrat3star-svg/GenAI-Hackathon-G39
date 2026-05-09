import React, { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/cinevault/AppShell";
import { useCineVault } from "@/components/cinevault/CineVaultProvider";
import { MOVIES } from "@/lib/cinevault/movies";
import { Film, ShieldCheck, Clock, BarChart2 } from "lucide-react";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

// Format raw verdict IDs into display labels
function formatVerdict(v: string): string {
  switch (v) {
    case "life":      return "Life Sentence";
    case "guilty":    return "Guilty Pleasure";
    case "acquitted": return "Acquitted";
    case "contempt":  return "Contempt";
    default:          return v;
  }
}

function ProfilePage() {
  const { archetypeData, watchlist } = useCineVault();
  const navigate = useNavigate();
  
  const [profileName, setProfileName] = useState("Movie Fan");
  const [avatarEmoji, setAvatarEmoji] = useState("");
  const [avatarColor, setAvatarColor] = useState("");

  useEffect(() => {
    setProfileName(localStorage.getItem("cv_display_name") || "Movie Fan");
    setAvatarEmoji(localStorage.getItem("cv_avatar_emoji") || "");
    setAvatarColor(localStorage.getItem("cv_avatar_color") || "");

    const authed = localStorage.getItem("cv_authed");
    if (!authed || authed !== "true") navigate({ to: "/" });
  }, [navigate]);

  // ── Derived stats ───────────────────────────────────────────────
  const stats = useMemo(() => {
    const watched = watchlist.filter((w) => w.watched);

    // Top Verdict
    const verdictCounts: Record<string, number> = {};
    for (const item of watchlist) {
      if (item.verdict) {
        verdictCounts[item.verdict] = (verdictCounts[item.verdict] ?? 0) + 1;
      }
    }
    const topVerdictRaw = Object.entries(verdictCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

    // Avg runtime of watched films
    const watchedMovies = watched
      .map((w) => MOVIES.find((m) => m.id === w.movieId))
      .filter(Boolean) as typeof MOVIES;
    const avgRuntime =
      watchedMovies.length > 0
        ? Math.round(watchedMovies.reduce((sum, m) => sum + m.runtime, 0) / watchedMovies.length)
        : null;

    // Favourite genre across all vaulted movies
    const genreCounts: Record<string, number> = {};
    for (const item of watchlist) {
      const movie = MOVIES.find((m) => m.id === item.movieId);
      if (movie) {
        for (const g of movie.genres) {
          genreCounts[g] = (genreCounts[g] ?? 0) + 1;
        }
      }
    }
    const topGenre = Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

    // Recent watched posters (up to 4)
    const recentWatched = watched
      .slice(0, 4)
      .map((w) => MOVIES.find((m) => m.id === w.movieId))
      .filter(Boolean) as typeof MOVIES;

    return {
      watchedCount: watched.length,
      topVerdictRaw,
      avgRuntime,
      topGenre,
      recentWatched,
    };
  }, [watchlist]);

  if (!archetypeData) return null;

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto pt-12 px-6 pb-32">
        {/* Profile Header */}
        <div className="relative flex flex-col items-center text-center mb-12">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 blur-3xl rounded-full" />

          <div className="relative w-28 h-28 rounded-full border-2 border-primary p-1 mb-4 flex items-center justify-center bg-card">
            <div 
              className="w-full h-full rounded-full flex items-center justify-center overflow-hidden shadow-inner"
              style={{ backgroundColor: avatarColor || 'var(--primary)' }}
            >
              {avatarEmoji ? (
                <span className="text-5xl">{avatarEmoji}</span>
              ) : (
                <span className="font-display text-4xl font-bold text-primary-foreground">
                  {profileName ? profileName.charAt(0).toUpperCase() : "M"}
                </span>
              )}
            </div>
          </div>

          <h1 className="relative font-display text-3xl font-bold text-foreground tracking-tight mb-1">
            {profileName}
          </h1>
          <p className="relative text-primary font-medium tracking-widest uppercase text-sm mb-4 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> {archetypeData.name}
          </p>
          <p className="relative text-muted-foreground text-sm max-w-sm">
            {archetypeData.tagline}
          </p>
        </div>

        {/* Stats Grid — 2 cols mobile, 3 cols md, 5 cards total */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {/* 1 — Total Vaulted */}
          <StatCard
            title="Total Vaulted"
            icon={<Film className="w-4 h-4" />}
            value={watchlist.length.toString()}
          />

          {/* 2 — Watched */}
          <StatCard
            title="Watched"
            icon={<Clock className="w-4 h-4" />}
            value={stats.watchedCount.toString()}
          />

          {/* 3 — Top Verdict */}
          <StatCard
            title="Top Verdict"
            icon={<ShieldCheck className="w-4 h-4 text-amber-500" />}
            value={stats.topVerdictRaw ? formatVerdict(stats.topVerdictRaw) : "None yet"}
            valueColor={stats.topVerdictRaw ? "text-amber-500" : "text-muted-foreground"}
          />

          {/* 4 — Avg Runtime */}
          <StatCard
            title="Avg Runtime"
            icon={<Clock className="w-4 h-4" />}
            value={stats.avgRuntime !== null ? `${stats.avgRuntime} mins` : "—"}
          />

          {/* 5 — Favourite Genre */}
          <StatCard
            title="Favourite Genre"
            icon={<BarChart2 className="w-4 h-4" />}
            value={stats.topGenre ?? "—"}
          />
        </div>

        {/* Recently Watched poster strip */}
        {stats.recentWatched.length > 0 && (
          <div className="mb-10">
            <h2 className="font-display text-lg text-foreground mb-3">Recently Watched</h2>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
              {stats.recentWatched.map((movie) => (
                <div key={movie.id} className="flex flex-col items-center gap-1.5 flex-shrink-0 group">
                  <div className="w-20 aspect-[2/3] rounded-xl overflow-hidden border border-border shadow-sm transition-transform duration-300">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground truncate w-20 text-center">
                    {movie.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}


      </div>
    </AppShell>
  );
}

function StatCard({
  title,
  value,
  icon,
  valueColor = "text-foreground",
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  valueColor?: string;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-3 min-h-[120px]">
      <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
        {icon} {title}
      </div>
      <div className={`font-display text-xl font-bold leading-tight break-words ${valueColor}`}>
        {value}
      </div>
    </div>
  );
}
