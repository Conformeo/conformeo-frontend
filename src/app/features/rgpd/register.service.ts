import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Register } from '../../models/register';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  constructor(private http: HttpClient) {}

  list(userId: number): Observable<Register[]> {
    return this.http.get<Register[]>(`/api/registers?user_id=${userId}`);
  }

  create(data: Register): Observable<Register> {
    return this.http.post<Register>(`/api/registers`, data);
  }

  update(id: number, data: Partial<Register>): Observable<Register> {
    return this.http.put<Register>(`/api/registers/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`/api/registers/${id}`);
  }
}
