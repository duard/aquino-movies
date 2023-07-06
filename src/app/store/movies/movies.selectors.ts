import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getSelectors } from '@ngrx/router-store';

import { createEntityAdapter } from '@ngrx/entity';
import { SearchMovies } from './movie';
import { SearchMoviesState } from './movies.state';

export const moviesFeature = createFeatureSelector<SearchMoviesState>('movies');

export const moviesAdapter = createEntityAdapter<SearchMovies>();
export const selectors = moviesAdapter.getSelectors();

export const selectMoviesSearchItens = createSelector(
  moviesFeature,
  selectors.selectAll
);
export const selectMoviesSearchItensEntities = createSelector(
  moviesFeature,
  selectors.selectEntities
);
const { selectRouteParams } = getSelectors();

export const selectMovieById = createSelector(
  selectMoviesSearchItensEntities,
  selectRouteParams,
  (entities, { id }) => entities[id]
);
