import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SecuriteService } from '../../securite.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-securite',
  standalone: true,
  imports: [
    CommonModule,
    NgxChartsModule
  ],
  providers: [DatePipe],
  templateUrl: './dashboard-securite.component.html',
  styleUrls: ['./dashboard-securite.component.scss']
})
export class DashboardSecuriteComponent implements OnInit {
  @Input() userId!: number;

  stats: any = {};
  nonConformites: any[] = [];
  timelineData: any[] = [];
  loading = true;

  constructor(private securiteService: SecuriteService, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.securiteService.getSynthese(this.userId).subscribe(stats => {
      this.stats = stats;
      this.loading = false;
    });
    this.securiteService.getNonConformites(this.userId).subscribe(data => {
      this.nonConformites = data;
    });
    this.securiteService.getTimeline(this.userId).subscribe(history => {
      this.timelineData = (history || []).map(s => ({
        name: new Date(s.date).toLocaleDateString(),
        value: s.nb_nc ?? 0
      }));
    });
  }

  voirDetail() {
    this.router.navigate(['/securite/detail']);
  }
}
