// src/app/app.route.ts
import { Routes } from '@angular/router';
<<<<<<< HEAD
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
=======
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '',   redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', 
    canActivate: [ authGuard ],
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  { path: 'company', 
    canActivate: [ authGuard ],
    loadChildren: () =>
      import('./features/company/company.module').then(m => m.CompanyModule)
  },
  { path: 'sites', 
    canActivate: [ authGuard ],
    loadChildren: () =>
      import('./features/sites/sites.module').then(m => m.SitesModule)
  },
  { path: 'inspections', 
    canActivate: [ authGuard ],
    loadChildren: () =>
      import('./features/inspections/inspections.module').then(m => m.InspectionsModule)
  },
  { path: 'equipments', 
    canActivate: [ authGuard ],
    loadChildren: () =>
      import('./features/equipments/equipments.module').then(m => m.EquipmentsModule)
  },
  { path: 'workers', 
    canActivate: [ authGuard ],
    loadChildren: () =>
      import('./features/workers/workers.module').then(m => m.WorkersModule)
  },
  { path: 'actions', 
    canActivate: [ authGuard ],
    loadChildren: () =>
      import('./features/actions/actions.module').then(m => m.ActionsModule)
  },
  { path: 'scoreboard', 
    canActivate: [ authGuard ],
    loadChildren: () =>
      import('./features/scoreboard/scoreboard.module').then(m => m.ScoreboardModule)
  },
  { path: 'alerts', 
    canActivate: [ authGuard ],
    loadChildren: () =>
      import('./features/alerts/alerts.module').then(m => m.AlertsModule)
  },
  { path: 'reports', 
    canActivate: [ authGuard ],
    loadChildren: () =>
      import('./features/reports/reports.module').then(m => m.ReportsModule)
  },
  { path: 'ai', 
    canActivate: [ authGuard ],
    loadChildren: () =>
      import('./features/ai/ai.module').then(m => m.AiModule)
  },
  { path: 'partners', 
    canActivate: [ authGuard ],
    loadChildren: () =>
      import('./features/partners/partners.module').then(m => m.PartnersModule)
  },
  { path: 'esg', 
    canActivate: [ authGuard ],
    loadChildren: () =>
      import('./features/esg/esg.module').then(m => m.EsgModule)
  },
  { path: 'training', 
    canActivate: [ authGuard ],
    loadChildren: () =>
      import('./features/training/training.module').then(m => m.TrainingModule)
  },
  { path: 'support', 
    canActivate: [ authGuard ],
    loadChildren: () =>
      import('./features/support/support.module').then(m => m.SupportModule)
  },
  { path: 'settings', 
    canActivate: [ authGuard ],
    loadChildren: () =>
      import('./features/settings/settings.module').then(m => m.SettingsModule)
  },
  { path: '**', redirectTo: 'dashboard' }
>>>>>>> 990e924 (chore: scaffold features, components, services, Cypress fixtures & commands, and design system skeleton)
];
