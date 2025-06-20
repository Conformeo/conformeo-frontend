// src/app/features/sites/components/site-table/site-table.component.ts
import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule }                from '@angular/common';
import { TableWrapperComponent }       from '../../../../shared/table-wrapper/table-wrapper.component';
import { BadgeScorePipe }              from '../../pipes/badge-score.pipe';
import { Site }                        from '../../../../models/site.model';

@Component({
  selector: 'app-site-table',
  standalone: true,
  imports: [CommonModule, TableWrapperComponent, BadgeScorePipe],
  template: `
    <app-table-wrapper>
      <table class="w-full text-sm">
        <thead class="bg-slate-100">
          <tr><th>Site</th><th>Adresse</th><th class="text-center w-32">Score</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let s of filtered">
            <td>{{ s.name }}</td>
            <td>{{ s.address }}</td>
            <td class="text-center">
              <span class="px-2 py-1 rounded text-white" [ngClass]="s.score | badgeScore">
                {{ s.score }} %
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </app-table-wrapper>
  `
})
export class SiteTableComponent implements OnChanges {
  @Input() sites: Site[] | null = [];
  @Input() search = '';

  filtered: Site[] = [];

  ngOnChanges() {
    const t = this.search.toLowerCase();
    this.filtered = (this.sites ?? []).filter(s => s.name.toLowerCase().includes(t));
  }
}
