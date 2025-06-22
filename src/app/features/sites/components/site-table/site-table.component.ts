import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Site } from '../../../../models/site.model';

@Component({
  selector: 'app-site-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './site-table.component.html',
})
export class SiteTableComponent {
  @Input() sites: Site[] = [];
  @Input() search = '';
  @Output() edit = new EventEmitter<Site>();

  get filtered(): Site[] {
    const q = this.search.trim().toLowerCase();
    return this.sites.filter(site =>
      !q ||
      site.name.toLowerCase().includes(q) ||
      site.address.toLowerCase().includes(q) ||
      site.city.toLowerCase().includes(q) ||
      site.zipCode.toLowerCase().includes(q)
    );
  }
}
