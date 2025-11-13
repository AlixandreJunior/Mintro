export interface AchievementLevel {
  id: number;
  achievement: number;
  level: number;
  condition: string;
  description: string;
}

export interface Achievement {
  id: number;
  name: string;
  description: string;
  levels: AchievementLevel[];
}

export interface AchievementLog {
  id: number;
  user: number; 
  achievement_level: AchievementLevel;
  date_awarded: string; 
}