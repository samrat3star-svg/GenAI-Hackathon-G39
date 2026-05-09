import type { WatchlistItem, Collection } from "./storage";
import type { ArchetypeId } from "./archetypes";

const BASE_URL = import.meta.env.VITE_N8N_BASE_URL || "https://samrat3star2.app.n8n.cloud/webhook";

export interface TmdbMovie {
  id: string;
  tmdbId: number;
  title: string;
  year: number | null;
  poster: string | null;
  backdrop: string | null;
  overview: string;
  genres: string[];
  rating: number;
  popularity: number;
}

export const api = {
  async signup(email: string, password: string, name: string) {
    try {
      const res = await fetch(`${BASE_URL}/g39-signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });
      return await res.json();
    } catch (error) {
      return { success: false, error: "Network error" };
    }
  },

  async login(email: string, password: string) {
    try {
      const res = await fetch(`${BASE_URL}/g39-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      return await res.json();
    } catch (error) {
      return { success: false, error: "Network error" };
    }
  },

  async syncState(userId: string, archetype: ArchetypeId | null, watchlist: WatchlistItem[], collections: Collection[], movieCache: Record<string, any> = {}) {
    try {
      const res = await fetch(`${BASE_URL}/g39-sync`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, archetype, watchlist, collections, movieCache }),
      });
      return await res.json();
    } catch (error) {
      return { success: false, error: "Network error" };
    }
  },

  async fetchState(userId: string) {
    try {
      const res = await fetch(`${BASE_URL}/g39-state`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      return await res.json();
    } catch (error) {
      return { success: false, error: "Network error" };
    }
  },

  async searchMovies(query: string, page: number = 1) {
    try {
      const res = await fetch(`${BASE_URL}/g39-tmdb-search?q=${encodeURIComponent(query)}&page=${page}`);
      return await res.json();
    } catch (error) {
      return { total: 0, page: 1, movies: [] };
    }
  },

  async fetchTrending() {
    try {
      const res = await fetch(`${BASE_URL}/g39-tmdb-trending`);
      return await res.json();
    } catch (error) {
      return { movies: [] };
    }
  },

  async smartSearch(query: string, page = 1) {
    try {
      const tmdbKey = import.meta.env.VITE_TMDB_API_KEY;
      if (!tmdbKey) return this.searchMovies(query, page);

      const q = query.toLowerCase().trim();

      const GENRE_IDS: Record<string, number> = {
        action:28, adventure:12, animation:16, comedy:35, crime:80, documentary:99,
        drama:18, family:10751, fantasy:14, history:36, horror:27, music:10402,
        mystery:9648, romance:10749, "sci-fi":878, thriller:53, war:10752, western:37
      };
      const GENRE_MAP: Record<number, string> = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',53:'Thriller',10752:'War',37:'Western'};

      // Pattern → genres + sortBy
      const PATTERNS: { test: RegExp; genres: string[]; sort: string }[] = [
        { test: /\b(action|fight|battle|war film)\b/,           genres: ["action","thriller"],            sort: "popularity.desc" },
        { test: /\b(adventure|quest|journey|explore)\b/,        genres: ["adventure","fantasy"],          sort: "popularity.desc" },
        { test: /\b(anim|cartoon|pixar|disney)\b/,              genres: ["animation","family"],           sort: "vote_average.desc" },
        { test: /\b(comedy|comic|funny|laugh|humor|fun|lol)\b/, genres: ["comedy"],                      sort: "popularity.desc" },
        { test: /\b(crime|gangster|heist|mob|mafia)\b/,         genres: ["crime","thriller"],             sort: "vote_average.desc" },
        { test: /\b(document|docu|real|true story|biopic)\b/,   genres: ["documentary"],                 sort: "vote_average.desc" },
        { test: /\b(drama|serious|deep|emotional|feel)\b/,      genres: ["drama"],                       sort: "vote_average.desc" },
        { test: /\b(fantasy|magic|wizard|dragon|myth)\b/,       genres: ["fantasy","adventure"],         sort: "popularity.desc" },
        { test: /\b(horror|scary|ghost|haunted|creepy|terror)\b/,genres: ["horror"],                     sort: "vote_average.desc" },
        { test: /\b(mystery|detective|whodunit|suspense)\b/,    genres: ["mystery","crime"],             sort: "vote_average.desc" },
        { test: /\b(romant|love|romance|date night|couple)\b/,  genres: ["romance","drama"],             sort: "popularity.desc" },
        { test: /\b(sci.fi|science fiction|space|alien|future)\b/,genres: ["sci-fi"],                   sort: "popularity.desc" },
        { test: /\b(thriller|tense|gripping|edge of seat)\b/,   genres: ["thriller"],                   sort: "vote_average.desc" },
        { test: /\b(quiet|calm|slow|gentle|peaceful|artsy)\b/,  genres: ["drama","documentary"],        sort: "vote_average.desc" },
        { test: /\b(family|kids|children|wholesome)\b/,         genres: ["family","animation"],         sort: "vote_average.desc" },
        // Sort modifiers
        { test: /\b(best|top|greatest|award|oscar|classic)\b/,  genres: [],                             sort: "vote_average.desc" },
        { test: /\b(new|recent|latest|2024|2025|2026)\b/,       genres: [],                             sort: "primary_release_date.desc" },
        { test: /\b(popular|trending|hit|blockbuster)\b/,       genres: [],                             sort: "popularity.desc" },
      ];

      // Check if any pattern matches
      const matchedGenres = new Set<string>();
      let sortBy = "popularity.desc";

      for (const p of PATTERNS) {
        if (p.test.test(q)) {
          p.genres.forEach(g => matchedGenres.add(g));
          if (p.genres.length === 0) sortBy = p.sort; // sort-only modifier
          else sortBy = p.sort;
        }
      }

      // If descriptive query (genre/vibe detected OR contains "movie"/"film" with no proper noun)
      const isDescriptive = matchedGenres.size > 0 || /\b(movie|film|show|series|watch|something)\b/.test(q);

      if (isDescriptive && matchedGenres.size > 0) {
        const genreIds = Array.from(matchedGenres).map(g => GENRE_IDS[g]).filter(Boolean).join(",");
        const dRes = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${tmdbKey}&with_genres=${genreIds}&sort_by=${sortBy}&page=${page}&vote_count.gte=100&include_adult=false`);
        const dData = await dRes.json();
        const movies = (dData.results || []).slice(0, 20).map((m: any) => ({
          id: String(m.id), tmdbId: m.id, title: m.title,
          year: m.release_date ? parseInt(m.release_date.substring(0, 4)) : null,
          poster: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : null,
          backdrop: m.backdrop_path ? `https://image.tmdb.org/t/p/original${m.backdrop_path}` : null,
          overview: m.overview,
          genres: (m.genre_ids || []).map((id: number) => GENRE_MAP[id]).filter(Boolean),
          rating: Math.round((m.vote_average || 0) * 10) / 10,
          popularity: m.popularity || 0,
        }));
        return { total: dData.total_results, page: dData.page, movies, isDiscovery: true };
      }
    } catch { /* fall through to title search */ }

    return this.searchMovies(query, page);
  },

  async interpretMood(mood: string): Promise<string[]> {
    try {
      const res = await fetch(`${BASE_URL}/g39-interpret-mood`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood }),
      });
      const data = await res.json();
      if (Array.isArray(data.genres)) return data.genres;
      return [];
    } catch {
      return [];
    }
  },

  async fetchMovieById(tmdbId: string) {
    try {
      const key = import.meta.env.VITE_TMDB_API_KEY;
      if (!key) return null;
      const res = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${key}`);
      const m = await res.json();
      if (!m.id) return null;
      const GENRE_MAP: Record<number, string> = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',53:'Thriller',10752:'War',37:'Western'};
      return {
        id: String(m.id),
        tmdbId: m.id,
        title: m.title,
        year: m.release_date ? parseInt(m.release_date.substring(0, 4)) : null,
        poster: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : null,
        backdrop: m.backdrop_path ? `https://image.tmdb.org/t/p/original${m.backdrop_path}` : null,
        overview: m.overview,
        genres: (m.genres || []).map((g: any) => GENRE_MAP[g.id] || g.name),
        rating: Math.round((m.vote_average || 0) * 10) / 10,
        popularity: m.popularity || 0,
      };
    } catch {
      return null;
    }
  },

  async kernelChat(message: string, archetype: ArchetypeId | null, watchlist: WatchlistItem[], collections: Collection[]) {
    try {
      const res = await fetch(`${BASE_URL}/g39-kernel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, archetype, watchlist, collections }),
      });
      return await res.json();
    } catch (error) {
      return { success: false, error: "Network error" };
    }
  },
};
