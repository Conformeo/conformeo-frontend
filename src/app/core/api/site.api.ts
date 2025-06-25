import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Site } from '../../models/site.model';

@Injectable({ providedIn: 'root' })
export class SiteApi {
  private baseUrl = '/api/sites/';

  constructor(private http: HttpClient) {}

  list(): Observable<Site[]> {
    return this.http.get<Site[]>(this.baseUrl);
  }

  create(dto: Partial<Site>): Observable<Site> {
    return this.http.post<Site>(this.baseUrl, dto);
  }

  update(id: string, dto: Partial<Site>): Observable<Site> {
    return this.http.put<Site>(`${this.baseUrl}${id}`, dto);
  }
}