import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Worker } from '../../models/worker.model';

@Injectable({ providedIn: 'root' })
export class WorkerApi {
  private url = '/api/workers';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Worker[]>         { return this.http.get<Worker[]>(this.url); }
  add(worker: Worker): Observable<Worker>{ return this.http.post<Worker>(this.url, worker); }
  update(w: Worker): Observable<Worker>  { return this.http.put<Worker>(`${this.url}/${w.id}`, w); }
  delete(id: string): Observable<void>   { return this.http.delete<void>(`${this.url}/${id}`); }
}
