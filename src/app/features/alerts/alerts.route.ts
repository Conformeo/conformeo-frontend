import { Routes } from '@angular/router';
import { AlertsPageComponent } from './pages/alerts-page/alerts-page.component'
import { authGuard } from '../../core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: AlertsPageComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ]
  }
];
