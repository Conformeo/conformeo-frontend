import { Routes } from '@angular/router';
import { EsgPageComponent } from './pages/esg-page/esg-page.component';
import { AuthGuard } from '../../core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: EsgPageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ]
  }
];

