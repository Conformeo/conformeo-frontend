import { Component, Input, OnInit } from '@angular/core';
import { DuerpService } from '../../duerp.service';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dashboard-duerp',
  standalone: true,
  imports: [
    CommonModule,
    NgxChartsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './dashboard-duerp.component.html',
  styleUrls: ['./dashboard-duerp.component.scss']
})
export class DashboardDuerpComponent implements OnInit {
  @Input() userId!: number;

  stats: any = null;
  risquesData: any[] = [];
  timelineData: any[] = [];
  loading = true;
  error = false;
  demoStats = {
    audits: 6,
    tauxCritique: 22,
    dernierAudit: '2025-06-14',
    risquesPrincipaux: [
      { domaine: 'Chute', value: 4 },
      { domaine: 'Électrocution', value: 2 }
    ]
  };


  constructor(
    private duerpService: DuerpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.userId) {
      console.error('[DashboardDuerpComponent] userId manquant');
      this.error = true;
      this.loading = false;
      return;
    }
    this.loading = true;

    this.duerpService.getSynthese(this.userId).subscribe({
      next: (data) => {
        this.stats = data;
        this.loading = false;
      },
      error: () => {
        this.stats = { sites: 0, risques: 0, plansAction: 0, auditsRecents: 0 };
        this.loading = false;
        this.error = true;
      }
    });

    this.duerpService.getRisquesParType(this.userId).subscribe({
      next: (data) => {
        this.risquesData = Array.isArray(data)
          ? data.map(r => ({
              name: r.domaine ?? r.name ?? "Inconnu",
              value: r.nb ?? r.value ?? 0
            }))
          : [];
      },
      error: () => {
        this.risquesData = [];
      }
    });

    this.duerpService.getTimeline(this.userId).subscribe({
      next: (data) => this.timelineData = data,
      error: () => this.timelineData = []
    });
  }

  getLastAuditDate(date: string | Date | undefined): string {
    if (!date) return '—';
    try {
      const d = typeof date === 'string' ? new Date(date) : date;
      if (isNaN(d.getTime())) return date.toString();
      return d.toLocaleDateString('fr-FR');
    } catch {
      return date?.toString() ?? '—';
    }
  }

  formatTimelineDate(date: string | Date): string {
    if (!date) return '';
    const d = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(d.getTime())) return date?.toString() ?? '';
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' });
  }

  voirDuerp() {
    this.router.navigate(['/duerp/detail']);
  }
}
