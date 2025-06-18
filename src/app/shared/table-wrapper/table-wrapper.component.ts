// src/app/shared/table-wrapper/table-wrapper.component.ts
import { Component }   from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-wrapper',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overflow-x-auto">
      <ng-content></ng-content>
    </div>
  `
})
export class TableWrapperComponent {}
