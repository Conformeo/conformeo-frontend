export type KitState = 'OK' | 'EXPIRED';
export interface FirstAidKit {
  id: string;
  site: string;
  expiry: string;
  state: KitState;
}
