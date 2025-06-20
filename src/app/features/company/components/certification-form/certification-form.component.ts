// src/app/features/company/components/certification-form/certification-form.component.ts
import {
  Component, Input, Output, EventEmitter, OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule, Validators,
  NonNullableFormBuilder, FormGroup, FormControl,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IconsModule }  from '../../../../icons/icons.module';

import { Certification } from '../../../../models/certification.model';
import { CertificationApi } from '../../../../core/api/certification.api';

/* Champs éditables --------------------------------------------------- */
type EditableKey = Extract<keyof Certification, 'name' | 'validUntil'>;
type CertificationDto = Pick<Certification, EditableKey>;

@Component({
  selector   : 'app-certification-form',
  standalone : true,
  imports    : [CommonModule, ReactiveFormsModule, IconsModule],
  templateUrl: './certification-form.component.html',
})
export class CertificationFormComponent implements OnInit {

  @Input()  certification?: Certification;
  @Output() saved = new EventEmitter<void>();

  form!: FormGroup<{
    name      : FormControl<string>;
    validUntil: FormControl<string>;
  }>;

  constructor(
    private fb   : NonNullableFormBuilder,
    private api  : CertificationApi,
    private snack: MatSnackBar,
  ) { this.createForm(); }

  private createForm() {
    this.form = this.fb.group({
      name      : ['', Validators.required],
      validUntil: ['', Validators.required],  // yyyy-MM-dd
    });
  }

  ngOnInit() {
    if (this.certification) this.form.patchValue(this.certification);
  }

  cancel() { this.saved.emit(); }

  submit() {
    if (this.form.invalid) return;

    const dto: CertificationDto = this.form.getRawValue();

    const obs = this.certification
      ? this.api.update(this.certification.id!, dto)
      : this.api.create(dto);

    obs.subscribe({
      next : () => {
        this.snack.open('Certification enregistrée ✅', 'Fermer', { duration: 3000 });
        this.saved.emit();
      },
      error: (err: any) =>
        this.snack.open(err?.message || 'Erreur serveur', 'Fermer',
          { duration: 4000, panelClass: ['bg-rose-600', 'text-white'] }),
    });
  }
}
