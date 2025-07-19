import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RgpdService } from '../../rgpd.service';
import { Router } from '@angular/router';

interface Exigence {
  id: number;
  label: string;
  priority?: number;
}

@Component({
  selector: 'app-rgpd-audit-new',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './rgpd-audit-new.component.html',
  styleUrls: ['./rgpd-audit-new.component.scss'],
})
export class RgpdAuditNewComponent implements OnInit {
  exigences: Required<Exigence>[] = [];
  grouped: { [priority: number]: Required<Exigence>[] } = {};

  /** FormGroup global (tous les contrôles) */
  masterForm!: FormGroup;
  /** Un sous‑groupe par priorité, utilisé comme stepControl */
  stepGroups: FormGroup[] = [];

  loading = true;
  saving = false;
  success = false;
  error = false;

  constructor(
    private fb: FormBuilder,
    private rgpd: RgpdService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.fetchExigences();
  }

  

  private mapAnswer(v: 'conforme'|'non_conforme'|'non_applicable') {
    return v; // plus de conversion nécessaire – backend accepte les minuscules
  }


  private fetchExigences(): void {
    this.rgpd.getExigences().subscribe({
      next: (raw) => {
        // ➊ mapping + priorité par défaut
        this.exigences = (raw as Exigence[]).map((e, idx) => ({
          id: e.id,
          label: e.label,
          priority: e.priority ?? (idx < 5 ? 1 : idx < 12 ? 2 : idx < 18 ? 3 : 4),
        })) as Required<Exigence>[];

        // ➋ regroupement
        for (const ex of this.exigences) {
          if (!this.grouped[ex.priority]) this.grouped[ex.priority] = [];
          this.grouped[ex.priority].push(ex);
        }

        // ➌ FormGroup principal
        const controls: Record<string, any> = {};
        this.exigences.forEach((ex) => (controls[String(ex.id)] = ['', Validators.required]));
        this.masterForm = this.fb.group(controls);

        // ➍ sous‑groupes pour le stepper
        for (let p = 1; p <= 4; p++) {
          const sub = this.fb.group({});
          (this.grouped[p] || []).forEach((ex) => {
            sub.addControl(String(ex.id), this.masterForm.get(String(ex.id))!);
          });
          this.stepGroups.push(sub);
        }

        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = true;
      },
    });
  }

  isAuditReady(): boolean {
    // retourne true si chaque exigence a une valeur non vide
    return this.exigences.every(
      (ex) => !!this.masterForm.get(String(ex.id))?.value,
    );
  }

  submit(): void {
    if (!this.isAuditReady()) return;
    this.saving = true;

    const payload = {
      titre: 'Audit ' + new Date().toLocaleDateString('fr-FR'),
      statut: 'EN_COURS',
      exigences: this.exigences.map(ex => ({
        exigence_id: ex.id,
        answer: this.mapAnswer(this.masterForm.get(String(ex.id))!.value as any),
      })),
    };

    this.rgpd.createAudit(payload).subscribe({
      next: () => this.router.navigate(['/rgpd/history']),
      error: err => {
        console.error(err.error.detail);   // ← voir la cause exacte si 422
        this.error = true;
        this.saving = false;
      },
    });
  }
}