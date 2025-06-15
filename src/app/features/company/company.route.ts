import { Routes } from '@angular/router';
import { CompanyPageComponent } from './pages/company-page/company-page.component'
import { authGuard } from '../../core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: CompanyPageComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },

    ]
  }
];
