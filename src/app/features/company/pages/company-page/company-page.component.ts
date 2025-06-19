import { Component, OnInit }   from '@angular/core';
import { CommonModule }        from '@angular/common';
import { Observable }          from 'rxjs';
import { CompanyService }      from '../../company.service';
import { FireExtinguisher }    from '../../../../models/fire-extinguisher.model';
import { Certification }       from '../../../../models/certification.model';
import { ExtinguisherTableComponent }  from '../../components/extinguisher-table/extinguisher-table.component';
import { CertificationTableComponent } from '../../components/certification-table/certification-table.component';
import { SkeletonComponent } from '../../../../shared/skeleton/skeleton/skeleton.component'
import { SkeletonLoaderComponent } from '../../../../shared/skeleton-loader//skeleton-loader/skeleton-loader.component'

@Component({
  selector: 'app-company-page',
  standalone: true,
  imports: [
    CommonModule,
    ExtinguisherTableComponent,
    CertificationTableComponent,
    SkeletonComponent,
    SkeletonLoaderComponent         // 👈
  ],
  template: `
     <h1 class="text-2xl font-semibold mb-4">Sécurité & certifications</h1>

    <div class="grid md:grid-cols-2 gap-6">

      <!-- Extincteurs -->
      <section>
        <h2 class="font-medium mb-2">Extincteurs</h2>

        <ng-container *ngIf="extinguishers$ | async as exts; else extSkeleton">
          <app-extinguisher-table [data]="exts"></app-extinguisher-table>
        </ng-container>
        <ng-template #extSkeleton>
          <app-skeleton></app-skeleton>
        </ng-template>
      </section>

      <!-- Certifications -->
      <section>
        <h2 class="font-medium mb-2">Certifications</h2>

        <ng-container *ngIf="certifications$ | async as certs; else certSkeleton">
          <app-certification-table [data]="certs"></app-certification-table>
        </ng-container>
        <ng-template #certSkeleton>
          <app-skeleton></app-skeleton>
        </ng-template>
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
