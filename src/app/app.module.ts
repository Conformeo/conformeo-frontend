import { NgModule }          from '@angular/core';
import { BrowserModule }     from '@angular/platform-browser';
import { RouterModule }      from '@angular/router';
import { routes }            from './app.routes';
import { CoreModule }        from './core/core.module';
import { SharedModule }      from './shared/shared.module';


@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [/* AppComponent */]
})

export class AppModule {}
