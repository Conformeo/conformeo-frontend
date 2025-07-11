// src/app/features/dashboard/dashboard.service.ts
import { Injectable }     from '@angular/core';
import { Observable, of } from 'rxjs';
import { DashboardStat }  from '../../models/dashboard-stat.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  getStats(): Observable<DashboardStat[]> {
    return of([
      { label: 'Sites',            value: 24,        icon: 'home' },
      { label: 'Contrôles à venir', value: 5, variant: 'risk', icon: 'alert-triangle' },
      { label: 'Inspections OK',   value: '92 %',    icon: 'check-circle' },  // 👈
      { label: 'Actions à venir', value: 7, variant: 'risk', icon: 'alert-triangle' }
    ]);
  }
}