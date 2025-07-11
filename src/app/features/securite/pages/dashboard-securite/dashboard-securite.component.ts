import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard-securite',
  standalone: true,
  templateUrl: './dashboard-securite.component.html',
  styleUrls: ['./dashboard-securite.component.scss'],
  imports: [
    CommonModule,
    NgxChartsModule,
    MatButtonModule
  ]
})
export class DashboardSecuriteComponent implements OnInit {
  @Input() userId: number = 1;
  

  titreModule = 'Sécurité';
  mainStats = [
    { label: 'Actions en cours', value: 7 },
    { label: 'Inspections OK', value: '92 %' },
    { label: 'Non-conformités', value: 4 }
  ];
  chartData = [
    { name: 'Incendie', value: 2 },
    { name: 'Électricité', value: 1 },
    { name: 'Chute', value: 1 }
  ];
  timelineData = [
    {
      name: 'Non-conformités',
      series: [
        { name: 'Avril', value: 4 },
        { name: 'Mai', value: 2 },
        { name: 'Juin', value: 1 }
      ]
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  isChartNotEmpty(): boolean {
    return Array.isArray(this.chartData) &&
          this.chartData.length > 0 &&
          typeof this.chartData[0]?.value === 'number' &&
          this.chartData[0].value > 0;
  }


  voirDetail() { /* navigation/detail */ }
  exporter() { /* export */ }
  ajouterNouveau() { /* ajout */ }
}
