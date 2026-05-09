export type MoodTag =
  | "light"
  | "think"
  | "laugh"
  | "beautiful"
  | "intense"
  | "comfort"
  | "epic"
  | "tear";

export interface Movie {
  id: string;
  title: string;
  year: number;
  runtime: number; // minutes
  genres: string[];
  poster: string; // TMDB image URL
  moodTags: MoodTag[];
  blurb: string;
  description?: string;
  cast?: string[];
  crew?: { job: string; name: string }[];
  rating?: number;
}

const img = (path: string) => `https://image.tmdb.org/t/p/w500${path}`;

export const MOVIES: Movie[] = [
  { id: "inception", title: "Inception", year: 2010, runtime: 148, genres: ["Sci-Fi", "Thriller"], poster: img("/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"), moodTags: ["think", "intense", "epic"], blurb: "Dreams within dreams." },
  { id: "moonlight", title: "Moonlight", year: 2016, runtime: 111, genres: ["Drama"], poster: img("/4911T5FbJ9eD2Faz5Z8cT3SUhU3.jpg"), moodTags: ["beautiful", "tear", "think"], blurb: "A life in three chapters." },
  { id: "john-wick", title: "John Wick", year: 2014, runtime: 101, genres: ["Action"], poster: img("/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg"), moodTags: ["intense", "light"], blurb: "They killed his dog." },
  { id: "coco", title: "Coco", year: 2017, runtime: 105, genres: ["Animation", "Family"], poster: img("/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg"), moodTags: ["comfort", "tear", "beautiful"], blurb: "Remember me." },
  { id: "arrival", title: "Arrival", year: 2016, runtime: 116, genres: ["Sci-Fi", "Drama"], poster: img("/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg"), moodTags: ["think", "beautiful", "tear"], blurb: "Language is a weapon." },
  { id: "knives-out", title: "Knives Out", year: 2019, runtime: 130, genres: ["Mystery", "Comedy"], poster: img("/pThyQovXQrw2m0s9x82twj48Jq4.jpg"), moodTags: ["light", "laugh", "think"], blurb: "A whodunit with teeth." },
  { id: "morbius", title: "Morbius", year: 2022, runtime: 104, genres: ["Action"], poster: img("/6JjfSchsU6daXk2AKX8EEBjO3Fm.jpg"), moodTags: ["light"], blurb: "It's Morbin' time." },
  { id: "game-night", title: "Game Night", year: 2018, runtime: 100, genres: ["Comedy"], poster: img("/iDJTeMOKxD7s2Ki8SI26zk2DEcZ.jpg"), moodTags: ["laugh", "light"], blurb: "Stupid fun, done right." },
  { id: "parasite", title: "Parasite", year: 2019, runtime: 132, genres: ["Thriller", "Drama"], poster: img("/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg"), moodTags: ["think", "intense"], blurb: "Class war, basement dwellers." },
  { id: "her", title: "Her", year: 2013, runtime: 126, genres: ["Romance", "Sci-Fi"], poster: img("/lEIaL12hSkqZE83kE18MwygO2cu.jpg"), moodTags: ["beautiful", "tear", "think"], blurb: "Falling for the voice in your ear." },
  { id: "mad-max", title: "Mad Max: Fury Road", year: 2015, runtime: 120, genres: ["Action"], poster: img("/hA2ple9q4qnwxp3hKVNhroipsir.jpg"), moodTags: ["intense", "epic", "beautiful"], blurb: "What a lovely day." },
  { id: "spirited-away", title: "Spirited Away", year: 2001, runtime: 125, genres: ["Animation", "Fantasy"], poster: img("/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg"), moodTags: ["beautiful", "comfort", "tear"], blurb: "A bathhouse for the spirits." },
  { id: "the-prestige", title: "The Prestige", year: 2006, runtime: 130, genres: ["Mystery", "Drama"], poster: img("/tRNlZbgNCNOpLpbPEz5L8G8A0JN.jpg"), moodTags: ["think", "intense"], blurb: "Are you watching closely?" },
  { id: "amelie", title: "Amélie", year: 2001, runtime: 122, genres: ["Romance", "Comedy"], poster: img("/ffxqUzc7iX4suYThRHQSDPxqEoy.jpg"), moodTags: ["comfort", "beautiful", "light"], blurb: "Small joys in Montmartre." },
  { id: "the-thing", title: "The Thing", year: 1982, runtime: 109, genres: ["Horror", "Sci-Fi"], poster: img("/tzGY49kseSE9QAKk47uuDGwnSCu.jpg"), moodTags: ["intense"], blurb: "Trust no one." },
  { id: "before-sunrise", title: "Before Sunrise", year: 1995, runtime: 101, genres: ["Romance", "Drama"], poster: img("/5DnhCpCzEsPiWvfPjN6QmRNj9oS.jpg"), moodTags: ["beautiful", "tear", "comfort"], blurb: "One night in Vienna." },
  { id: "no-country", title: "No Country for Old Men", year: 2007, runtime: 122, genres: ["Thriller", "Drama"], poster: img("/bj9DslqXk3pBoIB9b9pCGFblRdg.jpg"), moodTags: ["intense", "think"], blurb: "Call it, friendo." },
  { id: "wall-e", title: "WALL·E", year: 2008, runtime: 98, genres: ["Animation", "Family"], poster: img("/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg"), moodTags: ["comfort", "beautiful", "tear"], blurb: "A robot, a plant, a planet." },
  { id: "the-departed", title: "The Departed", year: 2006, runtime: 151, genres: ["Crime", "Thriller"], poster: img("/nT97ifVT2J1yMQmeq20Qblg61T.jpg"), moodTags: ["intense", "think"], blurb: "Rats inside the rats." },
  { id: "lalaland", title: "La La Land", year: 2016, runtime: 128, genres: ["Romance", "Musical"], poster: img("/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg"), moodTags: ["beautiful", "tear", "comfort"], blurb: "City of stars." },
  { id: "annihilation", title: "Annihilation", year: 2018, runtime: 115, genres: ["Sci-Fi", "Horror"], poster: img("/d3tFAJjyaIcuG4SAjsi9e7M0c44.jpg"), moodTags: ["think", "beautiful", "intense"], blurb: "Inside the shimmer." },
  { id: "everything-everywhere", title: "Everything Everywhere All at Once", year: 2022, runtime: 139, genres: ["Sci-Fi", "Comedy"], poster: img("/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg"), moodTags: ["laugh", "tear", "think", "beautiful"], blurb: "Be a rock with me." },
  { id: "drive", title: "Drive", year: 2011, runtime: 100, genres: ["Crime", "Drama"], poster: img("/602vevIURmpDfzbnv5Ubi6wIkQm.jpg"), moodTags: ["beautiful", "intense"], blurb: "A real human being." },
  { id: "the-grand-budapest", title: "The Grand Budapest Hotel", year: 2014, runtime: 99, genres: ["Comedy", "Drama"], poster: img("/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg"), moodTags: ["laugh", "beautiful", "comfort"], blurb: "Pastel violence and Mendl's." },
  { id: "interstellar", title: "Interstellar", year: 2014, runtime: 169, genres: ["Sci-Fi", "Drama"], poster: img("/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"), moodTags: ["epic", "tear", "think", "beautiful"], blurb: "Love is the one thing." },
  { id: "the-shining", title: "The Shining", year: 1980, runtime: 146, genres: ["Horror"], poster: img("/b6ko0IKC8MdYBBPkkA1aBPLe2yz.jpg"), moodTags: ["intense", "think"], blurb: "All work and no play." },
  { id: "in-the-mood", title: "In the Mood for Love", year: 2000, runtime: 98, genres: ["Romance", "Drama"], poster: img("/iYypPT4bhqXfq1b6EnmxvRt6b2Y.jpg"), moodTags: ["beautiful", "tear"], blurb: "Lonely halls, longing eyes." },
  { id: "shawshank", title: "The Shawshank Redemption", year: 1994, runtime: 142, genres: ["Drama"], poster: img("/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg"), moodTags: ["comfort", "tear", "epic"], blurb: "Hope is a good thing." },
  { id: "spider-verse", title: "Spider-Man: Into the Spider-Verse", year: 2018, runtime: 117, genres: ["Animation", "Action"], poster: img("/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg"), moodTags: ["beautiful", "light", "epic"], blurb: "Anyone can wear the mask." },
  { id: "the-lighthouse", title: "The Lighthouse", year: 2019, runtime: 109, genres: ["Drama", "Horror"], poster: img("/3nk9UoepYmv1FMzqfd91jxAXbtC.jpg"), moodTags: ["intense", "beautiful"], blurb: "Why'd ya spill yer beans." },
];
