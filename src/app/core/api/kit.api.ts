// src/app/core/api/kit.api.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FirstAidKit } from '../../models/first-aid-kit.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class KitApi {
  private url = environment.apiUrl + '/kits/';

  constructor(private http: HttpClient) {}

  list(): Observable<FirstAidKit[]> {
    return this.http.get<FirstAidKit[]>(this.url);
  }
  create(kit: FirstAidKit): Observable<FirstAidKit> {
    return this.http.post<FirstAidKit>(this.url, kit);
  }
  update(id: string, kit: FirstAidKit): Observable<FirstAidKit> {
    return this.http.put<FirstAidKit>(`${this.url}${id}`, kit);
  }
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.url}${id}`);
  }
}
