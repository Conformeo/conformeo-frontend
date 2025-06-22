// src/app/features/company/components/insurance-form/insurance-form.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IconsModule } from '../../../../icons/icons.module';
import { Insurance } from '../../../../models/insurance.model';
import { InsuranceApi } from '../../../../core/api/insurance.api';

type EditableKey = Extract<keyof Insurance, 'provider' | 'validUntil'>;
type InsuranceDto = Pick<Insurance, EditableKey>;

@Component({
  selector: 'app-insurance-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconsModule],
  templateUrl: './insurance-form.component.html',
  styleUrls: ['./insurance-form.component.scss'],
})
export class InsuranceFormComponent implements OnInit {
  @Input() insurance?: Insurance;
  @Output() saved = new EventEmitter<void>();

  form!: FormGroup<{
    provider: FormControl<string>;
    validUntil: FormControl<string>;
  }>;

  constructor(
    private fb: NonNullableFormBuilder,
    private api: InsuranceApi,
    private snack: MatSnackBar
  ) {
    this.form = this.fb.group({
      provider: ['', Validators.required],
      validUntil: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.insurance) {
      this.form.patchValue(this.insurance as any);
    }
  }

  cancel() {
    this.saved.emit();
  }

  submit() {
    if (this.form.invalid) return;
    const dto: InsuranceDto = this.form.getRawValue();
    const obs = this.insurance
      ? this.api.update(this.insurance.id!, dto)
      : this.api.create(dto);
    obs.subscribe({
      next: () => {
        this.snack.open('Assurance enregistrée ✅', 'Fermer', { duration: 3000 });
        this.saved.emit();
      },
      error: (err: any) => {
        this.snack.open(
          err?.message || 'Erreur serveur',
          'Fermer',
          { duration: 4000, panelClass: ['bg-rose-600', 'text-white'] }
        );
      }
    });
  }
}
