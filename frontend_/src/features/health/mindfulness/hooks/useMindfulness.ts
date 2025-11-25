import { useHandleRequest } from '@/share/hooks/useHandleRequest';
import { MindfulnessService } from '../MindfulnessService';
import {
  Mindfulness,
  MindfulnessLog,
  MindfulnessLogWrite,
} from '@/share/types/health/mindfulness';
import { ResponseSuccess } from '@/share/types/response';

export function useMindfulness() {
  const { error, handleRequest, loading } = useHandleRequest();

  const handleMindfulnessList = async (): Promise<Mindfulness[]> => {
    return await handleRequest(() => MindfulnessService.list());
  };

  const handleMindfulnessLogList = async (
    date: Date,
    period?: 'week' | 'month'
  ): Promise<MindfulnessLog[]> => {
    return await handleRequest(() => MindfulnessService.listLogs(date, period));
  };

  const handleMindfulnessLogCreate = async (
    data: any
  ): Promise<ResponseSuccess> => {
    return await handleRequest(() => MindfulnessService.createLog(data));
  };

  const handleMindfulnessLogDelete = async (
    id: number
  ): Promise<ResponseSuccess> => {
    return await handleRequest(() => MindfulnessService.deleteLog(id));
  };

  const handleMindfulnessLogUpdate = async (
    id: number,
    data: MindfulnessLogWrite
  ): Promise<ResponseSuccess> => {
    return await handleRequest(() => MindfulnessService.updateLog(id, data));
  };

  return {
    error,
    loading,
    handleMindfulnessList,
    handleMindfulnessLogList,
    handleMindfulnessLogCreate,
    handleMindfulnessLogUpdate,
    handleMindfulnessLogDelete,
  };
}
