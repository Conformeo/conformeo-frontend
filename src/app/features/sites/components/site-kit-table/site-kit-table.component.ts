// src/app/features/sites/components/site-kit-table/site-kit-table.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstAidKit } from '../../../../models/first-aid-kit.model';
import { KitApi } from '../../../../core/api/kit.api';

@Component({
  selector: 'app-site-kit-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './site-kit-table.component.html',
})
export class SiteKitTableComponent implements OnInit {
  @Input() siteId!: string;
  data: FirstAidKit[] = [];
  query = '';

  constructor(private api: KitApi) {}

  ngOnInit() {
    if (this.siteId) {
      this.api.list(this.siteId).subscribe(d => this.data = d);
    }
  }

  get filtered(): FirstAidKit[] {
    const q = this.query.trim().toLowerCase();
    return this.data.filter(kit =>
      !q || kit.location?.toLowerCase().includes(q)
    );
  }
}
