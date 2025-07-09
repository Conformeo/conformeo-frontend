import { Routes } from '@angular/router';
import { DashboardRgpdComponent } from './pages/dashboard-rgpd/dashboard-rgpd.component';
import { RgpdAuditDetailComponent } from './pages/rgpd-audit-detail/rgpd-audit-detail.component';
import { RgpdCreateComponent } from './pages/rgpd-create/rgpd-create.component';

export const rgpdRoutes: Routes = [
  { path: '', component: DashboardRgpdComponent },
  { path: 'audit/new', component: RgpdCreateComponent },
  { path: 'audit/:id', component: RgpdAuditDetailComponent },
];
