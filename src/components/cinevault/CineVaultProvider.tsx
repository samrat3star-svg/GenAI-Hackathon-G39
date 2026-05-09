import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ARCHETYPES,
  type Archetype,
  type ArchetypeId,
} from "@/lib/cinevault/archetypes";
import {
  loadState,
  saveState,
  resetState,
  type WatchlistItem,
  type Collection,
} from "@/lib/cinevault/storage";
import type { VerdictId } from "@/lib/cinevault/reel";

interface CineVaultContextValue {
  archetype: ArchetypeId | null;
  archetypeData: Archetype | null;
  watchlist: WatchlistItem[];
  detailMovieId: string | null;
  setArchetype: (id: ArchetypeId | null) => void;
  setDetailMovieId: (id: string | null) => void;
  addMovie: (movieId: string) => void;
  removeMovie: (movieId: string) => void;
  markWatched: (movieId: string, verdict: VerdictId) => void;
  hasMovie: (movieId: string) => boolean;
  reset: () => void;
  seedDemo: (movieIds: string[]) => void;
  collections: Collection[];
  createCollection: (name: string, emoji: string, description: string) => void;
  deleteCollection: (id: string) => void;
  addMovieToCollection: (collectionId: string, movieId: string) => void;
  removeMovieFromCollection: (collectionId: string, movieId: string) => void;
  addCollaborator: (collectionId: string, name: string) => void;
}

const Ctx = createContext<CineVaultContextValue | null>(null);

export function CineVaultProvider({ children }: { children: React.ReactNode }) {
  const [archetype, setArchetypeState] = useState<ArchetypeId | null>(null);
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const s = loadState();
    setArchetypeState(s.archetype);
    setWatchlist(s.watchlist);
    setCollections(s.collections || []);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveState({ archetype, watchlist, collections });
  }, [archetype, watchlist, collections, hydrated]);

  // Apply archetype to <html>
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (archetype) root.setAttribute("data-archetype", archetype);
    else root.setAttribute("data-archetype", "pulse-chaser");
  }, [archetype]);

  const setArchetype = useCallback((id: ArchetypeId | null) => {
    setArchetypeState(id);
  }, []);

  const addMovie = useCallback((movieId: string) => {
    setWatchlist((prev) => {
      if (prev.some((w) => w.movieId === movieId)) return prev;
      return [{ movieId, addedAt: Date.now(), watched: false }, ...prev];
    });
  }, []);

  const removeMovie = useCallback((movieId: string) => {
    setWatchlist((prev) => prev.filter((w) => w.movieId !== movieId));
  }, []);

  const markWatched = useCallback((movieId: string, verdict: VerdictId) => {
    setWatchlist((prev) =>
      prev.map((w) =>
        w.movieId === movieId
          ? { ...w, watched: true, verdict, watchedAt: Date.now() }
          : w,
      ),
    );
  }, []);

  const hasMovie = useCallback(
    (id: string) => watchlist.some((w) => w.movieId === id),
    [watchlist],
  );

  const reset = useCallback(() => {
    resetState();
    setArchetypeState(null);
    setWatchlist([]);
    setCollections([]);
  }, []);

  const seedDemo = useCallback((movieIds: string[]) => {
    setWatchlist((prev) => {
      const existing = new Set(prev.map((w) => w.movieId));
      const additions: WatchlistItem[] = movieIds
        .filter((id) => !existing.has(id))
        .map((id, i) => ({ movieId: id, addedAt: Date.now() - i * 1000, watched: false }));
      return [...additions, ...prev];
    });
  }, []);

  const createCollection = useCallback((name: string, emoji: string, description: string) => {
    setCollections((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name,
        emoji,
        description,
        movieIds: [],
        createdAt: Date.now(),
        collaborators: [],
      },
    ]);
  }, []);

  const deleteCollection = useCallback((id: string) => {
    setCollections((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const addMovieToCollection = useCallback((collectionId: string, movieId: string) => {
    setCollections((prev) =>
      prev.map((c) =>
        c.id === collectionId
          ? { ...c, movieIds: c.movieIds.includes(movieId) ? c.movieIds : [...c.movieIds, movieId] }
          : c
      )
    );
  }, []);

  const removeMovieFromCollection = useCallback((collectionId: string, movieId: string) => {
    setCollections((prev) =>
      prev.map((c) =>
        c.id === collectionId
          ? { ...c, movieIds: c.movieIds.filter((id) => id !== movieId) }
          : c
      )
    );
  }, []);

  const addCollaborator = useCallback((collectionId: string, name: string) => {
    setCollections((prev) =>
      prev.map((c) =>
        c.id === collectionId
          ? { ...c, collaborators: c.collaborators.includes(name) ? c.collaborators : [...c.collaborators, name] }
          : c
      )
    );
  }, []);

  const [detailMovieId, setDetailMovieId] = useState<string | null>(null);

  const value = useMemo<CineVaultContextValue>(
    () => ({
      archetype,
      archetypeData: archetype ? ARCHETYPES[archetype] : null,
      watchlist,
      detailMovieId,
      setArchetype,
      addMovie,
      removeMovie,
      markWatched,
      hasMovie,
      reset,
      seedDemo,
      setDetailMovieId,
      collections,
      createCollection,
      deleteCollection,
      addMovieToCollection,
      removeMovieFromCollection,
      addCollaborator,
    }),
    [archetype, watchlist, detailMovieId, collections, setArchetype, addMovie, removeMovie, markWatched, hasMovie, reset, seedDemo, createCollection, deleteCollection, addMovieToCollection, removeMovieFromCollection, addCollaborator],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCineVault() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCineVault must be used inside CineVaultProvider");
  return v;
}
