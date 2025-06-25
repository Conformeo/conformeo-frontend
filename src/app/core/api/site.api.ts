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

  // site.api.ts
  uploadPhoto(siteId: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{id: number, fileUrl: string, uploadedAt: string, uploadedBy: string}>(
      `/api/sites/${siteId}/photo`, formData
    );
  }

  getPhotos(siteId: string) {
    return this.http.get<Array<{id: number, fileUrl: string, uploadedAt: string, uploadedBy: string}>>(
      `/api/sites/${siteId}/photos`
    );
  }

}