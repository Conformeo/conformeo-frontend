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
  templateUrl: './site-detail-page.component.html',
})
export class SiteDetailPageComponent implements OnInit {
  site$!: Observable<Site | undefined>;
  siteId = '';
  photoToUpload?: File;
  photos: SitePhoto[] = [];
  docToUpload?: File;
  documents: SiteDocument[] = [];
  lightboxOpen = false;
  selectedPhotoIndex = 0;

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

  // PHOTOS

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
    this.service.getPhotos(this.siteId).subscribe(list => this.photos = list || []);
  }

  deletePhoto(photo: SitePhoto) {
    if (!this.siteId || !photo.filename) return;
    this.service.deletePhoto(this.siteId, photo.filename).subscribe(() => {
      this.photos = this.photos.filter(p => p.filename !== photo.filename);
    });
  }

  // -- Visionneuse
  openLightbox(index: number) {
    this.selectedPhotoIndex = index;
    this.lightboxOpen = true;
  }
  closeLightbox() {
    this.lightboxOpen = false;
  }
  prevPhoto() {
    if (this.photos.length === 0) return;
    this.selectedPhotoIndex = (this.selectedPhotoIndex - 1 + this.photos.length) % this.photos.length;
  }
  nextPhoto() {
    if (this.photos.length === 0) return;
    this.selectedPhotoIndex = (this.selectedPhotoIndex + 1) % this.photos.length;
  }

  
  // DOCUMENTS

  onDocSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.docToUpload = input.files[0];
    }
  }

  uploadDocument() {
    if (!this.docToUpload || !this.siteId) return;
    this.service.uploadDocument(this.siteId, this.docToUpload).subscribe(doc => {
      this.documents.unshift(doc);
      this.docToUpload = undefined;
    });
  }

  refreshDocuments() {
    if (!this.siteId) return;
    this.service.getDocuments(this.siteId).subscribe(list => this.documents = list || []);
  }

  deleteDocument(doc: SiteDocument) {
    if (!this.siteId || !doc.filename) return;
    this.service.deleteDocument(this.siteId, doc.filename).subscribe(() => {
      this.documents = this.documents.filter(d => d.filename !== doc.filename);
    });
  }
}
