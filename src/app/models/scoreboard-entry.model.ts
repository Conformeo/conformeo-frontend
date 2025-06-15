// scoreboard-entry.model.ts
export interface ScoreboardEntry {
  rank: number;
  siteName: string;
  points: number;
  badge: 'Or'|'Argent'|'Bronze';
}