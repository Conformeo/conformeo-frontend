import { Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { DashboardCockpitComponent } from './dashboard-cockpit/dashboard-cockpit.component';
import { authGuard } from '../../core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ]
  },
  { path: 'cockpit', 
    component: DashboardCockpitComponent 
  }
];
