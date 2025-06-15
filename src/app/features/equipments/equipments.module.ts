import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule }  from '@angular/router';
import { routes }        from './equipments.route';
import { SharedModule }  from '../../shared/shared.module';

@NgModule({
  declarations: [
    
    // …
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})

export class EquipmentsModule { }
