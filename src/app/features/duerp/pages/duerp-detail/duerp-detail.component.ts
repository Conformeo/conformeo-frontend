import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-duerp-detail',
  templateUrl: './duerp-detail.component.html',
  styleUrls: ['./duerp-detail.component.scss']
})
export class DuerpDetailComponent implements OnInit {
  displayedColumns: string[] = ['site', 'risque', 'gravite', 'mesure', 'etat'];
  dataSource = new MatTableDataSource<any>();
  filterValue = '';

  risques = [
    { site: 'Chantier Lyon', risque: 'Chute de hauteur', gravite: 'Élevée', mesure: 'Harnais obligatoire', etat: 'Non conforme' },
    { site: 'Siège Paris', risque: 'Électrique', gravite: 'Moyenne', mesure: 'Vérification annuelle', etat: 'Conforme' },
    { site: 'Entrepôt Marseille', risque: 'Incendie', gravite: 'Moyenne', mesure: 'Extincteurs OK', etat: 'Conforme' },
    { site: 'Chantier Bordeaux', risque: 'Manutention', gravite: 'Faible', mesure: 'Formations', etat: 'À revoir' },
    // etc...
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.dataSource.data = this.risques;
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.filterValue = value;
    this.dataSource.data = this.risques.filter(el =>
      Object.values(el).some(val => String(val).toLowerCase().includes(value.toLowerCase()))
    );
  }

  retourCockpit() {
    this.router.navigate(['/dashboard']);
  }
  exportPDF() { alert('PDF DUERP exporté !'); }
  exportCSV() { alert('CSV DUERP exporté !'); }
}
