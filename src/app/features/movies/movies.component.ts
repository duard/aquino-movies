import { Component, Input, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { InputSearchComponent } from '../../shared/components/input-search/input-search.component';
import { MoviesFacade, SearchMovies } from '@store/movies';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movies',
  standalone: true,
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, RouterOutlet, RouterModule, InputSearchComponent],
})
export class MoviesComponent {
  @Input() pageNum?: string; // we can use the same name as the query param
  // we can use the same name as the query param

  private readonly moviesFacade: MoviesFacade = inject(MoviesFacade);

  constructor() {
    console.log('MoviesComponent QUERY pageNum', this.pageNum);
    this.moviesFacade.searchMovie(Number(this.pageNum));
  }

  ngOnInit() {}
}
