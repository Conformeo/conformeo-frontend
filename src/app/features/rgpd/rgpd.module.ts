import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RGPD_ROUTES } from './rgpd.routes';

// Angular Material et Forms
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';


import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { RgpdScoreComponent } from '../rgpd/pages/rgpd-score/rgpd-score.component';
import { ExigenceDetailDialogComponent } from '../rgpd/pages/rgpd-score/exigence-detail-dialog/exigence-detail-dialog.component';

@NgModule({
  declarations: [
    RgpdScoreComponent,
    ExigenceDetailDialogComponent,
  ],
  imports: [
    RouterModule.forChild(RGPD_ROUTES),
    CommonModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    NgxChartsModule
  ],
  exports: [RgpdScoreComponent]
})
export class RgpdScoreModule {}
