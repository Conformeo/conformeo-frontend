import { Injectable } from '@angular/core';
import { WorkerApi } from '../api/worker.api';
import { Worker } from '../../models/worker.model';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

const STORAGE_KEY = 'conformeo_workers';

function getFromStorage(): Worker[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) as Worker[] : [];
}

function setToStorage(workers: Worker[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(workers));
}

@Injectable({ providedIn: 'root' })
export class WorkerService {
  constructor(private api: WorkerApi) {}

  getAll(): Observable<Worker[]> {
    if (environment.useMock) {
      return of(getFromStorage());
    }
    return this.api.getAll();
  }

  getById(id: string): Observable<Worker | undefined> {
    if (environment.useMock) {
      return of(getFromStorage().find(w => w.id === id));
    }
    return this.api.getById(id);
  }

  add(worker: Worker): Observable<Worker> {
    if (environment.useMock) {
      const workers = getFromStorage();
      workers.push(worker);
      setToStorage(workers);
      return of(worker);
    }
    return this.api.add(worker);
  }

  update(worker: Worker): Observable<Worker> {
    if (environment.useMock) {
      const workers = getFromStorage();
      const idx = workers.findIndex(w => w.id === worker.id);
      if (idx >= 0) workers[idx] = worker;
      setToStorage(workers);
      return of(worker);
    }
    return this.api.update(worker);
  }

  delete(id: string): Observable<void> {
    if (environment.useMock) {
      let workers = getFromStorage();
      workers = workers.filter(w => w.id !== id);
      setToStorage(workers);
      return of();
    }
    return this.api.delete(id);
  }

  // Pour la démo : reset mock data
  resetDemoData(): void {
    const demo: Worker[] = [
      { id: '1', firstName: 'Marie', lastName: 'Dupont', role: 'Chef de chantier', phone: '0612345678', siteId: '1' },
      { id: '2', firstName: 'Alex', lastName: 'Martin', role: 'Ouvrier', siteId: '2' }
    ];
    setToStorage(demo);
  }
}
