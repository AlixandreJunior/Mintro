import { useState, useEffect } from 'react';
import { getStepsList } from '@/src/services/steps/listSteps';

type StepLog = {
  id: number;
  user: number;
  date: string;
  steps: number;
};

const CALORIES_PER_STEP = 0.05;

export const useSteps = () => {
  const [steps, setSteps] = useState<number>(0);
  const [calories, setCalories] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSteps = async () => {
    try {
      setLoading(true);
      const data: StepLog[] = await getStepsList();
      const totalSteps = data.reduce((acc, log) => acc + (log.steps || 0), 0);
      setSteps(totalSteps);
      setCalories(totalSteps * CALORIES_PER_STEP);
      setError(null);
    } catch (err: any) {
      console.error('Erro ao buscar steps:', err.message);
      setError(err.message || 'Erro ao buscar steps');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSteps();
  }, []);

  const refreshSteps = () => {
    fetchSteps();
  };

  return {
    steps,
    calories,
    loading,
    error,
    refreshSteps,
  };
};
