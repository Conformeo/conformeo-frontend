import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom }   from '@angular/core';
import { provideRouter }         from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, withInterceptors } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { routes as appRoutes } from './app/app.routes';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';
import { loadingInterceptor } from './app/core/interceptors/loading.interceptor';

import { IconsModule } from './app/icons/icons.module';   // ✅

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),

    // met les icônes à disposition globalement
    importProvidersFrom(IconsModule),

    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([authInterceptor, loadingInterceptor]),
    ),
  ],
}).catch(err => console.error(err));

