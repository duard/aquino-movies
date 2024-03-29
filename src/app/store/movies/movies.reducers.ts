import { Action, State, createReducer, on, props } from '@ngrx/store';
import { MoviesActions } from './movies.actions';
import { MovieDetail, SearchMovies, SearchResult } from './movie';
import { MoviesState, initialState } from './movies.state';

export const moviesReducer = createReducer(
  initialState,

  on(MoviesActions.searchMoviesFetch, (state, action) => {
    const resultMutation = {
      ...state,
      page: action.pageNum,
      searchValue: action.searchValue,
      error: '',
      isLoading: true,
    };

    return resultMutation;
  }),

  on(MoviesActions.searchMoviesSuccess, (state: MoviesState, { result }) => {
    const resultMutation = {
      ...state,
      movieItems: result.Search,
      searchValue: state.searchValue,
      error: '',
      isLoading: false,
      pageSize: state.pageSize,
      page: state.page,
      rows: Number(result.totalResults),
    };

    return resultMutation;
  }),

  on(MoviesActions.loadMovieByIdFetch, (state, action) => {
    const resultMutation = {
      ...state,
      error: '',
      isLoading: true,
    };

    return resultMutation;
  }),

  on(MoviesActions.loadMovieByIdSuccess, (state: MoviesState, { movie }) => {
    const resultMutation = {
      ...state,
      selectedMovie: movie,
      error: '',
      isLoading: false,
    };
    return resultMutation;
  })
);

export function moviesReducerState(state = initialState, action: Action) {
  return state;
}
