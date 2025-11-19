import { Diary } from '@/share/types/mental/diary';
import { getMoodVisuals } from '@/share/utils/moodHelper';

type GroupedDiaryEntries = Record<
  string,
  Array<
    Diary & {
      iconSource: React.ReactNode;
      photoUrl?: string;
    }
  >
>;

export const groupEntriesByDay = (entries: Diary[]): GroupedDiaryEntries => {
  const groups: GroupedDiaryEntries = {};

  entries.forEach((entry) => {
    const day = new Date(entry.created_at).toISOString().split('T')[0];

    const enrichedEntry = {
      ...entry,
      iconSource: getMoodVisuals(entry.mood).iconSource,
    };

    if (!groups[day]) groups[day] = [];
    groups[day].push(enrichedEntry);
  });

  return groups;
};
