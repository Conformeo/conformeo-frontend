export interface Camera {
  id: string;
  label: string;
  location: string;
  lastCheck: string;    // ISO date yyyy-MM-dd
  nextCheck: string;    // ISO date yyyy-MM-dd
  status: 'OK' | 'KO';
  thumbnailUrl?: string;
}