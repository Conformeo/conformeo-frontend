import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ChecklistListComponent } from './features/checklists/checklist-list/checklist-list.component';
import { ChecklistDetailComponent } from './features/checklists/checklist-detail/checklist-detail/checklist-detail.component';
import { AuthGuard } from './core/guards/auth.guard';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },

  // Nouvelle route dashboard
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },

  // Pour la racine, rediriger vers /dashboard
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // Checklists
  {
    path: 'checklists',
    canActivate: [AuthGuard],
    children: [
      { path: '',    component: ChecklistListComponent },
      { path: ':id', component: ChecklistDetailComponent }
    ]
  },

  { path: '**', redirectTo: '' }
];
