import type { ArchetypeId } from "./archetypes";
import type { VerdictId } from "./reel";

const KEY = "cinevault.v1";

export interface WatchlistItem {
  movieId: string;
  addedAt: number;
  watched: boolean;
  verdict?: VerdictId;
  watchedAt?: number;
}

export interface CineVaultState {
  archetype: ArchetypeId | null;
  watchlist: WatchlistItem[];
}

const initial: CineVaultState = { archetype: null, watchlist: [] };

export function loadState(): CineVaultState {
  if (typeof window === "undefined") return initial;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return initial;
    return { ...initial, ...JSON.parse(raw) };
  } catch {
    return initial;
  }
}

export function saveState(state: CineVaultState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

export function resetState() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}
