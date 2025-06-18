// src/app/features/sites/sites.service.ts
import { Injectable }      from '@angular/core';
import { HttpClient }      from '@angular/common/http';
import { Observable }      from 'rxjs';
import { Site }            from '../../models/site.model';

@Injectable({
  providedIn: 'root'
})
export class SitesService {
  private apiUrl = '/api/sites';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Site[]> {
    return this.http.get<Site[]>(this.apiUrl);
  }
}
