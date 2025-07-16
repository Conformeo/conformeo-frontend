import { NgModule }          from '@angular/core';
import { BrowserModule }     from '@angular/platform-browser';
import { RouterModule }      from '@angular/router';
import { routes }            from './app.routes';
import { CoreModule }        from './core/core.module';
import { SharedModule }      from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './core/interceptors/token.interceptor';


@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [/* AppComponent */]
})

export class AppModule {}
