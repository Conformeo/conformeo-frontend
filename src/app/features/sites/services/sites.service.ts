import { Injectable } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { Site } from '../../../models/site.model';

@Injectable({ providedIn: 'root' })
export class SitesService {
  private sites: Site[] = [
    { id: '1', name: 'Chantier A', address: '12 rue du Parc', city: 'Paris', zipCode: '75000', score: 90 },
    { id: '2', name: 'Chantier B', address: '48 rue du Port', city: 'Lyon', zipCode: '69000', score: 88 },
  ];

  getAll(): Observable<Site[]> {
    return of(this.sites);
  }

  getById(id: string): Observable<Site | undefined> {
  return this.getAll().pipe(
    map(sites => sites.find(s => s.id === id))
  );
}

  update(site: Site): Observable<Site> {
    const idx = this.sites.findIndex(s => s.id === site.id);
    if (idx >= 0) this.sites[idx] = site;
    return of(site);
  }

  
}
