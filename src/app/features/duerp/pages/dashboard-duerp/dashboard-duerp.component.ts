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

    // Correction : mapping pour ngx-charts (name/value)
    this.duerpService.getRisquesParType(this.userId).subscribe({
      next: (data) => {
        // console.log('[DEBUG] risquesData reçu :', data);
        this.risquesData = Array.isArray(data)
          ? data.map(r => ({
              name: r.domaine ?? r.name ?? "Inconnu",
              value: r.nb ?? r.value ?? 0
            }))
          : [];
      },
      error: () => {
        console.error('[ERROR] Impossible de charger les risques');
        this.risquesData = [];
      }
    });

    this.duerpService.getTimeline(this.userId).subscribe({
      next: (data) => this.timelineData = data,
      error: () => this.timelineData = []
    });

    // Debug/demo
    // this.stats = this.demoStats;
    // this.timelineData = [
    //   { name: '01/03', value: 40 },
    //   { name: '01/04', value: 60 },
    //   { name: '01/05', value: 80 },
    //   { name: '01/06', value: 67 }
    // ];
    // console.log('[DEBUG] dashboard-duerp chargé');
  }

  getLastAuditDate(date: string | Date | undefined): string {
    if (!date) return '—';
    try {
      const d = typeof date === 'string' ? new Date(date) : date;
      // Vérifie si la date est valide
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
    // Tu peux choisir le format que tu veux ici
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' });
  }


  voirDuerp() {
    this.router.navigate(['/duerp/detail']);
  }
}
