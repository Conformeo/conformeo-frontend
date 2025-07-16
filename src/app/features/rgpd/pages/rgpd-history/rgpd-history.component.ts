import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RgpdService } from '../../rgpd.service'; // ← adapte le chemin si besoin
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-rgpd-history',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './rgpd-history.component.html',
  styleUrls: ['./rgpd-history.component.scss']
})
export class RgpdHistoryComponent implements OnInit {
  audits: any[] = [];
  loading = true;
  error = false;

  constructor(
    private rgpdService: RgpdService,
    private authService: AuthService    // <-- injecte ici

  ) {}

  ngOnInit() {
    const userId = this.authService.getUserId();
    if (!userId) {
      this.error = true;
      this.loading = false;
      return;
    }
    this.rgpdService.getAudits(userId).subscribe({
      next: audits => {
        this.audits = audits;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }
}



