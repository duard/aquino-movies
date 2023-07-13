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
import { Observable, Subscription, of } from 'rxjs';
import { NgOptimizedImage } from '@angular/common';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import {
  ActivatedRoute,
  ActivationEnd,
  ChildActivationEnd,
  NavigationEnd,
  NavigationStart,
  RouteConfigLoadEnd,
  Router,
  RouterModule,
} from '@angular/router';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage, NgbPagination],
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MoviesListComponent implements OnInit {
  ready = false;
  routerEvent = '';
  routerEvents: string[] = [];

  @Input() pageNum: number = 1;
  @Input() searchValue: string = '';

  private moviesFacade: MoviesFacade = inject(MoviesFacade);
  private subscriptions: Subscription = new Subscription();

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
    console.log('--- constructor ---', this.pageNum, this.searchValue);
    this.router.events.subscribe((event: any) => {
      this.routerEvents.push(event.constructor.name);
      // console.log('event', event.constructor.name);
      this.routerEvent = event.constructor.name;
      if (event instanceof NavigationStart) {
        this.ready = false;
        console.log('START', this.ready);
      }
      if (
        event instanceof NavigationEnd ||
        event instanceof RouteConfigLoadEnd ||
        // event instanceof RouteConfigLoadEnd ||
        event instanceof ActivationEnd
      ) {
        this.ready = true;
        console.log('FINISH ', this.ready);
      }
    });
  }

  ngOnInit() {
    console.log('---Inside ngOnInit---');
  }

  ngAfterViewInit() {}

  onPageChange(pageNum: number | undefined) {
    if (
      pageNum &&
      this.ready &&
      this.routerEvent !== 'NavigationStart' &&
      this.routerEvent !== 'Scroll'
    ) {
      if (this.searchValue && this.searchValue !== '') {
        console.log('BUCANDO NO PAGINATOR', this.routerEvent, this.ready);
        this.router.navigate(['/movies'], {
          queryParams: { pageNum: this.pageNum, searchValue: this.searchValue },
        });

        this.moviesFacade.searchMovie(pageNum, this.searchValue);
      }
    }
  }

  ngOnDestroy() {
    console.log('---Inside ngOnDestroy---');
    this.subscriptions.unsubscribe();
  }
}
