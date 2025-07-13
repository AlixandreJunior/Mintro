import { useExerciseLogs } from './useExerciseLogs';
import { useHydrationLogs } from './useHydratationLog';
import { useMindfulnessLogs } from './useMindfulnessLog';

export function useHealthData(date: Date) {
  const { logs: mindfulnessLogs, loading: loadingMindfulness } = useMindfulnessLogs(date);
  const { logs: exerciseLogs, loading: loadingExercise } = useExerciseLogs(date);
  const { logs: hydrationLogs, loading: loadingHydration } = useHydrationLogs(date);

  const loading = loadingMindfulness || loadingExercise || loadingHydration;

  return {
    mindfulnessLogs,
    exerciseLogs,
    hydrationLogs,
    loading,
  };
}
