// src/app/shared/loader/global-loader.component.ts
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-global-loader',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div class="h-12 w-12 animate-spin rounded-full border-4
                  border-white border-t-transparent"></div>
    </div>
  `
})
export class GlobalLoaderComponent {}
