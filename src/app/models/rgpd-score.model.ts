export interface RgpdScore {
  score: number;
  total: number;
  conforme: number;
  non_conforme: number;
  critical_ko: any[];
  ko: any[];
  details: any[];
}
