import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { RgpdScore } from '../../models/rgpd-score.model';
import { Obligation } from '../../models/obligation';
import { Registre } from '../../models/registre';

@Injectable({ providedIn: 'root' })
export class RgpdService {
  /** Passe à `true` pour mocker toutes les requêtes REST. */
  private readonly MOCK = false;
  private readonly baseUrl = '/api/rgpd';

  constructor(private http: HttpClient) {}

  // -------------------------------------------------------------------------
  // 📋 EXIGENCES
  // -------------------------------------------------------------------------
  getExigences(): Observable<any[]> {
    if (this.MOCK) {
      return of([
        { id: 1, label: 'Registre des traitements à jour' },
        { id: 2, label: 'Mentions légales RGPD présentes' },
        { id: 3, label: 'Procédure de violation documentée' }
      ]);
    }
    return this.http.get<any[]>(`${this.baseUrl}/exigences`);
  }

  // -------------------------------------------------------------------------
  // 📑 AUDITS
  // -------------------------------------------------------------------------
  getAudits(): Observable<any[]> {
    if (this.MOCK) {
      return of([
        { id: 11, created_at: '2025-07-10', score: 82 },
        { id: 10, created_at: '2025-06-01', score: 75 }
      ]);
    }
    return this.http.get<any[]>(`${this.baseUrl}/audits/timeline`);
  }

  getTimeline(): Observable<any[]> {
    return this.getAudits();
  }

  getAudit(id: number): Observable<any> {
    if (this.MOCK) {
      return of({ id, created_at: '2025-07-10', score: 82, exigences: [] });
    }
    return this.http.get<any>(`${this.baseUrl}/audits/${id}`);
  }

  getScore(id: number): Observable<RgpdScore> {
    if (this.MOCK) {
      return of({
        score: 82,
        conforme: 15,
        non_conforme: 3,
        total: 18,
        critical_ko: [],
        ko: [],
        details: []
      });
    }
    return this.http.get<RgpdScore>(`${this.baseUrl}/audits/${id}/score`);
  }

  createAudit(payload: any): Observable<any> {
    if (this.MOCK) {
      return of({ id: 12, ...payload, created_at: new Date().toISOString() });
    }
    return this.http.post<any>(`${this.baseUrl}/audits`, payload);
  }

  getLastAudit(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/audits/last`);
  }

  // -------------------------------------------------------------------------
  // 📊 STATISTIQUES
  // -------------------------------------------------------------------------
  getDomainStats(auditId: number): Observable<any[]> {
    if (this.MOCK) {
      return of([
        { name: 'Base légale', value: 2 },
        { name: 'Sécurité', value: 3 },
        { name: 'Conservation', value: 1 }
      ]);
    }
    return this.http.get<any[]>(`${this.baseUrl}/audits/${auditId}/domains`);
  }

  // -------------------------------------------------------------------------
  // 🔧 DPO & OBLIGATIONS
  // -------------------------------------------------------------------------
  getDpo(): Observable<any> {
    return this.http.get<any>('/api/dpo');
  }

  getObligations(): Observable<Obligation[]> {
    return this.http.get<Obligation[]>('/api/obligations');
  }

  // -------------------------------------------------------------------------
  // 📕 REGISTRE DES TRAITEMENTS
  // -------------------------------------------------------------------------
  /** Liste des entrées du registre. */
  getRegistreList(): Observable<Registre[]> {
    if (this.MOCK) {
      return of([
        {
          id: 1,
          user_id: 1,
          nom_traitement: 'Paie',
          finalite: 'Gestion de la paie',
          base_legale: 'Obligation légale',
          personnes_concernees: 'Salariés',
          duree_conservation: '5 ans',
        },
      ]);
    }
    return this.http.get<Registre[]>(`${this.baseUrl}/registre`);
  }
  

  /** Ajout d’une entrée dans le registre. */
  addRegistreEntry(entry: Partial<Registre>): Observable<Registre> {
    if (this.MOCK) {
      return of({
        id: Date.now(),
        user_id: 1,
        ...entry,
      } as Registre);
    }
    return this.http.post<Registre>(`${this.baseUrl}/registre`, entry);
  }


  /** Mise à jour d’une entrée existante. */
  updateRegistreEntry(id: number, entry: Partial<Registre>): Observable<Registre> {
    if (this.MOCK) {
      return of({
        id,
        user_id: 1,
        ...entry,
      } as Registre);
    }
    return this.http.put<Registre>(`${this.baseUrl}/registre/${id}`, entry);
  }
  

  /** Suppression d’une entrée du registre. */
  deleteRegistreEntry(id: number): Observable<void> {
    if (this.MOCK) {
      return of(void 0);
    }
    return this.http.delete<void>(`${this.baseUrl}/registre/${id}`);
  }

  // -------------------------------------------------------------------------
  // 🔧 EXIGENCES ADMIN
  // -------------------------------------------------------------------------
  addExigence(payload: { label: string; answer?: string; comment?: string }) {
    return this.http.post<any>(`${this.baseUrl}/exigences`, payload);
  }

  updateExigence(id: number, data: { answer: string; comment?: string }) {
    return this.http.put<any>(`${this.baseUrl}/exigences/${id}`, data);
  }

  deleteExigence(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/exigences/${id}`);
  }

  // -------------------------------------------------------------------------
  // 📥 EXPORTS
  // -------------------------------------------------------------------------
  downloadCsv(id: number) {
    if (this.MOCK) {
      return of(new Blob(['Mock CSV'], { type: 'text/csv' }));
    }
    return this.http.get(`${this.baseUrl}/audits/${id}/csv`, { responseType: 'blob' });
  }

  downloadPdf(id: number) {
    if (this.MOCK) {
      return of(new Blob(['Mock PDF'], { type: 'application/pdf' }));
    }
    return this.http.get(`${this.baseUrl}/audits/${id}/pdf`, { responseType: 'blob' });
  }
}