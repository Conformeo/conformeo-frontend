// src/app/models/certification.model.ts
export type CertStatus = 'VALID' | 'RENEW' | 'NOT_OBTAINED';

export interface Certification {
  id?: string;             // ← ou number, selon votre back
  name: string;
  validUntil?: string;     // ISO yyyy-MM-dd | undefined
  status: CertStatus;
}
