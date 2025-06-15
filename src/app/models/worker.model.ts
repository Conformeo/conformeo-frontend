// worker.model.ts
export interface Worker {
  fullName: string;
  certification: string;
  expiryDate?: string;    // MM/YYYY ou undefined
  status: 'VALID'|'RENEW'|'SCHEDULED';
}