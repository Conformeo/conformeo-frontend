// training.model.ts
export interface TrainingModule {
  title: string;
  duration: string;
  nextSession?: string;   // DD/MM/YYYY ou “à la demande”
}