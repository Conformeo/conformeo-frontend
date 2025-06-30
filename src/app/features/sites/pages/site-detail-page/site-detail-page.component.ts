import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, map } from 'rxjs';

import { SitesService } from '../../services/sites.service';
import { Site } from '../../../../models/site.model';
import { SitePhoto, SiteDocument } from '../../../../models/site-photo';

@Component({
  selector: 'app-site-detail-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './site-detail-page.component.html',
})
export class SiteDetailPageComponent implements OnInit {
  site$!: Observable<Site | undefined>;
  siteId = '';
  dragActive = false;
  photosToUpload: File[] = [];
  zoom = 1;
  photos: SitePhoto[] = [];
  docToUpload?: File;
  documents: SiteDocument[] = [];
  lightboxOpen = false;
  selectedPhotoIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private service: SitesService
  ) {}

  // Navigation clavier
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.lightboxOpen) return;
    if (event.key === 'ArrowRight') this.nextPhoto();
    if (event.key === 'ArrowLeft') this.prevPhoto();
    if (event.key === 'Escape') this.closeLightbox();
    if (event.key === '+' || event.key === '=') this.zoomIn();
    if (event.key === '-') this.zoomOut();
  }
  
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
  // Drag & drop (optionnel)
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragActive = true;
  }
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.dragActive = false;
  }
  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragActive = false;
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      Array.from(event.dataTransfer.files).forEach(file => {
        if (file.type.startsWith('image/')) this.photosToUpload.push(file);
      });
    }
  }
  // Sélection de fichiers
  onPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.photosToUpload = Array.from(input.files);
    }
  }
  uploadPhotos() {
    if (!this.siteId || !this.photosToUpload.length) return;
    const files = [...this.photosToUpload];
    this.photosToUpload = [];
    files.forEach(file => {
      this.service.uploadPhoto(this.siteId, file).subscribe(photo => {
        this.photos.unshift(photo);
      });
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

  // Lightbox / Zoom
  zoomIn() { this.zoom = Math.min(this.zoom + 0.2, 3); }
  zoomOut() { this.zoom = Math.max(this.zoom - 0.2, 1); }
  toggleZoom() { this.zoom = this.zoom === 1 ? 2 : 1; }

  openLightbox(index: number) {
    this.selectedPhotoIndex = index;
    this.zoom = 1;
    this.lightboxOpen = true;
  }
  closeLightbox() {
    this.lightboxOpen = false;
    this.zoom = 1;
  }
  prevPhoto() {
    if (this.photos.length === 0) return;
    this.selectedPhotoIndex = (this.selectedPhotoIndex - 1 + this.photos.length) % this.photos.length;
    this.zoom = 1;
  }
  nextPhoto() {
    if (this.photos.length === 0) return;
    this.selectedPhotoIndex = (this.selectedPhotoIndex + 1) % this.photos.length;
    this.zoom = 1;
  }
  fullscreen() {
    const img = document.querySelector('.fixed .relative img') as HTMLElement;
    if (img && img.requestFullscreen) img.requestFullscreen();
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
