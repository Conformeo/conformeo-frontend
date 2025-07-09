import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Processing {
  id: number;
  name: string;
  purpose: string;
  legal_basis: string;
  data_subjects: string[];
  data_categories: string[];
  retention_period?: string;
  tenant_id: number;
  created_at: string;
}

@Injectable({ providedIn: 'root' })
export class ProcessingApi {
  private base = '/api/rgpd/processings';

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Processing[]>(this.base);
  }
  create(dto: Partial<Processing>) {
    return this.http.post<Processing>(this.base, dto);
  }
  update(id: number, dto: Partial<Processing>) {
    return this.http.put<Processing>(`${this.base}/${id}`, dto);
  }
  delete(id: number) {
    return this.http.delete(`${this.base}/${id}`);
  }
}
