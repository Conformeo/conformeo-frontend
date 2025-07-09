import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SecuriteService {
  constructor(private http: HttpClient) {}

  getSynthese(userId: number): Observable<any> {
    return this.http.get<any>(`/api/securite/summary?user_id=${userId}`);
  }

  getNonConformites(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`/api/securite/nonconformites?user_id=${userId}`);
  }

  getTimeline(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`/api/securite/timeline?user_id=${userId}`);
  }
}
