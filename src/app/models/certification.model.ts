export interface Certification {
  id?: string;
  name: string;
  validUntil: string;          // yyyy-MM-dd ou '—'
  status: 'VALID' | 'RENEW' | 'NOT_OBTAINED';
}
