import { Routes } from '@angular/router';
import { PartnersPageComponent } from './pages/partners-page/partners-page.component'
import { AuthGuard } from '../../core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: PartnersPageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ]
  }
];
