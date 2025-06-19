export interface DashboardStat {
  label:  string;
  value:  string | number;
  variant?: 'risk';         // ← rouge
  icon?:   string;          // ← nom d’icône Lucide (optionnel)
}
