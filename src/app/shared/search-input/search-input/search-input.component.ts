import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <input
      type="text"
      placeholder="Filtrer…"
      class="border rounded px-2 py-1 w-full mb-3"
      (input)="onInput($event)">
  `
})
export class SearchInputComponent {
  @Output() searchChange = new EventEmitter<string>();

  onInput(e: Event) {
    this.searchChange.emit((e.target as HTMLInputElement).value);
  }
}
