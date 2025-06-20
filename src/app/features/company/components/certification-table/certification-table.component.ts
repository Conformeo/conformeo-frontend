import { Component, Input } from '@angular/core';
import { CommonModule }     from '@angular/common';

import { TableWrapperComponent }   from '../../../../shared/table-wrapper/table-wrapper.component';
import { Certification }           from '../../../../models/certification.model';
import { IconsModule }  from '../../../../icons/icons.module';

@Component({
  selector: 'app-certification-table',
  standalone: true,
  imports: [
    CommonModule,
    TableWrapperComponent,
    IconsModule
  ],
  template: `
    <app-table-wrapper>
      <table class="w-full text-sm">
        <thead class="bg-slate-100">
          <tr>
            <th>Certification</th>
            <th>Valide jusqu’au</th>
            <th class="text-center">Statut</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let c of rows" class="border-b">
            <td>{{ c.name }}</td>
            <td>{{ c.validUntil }}</td>
            <td class="text-center">
              <lucide-icon name="check"
                           *ngIf="c.status==='VALID'"
                           class="text-green-600 inline" size="16">
              </lucide-icon>

              <lucide-icon name="alert-triangle"
                           *ngIf="c.status==='RENEW'"
                           class="text-yellow-500 inline" size="16">
              </lucide-icon>

              <lucide-icon name="x"
                           *ngIf="c.status==='NOT_OBTAINED'"
                           class="text-red-600 inline" size="16">
              </lucide-icon>
            </td>
          </tr>
        </tbody>
      </table>
    </app-table-wrapper>
  `
})
export class CertificationTableComponent {
  @Input() data: Certification[] | null = [];
  get rows() { return this.data ?? []; }
}
