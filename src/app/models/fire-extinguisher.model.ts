export interface FireExtinguisher {
  id?: string;                 // ← ajouté
  location:      string;
  lastControl:   string;          //  ou Date
  nextControl:   string;          //  ou Date
  status:        'OK' | 'TO_SCHEDULE' | 'DUE';
}
