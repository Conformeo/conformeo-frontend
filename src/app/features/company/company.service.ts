// src/app/features/company/company.service.ts
import { Injectable }         from '@angular/core';
import { Observable, of }     from 'rxjs';
import { FireExtinguisher }   from '../../models/fire-extinguisher.model';
import { Certification }      from '../../models/certification.model';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  getExtinguishers(): Observable<FireExtinguisher[]> {
    return of([
      { location: 'Hall accueil',   lastControl: '2024-09', nextControl: '2025-09', status: 'OK' },
      { location: 'Atelier nord',   lastControl: '2024-03', nextControl: '2025-03', status: 'TO_SCHEDULE' },
      { location: 'Parking sous-sol', lastControl: '2023-11', nextControl: '2024-11', status: 'OK' }
    ]);
  }

  getCertifications(): Observable<Certification[]> {
    return of([
      { name: 'ISO 9001', validUntil: '2026-05', status: 'VALID' },
      { name: 'ISO 14001', validUntil: '2024-12', status: 'RENEW' },
      { name: 'OHSAS 18001', validUntil: '—', status: 'NOT_OBTAINED' }
    ]);
  }
}
