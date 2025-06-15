// inspection.model.ts
export interface Inspection {
  siteName: string;
  date: string;           // DD/MM/YY
  type: string;
  status: 'COMPLIANT'|'TO_FIX'|'PLANNED';
}