import {
  AfterViewInit,
  Component,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetail, MoviesFacade, SearchMovies } from '@store/movies';
import { Observable, of } from 'rxjs';
import { NgOptimizedImage } from '@angular/common';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage, NgbPagination],
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MoviesListComponent implements AfterViewInit, OnInit {
  private readonly moviesFacade: MoviesFacade = inject(MoviesFacade);

  currentPage: number = -1;
  data: any = [];
  selectedId = 129;

  // movieItems$: Observable<SearchMovies[]> = this.moviesFacade.movieItems$;
  selectedMovie$: Observable<MovieDetail | undefined> =
    this.moviesFacade.selectedMovie$;

  movieItems$: Observable<SearchMovies[]> = this.moviesFacade.movieItems$;
  isLoading$: Observable<boolean> = this.moviesFacade.isLoading$;
  error$: Observable<string | undefined> = this.moviesFacade.error$;

  pageSize$: Observable<number> = this.moviesFacade.pageSize$;
  page$: Observable<number> = this.moviesFacade.page$;
  rows$: Observable<number> = this.moviesFacade.rows$;

  ngOnInit() {
    this.page$.subscribe((data) => {
      console.log('Pagina Atual', data);
      // this.
      this.currentPage = data;
    });
  }

  ngAfterViewInit() {
    if (!this.currentPage || this.currentPage === 0) {
      console.log('SEM PAGINA SETADA');
      this.moviesFacade.searchMovie(1);
    }
  }

  onPageChange(pageNum: number) {
    console.log('changing', pageNum);
    this.moviesFacade.searchMovie(pageNum);
  }
}
