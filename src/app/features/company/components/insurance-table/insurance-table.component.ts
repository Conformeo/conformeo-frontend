import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { Insurance } from '../../../../models/insurance.model';

@Component({
  selector: 'app-insurance-table',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './insurance-table.component.html',
})
export class InsuranceTableComponent {
  @Input() data: Insurance[] = [];
  @Output() edit = new EventEmitter<Insurance>();
  query = '';

  get filtered() {
    const q = this.query.toLowerCase().trim();
    return this.data.filter(i => !q || i.type.toLowerCase().includes(q) || i.provider.toLowerCase().includes(q))
      .slice().sort((a, b) => a.validUntil.localeCompare(b.validUntil));
  }

  label(type: Insurance['type']) {
    return type === 'RC_PRO' ? 'RC Pro' : 'Décennale';
  }
}