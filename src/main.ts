import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component';
import { routes as appRoutes } from './app/app.routes';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';

import { IconsModule } from './app/icons/icons.module';   // module qui « pick » Home et AlertTriangle

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),

    // rend LucideAngularModule (avec Home et AlertTriangle) disponible partout
    importProvidersFrom(IconsModule),

    // HttpClient + vos intercepteurs
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([authInterceptor]),
    ),
  ],
}).catch(err => console.error(err));

