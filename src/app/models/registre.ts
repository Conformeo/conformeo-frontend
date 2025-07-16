export interface Registre {
  id?: number;
  user_id: number;
  nom_traitement: string;
  finalite: string;
  categorie_donnees?: string;
  categorie_personnes?: string;
  base_legale?: string;
  personnes_concernees: string;
  donnees_traitees?: string;
  destinataires?: string;
  duree_conservation?: string;
  mesures_securite?: string;
  date_creation?: string;
  commentaire?: string;
}
