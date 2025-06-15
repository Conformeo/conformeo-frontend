import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }  from '@angular/router';
import { routes }        from './ai.route';
import { SharedModule }  from '../../shared/shared.module';
import { AiPageComponent } from './pages/ai-page/ai-page.component'

@NgModule({
  declarations: [
    AiPageComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ActionsModule {}
