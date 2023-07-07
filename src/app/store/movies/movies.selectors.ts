import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MoviesState } from './movies.state';

export const featureKey = 'movies-search';
export const selectFeature = createFeatureSelector<MoviesState>(featureKey);

export const movieFeature = createFeatureSelector<MoviesState>('movies-search');

export const selectSelectedMovie = createSelector(
  selectFeature,
  (state: MoviesState) => state.selectedMovie
);
export const selectMovieItems = createSelector(
  movieFeature,
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
