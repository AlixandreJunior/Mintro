import { useState, useEffect } from 'react';
import { ExerciseLog } from '@/types/health/exercise';
import { getExerciseLogs } from '@/services/exercise/listExerciseLog';

type Period = 'week' | 'month';

export function useExerciseLogs(date: Date, period: Period = 'week') {
  const [logs, setLogs] = useState<ExerciseLog[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getExerciseLogs(date, period)
      .then(setLogs)
      .catch((err) => console.error('Erro exercise:', err))
      .finally(() => setLoading(false));
  }, [date, period]);

  return { logs, loading };
}
