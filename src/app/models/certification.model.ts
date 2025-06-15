// certification.model.ts
export interface Certification {
  name: string;
  validUntil: string;     // YYYY-MM
  status: 'VALID'|'RENEW'|'NOT_OBTAINED';
}
