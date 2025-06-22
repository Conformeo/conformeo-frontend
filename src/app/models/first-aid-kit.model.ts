export interface FirstAidKit {
  id: string;
  site: string;
  expiry: string;       // ISO date yyyy-MM-dd
  status: 'OK' | 'EXPIRED' | 'TO_CHECK';
}