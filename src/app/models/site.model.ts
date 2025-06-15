// site.model.ts
export interface Site {
  id: string;
  name: string;
  address: string;
  nextControl: string;    // DD/MM/YY
  score: number;          // en pourcentage
}