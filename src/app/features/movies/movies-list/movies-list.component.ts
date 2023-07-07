import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetail, MoviesFacade, SearchMovies } from '@store/movies';
import { Observable, of } from 'rxjs';
import { NgOptimizedImage } from '@angular/common';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage, NgbPagination],
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MoviesListComponent implements AfterViewInit, OnInit {
  @Input() pageNum: number = 1;
  @Input() searchValue: string = '';

  private readonly moviesFacade: MoviesFacade = inject(MoviesFacade);

  selectedMovie$: Observable<MovieDetail | undefined> =
    this.moviesFacade.selectedMovie$;

  movieItems$: Observable<SearchMovies[]> = this.moviesFacade.movieItems$;
  isLoading$: Observable<boolean> = this.moviesFacade.isLoading$;
  error$: Observable<string | undefined> = this.moviesFacade.error$;

  pageSize$: Observable<number> = this.moviesFacade.pageSize$;
  page$: Observable<number> = this.moviesFacade.page$;
  rows$: Observable<number> = this.moviesFacade.rows$;

  constructor(private router: Router) {}

  ngOnInit() {
    // this.page$.subscribe((data) => {
    //   console.log('Pagina Atual', data);
    //   // this.
    //   this.currentPage = data;
    // });
  }

  ngAfterViewInit() {
    // if (!this.currentPage || this.currentPage === 0) {
    //   console.log('SEM PAGINA SETADA');
    //   this.moviesFacade.searchMovie(1);
    // }
  }

  onPageChange(pageNum: number | undefined) {
    if (pageNum) {
      this.router.navigate(['/movies'], {
        queryParams: { pageNum: this.pageNum, searchValue: this.searchValue },
      });
      console.log('PAGENUM COMPONENTE', pageNum);
      if (this.searchValue && this.searchValue !== '') {
        this.moviesFacade.searchMovie(pageNum, this.searchValue);
      }
    }
  }
}
/*

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
import { Router, RouterModule } from '@angular/router';

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
  constructor(private router: Router) {}

  ngOnInit() {
    console.log('START', this.currentPage);
    // this.movieItems$.subscribe((data) => {
    //   data?.map((item: any) => {
    //     console.log('service ', this.currentPage, item['Title']);
    //   });
    // });
    // this.onPageChange(this.currentPage);
    // this.setupData();
    // this.doStuff();
    // if (!this.currentPage || this.currentPage === 0 || this.currentPage < 0) {
    //   console.log(
    //     'NADA',
    //     !this.currentPage,
    //     this.currentPage === 0,
    //     this.currentPage < 0
    //   );
    //   // this.moviesFacade.searchMovie(1);
    // }
    // this.movieItems$.subscribe((data) => {
    //   console.log(data);
    // });
  }

  ngAfterViewInit() {
    // if (!this.currentPage || this.currentPage === 0) {
    //   console.log('SEM PAGINA SETADA');
    //   this.moviesFacade.searchMovie(1);
    // }
  }

  setupData() {
    console.log('SEM PAGINA SETADA');
  }

  doStuff() {
    console.log('SEM PAGINA SETADA');
  }

  onPageChange(pageNum: number) {
    // if (!this.currentPage || this.currentPage === 0 || this.currentPage < 0) {
    //   pageNum = 1;
    // }
    // this.currentPage = pageNum;
    // this.router.navigate(['/pandas', id]);
    this.router.navigate(['/movies'], {
      queryParams: { pageNum: pageNum },
    });

    console.log('onPageChange', pageNum);
    this.moviesFacade.searchMovie(pageNum);
  }
}

*/
