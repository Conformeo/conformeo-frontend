import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule }  from '@angular/router';
import { routes }        from './esg.route';
import { SharedModule }  from '../../shared/shared.module';
import { EsgPageComponent } from './pages/esg-page/esg-page.component'

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    EsgPageComponent
  ]
})

export class EsgModule { }
