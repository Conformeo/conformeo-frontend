import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule }  from '@angular/router';
import { routes }        from './partners.route';
import { SharedModule }  from '../../shared/shared.module';
import { PartnersPageComponent } from './pages/partners-page/partners-page.component'

@NgModule({
  declarations: [
    PartnersPageComponent,
    // …
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})

export class PartnersModule { }
