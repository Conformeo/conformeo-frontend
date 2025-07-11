import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="p-4 rounded-xl shadow text-white"
         [ngClass]="{ 'bg-primary': !stat?.variant, 'bg-danger': stat?.variant === 'risk' }">

      <div class="flex items-center gap-2 text-sm opacity-80">
        <lucide-icon *ngIf="icon || stat?.icon"
                     [name]="icon || stat?.icon"
                     class="w-4 h-4"></lucide-icon>
        {{ stat?.label }}
      </div>

      <div class="text-2xl font-bold mt-1">{{ stat?.value }}</div>
    </div>
  `
})
export class StatCardComponent {
  @Input() stat?: {
    label: string;
    value: number | string;
    icon?: string;
    variant?: 'risk' | 'default' | string;
  };

  @Input() icon?: string; 
}
