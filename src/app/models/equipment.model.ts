export interface Equipment {
  id: string;
  name: string;
  type: string;    // ex: "Extincteur", "Caméra", "Trousse"
  siteId?: string; // Pour rattacher à un chantier
  serial?: string;
  status?: string; // ex: "En service", "À contrôler"
  installedAt?: string; // date ISO
}
