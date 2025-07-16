import { Routes } from '@angular/router';
import { ScoreboardPageComponent } from './pages/scoreboard-page/scoreboard-page.component'
import { AuthGuard } from '../../core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: ScoreboardPageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    
    ]
  }
];
