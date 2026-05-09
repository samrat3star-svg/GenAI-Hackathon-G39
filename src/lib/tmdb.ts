import { type Movie } from "./cinevault/movies";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export interface TMDBMovie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  overview: string;
  genre_ids: number[];
  vote_average: number;
  runtime?: number;
}

const GENRE_MAP: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

export async function searchTMDB(query: string): Promise<Movie[]> {
  if (!query) return [];
  try {
    const res = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`
    );
    if (!res.ok) throw new Error("TMDB search failed");
    const data = await res.json();
    if (!data.results || !Array.isArray(data.results)) return [];
    return (data.results as TMDBMovie[]).map(mapTMDBToMovie);
  } catch (err) {
    console.error("searchTMDB error:", err);
    return [];
  }
}

export async function getTMDBDetails(id: string): Promise<Movie | null> {
  try {
    const res = await fetch(
      `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=credits,release_dates`
    );
    if (!res.ok) throw new Error("TMDB details failed");
    const m = (await res.json()) as TMDBMovie & { 
      genres: { name: string }[], 
      credits?: { 
        cast: { name: string }[], 
        crew: { job: string, name: string }[] 
      },
      release_dates?: {
        results: { iso_3166_1: string, release_dates: { certification: string }[] }[]
      }
    };
    
    const genres = (m.genres || []).map((g) => g.name);
    
    // Extract US Certification (Age Rating)
    let ageRating = "";
    if (m.release_dates && m.release_dates.results) {
      const usRelease = m.release_dates.results.find(r => r.iso_3166_1 === "US");
      if (usRelease && usRelease.release_dates && usRelease.release_dates.length > 0) {
        const cert = usRelease.release_dates.find(r => r.certification !== "");
        if (cert) ageRating = cert.certification;
      }
    }
    
    return {
      id: String(m.id),
      title: m.title,
      year: m.release_date ? new Date(m.release_date).getFullYear() : 0,
      runtime: m.runtime || 0,
      genres,
      poster: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : "https://via.placeholder.com/500x750?text=No+Poster",
      moodTags: autoTagMoods(genres),
      blurb: m.overview ? m.overview.slice(0, 120) + "..." : "",
      description: m.overview,
      rating: m.vote_average,
      ageRating,
      cast: m.credits?.cast.slice(0, 5).map(c => c.name),
      crew: m.credits?.crew.filter(c => ["Director", "Writer", "Producer"].includes(c.job)).slice(0, 3)
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}

function autoTagMoods(genres: string[]): any[] {
  const tags: any[] = [];
  if (genres.includes("Animation") || genres.includes("Family")) tags.push("comfort");
  if (genres.includes("Comedy")) tags.push("laugh");
  if (genres.includes("Sci-Fi") || genres.includes("Mystery")) tags.push("think");
  if (genres.includes("Thriller") || genres.includes("Horror")) tags.push("intense");
  if (genres.includes("Action") || genres.includes("Adventure")) tags.push("epic");
  if (genres.includes("Drama") || genres.includes("Romance")) tags.push("beautiful");
  return tags.length > 0 ? Array.from(new Set(tags)) : ["light"];
}

function mapTMDBToMovie(m: TMDBMovie): Movie {
  const genres = (m.genre_ids || []).map((id) => GENRE_MAP[id] || "Other");
  return {
    id: String(m.id),
    title: m.title,
    year: m.release_date ? new Date(m.release_date).getFullYear() : 0,
    runtime: 0,
    genres,
    poster: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : "https://via.placeholder.com/500x750?text=No+Poster",
    moodTags: autoTagMoods(genres),
    blurb: m.overview ? m.overview.slice(0, 100) + "..." : "",
    description: m.overview,
    rating: m.vote_average,
  };
}

export async function getTrendingMovies(): Promise<Movie[]> {
  try {
    const res = await fetch(
      `${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`
    );
    if (!res.ok) throw new Error("TMDB trending failed");
    const data = await res.json();
    if (!data.results || !Array.isArray(data.results)) return [];
    return (data.results as TMDBMovie[]).map(mapTMDBToMovie);
  } catch (err) {
    console.error("getTrendingMovies error:", err);
    return [];
  }
}
