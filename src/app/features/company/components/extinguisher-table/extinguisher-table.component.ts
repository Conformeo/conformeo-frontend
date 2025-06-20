import { Component, Input, Output, EventEmitter }  from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule }       from '@angular/forms';
import { IconsModule }       from '../../../../icons/icons.module';
import { FireExtinguisher }  from '../../../../models/fire-extinguisher.model';

type ExtStatus = FireExtinguisher['status'];   // ← derive du modèle

@Component({
  selector: 'app-extinguisher-table',
  standalone: true,
  imports: [CommonModule, FormsModule, IconsModule],
  templateUrl: './extinguisher-table.component.html',
})
export class ExtinguisherTableComponent {

  @Input({ required: true }) data: FireExtinguisher[] = [];
  @Output() edit = new EventEmitter<FireExtinguisher>();

  query = '';

  get filtered(): FireExtinguisher[] {
    const q = this.query.toLowerCase().trim();
    return this.data
      .filter(e =>
        !q ||
        e.location.toLowerCase().includes(q) ||
        e.status.toLowerCase().includes(q),
      )
      .slice()
      .sort((a, b) => a.location.localeCompare(b.location));
  }

  emitEdit(e: FireExtinguisher) { this.edit.emit(e); }

  icon(s: ExtStatus) {
    switch (s) {
      case 'OK':          return 'check';
      case 'TO_SCHEDULE': return 'clock';
      case 'DUE':         return 'alert-triangle';
    }
  }

  color(s: ExtStatus) {
    switch (s) {
      case 'OK':          return 'text-emerald-600';
      case 'TO_SCHEDULE': return 'text-amber-500';
      case 'DUE':         return 'text-rose-600';
    }
  }
}
