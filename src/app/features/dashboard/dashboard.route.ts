import { Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { DashboardCockpitComponent } from './dashboard-cockpit/dashboard-cockpit.component';
import { AuthGuard } from '../../core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ]
  },
  { path: 'cockpit', 
    component: DashboardCockpitComponent 
  }
];
