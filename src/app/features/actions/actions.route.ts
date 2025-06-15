import { Routes } from '@angular/router';
import { ActionsPageComponent } from './pages/actions-page/actions-page.component'
import { ActionListItemComponent } from './components/action-list-item/action-list-item.component'

import { authGuard } from '../../core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: ActionsPageComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ActionListItemComponent },

    ]
  }
];
