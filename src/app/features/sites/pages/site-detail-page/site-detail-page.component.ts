import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, map } from 'rxjs';

import { SitesService } from '../../services/sites.service';
import { Site } from '../../../../models/site.model';
import { SitePhoto, SiteDocument } from '../../../../models/site-photo';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-site-detail-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './site-detail-page.component.html', // Utilise un fichier .html si c'est plus lisible !
})
export class SiteDetailPageComponent implements OnInit {
  site$!: Observable<Site | undefined>;
  siteId = '';
  photoToUpload?: File;
  photos: SitePhoto[] = [];
  docToUpload?: File;
  documents: SiteDocument[] = [];

  constructor(
    private route: ActivatedRoute,
    private service: SitesService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.site$ = this.route.paramMap.pipe(
      map(params => params.get('id') ?? ''),
      switchMap(id => {
        this.siteId = id;
        this.refreshPhotos();
        this.refreshDocuments();
        return this.service.getById(id);
      })
    );
  }

  onPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) this.photoToUpload = input.files[0];
  }
  uploadPhoto() {
    if (!this.siteId || !this.photoToUpload) return;
    this.service.uploadPhoto(this.siteId, this.photoToUpload).subscribe(photo => {
      this.photos.unshift(photo);
      this.photoToUpload = undefined;
    });
  }
  refreshPhotos() {
    if (!this.siteId) return;
    this.service.getPhotos(this.siteId).subscribe(list => this.photos = list);
  }

  // Documents
  onDocSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) this.docToUpload = input.files[0];
  }
  uploadDocument(siteId: string, file: File): Observable<SiteDocument> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<SiteDocument>(`/api/sites/${siteId}/documents`, formData);
  }

  refreshDocuments() {
    if (!this.siteId) return;
    this.service.getDocuments(this.siteId).subscribe(list => this.documents = list);
  }

}
