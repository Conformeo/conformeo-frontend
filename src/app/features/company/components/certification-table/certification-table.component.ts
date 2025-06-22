import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { IconsModule }   from '../../../../icons/icons.module';
import { Certification } from '../../../../models/certification.model';

/* mêmes statuts que pour Extincteurs */
export type CertStatus = 'VALID' | 'RENEW' | 'NOT_OBTAINED';

@Component({
  selector   : 'app-certification-table',
  standalone : true,
  imports    : [CommonModule, FormsModule, IconsModule],
  templateUrl: './certification-table.component.html',
})
export class CertificationTableComponent {
  @Input() data: Certification[] = [];

  /** signale l’élément sélectionné pour édition */
  @Output() edit = new EventEmitter<Certification>();

  

  /* ---------------- recherche ---------------- */
  query = '';

  get filtered(): Certification[] {
    const q = this.query.trim().toLowerCase();
    return this.data
      .filter(c =>
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.status.toLowerCase().includes(q)
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  /* ---------------- helpers UI ---------------- */
  icon(s: CertStatus)  {
    return s === 'VALID' ? 'check-circle'
         : s === 'RENEW' ? 'alert-triangle'
         : /* NOT_OBTAINED */ 'x-circle';
  }
  color(s: CertStatus) {
    return s === 'VALID' ? 'text-emerald-600'
         : s === 'RENEW' ? 'text-amber-500'
         : /* NOT_OBTAINED */ 'text-rose-600';
  }

  /* ---------------- événement édition ---------------- */
  emitEdit(cert: Certification) {
    this.edit.emit(cert);
  }

  isValidDate(val: any): boolean {
    return !!val && !isNaN(Date.parse(val));
  }

}
