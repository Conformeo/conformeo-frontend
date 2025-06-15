import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule }  from '@angular/router';
import { routes }        from './inspections.route';
import { SharedModule }  from '../../shared/shared.module';
import { InspectionsPageComponent } from './pages/inspections-page/inspections-page.component'

@NgModule({
  declarations: [
    InspectionsPageComponent,

    // …
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})

export class InspectionsModule { }
