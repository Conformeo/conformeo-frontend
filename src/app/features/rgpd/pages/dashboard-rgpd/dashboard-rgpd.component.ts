import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RgpdService } from '../../rgpd.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-rgpd',
  standalone: true,
  imports: [
    CommonModule, 
    NgxChartsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './dashboard-rgpd.component.html',
  styleUrls: ['./dashboard-rgpd.component.scss']
})
export class DashboardRgpdComponent implements OnInit {
  @Input() auditId: number = 1234;
  @Input() userId: number = 1;

  score: any;
  scoreChartData: any[] = [];
  timelineData: any[] = [];
  domainChartData: any[] = [];
  alertesCritiques: string[] = [];
  loading = true;
  stats = {
    scoreMoyen: 0,
    tauxConforme: 0,
    audits: 0,
    dernierAudit: new Date()
  };

  constructor(
    private rgpdService: RgpdService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.rgpdService.getLastAudit(this.userId).subscribe({
      next: audit => {
        this.score = audit;
        this.scoreChartData = [
          { name: 'Conforme', value: audit.conforme },
          { name: 'Non conforme', value: audit.non_conforme }
        ];
        this.alertesCritiques = (audit.critical_ko || []).map((item: any) => item.label || item);
        this.loading = false;
        // Optionnel : Heatmap/Domaines
        this.rgpdService.getDomainStats(this.auditId).subscribe(domains => {
          this.domainChartData = domains;
        });
      },
      error: () => {
        this.score = { score: 0, conforme: 0, non_conforme: 0, critical_ko: [] };
        this.scoreChartData = [];
        this.alertesCritiques = [];
        this.loading = false;
      }
    });
    this.rgpdService.getTimeline(this.userId).subscribe(history => {
      this.timelineData = (history || []).map((audit: any) => ({
        name: new Date(audit.created_at).toLocaleDateString(),
        value: audit.score ?? 0
      }));
    });
  }

  voirDetailAudit() {
    this.router.navigate(['/rgpd/audit', 1234]);
  }


  downloadPDF() {
    if (!this.auditId) return;
    this.rgpdService.downloadPdf(this.auditId).subscribe({
      next: blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `rapport_rgpd_${this.auditId}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
        this.snackBar.open('PDF téléchargé !', 'Fermer', { duration: 2000 });
      },
      error: () => {
        this.snackBar.open('Erreur export PDF.', 'Fermer', { duration: 2000 });
      }
    });
  }

  downloadCSV() {
    if (!this.auditId) return;
    this.rgpdService.downloadCsv(this.auditId).subscribe({
      next: blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `rgpd_export_${this.auditId}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
        this.snackBar.open('CSV exporté !', 'Fermer', { duration: 2000 });
      },
      error: () => {
        this.snackBar.open('Erreur export CSV.', 'Fermer', { duration: 2000 });
      }
    });
  }

  refaireAudit() {
    window.location.href = '/rgpd/audit/new';
  }
}
