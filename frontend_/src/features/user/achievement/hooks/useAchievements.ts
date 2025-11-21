import { useCallback } from 'react';
import { useHandleRequest } from '@/share/hooks/useHandleRequest';
import { AchievementService } from '../AchievementService';
import { Achievement, AchievementLog } from '@/share/types/user/achievements';

export const useAchievements = () => {
  const { handleRequest, loading, error } = useHandleRequest();

  const handleAchievementsList = useCallback(
    (): Promise<Achievement[]> => handleRequest(AchievementService.list),
    [handleRequest]
  );

  const handleAchievementLogsList = useCallback(
    (): Promise<AchievementLog[]> => handleRequest(AchievementService.listLog),
    [handleRequest]
  );

  const handleAchievementRetrieve = useCallback(
    (id: number): Promise<Achievement> =>
      handleRequest(() => AchievementService.retrieve(id)),
    [handleRequest]
  );

  const handleAchievementLogRetrieve = useCallback(
    (id: number): Promise<AchievementLog> =>
      handleRequest(() => AchievementService.retrieveLog(id)),
    [handleRequest]
  );

  return {
    loading,
    error,
    handleAchievementsList,
    handleAchievementRetrieve,
    handleAchievementLogsList,
    handleAchievementLogRetrieve,
  };
};
