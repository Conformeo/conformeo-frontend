import { NgModule }          from '@angular/core';
import { CommonModule }      from '@angular/common';

/* Pages & composants standalone que l’on souhaite PRÉ-charger
   (sinon ils resteront chargés à la volée via loadComponent) */
import { WorkersPageComponent } from './pages/workers-page/workers-page.component';

import { WorkerFormComponent }  from './components/worker-form/worker-form.component';
import { WorkerTableComponent } from './components/worker-table/worker-table.component';
import { ModalComponent }       from '../../shared/modal/modal.component';
import { WorkersRoutingModule } from './workers.route';  // <-- import des routes du module

import {  } from './workers.route';
import { FormsModule }          from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    WorkersRoutingModule,

    // composants standalone consommés en *template* direct
    WorkerFormComponent,
    WorkerTableComponent,
    ModalComponent,
  ],
})
export class WorkersModule {}        //  ⬅️  **export** obligatoire
