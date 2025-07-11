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
      { domaine: 'Chute', nb: 4 },
      { domaine: 'Électrocution', nb: 2 }
    ]
  };

  constructor(
    private duerpService: DuerpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.duerpService.getSynthese(this.userId).subscribe({
      next: (data) => {
        this.stats = data;
        this.loading = false;
      },
      error: () => {
        this.stats = { sites: 0, risques: 0, plansAction: 0, auditsRecents: 0 };
        this.loading = false;
      }
    });
    this.duerpService.getRisquesParType(this.userId).subscribe({
      next: (data) => this.risquesData = data,
      error: () => this.risquesData = []
    });
    this.duerpService.getTimeline(this.userId).subscribe({
      next: (data) => this.timelineData = data,
      error: () => this.timelineData = []
    });
    this.stats = {
      audits: 6,
      tauxCritique: 22,
      dernierAudit: '2025-06-14',
      risquesPrincipaux: [
        { domaine: 'Chute', nb: 4 },
        { domaine: 'Électrocution', nb: 2 }
      ]
    };
    this.timelineData = [
      { name: '01/03', value: 40 },
      { name: '01/04', value: 60 },
      { name: '01/05', value: 80 },
      { name: '01/06', value: 67 }
    ];
    
  }

  voirDuerp() {
    this.router.navigate(['/duerp/detail']);
  }
}
