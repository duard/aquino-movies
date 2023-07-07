import { createActionGroup, props } from '@ngrx/store';
import { MovieDetail, SearchResult } from './movie';

export const MoviesActions = createActionGroup({
  source: 'Movies API',
  events: {
    'Search Movies Fetch': props<{
      pageNum: number;
    }>(),
    'Search Movies Success': props<{ result: SearchResult }>(),
    'Search Movies Failure': props<{ error: string }>(),
    'Load One Movie Success': props<{ movie: Required<MovieDetail> }>(),
  },
});
