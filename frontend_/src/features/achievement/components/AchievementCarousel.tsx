import React, { useMemo } from 'react';
import { Dimensions, FlatList } from 'react-native';
import { useAchievements } from '@/share/hooks/useAchievements';
import { AchievementItem } from './AchievementItem';

const { width, height } = Dimensions.get('window');

const AchievementCarousel: React.FC = () => {
  const { achievements, userAchievements, loading, error } = useAchievements();
  const screenContentPaddingHorizontal = width * 0.05;
  const itemSpacing = width * 0.02;
  const itemWidth =
    (width - 2 * screenContentPaddingHorizontal - 2 * itemSpacing) / 3;

  const progressMap = useMemo(() => {
    const map = new Map<string, number>();
    userAchievements.forEach((progress) => {
      const achId = String(progress.achievement_level.achievement);
      const level = progress.achievement_level.level;
      const currentMax = map.get(achId) ?? 0;
      if (level > currentMax) map.set(achId, level);
    });
    return map;
  }, [userAchievements]);

  const parsedAchievements = useMemo(
    () =>
      achievements.map((ach) => ({
        id: String(ach.id),
        label: ach.name,
        starsAchieved: progressMap.get(String(ach.id)) ?? 0,
        totalStars: ach.levels.length,
      })),
    [achievements, progressMap]
  );

  if (loading || error || achievements.length === 0) return null;

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={parsedAchievements}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <AchievementItem
          label={item.label}
          starsAchieved={item.starsAchieved}
          totalStars={item.totalStars}
          itemWidth={itemWidth}
          marginRight={index < parsedAchievements.length - 1 ? itemSpacing : 0}
        />
      )}
    />
  );
};

export default AchievementCarousel;
