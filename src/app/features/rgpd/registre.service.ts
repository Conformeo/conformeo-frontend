import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Registre } from '../../models/registre';

@Injectable({ providedIn: 'root' })
export class RegistreService {
  constructor(private http: HttpClient) {}
  

  // Récupérer tous les registres du user courant (le back déduit du token)
  list(): Observable<Registre[]> {
    return this.http.get<Registre[]>('/api/rgpd/registre').pipe(
      catchError(err => {
        if (err.status === 401) alert('Session expirée, veuillez vous reconnecter');
        return throwError(() => err);
      })
    );
  }

  // Créer un registre (user_id pris du token côté back)
  create(registre: Registre): Observable<Registre> {
    return this.http.post<Registre>('/api/rgpd/registre', registre);
  }

  // Mettre à jour un registre
  update(id: number, data: Partial<Registre>): Observable<Registre> {
    return this.http.put<Registre>(`/api/rgpd/registre/${id}`, data);
  }

  // Supprimer un registre
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`/api/rgpd/registre/${id}`);
  }
}
