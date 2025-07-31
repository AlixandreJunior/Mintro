import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DiaryDayHistory from './DiaryDayHistory';
import { getMoodVisuals } from '@/utils/moodHelper';
import { getActivityIconName } from '@/utils/activityIconMapper';
import { useDiary } from '@/hooks/useDiary'; // caminho do seu hook
import { Diary, MoodType } from '@/types/mental/diary';

interface TransformedActivity {
  name: string;
  iconName: string;
}

interface TransformedDiaryEntryData {
  id: number;
  time: string;
  mood: MoodType;
  iconSource: any;
  activities: TransformedActivity[];
  title: string;
  content: string;
  photoUrl?: string;
}

interface AdaptedDiaryHistory {
  date: string;
  entries: TransformedDiaryEntryData[];
}

interface DiaryHistoricSectionProps {
  initialDate: Date;
}

export const DiaryHistoricSection: React.FC<DiaryHistoricSectionProps> = ({
  initialDate,
}) => {
  const { currentDate, setCurrentDate, diaries, loading, error } =
    useDiary(initialDate);

  const adaptedDiaryEntries: AdaptedDiaryHistory[] = useMemo(() => {
    if (!diaries.length) return [];

    const groupedByDate: { [key: string]: TransformedDiaryEntryData[] } = {};

    diaries.forEach((diary) => {
      const entryDate = new Date(diary.datetime);
      const formattedDate = entryDate.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
      });
      const displayDate =
        entryDate.toDateString() === new Date().toDateString()
          ? 'Hoje, ' + formattedDate
          : formattedDate;

      const moodVisuals = getMoodVisuals(diary.mood);

      //@ts-ignore
      const transformedActivities: TransformedActivity[] = diary.activities.map(
        (activity: any) => ({
          name: activity.name,
          iconName: getActivityIconName(activity.name),
        })
      );

      const transformedEntry: TransformedDiaryEntryData = {
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

      if (!groupedByDate[displayDate]) {
        groupedByDate[displayDate] = [];
      }
      groupedByDate[displayDate].push(transformedEntry);
    });

    return Object.entries(groupedByDate).map(([date, entries]) => ({
      date,
      entries,
    }));
  }, [diaries]);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Histórico</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>Erro ao carregar diários: {error}</Text>
      ) : adaptedDiaryEntries.length === 0 ? (
        <Text style={styles.noDataText}>
          Nenhum diário encontrado para este mês.
        </Text>
      ) : (
        adaptedDiaryEntries.map((dayData, dayIndex) => (
          <DiaryDayHistory
            key={dayIndex}
            date={dayData.date}
            entries={dayData.entries}
          />
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 8,
    paddingHorizontal: Dimensions.get('window').width * 0.05,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#111827',
    marginBottom: 8,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
});
