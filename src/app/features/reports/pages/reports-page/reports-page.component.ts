import { Component } from '@angular/core';
import { ReportsService } from '../../reports.service';
import { Report } from '../../../../models/report.model';
import { CommonModule } from '@angular/common';


// 👇 AJOUT
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ReportsPageComponent {
  report?: Report;

  constructor(private reportsService: ReportsService) {}

  fetchReport(data: any) {
    this.reportsService.getReport(data).subscribe(rep => this.report = rep);
  }

  exportPDF() {
    const element = document.getElementById('pdf-rapport');
    if (element) {
      html2pdf().from(element).save('Rapport-Conformeo.pdf');
    }
  }
}
