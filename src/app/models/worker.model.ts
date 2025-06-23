export interface Worker {
  id: string;
  lastName: string;
  firstName: string;
  role: string;
  phone?: string;
  email?: string;
  siteId?: string; // Optionnel : rattachement à un chantier (site)
}
