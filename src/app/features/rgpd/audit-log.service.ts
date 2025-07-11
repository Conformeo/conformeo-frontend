import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuditLog } from '../../models/auditlog';


@Injectable({ providedIn: 'root' })
export class AuditLogService {
  constructor(private http: HttpClient) {}

  list(userId: number): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(`/api/audit-logs?user_id=${userId}`);
  }
}
