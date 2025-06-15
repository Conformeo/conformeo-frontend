// dashboard-stat.model.ts
export interface DashboardStat {
  label: string;
  value: number | string;
  variant?: 'normal'|'risk';
}