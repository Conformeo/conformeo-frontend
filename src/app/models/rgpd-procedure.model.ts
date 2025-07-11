export interface RgpdProcedure {
  dpoName: string;
  dpoEmail: string;
  dpoPhone?: string;
  dpoInternal: boolean;
  dpoDesignatedCnil: boolean;
  registerExist: boolean;
  registerUpdatedAt?: string;
  proceduresReviewed: boolean;
  lastReviewAt?: string;
  alerts: string[];
}
