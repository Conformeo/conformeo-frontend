// src/app/services/checklist.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Checklist, ChecklistItem } from '../models/checklist.model';

@Injectable({ providedIn: 'root' })
export class ChecklistService {
  private readonly api = `${environment.apiUrl}/checklists`;
  private readonly http = inject(HttpClient);

  // Cache comme avant...
  private readonly _store = new BehaviorSubject<Checklist[]>([]);

  /* --------------------------------------------------------------------------
   *  -- Accès CRUD sur les checklists ---------------------------------------
   * ------------------------------------------------------------------------*/

  list(): Observable<Checklist[]> {
    return this.http.get<Checklist[]>(this.api);
  }

  getById(id: number): Observable<Checklist> {
    return this.http.get<Checklist>(`${this.api}/${id}`);
  }

  create(dto: Partial<Checklist>): Observable<Checklist> {
    return this.http.post<Checklist>(this.api, dto);
  }

  update(id: number, dto: Partial<Checklist>): Observable<Checklist> {
    return this.http.put<Checklist>(`${this.api}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  /* --------------------------------------------------------------------------
   *  -- Accès CRUD sur les items d’une checklist ----------------------------
   * ------------------------------------------------------------------------*/

  addItem(checklistId: number, dto: { label: string }): Observable<ChecklistItem> {
    return this.http.post<ChecklistItem>(`${this.api}/${checklistId}/items`, dto);
  }

  updateItem(checklistId: number, itemId: number, dto: Partial<ChecklistItem>): Observable<ChecklistItem> {
    return this.http.put<ChecklistItem>(`${this.api}/${checklistId}/items/${itemId}`, dto);
  }

  deleteItem(checklistId: number, itemId: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${checklistId}/items/${itemId}`);
  }

  /* --------------------------------------------------------------------------
   *  -- Cache réactif (facultatif) ------------------------------------------
   * ------------------------------------------------------------------------*/

  all(): Observable<Checklist[]> {
    return this._store.asObservable();
  }

  fetch(): Observable<Checklist[]> {
    return this.list().pipe(tap(cs => this._store.next(cs)));
  }

  add(name: string): Observable<Checklist> {
    return this.create({ name }).pipe(
      tap(newCl => this._store.next([...this._store.value, newCl]))
    );
  }

  rename(id: number, name: string): Observable<Checklist> {
    return this.update(id, { name }).pipe(
      tap(updated => {
        const next = this._store.value.map(c => c.id === id ? updated : c);
        this._store.next(next);
      })
    );
  }

  remove(id: number): Observable<void> {
    return this.delete(id).pipe(
      tap(() => this._store.next(this._store.value.filter(c => c.id !== id)))
    );
  }
}
