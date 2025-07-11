import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

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

  ngOnInit() {
    // Remplace cette partie par un appel à ton API pour charger les exigences
    setTimeout(() => {
      this.exigences = [
        { id: 1, titre: 'Registre des traitements à jour' },
        { id: 2, titre: 'Mentions légales RGPD présentes' },
        { id: 3, titre: 'Procédure de violation documentée' }
      ];
      this.loading = false;
    }, 300);
  }

  submit() {
    this.saving = true;
    this.success = false;
    this.error = false;

    // Simule un POST vers l’API (remplace par un vrai appel à ton backend)
    setTimeout(() => {
      // Imite un succès ou une erreur
      const ok = Math.random() > 0.15;
      this.saving = false;
      this.success = ok;
      this.error = !ok;
      if (ok) this.reponses = {}; // reset form
    }, 800);
  }
}
