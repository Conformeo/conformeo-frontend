import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Worker } from '../../models/worker.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WorkerApi {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Worker[]> {
    return this.http.get<Worker[]>('/api/workers');
  }

  getById(id: string): Observable<Worker> {
    return this.http.get<Worker>(`/api/workers/${id}`);
  }

  add(worker: Worker): Observable<Worker> {
    return this.http.post<Worker>('/api/workers', worker);
  }

  update(worker: Worker): Observable<Worker> {
    return this.http.put<Worker>(`/api/workers/${worker.id}`, worker);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`/api/workers/${id}`);
  }
}
