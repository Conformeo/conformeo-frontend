import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Worker } from '../../../../models/worker.model';

@Component({
  selector: 'app-worker-table',
  templateUrl: './worker-table.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class WorkerTableComponent {
  @Input() workers: Worker[] = [];
  @Output() edit = new EventEmitter<Worker>();
  @Output() delete = new EventEmitter<Worker>();
}
