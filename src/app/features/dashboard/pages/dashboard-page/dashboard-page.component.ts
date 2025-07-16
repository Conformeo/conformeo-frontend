import { Component, OnInit } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { Observable }         from 'rxjs';
import { DashboardStat }      from '../../../../models/dashboard-stat.model';
import { DashboardService }   from '../../dashboard.service';
import { StatCardComponent }  from '../../components/stat-card/stat-card.component';
import { IconsModule } from '../../../../icons/icons.module';
import { ActivatedRoute } from '@angular/router';
import { DashboardCockpitComponent } from '../../dashboard-cockpit/dashboard-cockpit.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    CommonModule, 
    StatCardComponent, 
    DashboardCockpitComponent,
    IconsModule
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  stats$!: Observable<DashboardStat[]>;
  auditId?: number;
  idAuditEnCours = 1; // ou valeur réelle
  idUser = 1; 

  constructor(
    private dashboardService: DashboardService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.auditId = +params['auditId']; // si tu utilises un route param
    });
  }
  

  ngOnInit() {
    this.stats$ = this.dashboardService.getStats();
  }
}
