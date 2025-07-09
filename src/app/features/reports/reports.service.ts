import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../../models/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) {}

  getReport(data: any): Observable<Report> {
  return this.http.post<Report>('/api/report/conformity', data);
}

}
