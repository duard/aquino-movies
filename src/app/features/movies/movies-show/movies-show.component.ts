import { Component, Input, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetail, MoviesFacade } from '@store/movies';
import { Observable } from 'rxjs';
import { ShowMovieDirective } from '@shared/directives/show-movie.directive';
import { UnlessDirective } from '@shared/directives/unless.directive';

@Component({
  selector: 'app-movies-show',
  standalone: true,
  imports: [CommonModule, ShowMovieDirective, UnlessDirective],
  templateUrl: './movies-show.component.html',
  styleUrls: ['./movies-show.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class MoviesShowComponent {
  @Input() id?: string;
  condition = false;

  private readonly moviesFacade: MoviesFacade = inject(MoviesFacade);

  selectedMovie$: Observable<MovieDetail | undefined> =
    this.moviesFacade.selectedMovie$;
  isLoading$: Observable<boolean> = this.moviesFacade.isLoading$;
  error$: Observable<string | undefined> = this.moviesFacade.error$;

  ngOnInit() {
    console.log(`Show Movie`, this.id);

    setTimeout(() => {
      console.log('Ill print third after a second');
      this.moviesFacade.loadMovie(this.id!);
    }, 1234);
  }
}
