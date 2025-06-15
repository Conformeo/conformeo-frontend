import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }  from '@angular/router';
import { routes }        from './actions.route';
import { SharedModule }  from '../../shared/shared.module';
import { ActionsPageComponent } from './pages/actions-page/actions-page.component'
import { ActionListItemComponent } from './components/action-list-item/action-list-item.component'

@NgModule({
  declarations: [
    ActionsPageComponent,
    ActionListItemComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ActionsModule {}
