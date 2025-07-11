import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRgpdComponent } from '../dashboard-rgpd/dashboard-rgpd.component';

// import { RgpdProcedureComponent } from '../rgpd-procedure/rgpd-procedure.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { RegisterListComponent } from '../../components/register-list/register-list.component';

@Component({
  selector: 'app-rgpd-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DashboardRgpdComponent,
    RegisterListComponent,
    MatButtonModule
    // Ajoute ici d'autres sous-composants RGPD (audit, historique, etc)
  ],
  templateUrl: './rgpd-home.component.html',
  styleUrls: ['./rgpd-home.component.scss']
})
export class RgpdHomeComponent {}
