import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Worker } from '../../models/worker.model';

@Injectable({ providedIn: 'root' })
export class WorkersService {
  getAll(): Observable<Worker[]> {
    return of([
      { id: '1', nom: 'Dupont', prenom: 'Marie', poste: 'Chef', telephone: '06...', email: '', siteId: '', equipe: 'A' },
      { id: '2', nom: 'Martin', prenom: 'Jean', poste: 'Technicien', telephone: '07...', email: '', siteId: '', equipe: 'B' },
      { id: '3', nom: 'Durand', prenom: 'Sophie', poste: 'Administrateur', telephone: '04...', email: '', siteId: '', equipe: 'C' },
      { id: '4', nom: 'Lefebvre', prenom: 'Paul', poste: 'Ingénieur', telephone: '05...', email: '', siteId: '', equipe: 'A' },
      { id: '5', nom: 'Moreau', prenom: 'Claire', poste: 'Commerciale', telephone: '03...', email: '', siteId: '', equipe: 'B' }
    ]);
  }
}
