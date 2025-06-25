import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Worker } from '../../../../models/worker.model';
import { WorkerService } from '../../../../core/services/worker.service';
import { ModalComponent } from '../../../../shared/modal/modal.component';
import { WorkerFormComponent } from '../../components/worker-form/worker-form.component';
import { WorkerTableComponent } from '../../components/worker-table/worker-table.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-workers-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent, WorkerFormComponent, WorkerTableComponent],
  templateUrl: './workers-page.component.html',
})
export class WorkersPageComponent {
  workers: Worker[] = [];
  editingWorker: Worker | null = null;
  workerToDelete: Worker | null = null;
  
  searchWorker = '';

  get filteredWorkers() {
    const q = this.searchWorker?.toLowerCase() ?? '';
    return this.workers.filter(w =>
      (w.lastName ?? '').toLowerCase().includes(q) ||
      (w.firstName ?? '').toLowerCase().includes(q) ||
      (w.role ?? '').toLowerCase().includes(q) ||
      (w.phone ?? '').toLowerCase().includes(q)
    );
  }


  constructor(private service: WorkerService) {}

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.service.getAll().subscribe(list => this.workers = list ?? []);
  }

  openForm(worker?: Worker) {
    this.editingWorker = worker ? { ...worker } : { id: '', lastName: '', firstName: '', role: '', phone: '' };
  }
  closeForm() { this.editingWorker = null; }
  onWorkerSaved(worker: Worker) {
    const obs = worker.id
      ? this.service.update(worker)
      : this.service.add({ ...worker, id: Date.now().toString() });
    obs.subscribe(() => { this.reload(); this.closeForm(); });
  }

  openDeleteWorker(worker: Worker) { this.workerToDelete = worker; }
  cancelDeleteWorker() { this.workerToDelete = null; }
  confirmDeleteWorker() {
    if (!this.workerToDelete) return;
    this.service.delete(this.workerToDelete.id).subscribe(() => {
      this.reload();
      this.cancelDeleteWorker();
    });
  }
}
