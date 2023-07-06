import { Action, State, createReducer, on } from '@ngrx/store';
import { MoviesActions } from './movies.actions';
import { SearchMovies } from './movie';

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

export const moviesReducer = createReducer(
  initialState,
  on(MoviesActions.searchMoviesFetch, (state) => state),

  on(MoviesActions.searchMoviesSuccess, (state: MoviesState, { result }) => {
    console.log('MOVIE SUCCESS:', result);
    return {
      ...state,
      movieItems: result.Search,
      error: '',
      isLoading: false,
      totalResults: result.totalResults,
    };
  })
);

export function moviesReducerState(state = initialState, action: Action) {
  return state;
}
// export const initialState: MoviesState = {
//   selectedMovie: undefined,
//   allMovies: [],
//   isLoading: false,
//   error: undefined,
// };

// export interface MoviesState {
//   selectedMovie: Movie | undefined;
//   allMovies: Array<Movie>;
//   isLoading: boolean;
//   error: string | undefined;
// }

// export const moviesReducer = createReducer(
//   initialState,
//   on(MoviesActions.loadAllMoviesFetch, (state) => {
//     console.log('reducer: loadRequest', state);
//     return state;
//   }),
//   on(MoviesActions.loadAllMoviesSuccess, (state) => {
//     console.log('reducer: loadRequestSuccess', state);
//     // state = {
//     //   allMovies: state.allMovies,
//     // };
//     return state;
//   }),
//   on(MoviesActions.loadAllMoviesFailure, (state) => {
//     console.log('reducer: loadMoreRequest');
//     return state;
//   }),
//   on(MoviesActions.loadAllMoviesFetch, (state) => ({
//     ...state,
//     loading: true,
//   })),

//   on(MoviesActions.loadAllMoviesSuccess, (state, action) => ({
//     ...state,
//     loading: false,
//     movies: action.allMovies,
//   })),

//   on(MoviesActions.loadAllMoviesFailure, (state, action) => ({
//     ...state,
//     loading: false,
//     error: action.error,
//   }))
// );
