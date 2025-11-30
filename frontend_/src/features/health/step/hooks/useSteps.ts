import { useHandleRequest } from '@/share/hooks/useHandleRequest';
import { StepsService } from '../StepService';
import { ResponseSuccess } from '@/share/types/response';
import { StepWrite } from '@/share/types/health/steps';
import { useCallback } from 'react';

export const useSteps = () => {
  const { error, handleRequest, loading } = useHandleRequest();

  const handleStepsList = async (
    date: Date,
    period: 'day' | 'week' | 'month' | 'year'
  ): Promise<any> => {
    return await handleRequest(() => StepsService.list(date, period));
  };

  const handleStepsCreate = useCallback(
    async (data: StepWrite): Promise<ResponseSuccess | null> => {
      console.log(data);
      return await handleRequest(() => StepsService.create(data));
    },
    []
  );

  const handleStepUpdateGoal = async (newGoal: number): Promise<any> => {
    return await handleRequest(() => StepsService.goalUpdate(newGoal));
  };

  const handleStepGoal = async (): Promise<any> => {
    return await handleRequest(() => StepsService.goal());
  };

  return {
    error,
    loading,
    handleStepsList,
    handleStepsCreate,
    handleStepGoal,
    handleStepUpdateGoal,
  };
};
