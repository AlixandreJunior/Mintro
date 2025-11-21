import { Achievement, AchievementLog } from '@/share/types/user/achievements';

export const buildProgressMap = (
  userAchievements: AchievementLog[]
): Map<string, number> => {
  const map = new Map<string, number>();

  for (const item of userAchievements) {
    const id = String(item.achievement_level.achievement);
    const level = item.achievement_level.level;

    const current = map.get(id) ?? 0;
    if (level > current) {
      map.set(id, level);
    }
  }

  return map;
};

export type ParsedAchievement = {
  id: string;
  label: string;
  starsAchieved: number;
  totalStars: number;
};

export const buildParsedAchievements = (
  achievements: Achievement[],
  progressMap: Map<string, number>
): ParsedAchievement[] => {
  return achievements.map((ach) => ({
    id: String(ach.id),
    label: ach.name,
    starsAchieved: progressMap.get(String(ach.id)) ?? 0,
    totalStars: ach.levels.length,
  }));
};
