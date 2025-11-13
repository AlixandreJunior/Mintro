import { useHandleRequest } from '@/share/hooks/useHandleRequest';
import { ExerciseService } from '../ExerciseService';

export function useExercise(date: Date, period: 'week' | 'month' = 'week') {
  const { handleRequest, loading, error } = useHandleRequest();

  const handleExerciseList = async () => {
    () => handleRequest(() => ExerciseService.list());
  };

  const handleExerciseLogList = async () => {
    await handleRequest(() => ExerciseService.listLog());
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
