// src/app/features/dashboard/dashboard-cockpit.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importe tes mini-dashboards ici :
import { DashboardRgpdComponent } from '../../rgpd/pages/dashboard-rgpd/dashboard-rgpd.component';
import { DashboardDuerpComponent } from '../../duerp/pages/dashboard-duerp/dashboard-duerp.component';
import { DashboardCertifComponent } from '../../certif/pages/dashboard-certifi/dashboard-certif.component';
import { DashboardSecuriteComponent } from '../../securite/pages/dashboard-securite/dashboard-securite.component';
import { DashboardOuvriersComponent } from '../../ouvriers/pages/dashboard-ouvriers/dashboard-ouvriers.component';

@Component({
  selector: 'app-dashboard-cockpit',
  standalone: true,
  imports: [
    CommonModule,
    DashboardRgpdComponent,
    DashboardDuerpComponent,
    DashboardCertifComponent,
    DashboardSecuriteComponent,
    DashboardOuvriersComponent,
    // Ajoute ici tes autres mini-dashboards
  ],
  templateUrl: './dashboard-cockpit.component.html',
  styleUrls: ['./dashboard-cockpit.component.scss']
})
export class DashboardCockpitComponent {
  // Configuration dynamique, ex : fetch en base/user settings (ici hardcodé pour démo)
  modulesActive = {
    rgpd: true,
    duerp: true,      // Active/désactive chaque bloc
    ouvriers: false,
    certif: false,
    securite: true
    // Ajoute d'autres modules...
  };

  // Ids utilisés pour les inputs de chaque module
  userId = 1;          // Simule l'utilisateur courant
  auditId = 1;         // Dernier audit RGPD sélectionné, etc.
}
