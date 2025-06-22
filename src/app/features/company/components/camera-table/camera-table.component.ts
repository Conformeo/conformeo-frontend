import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { Camera } from '../../../../models/camera.model';

@Component({
  selector: 'app-camera-table',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './camera-table.component.html',
})
export class CameraTableComponent {
  @Input() data: Camera[] = [];
  @Output() edit = new EventEmitter<Camera>();
  query = '';

  get filtered(): Camera[] {
    const q = this.query.toLowerCase().trim();
    return this.data
      .filter(c => !q || c.label.toLowerCase().includes(q) || c.location.toLowerCase().includes(q))
      .slice().sort((a, b) => a.label.localeCompare(b.label));
  }

  icon(status: Camera['status']) { return status === 'OK' ? 'check-circle' : 'x-circle'; }
  color(status: Camera['status']) { return status === 'OK' ? 'text-emerald-600' : 'text-rose-600'; }
}