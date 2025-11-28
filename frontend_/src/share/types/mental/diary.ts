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
  date: string;
  time: string;
  mood: MoodType;
  activities: Activity[];
  photo?: string;
}

export interface DiaryWrite {
  title: string;
  content: string;
  date: string;
  time: string;
  mood: MoodType;
  activities_ids: string[];
  photo?: string;
}
