import { useEffect, useState, useMemo, ReactNode } from 'react';
import { Diary } from '@/types/mental/diary';
import { getDiaryList } from '@/services/diary/listDiary';
import { router } from 'expo-router';
import { getMoodVisuals } from '@/utils/moodHelper';
import { getActivityIconName } from '@/utils/activityIconMapper';

export interface TransformedActivity {
  name: string;
  iconName?: ReactNode;
}

export interface DiaryEntryCardProps {
  id: number;
  time: string;
  mood: string;
  iconSource: any;
  activities: TransformedActivity[];
  title: string;
  content: string;
  photoUrl?: string;
}

export interface AdaptedDiaryHistory {
  date: string;
  entries: DiaryEntryCardProps[];
}

export function useDiary(initialDate: Date) {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiaries = async () => {
      setLoading(true);
      setError(null);
      try {
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const data = await getDiaryList(month, year);
        setDiaries(data);
      } catch (err: any) {
        setError(err.message || 'Falha ao carregar diários.');
        console.error('Erro ao buscar diários:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDiaries();
  }, [currentDate]);

  const adaptedEntries: AdaptedDiaryHistory[] = useMemo(() => {
    if (!diaries.length) return [];

    const today = new Date().toDateString();
    const groupedByDate: Record<string, DiaryEntryCardProps[]> = {};

    diaries.forEach((diary) => {
      const entryDate = new Date(diary.datetime);
      const formattedDate = entryDate.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
      });
      const displayDate =
        entryDate.toDateString() === today
          ? 'Hoje, ' + formattedDate
          : formattedDate;

      const moodVisuals = getMoodVisuals(diary.mood);

      const transformedActivities: TransformedActivity[] = diary.activities.map(
        (activity) => ({
          name: activity.name,
          iconName: getActivityIconName(activity.name),
        })
      );

      const transformedEntry: DiaryEntryCardProps = {
        id: diary.id,
        time: entryDate.toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        mood: diary.mood,
        iconSource: moodVisuals.iconSource,
        activities: transformedActivities,
        title: diary.title || 'Sem Título',
        content: diary.content,
        photoUrl: diary.photo,
      };

      if (!groupedByDate[displayDate]) groupedByDate[displayDate] = [];
      groupedByDate[displayDate].push(transformedEntry);
    });

    return Object.entries(groupedByDate).map(([date, entries]) => ({
      date,
      entries,
    }));
  }, [diaries]);

  return {
    currentDate,
    setCurrentDate,
    diaries,
    adaptedEntries,
    loading,
    error,
  };
}
