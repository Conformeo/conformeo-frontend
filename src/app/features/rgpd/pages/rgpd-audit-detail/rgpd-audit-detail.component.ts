import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RgpdService } from '../../rgpd.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rgpd-audit-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './rgpd-audit-detail.component.html',
  styleUrls: ['./rgpd-audit-detail.component.scss']
})
export class RgpdAuditDetailComponent implements OnInit {
  displayedColumns: string[] = ['label', 'answer', 'critical', 'advice'];
  exigences: any[] = [];
  filterValue = '';
  showCriticalOnly = false;
  filteredData: any[] = [];
  loading = true;
  error = false;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private rgpdService: RgpdService
  ) {}

  ngOnInit(): void {
    // Récupère l'ID depuis l'URL
    const auditId = Number(this.route.snapshot.paramMap.get('id'));
    if (!auditId) return; // Optionnel : protège si route mal appelée

    this.rgpdService.getAudit(auditId).subscribe({
      next: (audit) => {
        this.exigences = audit.exigences;
        this.filteredData = this.exigences;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  retourSynthese() { this.router.navigate(['/rgpd']); }
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filterTable();
  }
  filterTable() {
    let filtered = this.exigences;
    if (this.filterValue) {
      filtered = filtered.filter(ex =>
        ex.label.toLowerCase().includes(this.filterValue.toLowerCase())
      );
    }
    if (this.showCriticalOnly) {
      filtered = filtered.filter(ex => ex.critical);
    }
    this.filteredData = filtered;
  }
  exportPDF() { alert('PDF exporté (mock)'); }
  exportCSV() { alert('CSV exporté (mock)'); }
  refaireAudit() { this.router.navigate(['/rgpd/audit/new']); }
}
