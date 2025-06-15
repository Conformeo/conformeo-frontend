// report.model.ts
export interface Report {
  label: string;
  type: 'PDF'|'CSV'|'XLSX';
}