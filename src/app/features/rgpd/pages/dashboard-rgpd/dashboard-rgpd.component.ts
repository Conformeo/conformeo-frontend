import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { PieChartModule, LineChartModule, BarChartModule } from '@swimlane/ngx-charts';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

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
  @Input() userId!: number;
  loading = true;
  score: any = { score: null, conforme: 0, non_conforme: 0 };
  alertesCritiques: string[] = [];
  scoreChartData: any[] = [];
  timelineData: any[] = [];
  domainChartData: any[] = [];
  error = false;


  ngOnInit() {
    if (!this.userId) {
      console.error('[DashboardRGPDComponent] userId manquant');
      this.error = true;
      this.loading = false;
      return;
    }
    this.loading = true;
    // --- Remplace par ton vrai call API ---
      // --- EXEMPLE : mets ici les données reçues ---
      this.score = { score: 82, conforme: 15, non_conforme: 3 };
      this.alertesCritiques = ["Alerte critique RGPD"];
      this.scoreChartData = [
        { name: 'Conforme', value: 15 },
        { name: 'Non conforme', value: 3 }
      ];
      this.timelineData = [
        { name: '01/04', value: 60 },
        { name: '01/05', value: 70 },
        { name: '01/06', value: 80 },
        { name: '01/07', value: 82 }
      ];
      this.domainChartData = [
        { name: 'Base légale', value: 2 },
        { name: 'Sécurité', value: 3 }
      ];
      this.loading = false;

    // // Debug
    // console.log('[DEBUG] dashboard-rgpd chargé');
  }
}
