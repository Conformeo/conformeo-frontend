export interface DashboardStat {
  label: string;
  value: number | string;
  icon?: string;
  variant?: 'risk' | 'default' | string;
}