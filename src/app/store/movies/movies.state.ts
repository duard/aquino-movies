import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { MovieDetail, SearchMovies } from './movie';

export interface MoviesState {
  selectedMovie: SearchMovies | undefined;
  movieItems: SearchMovies[];
  offset: number;
  pageSize: number;
  totalResults: string;
  isLoading: boolean;
  error: string | undefined;
}

export const initialState: MoviesState = {
  selectedMovie: undefined,
  movieItems: [],
  offset: 0,
  pageSize: 10,
  totalResults: '',
  isLoading: false,
  error: '',
};

export interface SearchMoviesState extends EntityState<SearchMovies> {}

export const productsAdapter = createEntityAdapter<MovieDetail>();
