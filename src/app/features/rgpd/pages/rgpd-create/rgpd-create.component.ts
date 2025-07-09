import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RgpdService } from '../../rgpd.service';

@Component({
  selector: 'app-rgpd-create',
  templateUrl: './rgpd-create.component.html',
  styleUrls: ['./rgpd-create.component.scss'],
  standalone: true,
  imports: [/* Material, Forms, etc. */]
})
export class RgpdCreateComponent implements OnInit {
  exigences: any[] = [];
  answers: { [exigenceId: number]: string } = {};

  constructor(private rgpd: RgpdService, private router: Router) {}

  ngOnInit(): void {
    this.rgpd.getExigences().subscribe(data => (this.exigences = data));
  }

  submit(): void {
    const user_id = 1; // à adapter
    const company_id = 1; // à adapter
    const payload = {
      user_id,
      company_id,
      statut: 'TERMINE',
      exigences: this.exigences.map(e => ({
        exigence_id: e.id,
        answer: this.answers[e.id] || '',
        critical: e.critical,
        advice: e.advice,
      })),
    };
    this.rgpd.createAudit(payload).subscribe(audit => {
      this.router.navigate(['/rgpd/audit', audit.id]);
    });
  }
}
