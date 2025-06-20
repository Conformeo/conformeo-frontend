import { Component, Input } from '@angular/core';
import { CommonModule }     from '@angular/common';

import { TableWrapperComponent }   from '../../../../shared/table-wrapper/table-wrapper.component';
import { FireExtinguisher }        from '../../../../models/fire-extinguisher.model';
import { IconsModule }  from '../../../../icons/icons.module';

@Component({
  selector: 'app-extinguisher-table',
  standalone: true,
  imports: [
    CommonModule,
    TableWrapperComponent,
    IconsModule        // <-- seule dépendance icônes
  ],
  template: `
    <app-table-wrapper>
      <table class="w-full text-sm">
        <thead class="bg-slate-100">
          <tr>
            <th>Emplacement</th>
            <th>Dernier</th>
            <th>Prochain</th>
            <th class="text-center">Statut</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let e of rows" class="border-b">
            <td>{{ e.location }}</td>
            <td>{{ e.lastControl }}</td>
            <td>{{ e.nextControl }}</td>
            <td class="text-center">
              <lucide-icon name="check"
                           *ngIf="e.status==='OK'"
                           class="text-green-600 inline" size="16">
              </lucide-icon>
              <lucide-icon name="clock"
                           *ngIf="e.status==='TO_SCHEDULE'"
                           class="text-yellow-500 inline" size="16">
              </lucide-icon>
            </td>
          </tr>
        </tbody>
      </table>
    </app-table-wrapper>
  `
})
export class ExtinguisherTableComponent {
  @Input() data: FireExtinguisher[] | null = [];
  get rows() { return this.data ?? []; }
}
