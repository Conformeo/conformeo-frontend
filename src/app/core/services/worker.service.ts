import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Worker } from '../../models/worker.model';
import { WorkerApi } from '../api/worker.api';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

const LS_KEY = 'conformeo_workers';

@Injectable({ providedIn: 'root' })
export class WorkerService {
  constructor(private api: WorkerApi) {}

  /* -------------- MOCK helpers -------------- */
  private ls(): Worker[] {
    const d = localStorage.getItem(LS_KEY);
    return d ? JSON.parse(d) as Worker[] : [];
  }
  private saveLS(list: Worker[]) { localStorage.setItem(LS_KEY, JSON.stringify(list)); }

  /* -------------- CRUD -------------- */
  getAll(): Observable<Worker[]> {
    return environment.useMock ? of(this.ls()) : this.api.getAll();
  }

  add(w: Worker): Observable<Worker> {
    if (environment.useMock) {
      const list = this.ls(); list.push(w); this.saveLS(list);
      return of(w);
    }
    return this.api.add(w);
  }

  update(w: Worker): Observable<Worker> {
    if (environment.useMock) {
      const list = this.ls();
      const i = list.findIndex(x => x.id === w.id);
      if (i !== -1) list[i] = w;
      this.saveLS(list);
      return of(w);
    }
    return this.api.update(w);
  }

  delete(id: string): Observable<void> {
    if (environment.useMock) {
      this.saveLS(this.ls().filter(w => w.id !== id));
      return of(void 0);
    }
    return this.api.delete(id);
  }

  /** Regroupe les ouvriers par équipe puis par siteId */
  getGroupedByTeam(): Observable<Record<string, Record<string, Worker[]>>> {
    return this.getAll().pipe(
      map(list => {
        const grouped: Record<string, Record<string, Worker[]>> = {};
        for (const w of list) {
          const team = w.equipe || '—';
          const site = w.siteId || '—';
          grouped[team] ??= {};
          grouped[team][site] ??= [];
          grouped[team][site].push(w);
        }
        return grouped;
      })
    );
  }
  /* -------------- Démo rapide -------------- */
  resetDemo() {
    this.saveLS([
      { id: '1', nom: 'Dupont', prenom: 'Marie', poste: 'Chef',        telephone: '06 11 22 33 44', email: '', siteId: '', equipe: 'A' },
      { id: '2', nom: 'Martin', prenom: 'Jean',  poste: 'Technicien',  telephone: '07 55 66 77 88', email: '', siteId: '', equipe: 'B' },
    ]);
  }
}
