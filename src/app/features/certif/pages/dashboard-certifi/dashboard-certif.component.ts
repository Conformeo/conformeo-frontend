import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CertifService } from '../../certif.service';
import { Router } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard-certif',
  standalone: true,
  imports: [
    CommonModule,
    NgxChartsModule
  ],
  providers: [DatePipe],
  templateUrl: './dashboard-certif.component.html',
  styleUrls: ['./dashboard-certif.component.scss']
})
export class DashboardCertifComponent implements OnInit {
  @Input() userId!: number;

  stats: any = {};
  expiringCertifs: any[] = [];
  timelineData: any[] = [];
  loading = true;

  constructor(private certifService: CertifService, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.certifService.getCertifSummary(this.userId).subscribe(summary => {
      this.stats = summary;
      this.loading = false;
    });
    this.certifService.getExpiringCertifs(this.userId).subscribe(certifs => {
      this.expiringCertifs = certifs;
    });
    this.certifService.getTimeline(this.userId).subscribe(history => {
      this.timelineData = (history || []).map(c => ({
        name: new Date(c.date).toLocaleDateString(),
        value: c.nb_certifs ?? 0
      }));
    });
  }

  voirDetail() {
    this.router.navigate(['/certif/detail']);
  }
}
