import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkersService } from '../../workers.service';
import { Worker } from '../../../../models/worker.model';
import { WorkerTableComponent } from '../../components/worker-table/worker-table.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-workers-page',
  standalone: true,
  imports: [CommonModule, WorkerTableComponent],
  template: `
    <h1 class="text-2xl font-semibold mb-6">Ouvriers</h1>
    <app-worker-table [data]="(workers$ | async) ?? []"></app-worker-table>
  `
})
export class WorkersPageComponent implements OnInit {
  workers$!: Observable<Worker[]>;
  constructor(private service: WorkersService) {}
  ngOnInit() {
    this.workers$ = this.service.getAll();
  }
}
