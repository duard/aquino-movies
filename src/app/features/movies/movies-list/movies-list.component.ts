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
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

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

  constructor(
    private router: Router,
    private activatedRouote: ActivatedRoute // private location: Location
  ) {
    console.log('LIST CONSTRUCTOR', this.pageNum, this.searchValue);
  }

  ngOnInit() {
    console.log('LIST ngOnInit', this.pageNum, this.searchValue);
    if (this.searchValue && this.searchValue !== '') {
      this.moviesFacade.searchMovie(this.pageNum, this.searchValue);
      this.router.navigate(
        [
          '/movies',
          {
            pageNum: this.pageNum,
            searchValue: this.searchValue,
          },
        ],
        { relativeTo: this.activatedRouote }
      );
    }
  }

  ngAfterViewInit() {}

  onPageChange(pageNum: number | undefined) {
    if (pageNum) {
      this.router.navigate(['/movies'], {
        queryParams: { pageNum: this.pageNum, searchValue: this.searchValue },
      });

      if (this.searchValue && this.searchValue !== '') {
        this.moviesFacade.searchMovie(pageNum, this.searchValue);
      }
    }
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
