export interface Obligation {
  id: number;
  label: string;
  status: boolean;
  last_update?: string;
  user_id: number;
}
