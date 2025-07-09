import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CertifService {
  constructor(private http: HttpClient) {}

  getCertifSummary(userId: number): Observable<any> {
    return this.http.get<any>(`/api/certif/summary?user_id=${userId}`);
  }

  getExpiringCertifs(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`/api/certif/expiring?user_id=${userId}`);
  }

  getTimeline(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`/api/certif/timeline?user_id=${userId}`);
  }
}
