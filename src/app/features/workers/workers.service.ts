import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Worker } from '../../models/worker.model';

@Injectable({ providedIn: 'root' })
export class WorkersService {
  getAll(): Observable<Worker[]> {
    return of([
      { id: '1', lastName: 'Dupont', firstName: 'Jean', qualification: 'Maçon', hireDate: '2022-04-10', active: true },
      { id: '2', lastName: 'Martin', firstName: 'Alice', qualification: 'Chef de chantier', hireDate: '2020-09-20', active: false },
    ]);
  }
}
