export type CameraStatus = 'OK' | 'KO';
export interface Camera {
  id: string;
  label: string;
  location: string;
  lastCheck: string;
  nextCheck: string;
  status: CameraStatus;
}
