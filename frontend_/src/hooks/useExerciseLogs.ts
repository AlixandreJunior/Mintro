import { useState, useEffect } from 'react';
import { ExerciseLog, ExerciseLogWrite } from '@/types/health/exercise';
import { getExerciseLogs } from '@/services/exercise/listExerciseLog';
import { getExerciseList } from '@/services/exercise/listExercise';
import { registerExerciseLog } from '@/services/exercise/registerExerciseLog';

type Period = 'week' | 'month';

interface Exercise {
  id: number;
  name: string;
}

export function useExerciseLogs(date: Date, period: Period = 'week') {
  const [logs, setLogs] = useState<ExerciseLog[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const logsData = await getExerciseLogs(date, period);
        setLogs(logsData);

        const exerciseData = await getExerciseList();
        setExercises(exerciseData);
      } catch (err) {
        console.error('Erro ao buscar exercícios:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [date, period]);

  const handleSaveExercise = async (data: ExerciseLogWrite) => {
    if (!data.exercise || data.duration <= 0 || !data.datetime) {
      throw new Error('Preencha todos os campos corretamente.');
    }

    setSaving(true);
    try {
      const savedLog = await registerExerciseLog(data);
      setLogs((prev) => [...prev, savedLog]);
      return savedLog;
    } catch (err) {
      console.error('Erro ao registrar exercício:', err);
      throw err;
    } finally {
      setSaving(false);
    }
  };

  return { logs, exercises, loading, saving, handleSaveExercise };
}
