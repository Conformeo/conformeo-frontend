// src/app/features/rgpd/rgpd-procedure.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { RgpdProcedure } from '../../models/rgpd-procedure.model';

@Injectable({ providedIn: 'root' })
export class RgpdProcedureService {
  constructor(private http: HttpClient) {}

  getProcedure(userId: number): Observable<RgpdProcedure> {
    return of({
      dpoName: 'Sophie Martin',
      dpoEmail: 'dpo@entreprise.fr',
      dpoPhone: '06 11 22 33 44',
      dpoInternal: true,
      dpoDesignatedCnil: true,
      registerExist: true,
      registerUpdatedAt: '2025-06-21',
      proceduresReviewed: true,
      lastReviewAt: '2025-06-21',
      alerts: []
    });
  }

  getDpo(userId: number) {
    return this.http.get<any>(`/api/rgpd/procedure/dpo`, { params: { user_id: userId } });
  }
  setDpo(userId: number, dpo: any) {
    return this.http.post<any>(`/api/rgpd/procedure/dpo?user_id=${userId}`, dpo);
  }
  getObligations(userId: number) {
    return this.http.get<any[]>(`/api/rgpd/procedure/obligations`, { params: { user_id: userId } });
  }
}
