export interface Site {
  id: string;
  name: string;
  address: string;
  city: string;
  zipCode: string;
  score?: number;
}

export interface SiteDocument {
  filename: string;      // sert d’id unique pour la suppression
  siteId: string;
  fileUrl: string;
  uploadedAt: string;
}
