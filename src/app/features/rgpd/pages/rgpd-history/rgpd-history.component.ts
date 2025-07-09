import { Component, Input, OnInit } from '@angular/core';
import { RgpdService } from '../../rgpd.service';
import { RgpdAudit } from '../../../../models/rgpd-audit.model';

@Component({
  selector: 'app-rgpd-history',
  templateUrl: './rgpd-history.component.html'
})
export class RgpdHistoryComponent implements OnInit {
  @Input() userId!: number;
  audits: RgpdAudit[] = [];



  constructor(private rgpdService: RgpdService) {}

  ngOnInit() {
  if (this.userId) {
    this.rgpdService.getAuditHistory(this.userId).subscribe(data => {
      this.audits = Array.isArray(data) ? data : [];
    });
  }
}

}
