// src/app/core/api/camera.api.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Camera } from '../../models/camera.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CameraApi {
  private url = environment.apiUrl + '/cameras/';

  constructor(private http: HttpClient) {}

  list(): Observable<Camera[]> {
    return this.http.get<Camera[]>(this.url);
  }
  create(cam: Camera): Observable<Camera> {
    return this.http.post<Camera>(this.url, cam);
  }
  update(id: string, cam: Camera): Observable<Camera> {
    return this.http.put<Camera>(`${this.url}${id}`, cam);
  }
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.url}${id}`);
  }
}
