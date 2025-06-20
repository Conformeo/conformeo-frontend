// src/app/features/company/pages/company-page/company-page.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { Observable }        from 'rxjs';

import { CompanyService } from '../../company.service';
import { FireExtinguisher } from '../../../../models/fire-extinguisher.model';
import { Certification }    from '../../../../models/certification.model';

/* Composants */
import { ExtinguisherTableComponent } from '../../components/extinguisher-table/extinguisher-table.component';
import { CertificationTableComponent } from '../../components/certification-table/certification-table.component';
import { ExtinguisherFormComponent }   from '../../components/extinguisher-form/extinguisher-form.component';
import { CertificationFormComponent }  from '../../components/certification-form/certification-form.component';
import { ModalComponent }              from '../../../../shared/modal/modal.component';
import { SkeletonComponent }           from '../../../../shared/skeleton/skeleton/skeleton.component';

@Component({
  selector   : 'app-company-page',
  standalone : true,
  imports    : [
    CommonModule,
    SkeletonComponent,
    ExtinguisherTableComponent,
    CertificationTableComponent,
    ExtinguisherFormComponent,
    CertificationFormComponent,
    ModalComponent,
  ],
  templateUrl: './company-page.component.html',
})
export class CompanyPageComponent implements OnInit {

  exts$!:  Observable<FireExtinguisher[]>;
  certs$!: Observable<Certification[]>;

  /** États modaux */
  editingExt : FireExtinguisher|null = null;
  editingCert: Certification|null    = null;

  constructor(private service: CompanyService) {}

  ngOnInit() { this.reload(); }

  /* ------------------------------------------------------------------ */
  reload() {
    this.exts$  = this.service.getExtinguishers();
    this.certs$ = this.service.getCertifications();
  }

  openExtForm(ext?: FireExtinguisher)  { this.editingExt  = ext ?? {} as FireExtinguisher; }
  openCertForm(cert?: Certification)   { this.editingCert = cert ?? {} as Certification;  }
}
