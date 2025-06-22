import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-site-filter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <input
      type="text"
      placeholder="Rechercher un site…"
      class="input input-sm w-full max-w-md mb-4"
      (input)="onInput($event)"
    />
  `,
})
export class SiteFilterComponent {
  @Output() searchChange = new EventEmitter<string>();
  onInput(e: Event) {
    this.searchChange.emit((e.target as HTMLInputElement).value);
  }
}
