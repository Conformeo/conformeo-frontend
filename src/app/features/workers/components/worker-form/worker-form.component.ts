import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Worker } from '../../../../models/worker.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-worker-form',
  templateUrl: './worker-form.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class WorkerFormComponent implements OnInit {
  @Input() worker!: Worker;
  @Output() save = new EventEmitter<Worker>();
  @Output() cancel = new EventEmitter<void>();

  ngOnInit() {
    // Pour éviter de modifier l'objet d'origine lors de l'édition
    this.worker = { ...this.worker };
  }

  onSubmit() {
    this.save.emit(this.worker);
  }
}
