import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsModule }  from '../../icons/icons.module';

@Component({
  selector   : 'app-modal',
  standalone : true,
  imports    : [CommonModule, IconsModule],
  template: `
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
         (click)="closed.emit()"></div>

    <!-- Card -->
    <div
      class="fixed inset-0 flex items-start justify-center z-50"
      style="animation: fadeIn .2s ease-out"
    >
      <div
        class="mt-24 w-full max-w-lg bg-white rounded-lg shadow-xl border"
        (click)="$event.stopPropagation()"
      >
        <!-- Header -->
        <header class="flex items-center justify-between px-6 py-3 border-b">
          <h3 class="font-semibold text-lg">{{ title }}</h3>
          <button (click)="closed.emit()">
            <lucide-icon name="x" size="20"></lucide-icon>
          </button>
        </header>

        <!-- Content -->
        <section class="p-6">
          <ng-content></ng-content>
        </section>
      </div>
    </div>
  `,
  styles: [
    `@keyframes fadeIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1}}`
  ]
})
export class ModalComponent {
  @Input()  title = '';
  @Output() closed = new EventEmitter<void>();
}
