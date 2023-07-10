import { Component, Input, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetail, MoviesFacade, Rating, WorkedRating } from '@store/movies';
import {
  Observable,
  Subject,
  Subscription,
  filter,
  map,
  of,
  takeUntil,
} from 'rxjs';
import { ShowMovieDirective } from '@shared/directives/show-movie.directive';
import { UnlessDirective } from '@shared/directives/unless.directive';
import { NgbRating, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { SplitStringPipe } from '@shared/pipes/split-string.pipe';

@Component({
  selector: 'app-movies-show',
  standalone: true,
  imports: [
    CommonModule,
    ShowMovieDirective,
    UnlessDirective,
    NgbRating,
    SplitStringPipe,
  ],
  templateUrl: './movies-show.component.html',
  styleUrls: ['./movies-show.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class MoviesShowComponent {
  @Input() id?: string;
  // subscription: Subscription = new Subscription();
  private destroy$ = new Subject<void>();

  condition = false;
  maxValue = 10;
  currentRate = 5;
  ratings: WorkedRating[] = [];
  private readonly moviesFacade: MoviesFacade = inject(MoviesFacade);

  selectedMovie$: Observable<MovieDetail | undefined> =
    this.moviesFacade.selectedMovie$;
  isLoading$: Observable<boolean> = this.moviesFacade.isLoading$;
  error$: Observable<string | undefined> = this.moviesFacade.error$;
  onDestroy: any;

  constructor(config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }
  ngOnInit() {
    this.setRatings();

    if (this.id) {
      this.moviesFacade.loadMovie(this.id!);
    }
  }

  // metodo precisa ser melhorado
  setRatings(): void {
    this.selectedMovie$
      .pipe(
        filter(
          (movie: MovieDetail | undefined): movie is MovieDetail =>
            movie !== undefined
        ),
        map((movie: MovieDetail) => {
          const ratings: WorkedRating[] = [];

          movie.Ratings.forEach((rating: Rating) => {
            const [value, maxValue] = rating.Value.includes('/')
              ? rating.Value.split('/')
              : [rating.Value, ''];

            let parsedValue: number = parseFloat(value.trim());
            let parsedMaxValue: number = parseFloat(maxValue.trim());

            if (isNaN(parsedValue)) {
              parsedValue = 0;
            }

            if (isNaN(parsedMaxValue) || parsedMaxValue < 10) {
              parsedMaxValue = 10;
            }

            if (parsedValue > 10) {
              parsedValue /= 10;
            }

            if (parsedMaxValue > 10) {
              parsedMaxValue /= 10;
            }

            const workedRating: WorkedRating = {
              source: rating.Source,
              value: parsedValue,
              maxValue: parsedMaxValue,
            };

            ratings.push(workedRating);
          });

          return ratings;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((result: WorkedRating[]) => {
        this.ratings = result;
      });
  }

  trackByMethod(index: number, el: any): number {
    return el.id;
  }
  ngOnDestroy() {
    console.log('destruido');
    this.destroy$.next();
    this.destroy$.complete();
  }
}
