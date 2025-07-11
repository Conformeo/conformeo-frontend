import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dpo } from '../../models/dpo.model';

@Injectable({ providedIn: 'root' })
export class DpoService {
  constructor(private http: HttpClient) {}

  getDpo(userId: number): Observable<Dpo> {
    return this.http.get<Dpo>(`/api/dpo?user_id=${userId}`);
  }

  createDpo(data: Dpo): Observable<Dpo> {
    return this.http.post<Dpo>(`/api/dpo`, data);
  }

  updateDpo(id: number, data: Dpo): Observable<Dpo> {
    return this.http.put<Dpo>(`/api/dpo/${id}`, data);
  }

  deleteDpo(id: number): Observable<void> {
    return this.http.delete<void>(`/api/dpo/${id}`);
  }
}
