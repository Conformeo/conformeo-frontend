import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule }  from '@angular/router';
import { routes }        from './reports.route';
import { SharedModule }  from '../../shared/shared.module';
import { ReportsPageComponent } from './pages/reports-page/reports-page.component'

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReportsPageComponent
  ]
})

export class ReportsModule { }
