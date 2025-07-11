import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RequestService } from '../../request.service';
import { RgpdRequest } from '../../../../models/rgpd-request';

@Component({
  selector: 'app-request-list',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit {
  @Input() userId!: number;
  requests: RgpdRequest[] = [];
  showForm = false;
  newRequest: Partial<RgpdRequest> = { type: '', message: '' };
  types = [
    "Accès", "Rectification", "Effacement", "Portabilité", "Opposition", "Limitation"
  ];

  constructor(private requestService: RequestService) {}

  ngOnInit() {
    this.loadRequests();
  }

  loadRequests() {
    this.requestService.list(this.userId).subscribe(reqs => this.requests = reqs);
  }

  submitRequest() {
    this.requestService.create({ ...this.newRequest, user_id: this.userId } as RgpdRequest)
      .subscribe(req => {
        this.requests.unshift(req);
        this.showForm = false;
        this.newRequest = { type: '', message: '' };
      });
  }
}
