import { Action, State, createReducer, on } from '@ngrx/store';
import { MoviesActions } from './movies.actions';
import { SearchMovies } from './movie';
import { MoviesState, initialState } from './movies.state';

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
