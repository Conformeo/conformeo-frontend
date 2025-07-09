// // report.model.ts
// export interface Report {
//   label: string;
//   type: 'PDF'|'CSV'|'XLSX';
// }

export interface Report {
  company: string;
  date: string;
  score: number;
  modules: { name: string; status: string }[];
  checklist: string[];
  recommendations: string[];
}
