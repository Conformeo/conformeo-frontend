import { Injectable } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { Site } from '../../../models/site.model';

const STORAGE_KEY = 'conformeo_sites';

function getFromStorage(): Site[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) as Site[] : [];
}

function setToStorage(sites: Site[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sites));
}

@Injectable({ providedIn: 'root' })
export class SitesService {

  getAll(): Observable<Site[]> {
    return of(getFromStorage());
  }

  getById(id: string): Observable<Site | undefined> {
    return this.getAll().pipe(
      map(sites => sites.find(s => s.id === id))
    );
  }

  add(site: Site): Observable<Site> {
    const sites = getFromStorage();
    sites.push(site);
    setToStorage(sites);
    return of(site);
  }

  update(site: Site): Observable<Site> {
    const sites = getFromStorage();
    const idx = sites.findIndex(s => s.id === site.id);
    if (idx >= 0) sites[idx] = site;
    setToStorage(sites);
    return of(site);
  }

  delete(id: string): Observable<boolean> {
    let sites = getFromStorage();
    sites = sites.filter(s => s.id !== id);
    setToStorage(sites);
    return of(true);
  }

  // Pour réinitialiser avec mock data pour la démo :
  resetDemoData(): void {
    const demo: Site[] = [
      { id: '1', name: 'Chantier A', address: '12 rue du Parc', city: 'Paris', zipCode: '75000', score: 90 },
      { id: '2', name: 'Chantier B', address: '48 rue du Port', city: 'Lyon', zipCode: '69000', score: 88 },
    ];
    setToStorage(demo);
  }
}
