import { useHandleRequest } from '@/share/hooks/useHandleRequest';
import { StepsService } from '../StepService';

export const useSteps = () => {
  const { error, handleRequest, loading } = useHandleRequest();

  const handleStepsList = async () => {
    return await handleRequest(() => StepsService.list());
  };

  const handleStepsCreate = async (data: any) => {
    return await handleRequest(() => StepsService.create(data));
  };

  return { error, loading, handleStepsList, handleStepsCreate };
};
