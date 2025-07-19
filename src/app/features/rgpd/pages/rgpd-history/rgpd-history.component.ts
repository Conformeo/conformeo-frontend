// -----------------------------------------------------------------------------
// rgpd-history.component.ts (Angular standalone component)
// -----------------------------------------------------------------------------
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RgpdService } from '../../rgpd.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-rgpd-history',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './rgpd-history.component.html',
  styleUrls: ['./rgpd-history.component.scss']
})
export class RgpdHistoryComponent implements OnInit {
  audits: any[] = [];
  loading = true;
  error = false;

  constructor(
    private rgpdService: RgpdService,
    private authService: AuthService
  ) {}

  /**
   * Charge l’historique des audits RGPD de l’utilisateur connecté.
   * Si l’identifiant n’est pas disponible (cas très rare quand le token
   * n’a pas encore été stocké), on affiche simplement l’état vide.
   */
  ngOnInit() {
    const userId = this.authService.getUserId();
    if (!userId) {
      this.loading = false;
      return;
    }

    this.rgpdService.getAudits().subscribe({
      next: (audits) => {
        this.audits = audits ?? [];
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.audits = [];
        this.loading = false;
      }
    });
  }
}