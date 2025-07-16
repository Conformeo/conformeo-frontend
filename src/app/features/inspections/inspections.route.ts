import { Routes } from '@angular/router';
import { InspectionsPageComponent } from './pages/inspections-page/inspections-page.component'
import { AuthGuard } from '../../core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: InspectionsPageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },

    ]
  }
];
