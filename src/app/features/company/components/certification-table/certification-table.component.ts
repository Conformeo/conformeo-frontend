// features/company/components/certification-table/certification-table.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule }     from '@angular/common';
import { FormsModule }      from '@angular/forms';
import { IconsModule }      from '../../../../icons/icons.module';

import { Certification }    from '../../../../models/certification.model';
import { CertStatus }       from '../../../../models/certification.model'; // ou votre enum

@Component({
  selector   : 'app-certification-table',
  standalone : true,
  imports    : [CommonModule, FormsModule, IconsModule],
  templateUrl: './certification-table.component.html',
})
export class CertificationTableComponent {

  @Input() data: Certification[] = [];

  /* ---------------- barre de recherche ---------------- */
  query = '';

  get filtered(): Certification[] {
    const q = this.query.toLowerCase().trim();
    return this.data
      .filter(c =>
        !q ||
        c.name.toLowerCase().includes(q) ||
        (c.validUntil ?? '').includes(q) ||
        c.status.toLowerCase().includes(q)
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  /* helpers pour l’icône ------------------------------------------------- */
  icon(s: CertStatus)  {
    return s === 'VALID' ? 'check'
         : s === 'RENEW' ? 'alert-triangle'
         : /* NOT_OBTAINED */ 'x';
  }

  color(s: CertStatus) {
    return s === 'VALID' ? 'text-emerald-600'
         : s === 'RENEW' ? 'text-amber-500'
         :                'text-rose-600';
  }
}
