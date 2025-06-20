// src/app/features/company/company.service.ts
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { FireExtinguisher } from '../../models/fire-extinguisher.model';
import { Certification }   from '../../models/certification.model';

@Injectable({ providedIn: 'root' })
export class CompanyService {

  /** 🔥 Extincteurs --------------------------------------------------- */
  getExtinguishers(): Observable<FireExtinguisher[]> {
    return of([
      {
        id           : 'e1',
        location     : 'Atelier',
        serialNumber : 'SN-001',
        lastControl  : '2024-04-10',
        nextControl  : '2025-04-10',
        status       : 'OK',
      },
      {
        id           : 'e2',
        location     : 'Entrepôt',
        serialNumber : 'SN-002',
        lastControl  : '2023-12-15',
        nextControl  : '—',               // à planifier
        status       : 'TO_SCHEDULE',
      },
    ]);
  }

  /** 🏅 Certifications ------------------------------------------------ */
  getCertifications(): Observable<Certification[]> {
    return of([
      {
        id         : 'c1',
        name       : 'ISO 45001',
        validUntil : '2026-07-31',
        status     : 'VALID',
      },
      {
        id         : 'c2',
        name       : 'Qualibat',
        validUntil : '—',
        status     : 'NOT_OBTAINED',
      },
    ]);
  }
}
