import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuditLog } from '../../models/audit-log';

@Injectable({ providedIn: 'root' })
export class AuditLogService {
  constructor(private http: HttpClient) {}

  /**
   * Récupère la liste des logs d'audit RGPD.
   * @param userId Optionnel : filtre par utilisateur (si l’API le supporte)
   */
  list(userId?: number): Observable<AuditLog[]> {
    let url = '/api/auditlog';
    if (userId) {
      url += `?user_id=${userId}`;
    }
    return this.http.get<AuditLog[]>(url);
  }
}
