export interface MovieDetail {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export interface Rating {
  Source: string;
  Value: string;
}
export interface WorkedRating {
  source: string;
  value: number;
  maxValue: number;
}
export interface SearchMovies {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface SearchResult {
  Search: SearchMovies[];
  totalResults: string;
  Response: boolean;
}
