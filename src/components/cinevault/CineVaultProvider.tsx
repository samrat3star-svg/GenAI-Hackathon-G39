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
import { api } from "@/lib/cinevault/api";
import { inferMoodTags } from "@/lib/cinevault/mood";

interface CineVaultContextValue {
  archetype: ArchetypeId | null;
  archetypeData: Archetype | null;
  watchlist: WatchlistItem[];
  detailMovieId: string | null;
  detailMovie: any | null;
  setArchetype: (id: ArchetypeId | null) => void;
  setDetailMovie: (movie: any | null) => void;
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
  const [cloudHydrated, setCloudHydrated] = useState(false);

  useEffect(() => {
    const s = loadState();
    setArchetypeState(s.archetype);
    setWatchlist(s.watchlist);
    setCollections(s.collections || []);
    setHydrated(true);

    // Hydration from Cloud
    const userId = localStorage.getItem("cv_user_id");
    if (userId) {
      api.fetchState(userId).then(async res => {
        if (res.success) {
          if (res.archetype) setArchetypeState(res.archetype);
          if (res.watchlist) setWatchlist(res.watchlist);
          if (res.collections) setCollections(res.collections);

          // Merge cloud cache with local cache
          const cloudCache = (res.movieCache && typeof res.movieCache === "object") ? res.movieCache : {};
          const localCache = JSON.parse(localStorage.getItem("cv_movie_cache") || "{}");
          const mergedCache: Record<string, any> = { ...localCache, ...cloudCache };

          // Fetch any watchlist movies missing from cache
          const watchlistItems: WatchlistItem[] = res.watchlist || [];
          const missing = watchlistItems.filter(w => !mergedCache[w.movieId]);
          if (missing.length > 0) {
            const fetched = await Promise.all(missing.map(w => api.fetchMovieById(w.movieId)));
            for (const movie of fetched) {
              if (movie) mergedCache[movie.id] = { ...movie, moodTags: inferMoodTags(movie) };
            }
          }

          localStorage.setItem("cv_movie_cache", JSON.stringify(mergedCache));
          // Trigger re-render so watchlist picks up the newly populated cache
          setWatchlist(prev => [...prev]);
        }
        setCloudHydrated(true);
      });
    } else {
      setCloudHydrated(true); // No user logged in — safe to sync immediately
    }
  }, []);

  useEffect(() => {
    // Wait for BOTH local and cloud hydration before syncing
    // This prevents overwriting Airtable with empty state on page load
    if (!hydrated || !cloudHydrated) return;
    saveState({ archetype, watchlist, collections });

    // Cloud Sync
    const userId = localStorage.getItem("cv_user_id");
    if (userId) {
      const movieCache = JSON.parse(localStorage.getItem("cv_movie_cache") || "{}");
      api.syncState(userId, archetype, watchlist, collections, movieCache);
    }
  }, [archetype, watchlist, collections, hydrated, cloudHydrated]);

  // Apply archetype to <html>
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (archetype) root.setAttribute("data-archetype", archetype);
    else root.setAttribute("data-archetype", "empath");
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

  const [detailMovie, setDetailMovie] = useState<any | null>(null);
  const detailMovieId = detailMovie?.id || null;

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
      detailMovie,
      setDetailMovie,
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
