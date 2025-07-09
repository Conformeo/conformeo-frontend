import { Component, Input, OnInit } from '@angular/core';
import { DuerpService } from '../../duerp.service';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-duerp',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './dashboard-duerp.component.html',
  styleUrls: ['./dashboard-duerp.component.scss']
})

export class DashboardDuerpComponent implements OnInit {
  @Input() userId!: number;

  stats: any = null;
  risquesData: any[] = [];
  timelineData: any[] = [];
  loading = true;

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
  }

  voirDuerp() {
    this.router.navigate(['/duerp/detail']);
  }
}
