import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { AppShellComponent } from './core/shell/app-shell/app-shell.component';

export const routes: Routes = [
  /* ---------- Shell global ---------- */
  {
    path: '',
    component: AppShellComponent,
    children: [
      /* ---------- Stand-alone pages ---------- */
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard-page/dashboard-page.component')
            .then(m => m.DashboardPageComponent),
      },
      {
        path: 'company',
        loadComponent: () =>
          import('./features/company/pages/company-page/company-page.component')
            .then(m => m.CompanyPageComponent),
      },

      /* ---------- Feature-modules protégés ---------- */
      {
        path: 'sites',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/sites/sites.module').then(m => m.SitesModule),
      },
      {
        path: 'inspections',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/inspections/inspections.module').then(m => m.InspectionsModule),
      },
      {
        path: 'equipments',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/equipments/equipments.module').then(m => m.EquipmentsModule),
      },
      {
        path: 'workers',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/workers/workers.module').then(m => m.WorkersModule),
      },
      {
        path: 'actions',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/actions/actions.module').then(m => m.ActionsModule),
      },
      {
        path: 'scoreboard',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/scoreboard/scoreboard.module').then(m => m.ScoreboardModule),
      },
      {
        path: 'alerts',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/alerts/alerts.module').then(m => m.AlertsModule),
      },
      {
        path: 'reports',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/reports/reports.module').then(m => m.ReportsModule),
      },
      {
        path: 'ai',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/ai/ai.module').then(m => m.AiModule),
      },
      {
        path: 'partners',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/partners/partners.module').then(m => m.PartnersModule),
      },
      {
        path: 'esg',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/esg/esg.module').then(m => m.EsgModule),
      },
      {
        path: 'training',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/training/training.module').then(m => m.TrainingModule),
      },
      {
        path: 'support',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/support/support.module').then(m => m.SupportModule),
      },
      {
        path: 'settings',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/settings/settings.module').then(m => m.SettingsModule),
      },

      /* ---------- Redirection par défaut ---------- */
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  /* ---------- Catch-all global ---------- */
  { path: '**', redirectTo: 'dashboard' },
];
