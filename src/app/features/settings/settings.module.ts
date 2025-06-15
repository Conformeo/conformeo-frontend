import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule }  from '@angular/router';
import { routes }        from './settings.route';
import { SharedModule }  from '../../shared/shared.module';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component'

@NgModule({
  declarations: [
    SettingsPageComponent,

    // …
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})

export class SettingsModule { }
