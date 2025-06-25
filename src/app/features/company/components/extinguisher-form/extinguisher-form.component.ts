import {
  Component, Input, Output, EventEmitter, OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  Validators,
  NonNullableFormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { IconsModule } from '../../../../icons/icons.module';

import { FireExtinguisher } from '../../../../models/fire-extinguisher.model';
import { ExtinguisherApi } from '../../../../core/api/extinguisher.api';
import { dateOrder } from '../../../../shared/validators/date-order.validator';

@Component({
  selector: 'app-extinguisher-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconsModule],
  templateUrl: './extinguisher-form.component.html',
  styleUrls: ['./extinguisher-form.component.scss'],
})
export class ExtinguisherFormComponent implements OnInit {

  @Input() extinguisher?: FireExtinguisher;
  @Output() saved = new EventEmitter<FireExtinguisher>();

  form!: FormGroup<{
  location: FormControl<string>;
  serialNumber: FormControl<string>;
  lastControl: FormControl<string>;
  nextControl: FormControl<string>;
  status: FormControl<'OK' | 'DUE' | 'TO_SCHEDULE'>;
}>;


  constructor(
    private fb: NonNullableFormBuilder,
    private api: ExtinguisherApi,
    private snack: MatSnackBar,
  ) {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.fb.group({
      location:      this.fb.control<string>('',     { validators: [Validators.required, Validators.maxLength(50)] }),
      serialNumber:  this.fb.control<string>('',     { validators: [Validators.required] }),
      lastControl:   this.fb.control<string>('',     { validators: [Validators.required] }),
      nextControl:   this.fb.control<string>('',     { validators: [Validators.required] }),
      status:        this.fb.control<'OK' | 'DUE' | 'TO_SCHEDULE'>('OK', { validators: [Validators.required] }),
    }, { validators: dateOrder('lastControl', 'nextControl') });
  }


  ngOnInit(): void {
    if (this.extinguisher) {
      // On ignore l'id qui ne doit pas être modifié par le form
      const { id, ...editable } = this.extinguisher;
      this.form.patchValue(editable as any);
    }
  }

  cancel(): void { this.saved.emit(); }

  invalid(ctrl: keyof typeof this.form.controls): boolean {
    const c = this.form.controls[ctrl];
    return c.invalid && (c.dirty || c.touched);
  }


  errMsg(ctrl: keyof typeof this.form.controls): string | null {
    if (!this.invalid(ctrl)) return null;
    const e = this.form.controls[ctrl].errors!;
    if (e['required']) return 'Champ obligatoire';
    if (e['pattern']) return 'Format invalide';
    if (e['maxlength']) return 'Trop long';
    return null;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Mapping pour correspondre à ton modèle d'affichage
    const formValue = this.form.getRawValue();
    const newExt: FireExtinguisher = {
      id: this.extinguisher?.id ?? Math.random().toString(36).slice(2, 9),
      location: formValue.location,
      serialNumber: formValue.serialNumber,
      lastControl: formValue.lastControl,
      nextControl: formValue.nextControl,
      status: formValue.status, // Type OK car form control typé
    };

    // Ajout ou update selon présence d'un id
    const req$ = this.extinguisher
      ? this.api.update(newExt.id, newExt)
      : this.api.create(newExt);

    req$.subscribe({
      next: () => {
        this.snack.open('Extincteur enregistré ✅', 'Fermer', { duration: 3000 });
        this.saved.emit(newExt);
      },
      error: (err: any) => this.snack.open(
        err?.message ?? 'Erreur serveur',
        'Fermer',
        { duration: 4000, panelClass: ['bg-rose-600', 'text-white'] },
      ),
    });
  }
}
