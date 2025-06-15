import { Routes } from '@angular/router';
import { EquipmentsPageComponent } from './pages/equipments-page/equipments-page.component'
import { authGuard } from '../../core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: EquipmentsPageComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },

    ]
  }
];
