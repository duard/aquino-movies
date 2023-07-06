import { Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesFacade, SearchMovies } from '@store/movies';
import { Observable } from 'rxjs';
import { NgOptimizedImage } from '@angular/common';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, NgbPagination],
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MoviesListComponent {
  private readonly moviesFacade: MoviesFacade = inject(MoviesFacade);

  currentPage = 1;
  data: any = [];

  searchedMovies$: Observable<SearchMovies[]> =
    this.moviesFacade.searchedMovies$;

  ngOnInit() {
    this.dataCollection();
  }

  dataCollection() {
    for (let i = 0; i < 1000; i++) {
      let item: any = 'Item' + i;
      this.data.push(item);
    }
    //console.log(this.data);
  }
}
