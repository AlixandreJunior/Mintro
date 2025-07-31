import { Activity } from './diary';

export interface Objective {
  id: number;
  user: number;
  activity: Activity;
  created_at: string; // ISO datetime string
  best_streak: number;
  conclusion_count: number;
  days_with: number;
  period: string; // Ex: "3w"
  reminder: string | null; // Pode ser null ou string de horário
  repeat: string; // Ex: "1x", "3x"
  streak: number;
  week_count: number;
  success_rate_average: number;
  diary_dates: string[];
}

export interface ObjectiveWrite {
  activity: number;
  period: '1w' | '2w' | '3w';
  repeat: '1x' | '3x' | '5x';
  reminder: string | null;
}
