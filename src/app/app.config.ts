import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
  withPreloading,
  withRouterConfig,
} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { APP_ROUTES } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import {
  provideHttpClient,
  withXsrfConfiguration,
  withJsonpSupport,
} from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { moviesReducer, MovieEffects } from '@store/movies';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { provideRouterStore } from '@ngrx/router-store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES),
    provideStore(),
    provideHttpClient(
      withXsrfConfiguration({}),
      withJsonpSupport()
      // withInterceptors([AuthHeaderInterceptorFn, serverErrorInterceptorFn]),
    ),
    provideRouter(
      APP_ROUTES,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
      withRouterConfig({ onSameUrlNavigation: 'reload' }),
      withComponentInputBinding(),
      withPreloading(PreloadAllModules),
      withEnabledBlockingInitialNavigation()
    ),
    importProvidersFrom(
      BrowserAnimationsModule,
      FontAwesomeModule
      // EffectsModule.forRoot([MovieEffects])
    ),
    // importProvidersFrom(HotToastModule.forRoot()),
    // importProvidersFrom(AngularSvgIconModule.forRoot()),
    // provideState('someFeatureName', moviesReducer),
    // StoreModule.forRoot({ router: routerReducer, auth: AuthReducer }),
    // provideState('movie-search', moviesReducer),
    // provideEffects(MovieEffects),
    provideStore({}),
    // provideState('movie-search', moviesReducer),
    // provideEffects(MovieEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 25, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    provideRouterStore(),
  ],
};
