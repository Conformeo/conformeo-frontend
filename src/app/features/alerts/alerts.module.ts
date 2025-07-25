import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule }  from '@angular/router';
import { routes }        from './alerts.route';
import { SharedModule }  from '../../shared/shared.module';
import { AlertsPageComponent } from './pages/alerts-page/alerts-page.component'

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    AlertsPageComponent
  ]
})
export class AlertsModule { }
// This module sets up the Alerts feature in the Angular application.