import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  // Connexion utilisateur (POST login)
  login(email: string, password: string): Observable<LoginResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('username', email);
    body.set('password', password);
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, body.toString(), { headers }).pipe(
      tap(response => {
        localStorage.setItem('access_token', response.access_token);
      })
    );
  }

  // Déconnexion (supprime le token)
  logout(): void {
    localStorage.removeItem('access_token');
  }

  // Récupérer le token JWT
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Est-ce que l'utilisateur est connecté ?
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Extraire user_id depuis le token (si présent)
  getUserId(): number | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.user_id ?? null;
    } catch {
      return null;
    }
  }
}
