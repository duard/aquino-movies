import { Routes } from '@angular/router';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MoviesShowComponent } from './movies-show/movies-show.component';
import { MoviesComponent } from './movies.component';

export const MOVIES_ROUTES: Routes = [
  {
    path: '',
    component: MoviesComponent,
    children: [
      {
        path: '',
        component: MoviesListComponent,
      },
      {
        path: ':id',
        component: MoviesShowComponent,
      },
    ],
  },
];
