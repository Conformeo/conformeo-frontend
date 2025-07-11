export interface RgpdRequest {
  id?: number;
  user_id: number;
  type: string;
  message?: string;
  status?: string;
  date_submitted?: string;
  date_closed?: string;
  note?: string;
}