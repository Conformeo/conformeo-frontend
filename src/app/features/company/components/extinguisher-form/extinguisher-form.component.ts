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
import { ExtinguisherApi }  from '../../../../core/api/extinguisher.api';
import { dateOrder }        from '../../../../shared/validators/date-order.validator';

/* ------------------------------------------------------------------ */
/** Champs éditables réellement présents dans votre modèle */
type EditableKey = Extract<
  keyof FireExtinguisher,
  'location' | 'serialNumber' | 'lastControl' | 'nextControl'
>;
type ExtinguisherDto = Pick<FireExtinguisher, EditableKey>;
/* ------------------------------------------------------------------ */

@Component({
  selector   : 'app-extinguisher-form',
  standalone : true,
  imports    : [CommonModule, ReactiveFormsModule, IconsModule],
  templateUrl: './extinguisher-form.component.html',
  styleUrls  : ['./extinguisher-form.component.scss'],
})
export class ExtinguisherFormComponent implements OnInit {

  /** création si `undefined`, sinon édition */
  @Input()  extinguisher?: FireExtinguisher;
  @Output() saved = new EventEmitter<void>();

  /** regex simple : 2 lettres + 6 chiffres (ex : AB123456) */
  private readonly serialRx = /^[A-Z]{2}\d{6}$/;

  form!: FormGroup<{
    location     : FormControl<string>;
    serialNumber : FormControl<string>;
    lastControl  : FormControl<string>;
    nextControl  : FormControl<string>;
  }>;

  constructor(
    private fb   : NonNullableFormBuilder,
    private api  : ExtinguisherApi,
    private snack: MatSnackBar,
  ) {
    this.createForm();   // ← `fb` est déjà dispo ici
  }

  /* ------------------------------------------------------------------ */
  private createForm(): void {
    this.form = this.fb.group(
      {
        location     : ['', [Validators.required, Validators.maxLength(50)]],
        serialNumber : ['', [Validators.required, Validators.pattern(this.serialRx)]],
        lastControl  : ['', Validators.required],   // yyyy-MM-dd
        nextControl  : ['', Validators.required],
      },
      { validators: dateOrder('lastControl', 'nextControl') },
    );
  }

  ngOnInit(): void {
    if (this.extinguisher) {
      const { id, status, ...editable } = this.extinguisher;
      this.form.patchValue(editable);
    }
  }

  /* ------------------------------------------------------------------ */
  cancel(): void { this.saved.emit(); }

  isInvalid(ctrl: keyof typeof this.form.controls): boolean {
    const c = this.form.controls[ctrl];
    return c.invalid && (c.dirty || c.touched);
  }

  /* message d’erreur simplifié */
  err(ctrl: keyof typeof this.form.controls): string | null {
    if (!this.isInvalid(ctrl)) return null;
    const e = this.form.controls[ctrl].errors!;
    if (e['required'])  return 'Champ obligatoire';
    if (e['pattern'])   return 'Format invalide';
    if (e['maxlength']) return 'Trop long';
    return null;
  }

  invalid(ctrl: keyof typeof this.form.controls): boolean {   // ← ancien isInvalid
    return this.isInvalid(ctrl);
  }

  errMsg(ctrl: keyof typeof this.form.controls): string | null { // ← ancien err
    return this.err(ctrl);
  }
  /* ------------------------------------------------------------------ */
  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dto: ExtinguisherDto = this.form.getRawValue();

    const req$ = this.extinguisher
      ? this.api.update(this.extinguisher.id!, dto)
      : this.api.create(dto);

    req$.subscribe({
      next : () => {
        this.snack.open('Extincteur enregistré ✅', 'Fermer', { duration: 3000 });
        this.saved.emit();
      },
      error: (err: any) => this.snack.open(
        err?.message ?? 'Erreur serveur',
        'Fermer',
        { duration: 4000, panelClass: ['bg-rose-600', 'text-white'] },
      ),
    });
  }
}
