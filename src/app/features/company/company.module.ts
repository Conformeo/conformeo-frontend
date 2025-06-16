import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule }  from '@angular/router';
import { routes }        from './company.route';
import { SharedModule }  from '../../shared/shared.module';
import { CompanyPageComponent } from './pages/company-page/company-page.component'
import { CertificationTableComponent } from './components/certification-table/certification-table.component'
import { ExtinguisherTableComponent } from './components/extinguisher-table/extinguisher-table.component'

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    CompanyPageComponent,
    CertificationTableComponent,
    ExtinguisherTableComponent
  ]
})

export class CompanyModule { }
