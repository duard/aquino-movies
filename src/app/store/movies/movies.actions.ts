import { createActionGroup, props } from '@ngrx/store';
import { SearchResult } from './movie';

export const MoviesActions = createActionGroup({
  source: 'Movies API',
  events: {
    'Search Movies Fetch': props<{
      movieId?: number;
      searchParam?: string;
    }>(),
    'Search Movies Success': props<{ result: SearchResult }>(),
    'Search Movies Failure': props<{ error: string }>(),
  },
});
