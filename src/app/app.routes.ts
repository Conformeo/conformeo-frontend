// src/app/app.routes.ts (ou équivalent)
import { Routes } from '@angular/router';
import { AppShellComponent } from './core/shell/app-shell/app-shell.component';

export const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      /* --- Pages principales (standalone) --- */
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/pages/dashboard-page/dashboard-page.component')
          .then(m => m.DashboardPageComponent),
        data: { title: 'Tableau de bord' },
      },
      {
        path: 'company',
        loadComponent: () => import('./features/company/pages/company-page/company-page.component')
          .then(m => m.CompanyPageComponent),
        data: { title: 'Entreprise' },
      },

      /* --- Chantiers (Sites) --- */
      {
        path: 'sites',
        children: [
          {
            path: '',
            loadComponent: () => import('./features/sites/pages/sites-page/sites-page.component')
              .then(m => m.SitesPageComponent),
            data: { title: 'Chantiers' },
          },
          {
            path: ':id',
            loadComponent: () => import('./features/sites/pages/site-detail-page/site-detail-page.component')
              .then(m => m.SiteDetailPageComponent),
            data: { title: 'Détail chantier' },
          }
        ]
      },

      /* --- Modules Lazy (feature modules) --- */
      {
        path: 'inspections',
        loadChildren: () => import('./features/inspections/inspections.module')
          .then(m => m.InspectionsModule),
        data: { title: 'Inspections' },
      },
      {
        path: 'equipments',
        loadChildren: () => import('./features/equipments/equipments.module')
          .then(m => m.EquipmentsModule),
        data: { title: 'Équipements' },
      },
      {
        path: 'workers',
        loadComponent: () => import('./features/workers/pages/workers-page/workers-page.component')
                              .then(m => m.WorkersPageComponent),
        data: { title: 'Ouvriers' },
      },
      {
        path: 'actions',
        loadChildren: () => import('./features/actions/actions.module')
          .then(m => m.ActionsModule),
        data: { title: 'Plan d’actions' },
      },
      {
        path: 'scoreboard',
        loadChildren: () => import('./features/scoreboard/scoreboard.module')
          .then(m => m.ScoreboardModule),
        data: { title: 'Scoreboard' },
      },
      {
        path: 'alerts',
        loadChildren: () => import('./features/alerts/alerts.module')
          .then(m => m.AlertsModule),
        data: { title: 'Alertes' },
      },
      {
        path: 'reports',
        loadComponent: () => import('./features/reports/pages/reports-page/reports-page.component')
          .then(m => m.ReportsPageComponent),
        data: { title: 'Rapports' },
      },
      {
        path: 'rgpd',
        loadChildren: () => import('./features/rgpd/rgpd.routes').then(m => m.RGPD_ROUTES)
      },
      {
        path: 'ai',
        loadChildren: () => import('./features/ai/ai.module')
          .then(m => m.AiModule),
        data: { title: 'Copilote AI' },
      },
      {
        path: 'partners',
        loadChildren: () => import('./features/partners/partners.module')
          .then(m => m.PartnersModule),
        data: { title: 'Partenaires' },
      },
      {
        path: 'esg',
        loadChildren: () => import('./features/esg/esg.module')
          .then(m => m.EsgModule),
        data: { title: 'ESG' },
      },
      {
        path: 'training',
        loadChildren: () => import('./features/training/training.module')
          .then(m => m.TrainingModule),
        data: { title: 'Formations' },
      },
      {
        path: 'support',
        loadChildren: () => import('./features/support/support.module')
          .then(m => m.SupportModule),
        data: { title: 'Support' },
      },
      {
        path: 'settings',
        loadChildren: () => import('./features/settings/settings.module')
          .then(m => m.SettingsModule),
        data: { title: 'Paramètres' },
      },

      /* --- Redirection par défaut --- */
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  /* --- Catch-all global --- */
  { path: '**', redirectTo: 'dashboard' },
];
