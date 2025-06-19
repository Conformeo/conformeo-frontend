import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { Observable }        from 'rxjs';

import { CompanyService }    from '../../company.service';
import { FireExtinguisher }  from '../../../../models/fire-extinguisher.model';
import { Certification }     from '../../../../models/certification.model';

import { ExtinguisherTableComponent }  from '../../components/extinguisher-table/extinguisher-table.component';
import { CertificationTableComponent } from '../../components/certification-table/certification-table.component';
import { SkeletonLoaderComponent }     from '../../../../shared/skeleton-loader/skeleton-loader/skeleton-loader.component';
import { SearchInputComponent }        from '../../../../shared/search-input/search-input/search-input.component';

@Component({
  selector: 'app-company-page',
  standalone: true,
  imports: [
    CommonModule,
    ExtinguisherTableComponent,
    CertificationTableComponent,
    SkeletonLoaderComponent,
    SearchInputComponent
  ],
  templateUrl: './company-page.component.html'
})
export class CompanyPageComponent implements OnInit {

  extinguishers$!: Observable<FireExtinguisher[]>;
  certifications$!: Observable<Certification[]>;

  /** filtres textuels */
  extFilter  = '';
  certFilter = '';

  constructor(private companyService: CompanyService) {}

  ngOnInit() {
    this.extinguishers$  = this.companyService.getExtinguishers();
    this.certifications$ = this.companyService.getCertifications();
  }

  /** Filtre générique (location ou name) */
  applyFilter<T extends { location?: string; name?: string }>(data: T[], term: string): T[] {
    if (!term) return data;
    const lc = term.toLowerCase();
    return data.filter(d => (d.location ?? d.name ?? '').toLowerCase().includes(lc));
  }
}
