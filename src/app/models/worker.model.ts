// src/app/models/worker.model.ts
export interface Worker {
  id: string;
  nom: string;
  prenom: string;
  poste: string;
  telephone?: string;
  email?: string;
  siteId?: string;   // ← optionnel
  equipe: string;    // ← obligatoire désormais
}
