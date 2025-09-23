import { useState, useEffect, useMemo } from 'react';
import { isSameDay } from 'date-fns';
import { getStepsList } from '@/services/steps/listSteps';
import { useExerciseLogs } from './useExerciseLogs';

type StepLog = {
  id: number;
  user: number;
  date: string;
  steps: number;
};

type ExerciseLog = {
  id: number;
  datetime: string;
  distance?: number;
  duration?: number;
};

const STEP_LENGTH_METERS = 0.762;
const CALORIES_PER_STEP = 0.05;

export const useSteps = (
  date: Date,
  selectedPeriod: 'week' | 'month' | 'year',
  stepGoal: number
) => {
  const { logs: exerciseLogs } = useExerciseLogs(date) as {
    logs: ExerciseLog[];
  };

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
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Erro ao buscar steps';
      console.error('Erro ao buscar steps:', message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSteps();
  }, []);

  const currentDayStats = useMemo(() => {
    let totalDistance = 0;
    let totalDurationMinutes = 0;

    exerciseLogs.forEach((log) => {
      const logDate = new Date(log.datetime);
      if (isSameDay(logDate, date)) {
        totalDistance += log.distance ?? 0;
        totalDurationMinutes += log.duration ?? 0;
      }
    });

    return {
      distance: totalDistance,
      steps: Math.round(totalDistance * 1300),
      kcal: Math.round(totalDurationMinutes * 5),
    };
  }, [exerciseLogs, date]);

  const mergedStats = useMemo(() => {
    if (loading) return currentDayStats;

    const sensorDistanceKm = (steps * STEP_LENGTH_METERS) / 1000;

    return {
      distance: Number(
        (currentDayStats.distance + sensorDistanceKm).toFixed(2)
      ),
      steps: currentDayStats.steps + steps,
      kcal: currentDayStats.kcal + Math.round(calories),
    };
  }, [steps, calories, loading, currentDayStats]);

  const chartData = useMemo(() => {
    const now = new Date();
    switch (selectedPeriod) {
      case 'week':
        return Array.from({ length: 7 }, (_, day) => ({
          x: day,
          y: day === now.getDay() ? steps : 0,
        }));
      case 'month':
        const daysInMonth = new Date(
          now.getFullYear(),
          now.getMonth() + 1,
          0
        ).getDate();
        return Array.from({ length: daysInMonth }, (_, day) => ({
          x: day + 1,
          y: day + 1 === now.getDate() ? steps : 0,
        }));
      case 'year':
        return Array.from({ length: 12 }, (_, month) => ({
          x: month + 1,
          y: month === now.getMonth() ? steps : 0,
        }));
      default:
        return [];
    }
  }, [selectedPeriod, steps]);

  const progressPercentage = useMemo(() => steps / stepGoal, [steps, stepGoal]);

  return {
    mergedStats,
    steps,
    calories,
    chartData,
    progressPercentage,
    loading,
    error,
    refreshSteps: fetchSteps,
  };
};
