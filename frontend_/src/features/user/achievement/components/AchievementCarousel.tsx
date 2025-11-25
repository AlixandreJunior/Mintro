import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, Dimensions } from 'react-native';
import { useAchievements } from '../hooks/useAchievements';
import { AchievementItem } from './AchievementItem';
import { buildParsedAchievements, buildProgressMap } from '../utils/helpers';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.28; // 👈 Ajuste ideal

const AchievementCarousel: React.FC = () => {
  const { handleAchievementsList, handleAchievementLogsList, loading } =
    useAchievements();

  const [achievements, setAchievements] = useState<any[]>([]);
  const [userAchievements, setUserAchievements] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const [achievementsData, userData] = await Promise.all([
        handleAchievementsList(),
        handleAchievementLogsList(),
      ]);

      setAchievements(achievementsData ?? []);
      setUserAchievements(userData ?? []);
    };

    load();
  }, []);

  const progressMap = useMemo(
    () => buildProgressMap(userAchievements),
    [userAchievements]
  );

  const parsedAchievements = useMemo(
    () => buildParsedAchievements(achievements, progressMap),
    [achievements, progressMap]
  );

  if (loading || achievements.length === 0) return null;

  return (
    <FlatList
      horizontal
      data={parsedAchievements}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <AchievementItem
          label={item.label}
          starsAchieved={item.starsAchieved}
          totalStars={item.totalStars}
          itemWidth={ITEM_WIDTH}
          marginRight={12}
        />
      )}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default AchievementCarousel;
