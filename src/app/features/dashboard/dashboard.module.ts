import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule }  from '@angular/router';
import { routes }        from './dashboard.route';
import { SharedModule }  from '../../shared/shared.module';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component'

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    DashboardPageComponent
  ]
})
export class DashboardModule { }
