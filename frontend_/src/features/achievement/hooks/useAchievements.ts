import { useCallback } from 'react';
import { useHandleRequest } from '@/share/hooks/useHandleRequest';
import { AchievementService } from '../AchievementService';

export const useAchievements = () => {
  const { handleRequest, loading, error } = useHandleRequest();

  const handleAchievementList = useCallback(
    () => handleRequest(AchievementService.list),
    [handleRequest]
  );

  const handleAchievementLogList = useCallback(
    () => handleRequest(AchievementService.listLog),
    [handleRequest]
  );

  const handleAchievementRetrieve = useCallback(
    (id: number) => handleRequest(() => AchievementService.retrieve(id)),
    [handleRequest]
  );

  const handleAchievementLogRetrieve = useCallback(
    (id: number) => handleRequest(() => AchievementService.retrieveLog(id)),
    [handleRequest]
  );

  return {
    loading,
    error,
    handleAchievementList,
    handleAchievementRetrieve,
    handleAchievementLogList,
    handleAchievementLogRetrieve,
  };
};
