import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Camera } from '../../models/camera.model';

@Injectable({ providedIn: 'root' })
export class CameraApi {
  private baseUrl = '/api/cameras';

  constructor(private http: HttpClient) {}

  list(): Observable<Camera[]> {
    return this.http.get<Camera[]>(this.baseUrl);
  }

  create(dto: Partial<Camera>): Observable<Camera> {
    return this.http.post<Camera>(this.baseUrl, dto);
  }

  update(id: string, dto: Partial<Camera>): Observable<Camera> {
    return this.http.put<Camera>(`${this.baseUrl}/${id}`, dto);
  }
}