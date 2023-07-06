import { Injectable } from '@angular/core';

import { MoviesActions } from './movies.actions';
import { MoviesState } from './movies.reducers';
import { Store, select } from '@ngrx/store';
import { SearchMovies, SearchResult } from './movie';
import { Observable } from 'rxjs';
import { getSearchedMovies } from './movies.selectors';

@Injectable({
  providedIn: 'root',
})
export class MoviesFacade {
  public searchedMovies$: Observable<SearchMovies[]> = this.store.pipe(
    select(getSearchedMovies)
  );

  constructor(private store: Store<MoviesState>) {}

  getAll(): void {
    this.store.dispatch(MoviesActions.searchMoviesFetch({}));
  }
}
