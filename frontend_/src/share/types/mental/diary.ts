export interface Activity {
  id: string;
  name: string;
}

export type MoodType = 'Excelente' | 'Bom' | 'Neutro' | 'Ruim' | 'Péssimo';

export interface Diary {
  id: number;
  user: number;
  title: string;
  content: string;
  created_at: Date;
  mood: MoodType;
  activities: Activity[];
  photo?: string;
}

export interface DiaryWrite {
  title: string;
  content: string;
  created_at: string;
  mood: MoodType;
  activities: string[];
  photo?: string;
}
