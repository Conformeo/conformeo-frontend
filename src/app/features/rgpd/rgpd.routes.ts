import { Routes } from '@angular/router';
import { RgpdPageComponent } from './pages/rgpd-page/rgpd-page.component'; // Layout ou container (optionnel)
import { RgpdHomeComponent } from './pages/rgpd-home/rgpd-home.component';
import { RgpdHistoryComponent } from './pages/rgpd-history/rgpd-history.component';
import { RgpdAuditDetailComponent } from './pages/rgpd-audit-detail/rgpd-audit-detail.component';
import { RgpdAuditNewComponent } from './pages/rgpd-audit-new/rgpd-audit-new.component';
import { RgpdProcedureComponent } from './pages/rgpd-procedure/rgpd-procedure.component';
import { canActivateAuth } from '../../shared/guards/auth.guard';
import { RegistreListComponent } from './components/registre-list/registre-list.component';
// On part du principe que le module est lazy chargé sous le path "rgpd"

export const RGPD_ROUTES: Routes = [
  {
    path: '',
    component: RgpdPageComponent, // Peut être un layout, ou à remplacer par RgpdHomeComponent si inutile
    canActivate: [canActivateAuth],
    children: [
      { path: '', component: RgpdHomeComponent }, // /rgpd
      { path: 'history', component: RgpdHistoryComponent }, // /rgpd/historique
      { path: 'audit/new', component: RgpdAuditNewComponent }, // /rgpd/audit/new
      { path: 'audit/:id', component: RgpdAuditDetailComponent }, // /rgpd/audit/42
      { path: 'procedure', component: RgpdProcedureComponent }, // /rgpd/procedure
      { path: 'rgpd/registre', component: RegistreListComponent },

    ]
  }
];
