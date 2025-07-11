import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Obligation } from '../../models/obligation';

@Injectable({ providedIn: 'root' })
export class ObligationService {
  constructor(private http: HttpClient) {}

  list(userId: number): Observable<Obligation[]> {
    return this.http.get<Obligation[]>(`/api/obligations?user_id=${userId}`);
  }

  update(id: number, data: Partial<Obligation>): Observable<Obligation> {
    return this.http.put<Obligation>(`/api/obligations/${id}`, data);
  }

  create(data: Partial<Obligation>): Observable<Obligation> {
    return this.http.post<Obligation>(`/api/obligations`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`/api/obligations/${id}`);
  }

}
