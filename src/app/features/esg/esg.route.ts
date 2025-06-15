import { Routes } from '@angular/router';
import { EsgPageComponent } from './pages/esg-page/esg-page.component';
import { authGuard } from '../../core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: EsgPageComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ]
  }
];

