// src/app/models/site-photo.ts
export interface SitePhoto {
  fileUrl: string;
  uploadedAt: string;
  filename?: string; // <- optionnel pour les mocks !
}

export interface SiteDocument {
  fileUrl: string;
  uploadedAt: string;
  filename: string;
}
