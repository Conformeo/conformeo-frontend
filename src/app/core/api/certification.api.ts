// src/app/core/api/certification.api.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Certification } from '../../models/certification.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CertificationApi {
  private url = environment.apiUrl + '/certifications/';

  constructor(private http: HttpClient) {}

  list(): Observable<Certification[]> {
    return this.http.get<Certification[]>(this.url);
  }
  create(cert: Certification): Observable<Certification> {
    return this.http.post<Certification>(this.url, cert);
  }
  update(id: string, cert: Certification): Observable<Certification> {
    return this.http.put<Certification>(`${this.url}${id}`, cert);
  }
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.url}${id}`);
  }
}
