import { useHandleRequest } from '@/share/hooks/useHandleRequest';
import { MindfulnessService } from '../MindfulnessService';

export function useMindfulness() {
  const { error, handleRequest, loading } = useHandleRequest();

  const handleMindfulnessList = async () => {
    await handleRequest(() => MindfulnessService.list());
  };

  const handleMindfulnessLogList = async (
    date?: Date,
    period?: 'week' | 'month'
  ) => {
    await handleRequest(() => MindfulnessService.listLogs(date, period));
  };

  const handleMindfulnessLogCreate = async (data: any) => {
    await handleRequest(() => MindfulnessService.createLog(data));
  };

  return {
    error,
    loading,
    handleMindfulnessList,
    handleMindfulnessLogList,
    handleMindfulnessLogCreate,
  };
}
