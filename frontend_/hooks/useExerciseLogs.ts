import { useState, useEffect } from "react";
import { ExerciseLog } from '@/types/health/exercise';
import { getExerciseLogs } from '@/services/exercise/listExerciseLog';

export function useExerciseLogs(date: Date) {
  const [logs, setLogs] = useState<ExerciseLog[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getExerciseLogs(date)
      .then(setLogs)
      .catch(err => console.error('Erro exercise:', err))
      .finally(() => setLoading(false));
  }, [date]);

  return { logs, loading };
}
