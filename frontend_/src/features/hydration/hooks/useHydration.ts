import { useHandleRequest } from '@/share/hooks/useHandleRequest';
import { HydrationService } from '../HydrationService';
import { Hydration } from '@/share/types/health/hydratation';
import { ResponseSuccess } from '@/share/types/response';

export function useHydration() {
  const { error, handleRequest, loading } = useHandleRequest();

  const handleHydrationList = async (date: Date): Promise<Hydration[]> => {
    return await handleRequest(() => HydrationService.list(date));
  };

  const handleHydrationCreate = async (data: any): Promise<ResponseSuccess> => {
    return await handleRequest(() => HydrationService.create(data));
  };

  return {
    loading,
    error,
    handleHydrationList,
    handleHydrationCreate,
  };
}
