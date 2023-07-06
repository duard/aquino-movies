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
import { counterState } from '@store/global/app.state';
import { provideEffects } from '@ngrx/effects';
import { moviesReducer, MovieEffects } from '@store/movies';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
    provideState(counterState),
    // provideState('movie-search', moviesReducer),
    // provideEffects(MovieEffects),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 25, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
  ],
};
