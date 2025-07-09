import { NgModule }            from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkersPageComponent } from './pages/workers-page/workers-page.component';


export const routes: Routes = [
  { path: '', component: WorkersPageComponent, data:{title:'Ouvriers'} },

];
@NgModule({
  imports:  [RouterModule.forChild(routes)],
  exports:  [RouterModule],
})
export class WorkersRoutingModule {}
