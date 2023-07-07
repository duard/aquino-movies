import { Component, Input, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetail, MoviesFacade, Rating, WorkedRating } from '@store/movies';
import { Observable, Subscription, of } from 'rxjs';
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
  subscription: Subscription = new Subscription();

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
    console.log(`Show Movie`, this.id);
    this.setRatings();
    setTimeout(() => {
      console.log('Ill print third after a second');
      this.moviesFacade.loadMovie(this.id!);
    }, 800);
  }

  setRatings() {
    this.selectedMovie$.subscribe((movie) => {
      console.log('Movie', movie);
      movie?.Ratings.forEach((rating: Rating) => {
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

        this.ratings.push(workedRating);
      });
      console.log('ratings', this.ratings);
    });
  }

  trackByMethod(index: number, el: any): number {
    return el.id;
  }
  ngOnDestroy() {
    // this.onDestroy.next();
    // this.onDestroy.complete();
  }
}
