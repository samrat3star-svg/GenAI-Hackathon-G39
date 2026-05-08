export interface FeaturedSlide {
  id: string;
  title: string;
  year: number;
  runtime: string;
  genres: string[];
  backdrop: string;
  tagline: string;
  popchatLine: string;
}

const bd = (path: string) => `https://image.tmdb.org/t/p/original${path}`;

export const FEATURED: FeaturedSlide[] = [
  {
    id: "blade-runner-2049",
    title: "Blade Runner 2049",
    year: 2017,
    runtime: "2h 43m",
    genres: ["Sci-Fi", "Drama"],
    backdrop: bd("/ilRyazdMJwN05exqhwK4tMKBYZs.jpg"),
    tagline: "A future drenched in neon and rain.",
    popchatLine: "Best watched after midnight.",
  },
  {
    id: "dune",
    title: "Dune",
    year: 2021,
    runtime: "2h 35m",
    genres: ["Sci-Fi", "Adventure"],
    backdrop: bd("/iopYFB1b6Bh7FWZh3onQhph1sih.jpg"),
    tagline: "Sand. Spice. Destiny.",
    popchatLine: "Dark room. Good speakers.",
  },
  {
    id: "interstellar",
    title: "Interstellar",
    year: 2014,
    runtime: "2h 49m",
    genres: ["Sci-Fi", "Drama"],
    backdrop: bd("/pbrkL804c8yAv3zBZR4QPEafpAR.jpg"),
    tagline: "Love is the one thing that transcends time.",
    popchatLine: "This one stays with people.",
  },
  {
    id: "spider-verse",
    title: "Spider-Man: Into the Spider-Verse",
    year: 2018,
    runtime: "1h 57m",
    genres: ["Animation", "Action"],
    backdrop: bd("/uUiId6cG32JSRI6RyBQSvQtLjz2.jpg"),
    tagline: "Anyone can wear the mask.",
    popchatLine: "Pure momentum from start to finish.",
  },
  {
    id: "whiplash",
    title: "Whiplash",
    year: 2014,
    runtime: "1h 47m",
    genres: ["Drama", "Music"],
    backdrop: bd("/6bbZ6XyvgfjhQwbplnUh1LSj1ky.jpg"),
    tagline: "Were you rushing, or were you dragging?",
    popchatLine: "Tension you can feel in your teeth.",
  },
];
