import { Routes } from '@angular/router';
import { AiPageComponent } from './pages/ai-page/ai-page.component'

import { authGuard } from '../../core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: AiPageComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },

    ]
  }
];
