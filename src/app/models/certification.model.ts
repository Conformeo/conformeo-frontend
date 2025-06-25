export type CertificationStatus = 'VALID' | 'RENEW' | 'NOT_OBTAINED';
export interface Certification {
  id: string;
  name: string;
  validUntil: string;
  status: CertificationStatus;
}
