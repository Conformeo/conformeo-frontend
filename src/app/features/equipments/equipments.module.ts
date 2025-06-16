import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule }  from '@angular/router';
import { routes }        from './equipments.route';
import { SharedModule }  from '../../shared/shared.module';
import { EquipmentsPageComponent } from './pages/equipments-page/equipments-page.component'

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    EquipmentsPageComponent
  ]
})

export class EquipmentsModule { }
