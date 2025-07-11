import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { DpoService } from '../../dpo.service';
import { ObligationService } from '../../obligation.service';
import { Obligation } from '../../../../models/obligation';

@Component({
  selector: 'app-rgpd-procedure',
  standalone: true,
  imports: [
    CommonModule, NgIf, NgFor,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
  ],
  templateUrl: './rgpd-procedure.component.html',
  styleUrls: ['./rgpd-procedure.component.scss']
})
export class RgpdProcedureComponent implements OnInit {
  @Input() userId!: number;

  dpo: any = null;
  loading = true;
  showDpoForm = false;
  dpoForm = {
    nom: '', 
    email: '', 
    telephone: '', 
    designation_date: '', 
    is_external: false,
  };

  obligations: Obligation[] = [];

  constructor(
    private dpoService: DpoService,
    private obligationService: ObligationService,
    private snackBar: MatSnackBar

  ) {}

  ngOnInit() {
    this.loadDpo();
    this.loadObligations();
  }

  loadDpo() {
    this.loading = true;
    this.dpoService.getDpo(this.userId).subscribe({
      next: (dpo: any) => {
        this.dpo = dpo || null;
        this.loading = false;
      },
      error: () => { 
        this.dpo = null; 
        this.loading = false; 
      }
    });
  }

  showForm() {
    if (this.dpo) {
      this.dpoForm = { 
        nom: this.dpo.nom, 
        email: this.dpo.email, 
        telephone: this.dpo.telephone, 
        designation_date: this.dpo.designation_date,
        is_external: this.dpo.is_external 
      };
    } else {
      this.dpoForm = { nom: '', email: '', telephone: '', designation_date: '', is_external: false };
    }
    this.showDpoForm = true;
  }

  saveDpo() {
    if (this.dpo) {
      this.dpoService.updateDpo(this.dpo.id, this.dpoForm).subscribe({
        next: (dpo: any) => { 
          this.dpo = dpo; 
          this.showDpoForm = false; 
        },
        error: () => alert('Erreur lors de la sauvegarde du DPO')
      });
    } else {
      const data = { ...this.dpoForm, user_id: this.userId };
      this.dpoService.createDpo(data).subscribe({
        next: (dpo: any) => { 
          this.dpo = dpo; 
          this.showDpoForm = false; 
        },
        error: () => alert('Erreur lors de la création du DPO')
      });
    }
  }

  deleteDpo() {
    if (!this.dpo) return;
    if (confirm('Supprimer ce DPO ?')) {
      this.dpoService.deleteDpo(this.dpo.id!).subscribe(() => {
        this.dpo = null;
      });
    }
  }

  cancelDpoForm() {
    this.showDpoForm = false;
  }

  // Obligations 
  newObligationLabel: string = '';

  addObligation() {
    if (!this.newObligationLabel) return;
    this.obligationService.create({
      label: this.newObligationLabel,
      user_id: this.userId,
      status: false
    }).subscribe(ob => {
      this.obligations.push(ob);
      this.newObligationLabel = '';
    });
  }

  loadObligations() {
    this.obligationService.list(this.userId).subscribe({
      next: (obligs) => this.obligations = obligs,
      error: () => this.obligations = []
    });
  }

  updateObligationStatus(ob: Obligation, checked: boolean) {
    this.obligationService.update(ob.id, {
      status: checked,
      last_update: new Date().toISOString().substring(0,10)
    }).subscribe(updatedOb => {
      ob.status = updatedOb.status;
      ob.last_update = updatedOb.last_update;
    });
  }

  deleteObligation(ob: Obligation) {
    if (confirm('Supprimer cette obligation ?')) {
      this.obligationService.delete(ob.id).subscribe({
        next: () => {
          this.obligations = this.obligations.filter(o => o.id !== ob.id);
          this.snackBar.open('Obligation supprimée', 'OK', { duration: 2000 });
        },
        error: () => {
          this.snackBar.open('Erreur lors de la suppression', 'Fermer', { duration: 3000 });
        }
      });
    }
  }

  exportPdf() {
    const url = `/api/rgpd/export-pdf?user_id=${this.userId}`;
    window.open(url, '_blank');
  }

}
