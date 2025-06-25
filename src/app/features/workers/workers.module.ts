import { NgModule }      from '@angular/core';
import { RouterModule }  from '@angular/router';

import { routes } from './workers.route';

@NgModule({
  imports: [RouterModule.forChild(routes)],
  // ...
})
export class WorkersModule { }
