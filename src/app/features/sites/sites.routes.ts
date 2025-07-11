import { Routes } from '@angular/router';
import { SitesPageComponent } from './pages/sites-page/sites-page.component';
import { SiteDetailPageComponent } from './pages/site-detail-page/site-detail-page.component';
import { authGuard } from '../../core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: SitesPageComponent,
    canActivate: [authGuard],
  },
  {
    path: ':id',
    component: SiteDetailPageComponent,
    canActivate: [authGuard],
  }
];
