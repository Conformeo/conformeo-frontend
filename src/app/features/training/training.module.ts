import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule }  from '@angular/router';
import { routes }        from './training.route';
import { SharedModule }  from '../../shared/shared.module';
import { TrainingPageComponent } from './pages/training-page/training-page.component'

@NgModule({
  declarations: [
    TrainingPageComponent,

    // …
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})

export class TrainingModule { }
