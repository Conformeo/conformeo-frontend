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
        data: { title: 'Tableau de bord' },
      },
      {
        path: 'company',
        loadComponent: () =>
          import('./features/company/pages/company-page/company-page.component')
            .then(m => m.CompanyPageComponent),
        data: { title: 'Entreprise' },
      },

      /* ---------- Feature-modules protégés ---------- */
      {
        path: 'sites',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/sites/sites.module').then(m => m.SitesModule),
        data: { title: 'Chantiers' },
      },
      {
        path: 'inspections',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/inspections/inspections.module').then(m => m.InspectionsModule),
        data: { title: 'Inspections' },
      },
      {
        path: 'equipments',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/equipments/equipments.module').then(m => m.EquipmentsModule),
        data: { title: 'Équipements' },
      },
      {
        path: 'workers',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/workers/workers.module').then(m => m.WorkersModule),
        data: { title: 'Travailleurs' },
      },
      {
        path: 'actions',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/actions/actions.module').then(m => m.ActionsModule),
        data: { title: 'Actions' },
      },
      {
        path: 'scoreboard',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/scoreboard/scoreboard.module').then(m => m.ScoreboardModule),
        data: { title: 'Scoreboard' },
      },
      {
        path: 'alerts',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/alerts/alerts.module').then(m => m.AlertsModule),
        data: { title: 'Alertes' },
      },
      {
        path: 'reports',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/reports/reports.module').then(m => m.ReportsModule),
        data: { title: 'Rapports' },
      },
      {
        path: 'ai',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/ai/ai.module').then(m => m.AiModule),
        data: { title: 'IA' },
      },
      {
        path: 'partners',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/partners/partners.module').then(m => m.PartnersModule),
        data: { title: 'Partenaires' },
      },
      {
        path: 'esg',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/esg/esg.module').then(m => m.EsgModule),
        data: { title: 'ESG' },
      },
      {
        path: 'training',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/training/training.module').then(m => m.TrainingModule),
        data: { title: 'Formations' },
      },
      {
        path: 'support',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/support/support.module').then(m => m.SupportModule),
        data: { title: 'Support' },
      },
      {
        path: 'settings',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/settings/settings.module').then(m => m.SettingsModule),
        data: { title: 'Paramètres' },
      },

      /* ---------- Redirection par défaut ---------- */
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  /* ---------- Catch-all global ---------- */
  { path: '**', redirectTo: 'dashboard' },
];
