import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  template: `
    <div class="animate-pulse bg-slate-200 rounded w-full h-5"></div>
  `
})
export class SkeletonComponent {}
