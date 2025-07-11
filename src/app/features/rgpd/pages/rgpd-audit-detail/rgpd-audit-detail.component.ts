import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

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
  exigences = [
    { label: 'Tenir un registre', answer: 'Oui', critical: true, advice: 'Obligatoire pour tous.' },
    { label: 'Informer personnes', answer: 'Oui', critical: false, advice: '' },
    { label: 'AIPD en place', answer: 'Non', critical: true, advice: 'Revoir la procédure.' },
    { label: 'DPO nommé', answer: 'Non', critical: false, advice: '' }
    // ...
  ];

  filterValue = '';
  showCriticalOnly = false;
  filteredData = this.exigences;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.filterTable();
  }

  retourSynthese() {
    this.router.navigate(['/rgpd']);  // Ou '/dashboard', adapte selon ta cible
  }

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
