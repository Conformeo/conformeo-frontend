import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule }  from '@angular/router';
import { routes }        from './workers.route';
import { SharedModule }  from '../../shared/shared.module';
import { WorkersPageComponent } from './pages/workers-page/workers-page.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    WorkersPageComponent
  ]
})

export class WorkersModule { }
