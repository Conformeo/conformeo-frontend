import { Component, Input, OnInit } from '@angular/core';
import { RgpdService } from '../../rgpd.service';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ExigenceDetailDialogComponent } from './exigence-detail-dialog/exigence-detail-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { RgpdScore } from '../../../../models/rgpd-score.model';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Color, ScaleType } from '@swimlane/ngx-charts';


@Component({
  selector: 'app-rgpd-score',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    NgxChartsModule

  ],
  templateUrl: './rgpd-score.component.html',
  styleUrls: ['./rgpd-score.component.scss']
})
export class RgpdScoreComponent implements OnInit {
  @Input() auditId!: number;
  @Input() userId?: number; // optionnel si tu veux passer l'utilisateur
  audit: any;
  exigences: any[] = [];


  score!: any;
  displayedColumns: string[] = ['label', 'answer', 'critical', 'advice'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  filterValue = '';
  showCriticalOnly = false;
  timelineData: any[] = [];

  colorScheme: Color = {
    name: 'green',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#388e3c', '#d32f2f'],
  };


  constructor(
    private rgpdService: RgpdService, 
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
  if (this.auditId) {
      this.rgpdService.getAudit(this.auditId).subscribe(audit => {
        this.audit = audit;
        this.dataSource.data = audit.exigences ?? [];
        this.score = {
          score: audit.score ?? this.calculScore(audit.exigences),
          conforme: audit.exigences.filter((x:any) => x.answer === 'oui').length,
          non_conforme: audit.exigences.filter((x:any) => x.answer !== 'oui').length,
          critical_ko: audit.exigences.filter((x:any) => x.critical && x.answer !== 'oui'),
          total: audit.exigences.length
        };
      });
    }
    // ... timelineData si besoin
  }
  calculScore(exigences: any[]): number {
    if (!exigences?.length) return 0;
    const ok = exigences.filter(x => x.answer === 'oui').length;
    return Math.round(100 * ok / exigences.length);
  }


  openDetail(row: any): void {
    this.dialog.open(ExigenceDetailDialogComponent, {
      width: '400px',
      data: row
    });
  }

  refaireTest(): void {
    // TODO: remplacer par navigation réelle vers le questionnaire RGPD
    alert('Redirection vers la nouvelle auto-évaluation RGPD (à implémenter)');
  }

  copierMarkdown(): void {
    const md = this.rgpdService.generateMarkdown(this.score);
    navigator.clipboard.writeText(md);
    alert('Markdown copié !');
  }

  copierHTML(): void {
    const html = this.rgpdService.generateHtml(this.score);
    navigator.clipboard.writeText(html);
    alert('HTML copié !');
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = filterValue;
    this.filterTable();
  }

  filterTable(): void {
    let filtered = this.score.details;
    if (this.filterValue) {
      filtered = filtered.filter((el: any) => el.label.toLowerCase().includes(this.filterValue.toLowerCase()));
    }
    if (this.showCriticalOnly) {
      filtered = filtered.filter((el: any) => el.critical);
    }
    this.dataSource.data = filtered;
  }

  downloadPDF() {
    this.rgpdService.downloadPdf(this.audit.id).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `rapport_rgpd_${this.audit.id}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
  downloadCSV() {
    this.rgpdService.downloadCsv(this.audit.id).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `rgpd_export_${this.audit.id}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

}
