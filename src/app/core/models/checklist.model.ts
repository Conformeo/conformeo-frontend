export interface ChecklistItem {
  /** Identifiant unique de l'item */
  id: number;

  /** Libellé de l'item */
  label: string;

  /** Statut cochée */
  is_done: boolean;
}

export interface Checklist {
  /** Identifiant unique de la checklist */
  id: number;

  /** Nom ou titre de la checklist */
  name: string;

  /** Description facultative */
  description?: string;

  /** Date de création */
  createdAt?: string; // ISO date string

  /** Date de dernière modification */
  updatedAt?: string;

  /** Éléments de la checklist */
  items?: ChecklistItem[];
}
