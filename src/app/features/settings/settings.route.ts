import { Routes } from '@angular/router';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component'
import { AuthGuard } from '../../core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: SettingsPageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },

    ]
  }
];
