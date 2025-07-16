import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRgpdComponent } from '../dashboard-rgpd/dashboard-rgpd.component';

// import { RgpdProcedureComponent } from '../rgpd-procedure/rgpd-procedure.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { RegistreListComponent } from '../../components/registre-list/registre-list.component';

@Component({
  selector: 'app-rgpd-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DashboardRgpdComponent,
    RegistreListComponent,
    MatButtonModule
    // Ajoute ici d'autres sous-composants RGPD (audit, historique, etc)
  ],
  templateUrl: './rgpd-home.component.html',
  styleUrls: ['./rgpd-home.component.scss']
})
export class RgpdHomeComponent {}
