import { createActionGroup, props } from '@ngrx/store';
import { MovieDetail, SearchResult } from './movie';

export const MoviesActions = createActionGroup({
  source: 'Movies API',
  events: {
    'Search Movies Fetch': props<{
      pageNum: number;
      searchValue: string;
    }>(),
    'Search Movies Success': props<{ result: SearchResult }>(),
    'Search Movies Failure': props<{ error: string }>(),

    'Load Movie By Id Fetch': props<{
      imdbID: string;
    }>(),
    'Load Movie By Id Success': props<{ movie: MovieDetail }>(),
    'Load Movie By Id Failure': props<{ error: string }>(),
  },
});
