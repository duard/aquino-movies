import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, catchError, mergeMap, tap } from 'rxjs/operators';
import { MoviesActions } from './movies.actions';
import { MovieService } from './movies.service';

import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MovieEffects {
  constructor(private actions$: Actions, private movieService: MovieService) {}

  loadMovie$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MoviesActions.searchMoviesFetch),
        mergeMap(() =>
          this.movieService.getAll().pipe(
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

  // This one logs all dispatched actions
  // Debug$: Observable<any> = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       tap((action) => console.log('Following Action was dispatched:', action))
  //     ),
  //   { dispatch: false }
  // );
}
