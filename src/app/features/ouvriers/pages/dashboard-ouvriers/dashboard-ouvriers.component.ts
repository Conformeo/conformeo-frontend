import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard-ouvriers',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './dashboard-ouvriers.component.html',
  styleUrls: ['./dashboard-ouvriers.component.scss']
})
export class DashboardOuvriersComponent implements OnInit {
  @Input() titreModule = 'Ouvriers';
  @Input() userId: number = 1;

  mainStats: any[] = [];
  chartData: any[] = [];
  timelineData: any[] = [];

  ngOnInit(): void {
    // Données démo, à remplacer par ton service
    this.mainStats = [
      { label: "Nombre d'ouvriers", value: 14 },
      { label: "Formés sécurité", value: 12 }
    ];
    this.chartData = [
      { name: 'Formés', value: 12 },
      { name: 'Non formés', value: 2 }
    ];
    this.timelineData = [
      { name: 'Avr', series: [{ name: 'Formés', value: 10 }, { name: 'Non formés', value: 4 }] },
      { name: 'Mai', series: [{ name: 'Formés', value: 11 }, { name: 'Non formés', value: 3 }] },
      { name: 'Juin', series: [{ name: 'Formés', value: 12 }, { name: 'Non formés', value: 2 }] }
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
