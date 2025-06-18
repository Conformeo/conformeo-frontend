import { Component, Input } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { DashboardStat }     from '../../../../models/dashboard-stat.model';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4 rounded-xl shadow text-white"
         [ngClass]="{
           'bg-primary': !stat.variant,
           'bg-danger' : stat.variant === 'risk'
         }">
      <div class="text-sm opacity-80">{{ stat.label }}</div>
      <div class="text-2xl font-bold mt-1">{{ stat.value }}</div>
    </div>
  `
})
export class StatCardComponent {
  @Input() stat!: DashboardStat;
}
