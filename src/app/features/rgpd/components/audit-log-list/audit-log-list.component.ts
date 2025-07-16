import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { AuditLogService } from '../../audit-log.service';
import { AuditLog } from '../../../../models/audit-log';

@Component({
  selector: 'app-audit-log-list',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './audit-log-list.component.html',
  styleUrls: ['./audit-log-list.component.scss'],
})
export class AuditLogListComponent implements OnInit {
  @Input() userId?: number;
  logs: AuditLog[] = [];
  loading = true;

  constructor(private auditLogService: AuditLogService) {}

  ngOnInit() {
    this.loading = true;
    this.auditLogService.list(this.userId).subscribe({
      next: logs => {
        this.logs = logs;
        this.loading = false;
      },
      error: () => {
        this.logs = [];
        this.loading = false;
      }
    });
  }
}
