export type FireExtinguisherStatus = 'OK' | 'DUE' | 'TO_SCHEDULE';
export interface FireExtinguisher {
  id: string;
  location: string;
  serialNumber: string;
  lastControl: string;
  nextControl: string;
  status: FireExtinguisherStatus;
}
