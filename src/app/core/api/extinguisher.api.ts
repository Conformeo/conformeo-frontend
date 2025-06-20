// src/app/core/api/extinguisher.api.ts
import { Injectable }   from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FireExtinguisher } from '../../models/fire-extinguisher.model'

@Injectable({ providedIn: 'root' })
export class ExtinguisherApi {
  private url = `${environment.apiUrl}/extinguishers`;

  constructor(private http: HttpClient) {}

  list(siteId?: string) {
    return this.http.get<FireExtinguisher[]>(this.url, {
      params: siteId ? { siteId } : {},
    });
  }

  create(dto: Partial<FireExtinguisher>) {
    return this.http.post<FireExtinguisher>(this.url, dto);
  }

  update(id: string, dto: Partial<FireExtinguisher>) {
    return this.http.put<FireExtinguisher>(`${this.url}/${id}`, dto);
  }

  remove(id: string) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
