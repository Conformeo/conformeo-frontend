// fire-extinguisher.model.ts
export interface FireExtinguisher {
  location: string;
  lastControl: string;    // YYYY-MM
  nextControl: string;    // YYYY-MM
  status: 'OK'|'TO_SCHEDULE';
}