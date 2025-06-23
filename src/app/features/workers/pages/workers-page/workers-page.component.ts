import { Component } from '@angular/core';
import { ModalComponent } from '../../../../shared/modal/modal.component';
import { WorkerFormComponent } from '../../components/worker-form/worker-form.component';
import { WorkerTableComponent } from '../../components/worker-table/worker-table.component';
import { Worker } from '../../../../models/worker.model';
import { WorkerService } from '../../../../core/services/worker.service';

@Component({
  selector: 'app-workers-page',
  standalone: true,
  imports: [ModalComponent, WorkerFormComponent, WorkerTableComponent],
  templateUrl: './workers-page.component.html',
})
export class WorkersPageComponent {
  workers: Worker[] = [];
  editingWorker?: Worker;
  workerToDelete?: Worker;

  constructor(private service: WorkerService) {}

  ngOnInit() { this.reload(); }
  reload() {
    this.service.getAll().subscribe(list => this.workers = list ?? []);
  }
  openForm(worker?: Worker) {
    this.editingWorker = worker ? { ...worker } : { id: '', firstName: '', lastName: '', role: '' };
  }
  closeForm() { this.editingWorker = undefined; }

  onWorkerSaved(worker: Worker) {
    const obs = worker.id
      ? this.service.update(worker)
      : this.service.add({ ...worker, id: Date.now().toString() });
    obs.subscribe(() => { this.reload(); this.closeForm(); });
  }

  openDeleteWorker(worker: Worker) {
    this.workerToDelete = worker;
  }

  cancelDeleteWorker() { this.workerToDelete = undefined; }
  confirmDeleteWorker() {
    if (!this.workerToDelete) return;
    this.service.delete(this.workerToDelete.id).subscribe(() => {
      this.reload();
      this.cancelDeleteWorker();
    });
  }
}
