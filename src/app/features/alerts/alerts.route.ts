import { Routes } from '@angular/router';
import { AlertsPageComponent } from './pages/alerts-page/alerts-page.component'
import { AuthGuard } from '../../core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: AlertsPageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ]
  }
];
