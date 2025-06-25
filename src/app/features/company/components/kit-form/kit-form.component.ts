import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirstAidKit } from '../../../../models/first-aid-kit.model';
import { KitApi } from '../../../../core/api/kit.api';

@Component({
  selector: 'app-kit-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './kit-form.component.html',
  styleUrls: ['./kit-form.component.scss'],
})
export class KitFormComponent implements OnInit {
  @Input() kit?: FirstAidKit;
  @Output() saved = new EventEmitter<void>();

  form!: FormGroup<{
    site: FormControl<string>;
    expiry: FormControl<string>;
    state: FormControl<'OK' | 'EXPIRED'>;
    notes: FormControl<string>;
  }>;

  constructor(
    private fb: NonNullableFormBuilder,
    private api: KitApi,
    private snack: MatSnackBar
  ) {
    this.form = this.fb.group({
      site:   this.fb.control('', Validators.required),
      expiry: this.fb.control('', Validators.required),
      state:  this.fb.control<'OK'|'EXPIRED'>('OK', Validators.required),
      notes:  this.fb.control(''),
    });
  }

  ngOnInit() {
    if (this.kit) this.form.patchValue(this.kit as any);
  }

  cancel() { this.saved.emit(); }

  submit() {
    if (this.form.invalid) return;
    const value = this.form.getRawValue();
    const kit: FirstAidKit = {
      id: this.kit?.id ?? Math.random().toString(36).slice(2,9),
      ...value
    };
    const req$ = this.kit
      ? this.api.update(kit.id, kit)
      : this.api.create(kit);
    req$.subscribe({
      next: () => {
        this.snack.open('Trousse enregistrée ✅', '', { duration: 2000 });
        this.saved.emit();
      },
      error: err => this.snack.open(err?.message || 'Erreur serveur', '', { duration: 3000 }),
    });
  }
}
