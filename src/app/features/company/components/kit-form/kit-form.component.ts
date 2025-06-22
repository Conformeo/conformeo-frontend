// src/app/features/company/components/kit-form/kit-form.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IconsModule } from '../../../../icons/icons.module';
import { FirstAidKit } from '../../../../models/first-aid-kit.model';
import { KitApi } from '../../../../core/api/first-aid-kit.api';

type EditableKey = Extract<keyof FirstAidKit, 'site' | 'expiry'>;
type KitDto = Pick<FirstAidKit, EditableKey>;

@Component({
  selector: 'app-kit-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconsModule],
  templateUrl: './kit-form.component.html',
  styleUrls: ['./kit-form.component.scss'],
})
export class KitFormComponent implements OnInit {
  @Input() kit?: FirstAidKit;
  @Output() saved = new EventEmitter<void>();

  form!: FormGroup<{
    site: FormControl<string>;
    expiry: FormControl<string>;
  }>;

  constructor(
    private fb: NonNullableFormBuilder,
    private api: KitApi,
    private snack: MatSnackBar
  ) {
    this.form = this.fb.group({
      site: ['', Validators.required],
      expiry: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.kit) {
      this.form.patchValue(this.kit as any);
    }
  }

  cancel() {
    this.saved.emit();
  }

  submit() {
    if (this.form.invalid) return;
    const dto: KitDto = this.form.getRawValue();
    const obs = this.kit
      ? this.api.update(this.kit.id!, dto)
      : this.api.create(dto);
    obs.subscribe({
      next: () => {
        this.snack.open('Trousse enregistrée ✅', 'Fermer', { duration: 3000 });
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
