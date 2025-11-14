import { useHandleRequest } from '@/share/hooks/useHandleRequest';
import { ExerciseService } from '../ExerciseService';

export function useExercise(date: Date, period: 'week' | 'month' = 'week') {
  const { handleRequest, loading, error } = useHandleRequest();

  const handleExerciseList = async () => {
    await handleRequest(() => ExerciseService.list());
  };

  const handleExerciseLogList = async (
    date: Date,
    period: 'week' | 'month'
  ) => {
    await handleRequest(() => ExerciseService.listLog(date, period));
  };

  const handleExerciseLogCreate = async (data: any) => {
    if (!data.exercise || data.duration <= 0 || !data.datetime) {
      throw new Error('Preencha todos os campos corretamente.');
    }

    await handleRequest(() => ExerciseService.createLog(data));
  };

  return {
    handleExerciseList,
    handleExerciseLogList,
    handleExerciseLogCreate,
    loading,
    error,
  };
}
