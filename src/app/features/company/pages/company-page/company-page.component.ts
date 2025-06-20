import { Component, OnInit }          from '@angular/core';
import { CommonModule }               from '@angular/common';
import { Observable }                 from 'rxjs';

import { CompanyService }             from '../../company.service';
import { FireExtinguisher }           from '../../../../models/fire-extinguisher.model';
import { Certification }              from '../../../../models/certification.model';

import { ExtinguisherTableComponent } from '../../components/extinguisher-table/extinguisher-table.component';
import { CertificationTableComponent }from '../../components/certification-table/certification-table.component';
import { ExtinguisherFormComponent }  from '../../components/extinguisher-form/extinguisher-form.component';
import { CertificationFormComponent } from '../../components/certification-form/certification-form.component';

import { SkeletonComponent }          from '../../../../shared/skeleton/skeleton/skeleton.component';

@Component({
  standalone : true,
  selector   : 'app-company-page',
  imports    : [
    CommonModule,
    SkeletonComponent,

    ExtinguisherTableComponent,
    CertificationTableComponent,

    /* 👆 tables + 👇 formulaires */
    ExtinguisherFormComponent,
    CertificationFormComponent,
  ],
  templateUrl: './company-page.component.html',
})
export class CompanyPageComponent implements OnInit {

  /* --------------------- données --------------------- */
  exts$!:  Observable<FireExtinguisher[]>;
  certs$!: Observable<Certification[]>;

  /* -------------------- édition ---------------------- */
  editingExt:  FireExtinguisher | null = null;
  editingCert: Certification    | null = null;

  constructor(private service: CompanyService) {}

  /* --------------------- life-cycle ------------------ */
  ngOnInit(): void { this.reload(); }

  reload(): void {
    this.exts$  = this.service.getExtinguishers();
    this.certs$ = this.service.getCertifications();
  }

  /* -------------------- UI helpers ------------------- */
  onAddExt():  void { this.editingExt  = {} as any; }   // créa
  onAddCert(): void { this.editingCert = {} as any; }
}
