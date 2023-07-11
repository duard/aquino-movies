import { Injectable } from '@angular/core';
import { select, Store, StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MovieDetail, SearchMovies } from './movie';
import { MoviesActions } from './movies.actions';
import { MoviesState } from './movies.state';
import * as fromMoviesSearch from './movies.selectors';

@Injectable({
  providedIn: 'root',
})
export class MoviesFacade {
  public selectedMovie$ = this.store.select(
    fromMoviesSearch.selectSelectedMovie
  );
  public movieItems$ = this.store.select(fromMoviesSearch.selectMovieItems);
  public isLoading$ = this.store.select(fromMoviesSearch.selectIsLoading);
  public error$ = this.store.select(fromMoviesSearch.selectError);
  public pageSize$ = this.store.select(fromMoviesSearch.selectPageSize);
  public page$ = this.store.select(fromMoviesSearch.selectPage);
  public rows$ = this.store.select(fromMoviesSearch.selectRows);
  public searchValue$ = this.store.select(fromMoviesSearch.selectSearchValue);

  constructor(private store: Store<MoviesState>) {}

  searchMovie(page: number, searchValue: string): void {
    this.store.dispatch(
      MoviesActions.searchMoviesFetch({
        pageNum: page,
        searchValue: searchValue,
      })
    );
  }

  loadMovie(imdbID: string): void {
    this.store.dispatch(MoviesActions.loadMovieByIdFetch({ imdbID: imdbID }));
  }
}
