import { useState, useCallback, useEffect } from 'react';
import { getAchievements } from '@/services/achievements/getAchievements';
import { getAchievementDetail } from '@/services/achievements/getAchievementsDetail';
import { getUserAchievements } from '@/services/achievements/getUserAchievements';
import { getUserAchievementLogDetail } from '@/services/achievements/getUserAchievementDetail';
import { Achievement, AchievementLog } from '@/types/user/achievements';

export const useAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userAchievements, setUserAchievements] = useState<AchievementLog[]>(
    []
  );
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);
  const [selectedLog, setSelectedLog] = useState<AchievementLog | null>(null);
  const [loadingCount, setLoadingCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const loading = loadingCount > 0;

  const fetchData = async <T>(
    fetcher: () => Promise<T>,
    setter: (data: T) => void
  ) => {
    setLoadingCount((c) => c + 1);
    setError(null);
    try {
      const data = await fetcher();
      setter(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(message);
    } finally {
      setLoadingCount((c) => c - 1);
    }
  };

  const fetchAchievements = () => fetchData(getAchievements, setAchievements);
  const fetchUserAchievements = () =>
    fetchData(getUserAchievements, setUserAchievements);
  const fetchAchievementDetail = (pk: number) =>
    fetchData(() => getAchievementDetail(pk), setSelectedAchievement);
  const fetchUserAchievementLogDetail = (pk: number) =>
    fetchData(() => getUserAchievementLogDetail(pk), setSelectedLog);

  useEffect(() => {
    fetchAchievements();
    fetchUserAchievements();
  }, []);

  return {
    achievements,
    userAchievements,
    selectedAchievement,
    selectedLog,
    loading,
    error,
    fetchAchievements,
    fetchAchievementDetail,
    fetchUserAchievements,
    fetchUserAchievementLogDetail,
  };
};
