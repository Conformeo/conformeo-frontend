import { Component, OnInit } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { Observable }         from 'rxjs';
import { DashboardStat }      from '../../../../models/dashboard-stat.model';
import { DashboardService }   from '../../dashboard.service';
import { StatCardComponent }  from '../../components/stat-card/stat-card.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, StatCardComponent],
  template: `
    <h1 class="text-2xl font-semibold mb-4">Tableau de bord</h1>

    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <app-stat-card
        *ngFor="let stat of stats$ | async"
        [stat]="stat">
      </app-stat-card>
    </div>
  `
})
export class DashboardPageComponent implements OnInit {
  stats$!: Observable<DashboardStat[]>;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.stats$ = this.dashboardService.getStats();
  }
}
