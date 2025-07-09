import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rgpd-audit-detail',
  templateUrl: './rgpd-audit-detail.component.html',
  styleUrls: ['./rgpd-audit-detail.component.scss']
})
export class RgpdAuditDetailComponent implements OnInit {
  displayedColumns: string[] = ['label', 'answer', 'critical', 'advice'];
  dataSource = new MatTableDataSource<any>();
  filterValue = '';
  showCriticalOnly = false;

  // DATA MOCK pour avoir un vrai visuel
  exigences = [
    { label: 'Tenir un registre', answer: 'Oui', critical: true, advice: 'Obligatoire pour tous.', details: '...' },
    { label: 'Informer personnes', answer: 'Oui', critical: false, advice: '', details: '...' },
    { label: 'AIPD en place', answer: 'Non', critical: true, advice: 'Revoir la procédure.', details: '...' },
    { label: 'DPO nommé', answer: 'Non', critical: false, advice: '', details: '...' },
    // etc…
  ];

    constructor(private router: Router) {}

  retourSynthese() {
    this.router.navigate(['/dashboard']);  // Ou '/rgpd', selon ta synthèse cible
  }

  ngOnInit(): void {
    this.dataSource.data = this.exigences;
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.filterValue = value;
    this.filterTable();
  }

  filterTable() {
    let filtered = this.exigences;
    if (this.filterValue) {
      filtered = filtered.filter(el => el.label.toLowerCase().includes(this.filterValue.toLowerCase()));
    }
    if (this.showCriticalOnly) {
      filtered = filtered.filter(el => el.critical);
    }
    this.dataSource.data = filtered;
  }

  exportPDF() { alert('PDF exporté (mock)'); }
  exportCSV() { alert('CSV exporté (mock)'); }
  refaireAudit() { alert('Rediriger vers nouvel audit RGPD'); }
}
