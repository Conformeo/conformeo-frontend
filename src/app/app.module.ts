<<<<<<< HEAD
// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

=======
import { NgModule }          from '@angular/core';
import { BrowserModule }     from '@angular/platform-browser';
import { RouterModule }      from '@angular/router';
import { routes }            from './app.routes';
import { CoreModule }        from './core/core.module';
import { SharedModule }      from './shared/shared.module';
>>>>>>> 990e924 (chore: scaffold features, components, services, Cypress fixtures & commands, and design system skeleton)

@NgModule({
  imports: [
    BrowserModule,
<<<<<<< HEAD
    HttpClientModule,
    ReactiveFormsModule,
    AppComponent,
    LoginComponent,
    DashboardComponent,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
=======
    CoreModule,
    SharedModule,
    RouterModule.forRoot(routes)
>>>>>>> 990e924 (chore: scaffold features, components, services, Cypress fixtures & commands, and design system skeleton)
  ],
  bootstrap: [/* AppComponent */]
})
<<<<<<< HEAD
export class AppModule { }

=======
export class AppModule {}
>>>>>>> 990e924 (chore: scaffold features, components, services, Cypress fixtures & commands, and design system skeleton)
