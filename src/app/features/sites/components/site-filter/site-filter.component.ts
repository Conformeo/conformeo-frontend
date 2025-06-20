// src/app/features/sites/components/site-filter/site-filter.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-site-filter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <input
      type="text"
      class="border rounded px-3 py-1 w-full"
      placeholder="Rechercher un site…"
      (input)="searchChange.emit($any($event.target).value)" />
  `
})
export class SiteFilterComponent {
  @Output() searchChange = new EventEmitter<string>();
}
