import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule }  from '@angular/router';
import { routes }        from './scoreboard.route';
import { SharedModule }  from '../../shared/shared.module';
import { ScoreboardPageComponent } from './pages/scoreboard-page/scoreboard-page.component'

@NgModule({
  declarations: [
    ScoreboardPageComponent,

    // …
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})

export class ScoreboardModule { }
