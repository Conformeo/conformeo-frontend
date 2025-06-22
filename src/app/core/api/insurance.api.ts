import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Insurance } from '../../models/insurance.model';

@Injectable({ providedIn: 'root' })
export class InsuranceApi {
  private baseUrl = '/api/insurances';

  constructor(private http: HttpClient) {}

  list(): Observable<Insurance[]> {
    return this.http.get<Insurance[]>(this.baseUrl);
  }

  create(dto: Partial<Insurance>): Observable<Insurance> {
    return this.http.post<Insurance>(this.baseUrl, dto);
  }

  update(id: string, dto: Partial<Insurance>): Observable<Insurance> {
    return this.http.put<Insurance>(`${this.baseUrl}/${id}`, dto);
  }
}