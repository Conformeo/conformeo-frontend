// tab.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab-group',
  standalone: true,
  imports: [CommonModule], // 👈 C'est le fix du warning
  template: `
    <nav class="flex gap-2 mb-5">
      <button *ngFor="let tab of tabs; let i = index"
        class="tab-btn"
        [class.active]="i === selected"
        (click)="selected = i">
        {{ tab }}
      </button>
    </nav>
    <!-- Projection d'un contenu par tab -->
    <ng-content select="[tab0]" *ngIf="selected === 0"></ng-content>
    <ng-content select="[tab1]" *ngIf="selected === 1"></ng-content>
    <ng-content select="[tab2]" *ngIf="selected === 2"></ng-content>
    <ng-content select="[tab3]" *ngIf="selected === 3"></ng-content>
    <!-- Ajoute autant de ng-content que de tabs (max visible) -->
  `,
  styles: [`
    .tab-btn {
      border: 1.5px solid #18a0fb;
      background: #fff;
      color: #18a0fb;
      border-radius: 16px;
      padding: 0.25rem 1.5rem;
      font-weight: 600;
      cursor: pointer;
      transition: background .18s;
    }
    .tab-btn.active, .tab-btn:hover {
      background: #18a0fb;
      color: #fff;
    }
  `]
})
export class TabGroupComponent {
  @Input() tabs: string[] = [];
  selected = 0;
}
