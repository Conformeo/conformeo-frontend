// src/app/features/company/company.service.ts
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

import { FireExtinguisher } from '../../models/fire-extinguisher.model';
import { Certification }   from '../../models/certification.model';
import { Camera } from '../../models/camera.model';
import { FirstAidKit } from '../../models/first-aid-kit.model';
import { Insurance } from '../../models/insurance.model';

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

  getCameras(): Observable<Camera[]> {
    return of([
      { id: 'cam-1', label: 'Entrée Principale', location: 'Porte A', lastCheck: '2025-01-10', nextCheck: '2025-07-10', status: 'OK', thumbnailUrl: '/assets/cam1.jpg' },
      { id: 'cam-2', label: 'Parking', location: 'Zone Stationnement', lastCheck: '2024-12-01', nextCheck: '2025-06-01', status: 'KO', thumbnailUrl: '/assets/cam2.jpg' },
    ]);
  }

  getKits(): Observable<FirstAidKit[]> {
    return of([
      { id: 'kit-1', site: 'Siège', expiry: '2025-02-20', status: 'OK' },
      { id: 'kit-2', site: 'Atelier', expiry: '2023-11-15', status: 'EXPIRED' },
    ]);
  }

  getInsurances(): Observable<Insurance[]> {
    return of([
      { id: 'ins-1', type: 'RC_PRO', provider: 'AXA', validUntil: '2025-10-01' },
      { id: 'ins-2', type: 'DECENNALE', provider: 'Allianz', validUntil: '2026-03-15' },
    ]);
  }
}
