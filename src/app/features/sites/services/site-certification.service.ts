import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface SiteCertification {
  id: string;
  siteId: string;
  name: string;
  validUntil: string; // date ISO
  status: 'VALID' | 'TO_RENEW' | 'EXPIRED';
}

@Injectable({ providedIn: 'root' })
export class SiteCertificationService {
  private CERTIFS: SiteCertification[] = [
    { id: 'c1', siteId: '1', name: 'Qualibat', validUntil: '2026-05-31', status: 'VALID' },
    { id: 'c2', siteId: '2', name: 'ISO 9001', validUntil: '2025-12-01', status: 'TO_RENEW' },
  ];

  getBySite(siteId: string): Observable<SiteCertification[]> {
    return of(this.CERTIFS.filter(c => c.siteId === siteId));
  }

  save(cert: SiteCertification): Observable<SiteCertification> {
    if (!cert.id) {
      cert.id = Math.random().toString(36).slice(2, 9);
      this.CERTIFS.push(cert);
    } else {
      const idx = this.CERTIFS.findIndex(c => c.id === cert.id);
      if (idx !== -1) this.CERTIFS[idx] = { ...this.CERTIFS[idx], ...cert };
    }
    return of(cert);
  }
}
