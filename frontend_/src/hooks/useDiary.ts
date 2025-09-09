import { useEffect, useState } from 'react';
import { Diary } from '@/types/mental/diary';
import { getDiaryList } from '@/services/diary/listDiary';

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

  return {
    currentDate,
    setCurrentDate,
    diaries,
    loading,
    error,
  };
}
