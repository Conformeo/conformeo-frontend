// src/app/features/dashboard/dashboard.service.ts
import { Injectable }     from '@angular/core';
import { Observable, of } from 'rxjs';
import { DashboardStat }  from '../../models/dashboard-stat.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  getStats(): Observable<DashboardStat[]> {
    // 📝 pour l’instant on renvoie du mock local
    return of([
      { label: 'Sites',          value: 24 },
      { label: 'Contrôles à venir', value: 5,  variant: 'risk' },
      { label: 'Inspections OK',    value: '92 %' },
      { label: 'Actions en cours',  value: 7,  variant: 'risk' }
    ]);
  }
}
