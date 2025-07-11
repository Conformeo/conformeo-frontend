export interface Register {
  id?: number;
  user_id: number;
  nom_traitement: string;
  finalite?: string;
  base_legale?: string;
  personnes_concernees?: string;
  duree_conservation?: string;
  dpo_id?: number;
  date_creation?: string;
}