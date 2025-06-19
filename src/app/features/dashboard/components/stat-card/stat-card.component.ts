import { Component, Input }  from '@angular/core';
import { CommonModule }      from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

import { DashboardStat }     from '../../../../models/dashboard-stat.model';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule           // fournit le composant <lucide-icon>
  ],
  template: `
    <div class="p-4 rounded-xl shadow text-white"
         [ngClass]="{
           'bg-primary': !stat.variant,
           'bg-danger' :  stat.variant === 'risk'
         }">

      <div class="flex items-center gap-2 text-sm opacity-80">
        <lucide-icon  name="home"
                      class="w-4 h-4"
                      *ngIf="stat.label === 'Sites'">
        </lucide-icon>

        <lucide-icon  name="alert-triangle"
                      class="w-4 h-4"
                      *ngIf="stat.variant === 'risk'">
        </lucide-icon>

        {{ stat.label }}
      </div>

      <div class="text-2xl font-bold mt-1">{{ stat.value }}</div>
    </div>
  `
})
export class StatCardComponent {
  @Input() stat!: DashboardStat;
}
