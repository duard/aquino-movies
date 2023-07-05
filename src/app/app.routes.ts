import { Routes } from '@angular/router';

import { Route } from '@angular/router';

import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LayoutOneComponent } from './layout/layout-one/layout-one.component';
import { LayoutTwoComponent } from './layout/layout-two/layout-two.component';
import { ContainerLayoutComponent } from './layout/container-layout/container-layout.component';

// lazy-load standalone component
export const APP_ROUTES: Route[] = [
  {
    path: 'movies',
    component: LayoutOneComponent,
    loadChildren: () =>
      import('./features/movies/movies.routes').then((m) => m.MOVIES_ROUTES),
  },
  {
    path: '',
    component: ContainerLayoutComponent,

    loadChildren: () =>
      import('./pages/pages.routes').then((m) => m.PagesRoutes),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  //Wild Card Route for 404 request
  { path: '**', pathMatch: 'full', component: NotFoundComponent },
];
