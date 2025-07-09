import { Component, Input, OnInit } from '@angular/core';
import { OuvriersService } from '../../ouvriers.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-ouvriers',
  standalone: true,
  imports: [
    CommonModule,
    NgxChartsModule
  ],
  providers: [DatePipe],
  templateUrl: './dashboard-ouvriers.component.html',
  styleUrls: ['./dashboard-ouvriers.component.scss']
})
export class DashboardOuvriersComponent implements OnInit {
  @Input() userId!: number;

  stats: any = {};
  formations: any[] = [];
  timelineData: any[] = [];
  loading = true;

  constructor(private ouvriersService: OuvriersService, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.ouvriersService.getOuvriersSummary(this.userId).subscribe(summary => {
      this.stats = summary;
      this.loading = false;
    });
    this.ouvriersService.getFormations(this.userId).subscribe(data => {
      this.formations = data;
    });
    this.ouvriersService.getTimeline(this.userId).subscribe(history => {
      this.timelineData = (history || []).map(o => ({
        name: new Date(o.date).toLocaleDateString(),
        value: o.nb_ouvriers ?? 0
      }));
    });
  }

  voirDetail() {
    this.router.navigate(['/ouvriers/detail']);
  }
}
