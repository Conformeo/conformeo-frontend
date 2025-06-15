import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule }  from '@angular/router';
import { routes }        from './support.route';
import { SharedModule }  from '../../shared/shared.module';
import { SupportPageComponent } from './pages/support-page/support-page.component'

@NgModule({
  declarations: [
    SupportPageComponent,

    // …
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})

export class SupportModule { }
