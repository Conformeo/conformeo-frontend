import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DuerpService {
  constructor(private http: HttpClient) {}

  getSynthese(userId: number): Observable<any> {
    return this.http.get<any>(`/api/duerp/synthese?user_id=${userId}`);
  }

  getTimeline(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`/api/duerp/audits?user_id=${userId}`);
  }

  getRisquesParType(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`/api/duerp/risques-types?user_id=${userId}`);
  }
}
