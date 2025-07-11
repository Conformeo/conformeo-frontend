import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { AuditLogService } from '../../audit-log.service';
import { AuditLog } from '../../../../models/auditlog';

@Component({
  selector: 'app-audit-log-list',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './audit-log-list.component.html',
  styleUrls: ['./audit-log-list.component.scss']
})
export class AuditLogListComponent implements OnInit {
  @Input() userId!: number;
  logs: AuditLog[] = [];

  constructor(private logService: AuditLogService) {}

  ngOnInit() {
    this.logService.list(this.userId).subscribe(logs => this.logs = logs);
  }
}
