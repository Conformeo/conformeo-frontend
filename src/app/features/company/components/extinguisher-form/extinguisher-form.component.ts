import {
  Component, Input, Output, EventEmitter, OnInit,
} from '@angular/core';
import { CommonModule }                 from '@angular/common';
import {
  ReactiveFormsModule, Validators,
  NonNullableFormBuilder, FormGroup,
  FormControl
} from '@angular/forms';

import { MatSnackBar }                  from '@angular/material/snack-bar';
import { IconsModule }                  from '../../../../icons/icons.module';

import { FireExtinguisher }             from '../../../../models/fire-extinguisher.model';
import { ExtinguisherApi }              from '../../../../core/api/extinguisher.api';

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

  /** création si undefined, sinon édition */
  @Input()  extinguisher?: FireExtinguisher;
  @Output() saved = new EventEmitter<void>();

  /** FormGroup initialisée dans le ctor (après que fb existe) */
  form!: FormGroup<{
    location    : FormControl<string>;
    serialNumber: FormControl<string>;
    lastControl : FormControl<string>;
    nextControl : FormControl<string>;
  }>;

  constructor(
    private fb   : NonNullableFormBuilder,
    private api  : ExtinguisherApi,
    private snack: MatSnackBar,
  ) {
    this.createForm();          // ← fb déjà disponible ici
  }

  private createForm() {
    this.form = this.fb.group({
      location     : ['', Validators.required],
      serialNumber : ['', Validators.required],
      lastControl  : ['', Validators.required],   // yyyy-MM-dd
      nextControl  : ['', Validators.required],
    });
  }

  /* ------------------------------------------------------------------ */
  ngOnInit() {
    if (this.extinguisher) this.form.patchValue(this.extinguisher);
  }

  cancel() { this.saved.emit(); }

  isInvalid(ctrl: keyof typeof this.form.controls): boolean {
    const c = this.form.controls[ctrl];
    return c.invalid && (c.dirty || c.touched);
  }

  submit(): void {
    if (this.form.invalid) return;

    const dto: ExtinguisherDto = this.form.getRawValue();

    const obs = this.extinguisher
      ? this.api.update(this.extinguisher.id!, dto)
      : this.api.create(dto);

    obs.subscribe({
      next : () => {
        this.snack.open('Extincteur enregistré ✅', 'Fermer', { duration: 3000 });
        this.saved.emit();
      },
      /*     ↓↓↓  ajout du type  */
      error: (err: any) =>
        this.snack.open(
          err?.message || 'Erreur serveur',
          'Fermer',
          { duration: 4000, panelClass: ['bg-rose-600', 'text-white'] },
        ),
    });
  }
}
