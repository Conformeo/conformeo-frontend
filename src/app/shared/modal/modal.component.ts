import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  template: `
  <div class="modal-backdrop" (click)="close()"></div>
  <div class="modal-panel">
    <div class="modal-header">
      <h2 class="modal-title">{{ title }}</h2>
      <button class="modal-close" (click)="close()">&times;</button>
    </div>
    <div class="modal-body">
      <ng-content></ng-content>
    </div>
  </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed; inset: 0; background: rgba(0,0,0,.18); z-index: 40;
    }
    .modal-panel {
      position: fixed; top: 50%; left: 50%;
      transform: translate(-50%,-50%);
      background: white; padding: 2rem; border-radius: 1rem;
      min-width: 320px; max-width: 98vw; z-index: 50; box-shadow: 0 8px 40px #0002;
    }
    .modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
    .modal-title { font-size: 1.1rem; font-weight: 600; }
    .modal-close { border: none; background: none; font-size: 2rem; cursor: pointer; line-height: 1; }
    .modal-body { max-height: 70vh; overflow: auto; }
  `]
})
export class ModalComponent {
  @Input() title = '';
  @Output() closed = new EventEmitter<void>();
  close() { this.closed.emit(); }
}
