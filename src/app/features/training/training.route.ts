import { Routes } from '@angular/router';
import { TrainingPageComponent } from './pages/training-page/training-page.component'
import { AuthGuard } from '../../core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: TrainingPageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },

    ]
  }
];
