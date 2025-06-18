import { Component, OnInit }   from '@angular/core';
import { CommonModule }        from '@angular/common';
import { Observable }          from 'rxjs';
import { CompanyService }      from '../../company.service';
import { FireExtinguisher }    from '../../../../models/fire-extinguisher.model';
import { Certification }       from '../../../../models/certification.model';
import { ExtinguisherTableComponent }  from '../../components/extinguisher-table/extinguisher-table.component';
import { CertificationTableComponent } from '../../components/certification-table/certification-table.component';

@Component({
  selector: 'app-company-page',
  standalone: true,
  imports: [
    CommonModule,
    ExtinguisherTableComponent,
    CertificationTableComponent
  ],
  template: `
    <h1 class="text-2xl font-semibold mb-4">Sécurité & certifications</h1>

    <div class="grid md:grid-cols-2 gap-6">
      <section>
        <h2 class="font-medium mb-2">Extincteurs</h2>
        <app-extinguisher-table [data]="extinguishers$ | async"></app-extinguisher-table>
      </section>

      <section>
        <h2 class="font-medium mb-2">Certifications</h2>
        <app-certification-table [data]="certifications$ | async"></app-certification-table>
      </section>
    </div>
  `
})
export class CompanyPageComponent implements OnInit {
  extinguishers$!: Observable<FireExtinguisher[]>;
  certifications$!: Observable<Certification[]>;

  constructor(private companyService: CompanyService) {}

  ngOnInit() {
    this.extinguishers$  = this.companyService.getExtinguishers();
    this.certifications$ = this.companyService.getCertifications();
  }
}
