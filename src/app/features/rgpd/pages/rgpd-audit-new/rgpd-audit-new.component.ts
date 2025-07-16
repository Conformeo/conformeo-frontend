import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RgpdService } from '../../rgpd.service'
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rgpd-audit-new',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, FormsModule, MatButtonModule],
  templateUrl: './rgpd-audit-new.component.html',
  styleUrls: ['./rgpd-audit-new.component.scss']
})
export class RgpdAuditNewComponent implements OnInit {
  exigences: any[] = [];
  reponses: { [key: string]: string } = {};
  loading = true;
  saving = false;
  success = false;
  error = false;

  constructor(
    private rgpdService: RgpdService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
    // Charge dynamiquement les exigences
    this.rgpdService.getExigences().subscribe({
      next: exigences => {
        this.exigences = exigences;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  submit() {
    this.saving = true;
    this.success = false;
    this.error = false;

    const userId = this.authService.getUserId();
    if (!userId) {
      this.error = true;
      this.saving = false;
      return;
    }
    // Prépare la structure à envoyer : adapte si nécessaire !
    const audit = {
      user_id: userId,
      company_id: 1, // À adapter si sélection d'une société
      statut: 'EN_COURS',
      exigences: this.exigences.map(ex => ({
        exigence_id: ex.id,
        answer: this.reponses[ex.id] || null
      }))
    };

    this.rgpdService.createAudit(audit).subscribe({
      next: (createdAudit) => {
        this.saving = false;
        this.success = true;
        // Redirige vers la page détail de l’audit nouvellement créé
        this.router.navigate(['/rgpd/audit', createdAudit.id]);
      },
      error: () => {
        this.error = true;
        this.saving = false;
      }
    });
  }
}
