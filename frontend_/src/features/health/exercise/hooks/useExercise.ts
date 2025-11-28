import { useHandleRequest } from '@/share/hooks/useHandleRequest';
import { ExerciseService } from '../ExerciseService';
import { ResponseSuccess } from '@/share/types/response';
import { ExerciseLogWrite } from '@/share/types/health/exercise';

export function useExercise() {
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
    data: ExerciseLogWrite
  ): Promise<ResponseSuccess> => {
    if (!data.exercise_id || data.duration <= 0 || !data.datetime) {
      throw new Error('Preencha todos os campos corretamente.');
    }

    return await handleRequest(() => ExerciseService.createLog(data));
  };

  const handleExerciseLogDelete = async (
    id: number
  ): Promise<ResponseSuccess> => {
    return await handleRequest(() => ExerciseService.deleteLog(id));
  };

  const handleExerciseLogUpdate = async (
    id: number,
    data: ExerciseLogWrite
  ): Promise<ResponseSuccess> => {
    return await handleRequest(() => ExerciseService.updateLog(id, data));
  };

  return {
    handleExerciseList,
    handleExerciseLogList,
    handleExerciseLogCreate,
    handleExerciseLogDelete,
    handleExerciseLogUpdate,
    loading,
    error,
  };
}
