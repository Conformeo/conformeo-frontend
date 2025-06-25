import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Certification } from '../../../../models/certification.model';
import { CertificationApi } from '../../../../core/api/certification.api';

@Component({
  selector: 'app-certification-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './certification-form.component.html',
  styleUrls: ['./certification-form.component.scss'],
})
export class CertificationFormComponent implements OnInit {
  @Input() certification?: Certification;
  @Output() saved = new EventEmitter<void>();

  form!: FormGroup<{
    name: FormControl<string>;
    validUntil: FormControl<string>;
    status: FormControl<'VALID' | 'RENEW' | 'NOT_OBTAINED'>;
    notes: FormControl<string>;
  }>;

  constructor(
    private fb: NonNullableFormBuilder,
    private api: CertificationApi,
    private snack: MatSnackBar
  ) {
    this.form = this.fb.group({
      name:       this.fb.control('', Validators.required),
      validUntil: this.fb.control('', Validators.required),
      status:     this.fb.control<'VALID'|'RENEW'|'NOT_OBTAINED'>('VALID', Validators.required),
      notes:      this.fb.control(''),
    });
  }

  ngOnInit() {
    if (this.certification) this.form.patchValue(this.certification as any);
  }

  cancel() { this.saved.emit(); }

  submit() {
    if (this.form.invalid) return;
    const value = this.form.getRawValue();
    const cert: Certification = {
      id: this.certification?.id ?? Math.random().toString(36).slice(2,9),
      ...value
    };
    const req$ = this.certification
      ? this.api.update(cert.id, cert)
      : this.api.create(cert);
    req$.subscribe({
      next: () => {
        this.snack.open('Certification enregistrée ✅', '', { duration: 2000 });
        this.saved.emit();
      },
      error: err => this.snack.open(err?.message || 'Erreur serveur', '', { duration: 3000 }),
    });
  }
}
