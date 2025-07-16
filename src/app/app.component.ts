import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Conformeo Frontend';

  constructor(private auth: AuthService) {}

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      // Remplace par ta logique d'authentification :
      this.auth.login('michel', 'votremotdepasse').subscribe({
        next: (res) => {
          // Token stocké automatiquement
          // Tu peux éventuellement forcer un reload ou charger des données protégées ici
        },
        error: (err) => {
          // Affiche une erreur ou redirige vers une page de login
        }
      });
    }
  }
}
