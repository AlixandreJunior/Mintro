import { useHandleRequest } from '@/share/hooks/useHandleRequest';
import { MindfulnessService } from '../MindfulnessService';
import { Mindfulness, MindfulnessLog } from '@/share/types/health/mindfulness';
import { ResponseSuccess } from '@/share/types/response';

export function useMindfulness() {
  const { error, handleRequest, loading } = useHandleRequest();

  const handleMindfulnessList = async (): Promise<Mindfulness[]> => {
    return await handleRequest(() => MindfulnessService.list());
  };

  const handleMindfulnessLogList = async (
    date?: Date,
    period?: 'week' | 'month'
  ): Promise<MindfulnessLog[]> => {
    return await handleRequest(() => MindfulnessService.listLogs(date, period));
  };

  const handleMindfulnessLogCreate = async (
    data: any
  ): Promise<ResponseSuccess> => {
    return await handleRequest(() => MindfulnessService.createLog(data));
  };

  return {
    error,
    loading,
    handleMindfulnessList,
    handleMindfulnessLogList,
    handleMindfulnessLogCreate,
  };
}
