import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { RgpdService } from '../../rgpd.service'; 

@Component({
  selector: 'app-rgpd-audit-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './rgpd-audit-detail.component.html',
  styleUrls: ['./rgpd-audit-detail.component.scss']
})
export class RgpdAuditDetailComponent implements OnInit {
  audit: any = null;
  exigences: any[] = [];
  displayedColumns: string[] = ['label', 'answer', 'comment', 'action'];
  loading = true;
  error = false;
  saving: { [id: number]: boolean } = {};
  saveSuccess: { [id: number]: boolean } = {};
  saveError: { [id: number]: boolean } = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rgpdService: RgpdService
  ) {}

  ngOnInit(): void {
    const auditId = Number(this.route.snapshot.paramMap.get('id'));
    if (!auditId) {
      this.error = true;
      this.loading = false;
      return;
    }
    this.rgpdService.getAudit(auditId).subscribe({
      next: (audit) => {
        this.audit = audit;
        this.exigences = (audit.exigences || []).map((ex: any) => ({
          ...ex,
          label: ex.exigence?.label || ex.label || '—'
        }));
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  saveExigence(exigence: { id: number; answer: string; comment?: string }) {
    if (!exigence || !exigence.id) return;
    this.saving[exigence.id] = true;
    this.saveSuccess[exigence.id] = false;
    this.saveError[exigence.id] = false;

    this.rgpdService.updateExigence(exigence.id, {
      answer: exigence.answer,
      comment: exigence.comment
    }).subscribe({
      next: () => {
        this.saving[exigence.id] = false;
        this.saveSuccess[exigence.id] = true;
        setTimeout(() => this.saveSuccess[exigence.id] = false, 2000);
      },
      error: () => {
        this.saving[exigence.id] = false;
        this.saveError[exigence.id] = true;
        setTimeout(() => this.saveError[exigence.id] = false, 3000);
      }
    });
  }

  retourSynthese() {
    this.router.navigate(['/rgpd']);
  }
}
