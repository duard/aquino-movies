import { MovieDetail, SearchMovies, WorkedRating } from './movie';

export interface MoviesState {
  selectedMovie: MovieDetail | undefined;
  selectedMovieRatings: WorkedRating[] | undefined;
  movieItems: SearchMovies[];
  isLoading: boolean;
  searchValue: string | undefined;
  error: string | undefined;
  page: number;
  pageSize: number;
  rows: number;
}

export const initialState: MoviesState = {
  selectedMovie: undefined,
  selectedMovieRatings: undefined,
  movieItems: [],
  isLoading: false,
  searchValue: '',
  error: '',
  page: 4,
  pageSize: 10,
  rows: 0,
};
