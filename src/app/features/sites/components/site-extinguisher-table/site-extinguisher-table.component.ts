// src/app/features/sites/components/site-extinguisher-table/site-extinguisher-table.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FireExtinguisher } from '../../../../models/fire-extinguisher.model';
import { ExtinguisherApi } from '../../../../core/api/extinguisher.api';

@Component({
  selector: 'app-site-extinguisher-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './site-extinguisher-table.component.html',
})
export class SiteExtinguisherTableComponent implements OnInit {
  @Input() siteId!: string;
  data: FireExtinguisher[] = [];
  query = '';

  constructor(private api: ExtinguisherApi) {}

  ngOnInit() {
    if (this.siteId) {
      this.api.list(this.siteId).subscribe(d => this.data = d);
    }
  }

  get filtered(): FireExtinguisher[] {
    const q = this.query.trim().toLowerCase();
    return this.data.filter(e =>
      !q || e.location?.toLowerCase().includes(q) || e.serialNumber?.toLowerCase().includes(q)
    );
  }
}
