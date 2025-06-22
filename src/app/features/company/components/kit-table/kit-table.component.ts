import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { FirstAidKit } from '../../../../models/first-aid-kit.model';

@Component({
  selector: 'app-kit-table',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './kit-table.component.html',
})
export class KitTableComponent {
  @Input() data: FirstAidKit[] = [];
  @Output() edit = new EventEmitter<FirstAidKit>();
  query = '';

  get filtered() {
    const q = this.query.toLowerCase().trim();
    return this.data
      .filter(k => !q || k.site.toLowerCase().includes(q) || k.id.toLowerCase().includes(q))
      .slice().sort((a, b) => a.site.localeCompare(b.site));
  }

  statusBadge(s: FirstAidKit['status']) {
    return s === 'EXPIRED' ? 'badge badge-error' : 'badge badge-success';
  }
  textBadge(s: FirstAidKit['status']) {
    return s === 'EXPIRED' ? 'Périmé' : 'OK';
  }
}