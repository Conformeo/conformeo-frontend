import { Component, OnInit } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { Worker }          from '../../../../models/worker.model';
import { WorkerService }   from '../../../../core/services/worker.service';

import { WorkerTableComponent } from '../../components/worker-table/worker-table.component';
import { WorkerFormComponent }  from '../../components/worker-form/worker-form.component';
import { ModalComponent }       from '../../../../shared/modal/modal.component';

@Component({
  selector   : 'app-workers-page',
  standalone : true,
  imports    : [
    CommonModule,
    FormsModule,
    WorkerTableComponent,
    WorkerFormComponent,
    ModalComponent,
  ],
  templateUrl: './workers-page.component.html',
})
export class WorkersPageComponent implements OnInit {

  /* ░░ Données ░░ */
  workers: Worker[] = [];
  teams  : string[] = [];

  /* ░░ UI state ░░ */
  selectedTeam = '';      // '' = tous
  search       = '';

  editing : Worker | null = null;
  toDelete: Worker | null = null;

  /* ———————————————————————————————— */

  constructor(private svc: WorkerService) {}

  ngOnInit() { this.load(); }

  /* Chargement + maj équipes --------------------------------- */
  private load() {
    this.svc.getAll().subscribe(list => {
      this.workers = list ?? [];
      const set = new Set(
        this.workers
          .map(w => w.equipe)
          .filter(Boolean)        // exclut '' / null
      );
      this.teams = [...set];
    });
  }

  /* Getter pour le *ngFor (évite le spread …) */
  get teamsList(): string[] {
    return ['Tous', ...this.teams];
  }

  /* Filtrage temps-réel -------------------------------------- */
  selectTeam(t: string) { this.selectedTeam = t; }

  get filteredWorkers(): Worker[] {
    const term = this.search.toLowerCase().trim();
    return this.workers
      .filter(w => this.selectedTeam ? w.equipe === this.selectedTeam : true)
      .filter(w =>
        (`${w.nom} ${w.prenom} ${w.poste} ${w.telephone}`.toLowerCase())
          .includes(term)
      );
  }

  /* CRUD ------------------------------------------------------ */
  openForm(w?: Worker) {
    this.editing = w
      ? { ...w }
      : { id: '', nom:'', prenom:'', poste:'', equipe:'', telephone:'', email:'', siteId:'' };
  }
  closeForm() { this.editing = null; }

  onSave(worker: Worker) {
    const obs = worker.id
      ? this.svc.update(worker)
      : this.svc.add({ ...worker, id: Date.now().toString() });

    obs.subscribe(() => { this.load(); this.closeForm(); });
  }

  openDeleteWorker(w: Worker) { this.toDelete = w; }
  confirmDelete() {
    if (!this.toDelete) return;
    this.svc.delete(this.toDelete.id).subscribe(() => {
      this.load();
      this.toDelete = null;
    });
  }
}
