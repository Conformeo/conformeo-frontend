// src/app/shared/skeleton/skeleton.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `<div [ngStyle]="{height} "
           class="animate-pulse bg-slate-200 rounded w-full"></div>`
})
export class SkeletonComponent {
  @Input() height = '2rem';
}
