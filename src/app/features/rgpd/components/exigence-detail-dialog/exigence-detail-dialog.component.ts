import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-exigence-detail-dialog',
  imports: [],
  templateUrl: './exigence-detail-dialog.component.html',
  styleUrl: './exigence-detail-dialog.component.scss'
})
export class ExigenceDetailDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
