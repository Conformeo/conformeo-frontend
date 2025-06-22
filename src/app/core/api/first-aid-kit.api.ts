import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FirstAidKit } from '../../models/first-aid-kit.model';

@Injectable({ providedIn: 'root' })
export class KitApi {
  private baseUrl = '/api/kits';

  constructor(private http: HttpClient) {}

  list(): Observable<FirstAidKit[]> {
    return this.http.get<FirstAidKit[]>(this.baseUrl);
  }

  create(dto: Partial<FirstAidKit>): Observable<FirstAidKit> {
    return this.http.post<FirstAidKit>(this.baseUrl, dto);
  }

  update(id: string, dto: Partial<FirstAidKit>): Observable<FirstAidKit> {
    return this.http.put<FirstAidKit>(`${this.baseUrl}/${id}`, dto);
  }
}