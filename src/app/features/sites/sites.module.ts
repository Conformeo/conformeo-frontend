import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule }  from '@angular/router';
import { routes }        from './sites.routes';
import { SharedModule }  from '../../shared/shared.module';
import { SitesPageComponent } from './pages/sites-page/sites-page.component'

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    SitesPageComponent
  ]
})

export class SitesModule { }
