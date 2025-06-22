export interface Insurance {
  id: string;
  type: 'RC_PRO' | 'DECENNALE';
  provider: string;
  validUntil: string;   // ISO date yyyy-MM-dd
}