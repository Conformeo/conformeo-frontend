import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RgpdService } from '../../rgpd.service';

@Component({
  selector: 'app-rgpd-exigence-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatInputModule, MatIconModule],
  templateUrl: './rgpd-exigence-admin.component.html',
  styleUrls: ['./rgpd-exigence-admin.component.scss']
})
export class RgpdExigenceAdminComponent implements OnInit {
  exigences: any[] = [];
  newLabel = '';
  editing: { [key: number]: boolean } = {};
  editedLabel: { [key: number]: string } = {};
  loading = true;
  error = '';

  constructor(private rgpdService: RgpdService) {}

  ngOnInit() {
    this.loadExigences();
  }

  loadExigences() {
    this.loading = true;
    this.rgpdService.getExigences().subscribe({
      next: exs => { this.exigences = exs; this.loading = false; },
      error: () => { this.error = "Erreur de chargement"; this.loading = false; }
    });
  }

  addExigence() {
    if (!this.newLabel.trim()) return;
    this.rgpdService.addExigence({ label: this.newLabel }).subscribe({
      next: ex => { this.exigences.push(ex); this.newLabel = ''; },
      error: () => { this.error = "Erreur lors de l’ajout"; }
    });
  }

  startEdit(exigence: any) {
    this.editing[exigence.id] = true;
    this.editedLabel[exigence.id] = exigence.label;
  }

  saveEdit(exigence: any) {
    const newLabel = this.editedLabel[exigence.id];
    this.rgpdService.updateExigence(exigence.id, { label: newLabel }).subscribe({
      next: updated => {
        exigence.label = updated.label;
        this.editing[exigence.id] = false;
      },
      error: () => { this.error = "Erreur lors de la mise à jour"; }
    });
  }

  cancelEdit(exigence: any) {
    this.editing[exigence.id] = false;
  }

  deleteExigence(exigence: any) {
    if (!confirm('Supprimer cette exigence ?')) return;
    this.rgpdService.deleteExigence(exigence.id).subscribe({
      next: () => this.exigences = this.exigences.filter(e => e.id !== exigence.id),
      error: () => { this.error = "Erreur lors de la suppression"; }
    });
  }
}
