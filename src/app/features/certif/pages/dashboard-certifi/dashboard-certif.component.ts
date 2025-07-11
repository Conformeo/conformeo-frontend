import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard-certif',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './dashboard-certif.component.html',
  styleUrls: ['./dashboard-certif.component.scss']
})
export class DashboardCertifComponent implements OnInit {
  @Input() titreModule = 'Certifications';
  @Input() userId: number = 1;
  mainStats: any[] = [];
  chartData: any[] = [];
  timelineData: any[] = [];

  ngOnInit(): void {
    // Exemple statique
    this.mainStats = [
      { label: 'Certifications à jour', value: 5 },
      { label: 'Échues', value: 2 }
    ];
    this.chartData = [
      { name: 'À jour', value: 5 },
      { name: 'Échues', value: 2 }
    ];
    this.timelineData = [
      { name: 'Mai', series: [{ name: 'À jour', value: 4 }, { name: 'Échues', value: 3 }] },
      { name: 'Juin', series: [{ name: 'À jour', value: 5 }, { name: 'Échues', value: 2 }] }
    ];
  }

  isChartNotEmpty(): boolean {
    return Array.isArray(this.chartData) && this.chartData.length > 0 && typeof this.chartData[0]?.value === 'number' && this.chartData[0].value > 0;
  }

  isTimelineNotEmpty(): boolean {
    return Array.isArray(this.timelineData) &&
      this.timelineData.length > 0 &&
      Array.isArray(this.timelineData[0]?.series) &&
      this.timelineData[0].series.length > 0;
  }

  voirDetail() {}
  exporter() {}
  ajouterNouveau() {}
}
