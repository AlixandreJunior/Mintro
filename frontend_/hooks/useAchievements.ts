import { useState, useCallback, useEffect } from "react";
import { getAchievements } from "@/services/achievements/getAchievements";
import { getAchievementDetail } from "@/services/achievements/getAchievementsDetail";
import { getUserAchievements } from "@/services/achievements/getUserAchievements";
import { getUserAchievementLogDetail } from "@/services/achievements/getUserAchievementDetail"; 
import { Achievement, AchievementLog } from "@/types/user/achievements";

export const useAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userAchievements, setUserAchievements] = useState<AchievementLog[]>([]);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [selectedLog, setSelectedLog] = useState<AchievementLog | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAchievements = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAchievements();
      setAchievements(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAchievementDetail = useCallback(async (pk: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAchievementDetail(pk);
      setSelectedAchievement(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUserAchievements = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUserAchievements();
      setUserAchievements(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUserAchievementLogDetail = useCallback(async (pk: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUserAchievementLogDetail(pk);
      setSelectedLog(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAchievements();
    fetchUserAchievements();
  }, [fetchAchievements, fetchUserAchievements]);

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
