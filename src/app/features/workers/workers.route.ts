import { Routes } from '@angular/router';
import { WorkersPageComponent } from './pages/workers-page/workers-page.component'
import { authGuard } from '../../core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: WorkersPageComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },

    ]
  }
];
