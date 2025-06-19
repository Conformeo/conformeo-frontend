import { Component, Input } from '@angular/core';
import { CommonModule }     from '@angular/common';
import { Certification }       from '../../../../models/certification.model';
import { TableWrapperComponent } from '../../../../shared/table-wrapper/table-wrapper.component';

@Component({
  selector: 'app-certification-table',
  standalone: true,
  imports: [CommonModule, TableWrapperComponent],
  template: `
    <app-table-wrapper>
      <table>
        <thead>
          <tr><th>Certification</th><th>Valide jusqu’au</th><th>Statut</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let c of data">
            <td>{{ c.name }}</td>
            <td>{{ c.validUntil }}</td>
            <td>
              <span [ngClass]="{
                    'text-green-600' : c.status==='VALID',
                    'text-yellow-600': c.status==='RENEW',
                    'text-red-600'   : c.status==='NOT_OBTAINED'
                  }">
                {{
                  c.status==='VALID'        ? 'OK' :
                  c.status==='RENEW'        ? 'À renouveler' :
                  'Manquante'
                }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </app-table-wrapper>
  `
})
export class CertificationTableComponent {
  @Input() data: Certification[] | null = [];
  get rows(): Certification[] { return this.data ?? []; }

}
