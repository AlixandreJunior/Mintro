import { useHandleRequest } from '@/share/hooks/useHandleRequest';
import { ExerciseService } from '../ExerciseService';
import { ResponseSuccess } from '@/share/types/response';

export function useExercise(date: Date, period: 'week' | 'month' = 'week') {
  const { handleRequest, loading, error } = useHandleRequest();

  const handleExerciseList = async () => {
    return await handleRequest(() => ExerciseService.list());
  };

  const handleExerciseLogList = async (
    date: Date,
    period: 'week' | 'month'
  ) => {
    return await handleRequest(() => ExerciseService.listLog(date, period));
  };

  const handleExerciseLogCreate = async (
    data: any
  ): Promise<ResponseSuccess> => {
    if (!data.exercise || data.duration <= 0 || !data.datetime) {
      throw new Error('Preencha todos os campos corretamente.');
    }

    return await handleRequest(() => ExerciseService.createLog(data));
  };

  return {
    handleExerciseList,
    handleExerciseLogList,
    handleExerciseLogCreate,
    loading,
    error,
  };
}
