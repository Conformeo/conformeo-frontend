// src/app/features/sites/components/site-camera-table/site-camera-table.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Camera } from '../../../../models/camera.model';
import { CameraApi } from '../../../../core/api/camera.api';

@Component({
  selector: 'app-site-camera-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './site-camera-table.component.html',
})
export class SiteCameraTableComponent implements OnInit {
  @Input() siteId!: string;
  data: Camera[] = [];
  query = '';

  constructor(private api: CameraApi) {}

  ngOnInit() {
    if (this.siteId) {
      this.api.list(this.siteId).subscribe(d => this.data = d);
    }
  }

  get filtered(): Camera[] {
    const q = this.query.trim().toLowerCase();
    return this.data.filter(cam =>
      !q ||
      cam.label?.toLowerCase().includes(q) ||
      cam.location?.toLowerCase().includes(q)
    );
  }
}
