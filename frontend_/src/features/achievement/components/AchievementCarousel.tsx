import React, { useEffect, useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import { useAchievements } from '../hooks/useAchievements';
import { AchievementItem } from './AchievementItem';
import { buildParsedAchievements, buildProgressMap } from '../utils/helpers';

const AchievementCarousel: React.FC = () => {
  const { handleAchievementsList, handleAchievementLogsList, loading } =
    useAchievements();

  const [achievements, setAchievements] = useState<any[]>([]);
  const [userAchievements, setUserAchievements] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([handleAchievementsList(), handleAchievementLogsList()]).then(
      ([achievementsData, userData]) => {
        setAchievements(achievementsData ?? []);
        setUserAchievements(userData ?? []);
      }
    );
  }, []);

  const progressMap = useMemo(() => {
    return buildProgressMap(userAchievements);
  }, [userAchievements]);

  const parsedAchievements = useMemo(() => {
    return buildParsedAchievements(achievements, progressMap);
  }, [achievements, progressMap]);

  if (loading || achievements.length === 0) return null;

  return (
    <FlatList
      horizontal
      data={parsedAchievements}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <AchievementItem
          label={item.label}
          starsAchieved={item.starsAchieved}
          totalStars={item.totalStars}
          itemWidth={3}
        />
      )}
    />
  );
};

export default AchievementCarousel;
