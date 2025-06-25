// src/app/core/api/insurance.api.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Insurance } from '../../models/insurance.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InsuranceApi {
  private url = environment.apiUrl + '/insurances/';

  constructor(private http: HttpClient) {}

  list(): Observable<Insurance[]> {
    return this.http.get<Insurance[]>(this.url);
  }
  create(ins: Insurance): Observable<Insurance> {
    return this.http.post<Insurance>(this.url, ins);
  }
  update(id: string, ins: Insurance): Observable<Insurance> {
    return this.http.put<Insurance>(`${this.url}${id}`, ins);
  }
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.url}${id}`);
  }
}
