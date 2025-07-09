// src/app/core/api/site.api.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Site } from '../../models/site.model';

export interface SitePhoto {
  filename: string;
  fileUrl:  string;
  uploadedAt: string;
}

@Injectable({ providedIn: 'root' })
export class SiteApi {

  /** Préfixe commun – **sans** slash final */
  private readonly baseUrl = '/api/sites';

  constructor(private http: HttpClient) {}

  /* ──────────────── Sites ──────────────── */

  list(): Observable<Site[]> {
    return this.http.get<Site[]>(`${this.baseUrl}/`);
  }

  create(dto: Partial<Site>): Observable<Site> {
    return this.http.post<Site>(`${this.baseUrl}/`, dto);
  }

  update(id: string | number, dto: Partial<Site>): Observable<Site> {
    return this.http.put<Site>(`${this.baseUrl}/${id}`, dto);
  }

  /* ──────────────── Photos ─────────────── */

  uploadPhoto(siteId: string | number, file: File): Observable<SitePhoto> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<SitePhoto>(
      `${this.baseUrl}/${siteId}/photos`,
      formData
    );
  }

  getPhotos(siteId: string | number): Observable<SitePhoto[]> {
    return this.http.get<SitePhoto[]>(`${this.baseUrl}/${siteId}/photos`);
  }

  /* ───── (idem pour documents si besoin) ───── */
}
