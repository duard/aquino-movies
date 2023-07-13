import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MoviesState } from './movies.state';

export const featureKey = 'movies-search';
export const selectFeature = createFeatureSelector<MoviesState>(featureKey);

export const selectSelectedMovie = createSelector(
  selectFeature,
  (state: MoviesState) => state.selectedMovie
);

export const selectSelectedMovieRatings = createSelector(
  selectFeature,
  (state: MoviesState) => state.selectedMovieRatings
);

export const selectMovieItems = createSelector(
  selectFeature,
  (state: MoviesState) => state.movieItems
);

export const selectIsLoading = createSelector(
  selectFeature,
  (state: MoviesState) => state.isLoading
);

export const selectSearchValue = createSelector(
  selectFeature,
  (state: MoviesState) => state.searchValue
);

export const selectError = createSelector(
  selectFeature,
  (state: MoviesState) => state.error
);

export const selectPageSize = createSelector(
  selectFeature,
  (state: MoviesState) => state.pageSize
);

export const selectPage = createSelector(
  selectFeature,
  (state: MoviesState) => state.page
);

export const selectRows = createSelector(
  selectFeature,
  (state: MoviesState) => state.rows
);
