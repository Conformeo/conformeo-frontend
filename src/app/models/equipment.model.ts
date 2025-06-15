// equipment.model.ts
export interface Equipment {
  name: string;
  siteName: string;
  validUntil: string;     // MM/YYYY
  status: 'OK'|'EXPIRED';
}