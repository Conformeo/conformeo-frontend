import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RgpdRequest } from '../../models/rgpd-request';


@Injectable({ providedIn: 'root' })
export class RequestService {
  constructor(private http: HttpClient) {}

  list(userId: number): Observable<RgpdRequest[]> {
    return this.http.get<RgpdRequest[]>(`/api/rgpd/requests?user_id=${userId}`);
  }

  create(data: RgpdRequest): Observable<RgpdRequest> {
    return this.http.post<RgpdRequest>(`/api/rgpd/requests`, data);
  }

  update(reqId: number, data: Partial<RgpdRequest>): Observable<RgpdRequest> {
    return this.http.put<RgpdRequest>(`/api/rgpd/requests/${reqId}`, data);
  }
}
