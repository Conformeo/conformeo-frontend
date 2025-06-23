export interface Chantier {
  id: string;
  nom: string;
  adresse: string;
  prochainControle: string; // ex: '2025-06-25'
  score: number;
}
