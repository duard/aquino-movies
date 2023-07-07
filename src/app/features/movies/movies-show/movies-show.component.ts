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
    this.setRatings();

    if (this.id) {
      this.moviesFacade.loadMovie(this.id!);
    }
  }

  // metodo precisa ser melhorado
  setRatings() {
    this.subscription = this.selectedMovie$.subscribe((movie) => {
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
      console.log(this.ratings);
    });
  }

  trackByMethod(index: number, el: any): number {
    return el.id;
  }
  ngOnDestroy() {
    // implementar o destroy
    // problema de child routes como ilustrado aqui
    // https://medium.com/angular-in-depth/refresh-current-route-in-angular-512a19d58f6e
    // this.onDestroy.next();
    // this.onDestroy.complete();
    // console.log('destruido');
    // this.subscription.unsubscribe();
  }
}
