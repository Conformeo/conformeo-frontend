// src/app/core/api/extinguisher.api.ts
import { Injectable }   from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Certification } from '../../models/certification.model';

@Injectable({ providedIn: 'root' })
export class CertificationApi {
  private url = `${environment.apiUrl}/certifications`;

  constructor(private http: HttpClient) {}

  list(siteId: string) {
    return this.http.get<Certification[]>(this.url, { params: { siteId } });
  }

  create(dto: Partial<Certification>) {
    return this.http.post<Certification>(this.url, dto);
  }

  update(id: string, dto: Partial<Certification>) {
    return this.http.put<Certification>(`${this.url}/${id}`, dto);
  }

  remove(id: string) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
