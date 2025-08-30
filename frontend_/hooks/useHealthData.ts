import { useExerciseLogs } from './useExerciseLogs';
import { useHydrationLogs } from './useHydratationLog';
import { useMindfulnessLogs } from './useMindfulnessLog';

export function useHealthData(date: Date) {
  const { logs: mindfulnessLogs } = useMindfulnessLogs(date, 'week');
  const { logs: exerciseLogs } = useExerciseLogs(date, 'week');
  const { logs: hydrationLogs } = useHydrationLogs(date);

  return {
    mindfulnessLogs,
    exerciseLogs,
    hydrationLogs,
  };
}
