import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SearchMovies } from './movie';
import { MoviesActions } from './movies.actions';
import { MoviesState } from './movies.state';
import * as fromMoviesSearch from './movies.selectors';

@Injectable({
  providedIn: 'root',
})
export class MoviesFacade {
  public searchedMovies$: Observable<SearchMovies[]> = this.store.pipe(
    select(fromMoviesSearch.selectMoviesSearchItens)
  );

  constructor(private store: Store<MoviesState>) {}

  getAll(): void {
    this.store.dispatch(MoviesActions.searchMoviesFetch({}));
  }
}
