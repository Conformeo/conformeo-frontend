import { Injectable } from '@angular/core';
import { Observable, of, throwError, map, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Site } from '../../../models/site.model';
import { SitePhoto, SiteDocument } from '../../../models/site-photo';

// LOCALSTORAGE demo key
const STORAGE_KEY = 'conformeo_sites';

// Simulateurs en mémoire (non persistant, reset à chaque F5)
const mockPhotos: { [siteId: string]: SitePhoto[] } = {};
const mockDocs: { [siteId: string]: SiteDocument[] } = {};

function getFromStorage(): Site[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) as Site[] : [];
}

function setToStorage(sites: Site[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sites));
}

@Injectable({ providedIn: 'root' })
export class SitesService {
  private apiUrl = '/api/sites'; // adapte à ton backend si besoin

  constructor(private http: HttpClient) {}

  /** Helper : si API down, fallback local */
  private fallback<T>(obs: Observable<T>, local: () => T): Observable<T> {
    return obs.pipe(
      catchError(() => of(local()))
    );
  }

  // =====================
  //      SITES CRUD
  // =====================

  getAll(): Observable<Site[]> {
    return this.fallback(
      this.http.get<Site[]>(this.apiUrl),
      () => getFromStorage()
    );
  }

  getById(id: string): Observable<Site | undefined> {
    return this.fallback(
      this.http.get<Site>(`${this.apiUrl}/${id}`),
      () => getFromStorage().find(s => s.id === id)
    );
  }

  add(site: Site): Observable<Site> {
    return this.fallback(
      this.http.post<Site>(this.apiUrl, site),
      () => {
        const sites = getFromStorage();
        sites.push(site);
        setToStorage(sites);
        return site;
      }
    );
  }

  update(site: Site): Observable<Site> {
    return this.fallback(
      this.http.put<Site>(`${this.apiUrl}/${site.id}`, site),
      () => {
        const sites = getFromStorage();
        const idx = sites.findIndex(s => s.id === site.id);
        if (idx >= 0) sites[idx] = site;
        setToStorage(sites);
        return site;
      }
    );
  }

  delete(id: string): Observable<boolean> {
    return this.fallback(
      this.http.delete(`${this.apiUrl}/${id}`).pipe(map(() => true)),
      () => {
        let sites = getFromStorage();
        sites = sites.filter(s => s.id !== id);
        setToStorage(sites);
        return true;
      }
    );
  }

  // =========================
  // PHOTOS & DOCUMENTS
  // (API → sinon mock local)
  // =========================

  // --- PHOTOS ---
  uploadPhoto(siteId: string, file: File): Observable<SitePhoto> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<SitePhoto>(`${this.apiUrl}/${siteId}/photos`, formData).pipe(
      catchError(() => {
        // Mock local si API indispo
        const url = URL.createObjectURL(file);
        const photo: SitePhoto = {
          fileUrl: url,
          uploadedAt: new Date().toISOString(),
          filename: file.name,
        };
        mockPhotos[siteId] = mockPhotos[siteId] || [];
        mockPhotos[siteId].unshift(photo);
        return of(photo);
      })
    );
  }

  getPhotos(siteId: string): Observable<SitePhoto[]> {
    return this.http.get<SitePhoto[]>(`${this.apiUrl}/${siteId}/photos`).pipe(
      catchError(() => of(mockPhotos[siteId] || []))
    );
  }

  deletePhoto(siteId: string, fileUrl: string): Observable<void> {
    // Le paramètre 'fileUrl' permet de supprimer une photo précise en mode mock
    return this.http.delete<void>(`${this.apiUrl}/${siteId}/photos/${encodeURIComponent(fileUrl)}`).pipe(
      catchError(() => {
        mockPhotos[siteId] = (mockPhotos[siteId] || []).filter(p => p.fileUrl !== fileUrl);
        return of(void 0);
      })
    );
  }

  // --- DOCUMENTS ---
  uploadDocument(siteId: string, file: File): Observable<SiteDocument> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<SiteDocument>(`${this.apiUrl}/${siteId}/documents`, formData).pipe(
      catchError(() => {
        const url = URL.createObjectURL(file);
        const doc: SiteDocument = {
          fileUrl: url,
          uploadedAt: new Date().toISOString(),
          filename: file.name,
        };
        mockDocs[siteId] = mockDocs[siteId] || [];
        mockDocs[siteId].unshift(doc);
        return of(doc);
      })
    );
  }

  getDocuments(siteId: string): Observable<SiteDocument[]> {
    return this.http.get<SiteDocument[]>(`${this.apiUrl}/${siteId}/documents`).pipe(
      catchError(() => of(mockDocs[siteId] || []))
    );
  }

  deleteDocument(siteId: string, filename: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${siteId}/documents/${encodeURIComponent(filename)}`).pipe(
      catchError(() => {
        mockDocs[siteId] = (mockDocs[siteId] || []).filter(d => d.filename !== filename);
        return of(void 0);
      })
    );
  }
}
