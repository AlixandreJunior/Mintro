import { getActivityIconName } from '@/share/utils/activityIconMapper';
import { getMoodVisuals } from '@/share/utils/moodHelper';

export const transformDiaryToCard = (diary: any) => {
  const entryDate = new Date(diary.datetime);
  const moodVisuals = getMoodVisuals(diary.mood);
  const transformedActivities = diary.activities.map((activity: any) => ({
    name: activity.name,
    iconName: getActivityIconName(activity.name),
  }));

  return {
    id: diary.id,
    time: entryDate.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    mood: diary.mood,
    iconSource: moodVisuals.iconSource,
    activities: transformedActivities,
    title: diary.title || 'Sem Título',
    content: diary.content,
    photoUrl: diary.photo,
  };
};
