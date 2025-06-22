import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Worker } from '../../../../models/worker.model';

@Component({
  selector: 'app-worker-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <table class="min-w-full border">
      <thead>
        <tr>
          <th>Nom</th><th>Prénom</th><th>Qualification</th><th>Date d'embauche</th><th>Actif</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let w of data">
          <td>{{ w.lastName }}</td>
          <td>{{ w.firstName }}</td>
          <td>{{ w.qualification }}</td>
          <td>{{ w.hireDate }}</td>
          <td>{{ w.active ? 'Oui' : 'Non' }}</td>
        </tr>
      </tbody>
    </table>
  `
})
export class WorkerTableComponent {
  @Input() data: Worker[] = [];
}
