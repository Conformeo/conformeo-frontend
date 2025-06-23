import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Site } from '../../../../models/site.model';

@Component({
  selector: 'app-site-table',
  standalone: true,
  templateUrl: './site-table.component.html',
  imports: [CommonModule, RouterModule],
})
export class SiteTableComponent {
  @Input() sites: Site[] = [];
  @Output() edit = new EventEmitter<Site>();
  @Output() delete = new EventEmitter<string>();
}
