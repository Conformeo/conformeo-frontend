import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,           // 👈 ajoutez-ça
  template: `<div class="animate-pulse bg-slate-200 h-4 w-full rounded mb-2"></div>`,
  styles: []
})
export class SkeletonLoaderComponent {}
