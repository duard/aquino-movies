import { Component, Input, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { MoviesFacade } from '@store/movies';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class NavbarComponent {
  @Input() pageNum: number = 1;
  @Input() searchValue: string = '';
  private readonly moviesFacade: MoviesFacade = inject(MoviesFacade);
  page$ = this.moviesFacade.page$;
  searchValue$ = this.moviesFacade.searchValue$;
  private sub: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.sub = this.route.queryParamMap.subscribe((queryParams) => {
      this.pageNum = Number(queryParams.get('pageNum'));
      this.searchValue = queryParams.get('searchValue')!;
    });
    console.log('NavbarComponent', this.pageNum, this.searchValue);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
