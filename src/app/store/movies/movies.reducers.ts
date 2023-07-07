import { Action, State, createReducer, on, props } from '@ngrx/store';
import { MoviesActions } from './movies.actions';
import { SearchMovies } from './movie';
import { MoviesState, initialState } from './movies.state';

export const moviesReducer = createReducer(
  initialState,

  on(MoviesActions.searchMoviesFetch, (state, action) => ({
    ...state,
    page: action.pageNum,
    error: '',
    isLoading: true,
  })),
  // on(MoviesActions.searchMoviesFetch, (state) => {
  //   const resultMutation = {
  //     ...state,
  //     page: props.pageNum,
  //     error: '',
  //     isLoading: true,
  //   };

  //   return resultMutation;
  // }),

  on(MoviesActions.searchMoviesSuccess, (state: any, { result }) => {
    const resultMutation = {
      ...state,
      movieItems: result.Search,
      error: '',
      isLoading: false,
      pageSize: state.pageSize,
      page: state.page,
      rows: result.totalResults,
    };

    console.log('reducer page', resultMutation.page);

    return resultMutation;
  })
);

export function moviesReducerState(state = initialState, action: Action) {
  return state;
}
