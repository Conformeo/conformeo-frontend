import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { PieChartModule, LineChartModule, BarChartModule } from '@swimlane/ngx-charts';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { RgpdService } from '../../rgpd.service';

@Component({
  selector: 'app-dashboard-rgpd',
  standalone: true,
  imports: [
    CommonModule, NgIf, NgFor,
    PieChartModule, LineChartModule, BarChartModule,
    MatButtonModule, RouterModule
  ],
  templateUrl: './dashboard-rgpd.component.html',
  styleUrls: ['./dashboard-rgpd.component.scss']
})
export class DashboardRgpdComponent implements OnInit {
  @Input() userId!: number; // garde-le si tu veux du multi-user plus tard
  loading = true;
  score: any = { score: null, conforme: 0, non_conforme: 0 };
  alertesCritiques: string[] = [];
  scoreChartData: any[] = [];
  timelineData: any[] = [];
  domainChartData: any[] = [];
  error = false;

  constructor(
    private rgpdService: RgpdService
  ) {}

  ngOnInit() {
    this.loading = true;

    // --- Dernier audit (pas besoin de param si auth par token)
    this.rgpdService.getLastAudit().subscribe({
      next: (res) => {
        this.score = res;
        this.scoreChartData = [
          { name: 'Conforme',     value: res.conforme     ?? 0 },
          { name: 'Non conforme', value: res.non_conforme ?? 0 },
          { name: 'N/A', value: res.non_conforme ?? 0 }
        ];
        this.alertesCritiques = res.critical_ko ?? [];
        if (res.id) {
          this.rgpdService.getDomainStats(res.id).subscribe({
            next: (stats) => {
              this.domainChartData = stats ?? [];
            },
            error: () => { this.domainChartData = []; }
          });
        } else {
          this.domainChartData = [];
        }
      },
      error: () => {
        this.error = true;
        this.score = { score: null, conforme: 0, non_conforme: 0 };
        this.scoreChartData = [];
        this.alertesCritiques = [];
        this.domainChartData = [];
      },
      complete: () => this.loading = false
    });

    // --- Timeline (pas besoin de param si auth par token)
    this.rgpdService.getTimeline().subscribe({
      next: (audits) => {
        this.timelineData = (audits || []).map(a => ({
          name: (a.created_at || '').slice(0, 10),
          value: a.score ?? 0
        }));
      },
      error: () => { this.timelineData = []; }
    });
  }
}
