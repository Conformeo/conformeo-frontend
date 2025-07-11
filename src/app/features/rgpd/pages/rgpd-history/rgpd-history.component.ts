import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-rgpd-history',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './rgpd-history.component.html',
  styleUrls: ['./rgpd-history.component.scss']
})
export class RgpdHistoryComponent implements OnInit {
  audits: any[] = [];
  ngOnInit() {
    // À remplacer par appel API
    this.audits = [
      { id: 11, date: '2025-07-10', score: 82 },
      { id: 10, date: '2025-06-01', score: 75 }
    ];
  }
}
