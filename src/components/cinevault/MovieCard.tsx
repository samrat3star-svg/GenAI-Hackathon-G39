import { useState } from "react";
import { motion } from "framer-motion";
import type { Movie } from "@/lib/cinevault/movies";
import type { WatchlistItem } from "@/lib/cinevault/storage";
import { Plus, Check, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VerdictBadge } from "./VerdictBadge";

interface Props {
  movie: Movie;
  state?: WatchlistItem;
  variant: "search" | "watchlist";
  onAdd?: () => void;
  onRemove?: () => void;
  onMarkWatched?: () => void;
}

export function MovieCard({ movie, state, variant, onAdd, onRemove, onMarkWatched }: Props) {
  const [pressed, setPressed] = useState(false);
  const inList = !!state;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative flex gap-4 rounded-2xl border border-border bg-card p-3 shadow-sm"
    >
      <div className="relative h-[132px] w-[88px] flex-none overflow-hidden rounded-lg bg-muted">
        <img
          src={movie.poster}
          alt={`${movie.title} poster`}
          loading="lazy"
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/30 to-accent/30" />
      </div>

      <div className="flex flex-1 flex-col justify-between py-1">
        <div>
          <h3 className="font-display text-lg leading-tight tracking-tight">
            {movie.title}{" "}
            <span className="text-muted-foreground font-body text-sm font-normal">
              · {movie.year}
            </span>
          </h3>
          <div className="mt-1 flex flex-wrap gap-1.5 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
            {movie.genres.slice(0, 2).map((g) => (
              <span key={g} className="rounded-full bg-secondary px-2 py-0.5 text-secondary-foreground">
                {g}
              </span>
            ))}
          </div>
          {state?.verdict && (
            <div className="mt-2">
              <VerdictBadge verdict={state.verdict} />
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-2">
          {variant === "search" ? (
            <button
              disabled={inList}
              onClick={() => {
                setPressed(true);
                setTimeout(() => setPressed(false), 600);
                onAdd?.();
              }}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                inList
                  ? "bg-secondary text-muted-foreground cursor-default"
                  : "bg-primary text-primary-foreground hover:scale-[1.03] active:scale-95"
              }`}
            >
              {inList ? <><Check className="h-4 w-4" /> Added</> : <><Plus className="h-4 w-4" /> Add</>}
              {pressed && (
                <motion.span
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 -z-10 rounded-full bg-primary"
                />
              )}
            </button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  aria-label="More"
                  className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {!state?.watched && (
                  <DropdownMenuItem onClick={onMarkWatched}>Mark as Watched</DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={onRemove} className="text-destructive">
                  Remove from Watchlist
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </motion.article>
  );
}
