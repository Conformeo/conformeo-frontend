import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SiteCertification {
  id: string;
  siteId: string;
  name: string;
  validUntil: string;
  status: 'VALID' | 'TO_RENEW' | 'EXPIRED';
}

@Component({
  selector: 'app-site-certification-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './site-certification-table.component.html',
})
export class SiteCertificationTableComponent {
  @Input() certifications: SiteCertification[] = [];
  @Output() edit = new EventEmitter<SiteCertification>();

  query = '';

  get filtered(): SiteCertification[] {
    const q = this.query.trim().toLowerCase();
    return this.certifications.filter(cert =>
      !q ||
      cert.name.toLowerCase().includes(q) ||
      cert.status.toLowerCase().includes(q)
    );
  }
}
