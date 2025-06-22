export interface Site {
  id: string;
  name: string;
  address: string;
  city: string;
  zipCode: string;
  score?: number | null;
}
