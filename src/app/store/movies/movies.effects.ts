import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap, tap } from 'rxjs/operators';
import { MoviesActions } from './movies.actions';
import { MovieService } from './movies.service';
import { of } from 'rxjs';
import { transformRatings } from './utils/transformations';

@Injectable({ providedIn: 'root' })
export class MovieEffects {
  constructor(private actions$: Actions, private movieService: MovieService) {}

  searchMovies$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MoviesActions.searchMoviesFetch),
        mergeMap(({ pageNum, searchValue }) =>
          this.movieService.getSearchMovies(pageNum, searchValue).pipe(
            map((result) =>
              MoviesActions.searchMoviesSuccess({
                result,
              })
            ),
            catchError((error) => of(MoviesActions.searchMoviesFailure(error)))
          )
        )
      ),
    { dispatch: true }
  );

  oneMovieWithTransformation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.loadMovieByIdFetch),
      mergeMap(({ imdbID }) =>
        this.movieService.getMovieById(imdbID).pipe(
          map((result) => ({
            movie: result,
            ratings: transformRatings(result.Ratings),
          })),
          mergeMap(({ movie, ratings }) => [
            MoviesActions.loadMovieByIdTransform({ movie }),
            MoviesActions.loadMovieByIdSuccess({ movie, ratings }),
          ]),
          catchError((error) =>
            of(MoviesActions.loadMovieByIdFailure({ error }))
          )
        )
      )
    )
  );
}
