import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, catchError, mergeMap, tap } from 'rxjs/operators';
import { MoviesActions } from './movies.actions';
import { MovieService } from './movies.service';

import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MovieEffects {
  constructor(private actions$: Actions, private movieService: MovieService) {}

  searchMovies$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MoviesActions.searchMoviesFetch),
        mergeMap(({ pageNum, searchValue }) =>
          this.movieService.getSearchMovies(pageNum, searchValue).pipe(
            tap((data) => {
              // console.log('searchMovies', pageNum);
            }),
            map((result) =>
              MoviesActions.searchMoviesSuccess({
                result,
              })
            ),
            catchError((error) => [MoviesActions.searchMoviesFailure(error)])
          )
        )
      ),
    { dispatch: true }
  );

  oneMovie$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MoviesActions.loadMovieByIdFetch),
        mergeMap(({ imdbID }) =>
          this.movieService.getMovieById(imdbID).pipe(
            // tap((data) => {
            //   MoviesActions.loadMovieByIdTransform({ movie: data });
            // }),
            map((result) =>
              MoviesActions.loadMovieByIdTransform({
                movie: result,
              })
            ),

            catchError((error) => [MoviesActions.loadMovieByIdFailure(error)])
          )
        )
      ),
    { dispatch: true }
  );

  movieTransformation$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MoviesActions.loadMovieByIdTransform),
        tap((action) =>
          console.log('Following Action was dispatched:', action)
        ),
        catchError((error) => [MoviesActions.loadMovieByIdFailure(error)])
      ),
    { dispatch: true }
  );
  // This one logs all dispatched actions
  // Debug$: Observable<any> = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       tap((action) => console.log('Following Action was dispatched:', action))
  //     ),
  //   { dispatch: false }
  // );
}
