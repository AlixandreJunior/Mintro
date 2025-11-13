import { useHandleRequest } from '@/share/hooks/useHandleRequest';
import { HydrationService } from '../HydrationService';

export function useHydration(date: Date, dailyGoal: number = 2000) {
  const { error, handleRequest, loading } = useHandleRequest();

  const handleHydrationList = async (date: Date) => {
    await handleRequest(() => HydrationService.list(date));
  };

  const handleHydrationCreate = async (data: any) => {
    await handleRequest(() => HydrationService.create(date));
  };

  return {
    loading,
    error,
    handleHydrationList,
    handleHydrationCreate,
  };
}
