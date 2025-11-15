import { useHandleRequest } from '@/share/hooks/useHandleRequest';
import { StepsService } from '../StepService';
import { ResponseSuccess } from '@/share/types/response';

export const useSteps = () => {
  const { error, handleRequest, loading } = useHandleRequest();

  const handleStepsList = async (): Promise<any> => {
    return await handleRequest(() => StepsService.list());
  };

  const handleStepsCreate = async (data: any): Promise<ResponseSuccess> => {
    return await handleRequest(() => StepsService.create(data));
  };

  return { error, loading, handleStepsList, handleStepsCreate };
};
