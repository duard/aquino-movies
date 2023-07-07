import { Component, Input, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesFacade } from '@store/movies';

@Component({
  selector: 'app-movies-show',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movies-show.component.html',
  styleUrls: ['./movies-show.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class MoviesShowComponent {
  private readonly moviesFacade: MoviesFacade = inject(MoviesFacade);

  @Input() movieId?: string; // we can use the same name as the query param
  @Input() id?: string; // we can use the same name as the query param

  ngOnInit() {
    console.log(`Show Movie`, this.movieId, this.id);
    this.moviesFacade.loadMovie(this.id!);
  }
}
