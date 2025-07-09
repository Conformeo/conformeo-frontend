import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OuvriersService {
  constructor(private http: HttpClient) {}

  getOuvriersSummary(userId: number): Observable<any> {
    return this.http.get<any>(`/api/ouvriers/summary?user_id=${userId}`);
  }

  getFormations(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`/api/ouvriers/formations?user_id=${userId}`);
  }

  getTimeline(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`/api/ouvriers/timeline?user_id=${userId}`);
  }
}
