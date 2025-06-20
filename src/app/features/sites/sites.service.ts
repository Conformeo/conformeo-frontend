// src/app/features/sites/sites.service.ts
import { Injectable }  from '@angular/core';
import { Observable, of } from 'rxjs';
import { Site }        from '../../models/site.model';

@Injectable({ providedIn: 'root' })
export class SitesService {
  getAll(): Observable<Site[]> {
    return of([
      { id:'1', name:'Siège Social', address:'123 Rue de la République, Paris', score: 85 },
      { id:'2', name:'Usine Lyon',   address:'45 Av. de Lyon, Lyon',           score: 78 },
      { id:'3', name:'Dépôt Lille',  address:'12 Rue Nationale, Lille',        score: 92 },
    ]);
  }
}
