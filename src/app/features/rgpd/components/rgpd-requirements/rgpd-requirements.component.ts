import { Component, OnInit } from '@angular/core';
import { RgpdService } from '../../rgpd.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ExigenceDetailDialogComponent } from '..//exigence-detail-dialog/exigence-detail-dialog.component';

@Component({
  selector: 'app-rgpd-requirements',
  templateUrl: './rgpd-requirements.component.html',
  styleUrls: ['./rgpd-requirements.component.scss']
})
export class RgpdRequirementsComponent implements OnInit {
  displayedColumns = ['label', 'article', 'scope', 'critical', 'detail'];
  dataSource = new MatTableDataSource<any>();

  constructor(private rgpdService: RgpdService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.rgpdService.getRequirements().subscribe(requirements => {
      this.dataSource.data = requirements;
    });
  }

  openDetail(row: any) {
    this.dialog.open(ExigenceDetailDialogComponent, {
      width: '400px',
      data: row
    });
  }
}
