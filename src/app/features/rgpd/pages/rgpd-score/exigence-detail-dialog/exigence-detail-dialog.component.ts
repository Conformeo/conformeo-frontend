import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-exigence-detail-dialog',
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './exigence-detail-dialog.component.html',
  styleUrl: './exigence-detail-dialog.component.scss'
})
export class ExigenceDetailDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
