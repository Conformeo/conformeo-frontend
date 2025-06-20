import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom }   from '@angular/core';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  withInterceptors,
} from '@angular/common/http';
import { provideRouter }         from '@angular/router';

import { AppComponent }          from './app/app.component';
import { routes as appRoutes }   from './app/app.routes';
import { authInterceptor }       from './app/core/interceptors/auth.interceptor';

import { IconsModule }           from './app/icons/icons.module';  // 👈 reste inchangé

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),

    /* Icônes (via le Module.pick) */
    importProvidersFrom(IconsModule),

    /* HttpClient + intercepteurs */
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([authInterceptor]),
    ),
  ],
}).catch(err => console.error(err));
