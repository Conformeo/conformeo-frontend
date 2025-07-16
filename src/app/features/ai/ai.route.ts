import { Routes } from '@angular/router';
import { AiPageComponent } from './pages/ai-page/ai-page.component'

import { AuthGuard } from '../../core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: AiPageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },

    ]
  }
];
