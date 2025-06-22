// src/app/features/sites/components/site-insurance-table/site-insurance-table.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Insurance } from '../../../../models/insurance.model';
import { InsuranceApi } from '../../../../core/api/insurance.api';

@Component({
  selector: 'app-site-insurance-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './site-insurance-table.component.html',
})
export class SiteInsuranceTableComponent implements OnInit {
  @Input() siteId!: string;
  data: Insurance[] = [];
  query = '';

  constructor(private api: InsuranceApi) {}

  ngOnInit() {
    if (this.siteId) {
      this.api.list(this.siteId).subscribe(d => this.data = d);
    }
  }

  get filtered(): Insurance[] {
    const q = this.query.trim().toLowerCase();
    return this.data.filter(ins =>
      !q || ins.provider?.toLowerCase().includes(q)
    );
  }
}
