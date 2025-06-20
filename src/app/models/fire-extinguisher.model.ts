export interface FireExtinguisher {
  id?: string;
  location: string;
  serialNumber: string;
  lastControl: string;   // ISO yyyy-MM-dd
  nextControl: string;   // ISO yyyy-MM-dd ou '—'
  status: 'OK' | 'DUE' | 'TO_SCHEDULE';
}
