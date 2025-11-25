import { useHandleRequest } from '@/share/hooks/useHandleRequest';
import { HydrationService } from '../HydrationService';
import { Hydration, HydrationWrite } from '@/share/types/health/hydratation';
import { ResponseSuccess } from '@/share/types/response';
import { Period } from '@/share/utils/getPeriodRange';
import { useCallback } from 'react';

export function useHydration() {
  const { error, handleRequest, loading } = useHandleRequest();

  const handleHydrationList = async (
    date: Date,
    period: Period
  ): Promise<Hydration[]> => {
    return await handleRequest(() => HydrationService.list(date, period));
  };

  const handleHydrationCreate = async (
    data: HydrationWrite
  ): Promise<ResponseSuccess> => {
    return await handleRequest(() => HydrationService.create(data));
  };

  const handleHydrationUpdate = async (
    id: number,
    data: HydrationWrite
  ): Promise<ResponseSuccess> => {
    return await handleRequest(() => HydrationService.update(id, data));
  };

  const handleHydrationDelete = useCallback(
    async (id: number): Promise<ResponseSuccess> => {
      return await handleRequest(() => HydrationService.delete(id));
    },
    []
  );

  return {
    loading,
    error,
    handleHydrationList,
    handleHydrationCreate,
    handleHydrationDelete,
    handleHydrationUpdate,
  };
}
