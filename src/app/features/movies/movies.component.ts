import { Component, Input, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
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
  @Input() pageNum: number = 1;
  @Input() searchValue: string = '';
  private readonly moviesFacade: MoviesFacade = inject(MoviesFacade);

  constructor(private router: Router) {}

  ngOnInit() {
    console.log('MOVIES COMPONENTE', this.searchValue);

    this.router.navigate(['/movies'], {
      queryParams: { pageNum: this.pageNum, searchValue: this.searchValue },
    });

    if (this.pageNum && this.searchValue) {
      this.moviesFacade.searchMovie(this.pageNum, this.searchValue);
    }
  }
  ngOnDestroy() {
    // implementar o destroy
    // problema de child routes como ilustrado aqui
    // https://medium.com/angular-in-depth/refresh-current-route-in-angular-512a19d58f6e
    // this.onDestroy.next();
    // this.onDestroy.complete();
    console.log('destruido');

    // this.subscription.unsubscribe();
  }
}
