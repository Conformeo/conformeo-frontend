import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Insurance } from '../../../../models/insurance.model';
import { InsuranceApi } from '../../../../core/api/insurance.api';

@Component({
  selector: 'app-insurance-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './insurance-form.component.html',
  styleUrls: ['./insurance-form.component.scss'],
})
export class InsuranceFormComponent implements OnInit {
  @Input() insurance?: Insurance;
  @Output() saved = new EventEmitter<void>();

  form!: FormGroup<{
    type: FormControl<string>;
    provider: FormControl<string>;
    validUntil: FormControl<string>;
    policyNumber: FormControl<string>;
  }>;

  constructor(
    private fb: NonNullableFormBuilder,
    private api: InsuranceApi,
    private snack: MatSnackBar
  ) {
    this.form = this.fb.group({
      type:         this.fb.control('', Validators.required),
      provider:     this.fb.control('', Validators.required),
      validUntil:   this.fb.control('', Validators.required),
      policyNumber: this.fb.control(''),
    });
  }

  ngOnInit() {
    if (this.insurance) this.form.patchValue(this.insurance as any);
  }

  cancel() { this.saved.emit(); }

  submit() {
    if (this.form.invalid) return;
    const value = this.form.getRawValue();
    const ins: Insurance = {
      id: this.insurance?.id ?? Math.random().toString(36).slice(2,9),
      ...value
    };
    const req$ = this.insurance
      ? this.api.update(ins.id, ins)
      : this.api.create(ins);
    req$.subscribe({
      next: () => {
        this.snack.open('Assurance enregistrée ✅', '', { duration: 2000 });
        this.saved.emit();
      },
      error: err => this.snack.open(err?.message || 'Erreur serveur', '', { duration: 3000 }),
    });
  }
}
