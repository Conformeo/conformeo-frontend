import { Component, Input } from '@angular/core';
import { CommonModule }     from '@angular/common';
import { FireExtinguisher } from '../../../../models/fire-extinguisher.model';
import { TableWrapperComponent } from '../../../../shared/table-wrapper/table-wrapper.component';

@Component({
  selector: 'app-extinguisher-table',
  standalone: true,
  imports: [CommonModule, TableWrapperComponent],
  template: `
    <app-table-wrapper>
      <table>
        <thead>
          <tr><th>Emplacement</th><th>Dernier contrôle</th><th>Prochain</th><th>Statut</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let e of data">
            <td>{{ e.location }}</td>
            <td>{{ e.lastControl }}</td>
            <td>{{ e.nextControl }}</td>
            <td>
              <span [ngClass]="{
                    'text-green-600' : e.status==='OK',
                    'text-yellow-600': e.status==='TO_SCHEDULE'
                  }">
                {{ e.status==='OK' ? 'OK' : 'À planifier' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </app-table-wrapper>
  `
})
export class ExtinguisherTableComponent {
  @Input() data: FireExtinguisher[] | null = [];
  get rows(): FireExtinguisher[] { return this.data ?? []; }
}
