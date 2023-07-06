import { createFeatureSelector, createSelector } from '@ngrx/store';

import { MoviesState } from './movies.reducers';

export const getAllMoviesState = createFeatureSelector<MoviesState>('movies');

export const getSearchedMoviesState =
  createFeatureSelector<MoviesState>('movies-search');

export const getSearchedMovies = createSelector(
  getSearchedMoviesState,
  (state: MoviesState) => state.movieItems
);
