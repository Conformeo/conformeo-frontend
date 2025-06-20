import {
  Component, Input, Output, EventEmitter, OnInit, inject,
}                     from '@angular/core';      // ← inject !
import { CommonModule } from '@angular/common';
import {
  FormBuilder, ReactiveFormsModule, Validators,
}                     from '@angular/forms';
import { MatSnackBar }  from '@angular/material/snack-bar';
import { IconsModule }  from '../../../../icons/icons.module';

import { Certification }  from '../../../../models/certification.model';
import { CertificationApi } from '../../../../core/api/certification.api';

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

export type CertStatus = 'VALID' | 'RENEW' | 'NOT_OBTAINED';

type EditableCertKey = Extract<
  keyof Certification,
  'name' | 'validUntil' | 'status'
>;
export type CertificationDto = Pick<Certification, EditableCertKey>;

/* ------------------------------------------------------------------ */
/*  Composant                                                         */
/* ------------------------------------------------------------------ */

@Component({
  selector   : 'app-certification-form',
  standalone : true,
  imports    : [CommonModule, ReactiveFormsModule, IconsModule],
  templateUrl: './certification-form.component.html',
  styleUrls  : ['./certification-form.component.scss'],
})
export class CertificationFormComponent implements OnInit {
  @Input()  cert?: Certification;
  @Output() saved = new EventEmitter<void>();

  private readonly fb    = inject(FormBuilder);
  private readonly api   = inject(CertificationApi);
  private readonly snack = inject(MatSnackBar);

  form = this.fb.nonNullable.group({
    name      : ['', Validators.required],
    validUntil: ['', Validators.required],   // yyyy-MM-dd
    status    : ['NOT_OBTAINED' as CertStatus],
  });

  ngOnInit(): void {
    if (this.cert) this.form.patchValue(this.cert);
  }

  /* ---------------- helpers ------------------- */
  cancel(): void { this.saved.emit(); }

  isInvalid(ctrl: keyof CertificationDto): boolean {
    const c = this.form.get(ctrl as string)!;
    return c.invalid && (c.dirty || c.touched);
  }

  /* ---------------- submit -------------------- */
  submit(): void {
    if (this.form.invalid) return;

    const dto: CertificationDto = this.form.getRawValue();

    const obs = this.cert
      ? this.api.update(this.cert.id!, dto)
      : this.api.create(dto);

    obs.subscribe({
      next : () => {
        this.snack.open('Certification enregistrée ✅', 'Fermer', { duration: 3000 });
        this.saved.emit();
      },
      error: (err: unknown) => {
        const msg = (err as { message?: string })?.message ?? 'Erreur serveur';
        this.snack.open(msg, 'Fermer', {
          duration  : 4000,
          panelClass: ['bg-rose-600', 'text-white'],
        });
      },
    });
  }
}
