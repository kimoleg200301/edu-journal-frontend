import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import {routerReducer} from '@ngrx/router-store';
import {provideHttpClient} from '@angular/common/http';
import {SLIDEBAR_KEY, slideBarReducer} from './data-access/state/slide-bar/slide-bar.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({
      router: routerReducer,
      [SLIDEBAR_KEY]: slideBarReducer
    }),
    provideZoneChangeDetection(
      { eventCoalescing: true }
    ),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient()
  ]
};
