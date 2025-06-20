// src/app/features/sites/pages/sites-page/sites-page.component.ts
import { Component, OnInit }      from '@angular/core';
import { CommonModule }           from '@angular/common';
import { Observable }             from 'rxjs';
import { SitesService }           from '../../sites.service';
import { Site }                   from '../../../../models/site.model';
import { SiteFilterComponent }    from '../../components/site-filter/site-filter.component';
import { SiteTableComponent }     from '../../components/site-table/site-table.component';
import { SkeletonComponent }      from '../../../../shared/skeleton/skeleton/skeleton.component'

@Component({
  selector: 'app-sites-page',
  standalone: true,
  imports: [
    CommonModule,
    SkeletonComponent,
    SiteFilterComponent,
    SiteTableComponent,
  ],
  template: `
    <h1 class="text-2xl font-semibold mb-4">Chantiers</h1>

    <app-site-filter (searchChange)="search = $event"></app-site-filter>

    <ng-container *ngIf="sites$ | async as sites; else loading">
      <app-site-table [sites]="sites" [search]="search"></app-site-table>
    </ng-container>
    <ng-template #loading>
      <app-skeleton height="10rem"></app-skeleton>
    </ng-template>
  `
})
export class SitesPageComponent implements OnInit {
  sites$!: Observable<Site[]>;
  search = '';

  constructor(private service: SitesService) {}

  ngOnInit() {
    this.sites$ = this.service.getAll();
  }
}
