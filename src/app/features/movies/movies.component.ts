import { Component, Input, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { InputSearchComponent } from '../../shared/components/input-search/input-search.component';
import { MoviesFacade, SearchMovies } from '@store/movies';
import { Observable } from 'rxjs';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-movies',
  standalone: true,
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    InputSearchComponent,
    NgbPagination,
  ],
})
export class MoviesComponent {
  @Input() pageNum: number = 1;
  @Input() searchValue: string = '';

  private readonly moviesFacade: MoviesFacade = inject(MoviesFacade);
  page$ = this.moviesFacade.page$;
  searchValue$ = this.moviesFacade.searchValue$;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private activatedRouote: ActivatedRoute
  ) {}

  ngOnInit() {
    const pageNum = this.route.snapshot.queryParamMap.get('pageNum');
    const searchValue = this.route.snapshot.queryParamMap.get('searchValue');
    console.log('MOVIES PAGE ', this.pageNum, this.searchValue);

    // this.router.navigate(['/movies'], {
    //   queryParams: { pageNum: this.pageNum, searchValue: this.searchValue },
    // });
    // if (this.pageNum && this.searchValue) {
    //   this.moviesFacade.searchMovie(this.pageNum, this.searchValue);
    // }

    if (this.searchValue && this.searchValue !== '') {
      console.log('LISTING ON MOVIE...');

      this.moviesFacade.searchMovie(this.pageNum, this.searchValue);
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
/*

    if (this.pageNum && this.searchValue) {
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

    */
