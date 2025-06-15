import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

/** ───────── Interfaces de données ───────── */

export interface Item {
  id:        number;
  label:     string;
  is_done:   boolean;
  created_at?: string;
  updated_at?: string;
}

/** ───────── Service ───────── */

@Injectable({ providedIn: 'root' })
export class ChecklistItemService {

  private http   = inject(HttpClient);
  private auth   = inject(AuthService);
  private apiUrl = environment.apiUrl;

  /** Conteneur-état local pour le composant détail */
  private _items$ = new BehaviorSubject<Item[]>([]);
  readonly  items$ = this._items$.asObservable();

  /** -------- Helpers -------- */
  private headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${ this.auth.getToken() ?? '' }`
    });
  }

  /** -------- CRUD -------- */

  /** Liste tous les items d’une checklist */
  list(checklistId: number): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}/checklists/${checklistId}/items`,
      { headers: this.headers() }
    ).pipe(tap(list => this._items$.next(list)));
  }

  /** Ajoute un nouvel item */
  add(checklistId: number, label: string): Observable<Item> {
    return this.http.post<Item>(
      `${this.apiUrl}/checklists/${checklistId}/items`,
      { label },
      { headers: this.headers() }
    ).pipe(
      tap(it => this._items$.next([ ...this._items$.value, it ]))
    );
  }

  /** Met à jour un item */
  update(checklistId: number, itemId: number, changes: Partial<Item>): Observable<Item> {
    return this.http.put<Item>(
      `${this.apiUrl}/checklists/${checklistId}/items/${itemId}`,
      changes,
      { headers: this.headers() }
    ).pipe(
      tap(updated => {
        const arr = this._items$.value.map(i => i.id === itemId ? updated : i);
        this._items$.next(arr);
      })
    );
  }

  /** Supprime un item */
  remove(checklistId: number, itemId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/checklists/${checklistId}/items/${itemId}`,
      { headers: this.headers() }
    ).pipe(
      tap(() => this._items$.next(this._items$.value.filter(i => i.id !== itemId)))
    );
  }
}
