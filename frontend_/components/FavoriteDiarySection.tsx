import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import DiaryDayHistory from './DiaryDayHistory';
import { Diary, MoodType } from '@/types/mental/diary';
import { getMoodVisuals } from '@/utils/moodHelper';
import { getActivityIconName } from '@/utils/activityIconMapper';

interface TransformedActivity {
  name: string;
  iconName: string;
}

interface TransformedDiaryEntryData {
  time: string;
  mood: MoodType;
  iconSource: any;
  moodColor: string;
  activities: TransformedActivity[];
  title: string;
  content: string;
  photoUrl?: string;
}

interface FavoriteDiarySectionProps {
  loading: boolean;
  error: string | null;
  diaries: Diary[];
}

export const FavoriteDiarySection: React.FC<FavoriteDiarySectionProps> = ({
  loading,
  error,
  diaries,
}) => {
  const favoriteEntries = React.useMemo(() => {
    return diaries
      .map((diary) => {
        const entryDate = new Date(diary.datetime);
        const moodVisuals = getMoodVisuals(diary.mood);

        //@ts-ignore
        const transformedActivities: TransformedActivity[] = diary.activities.map((activity) => ({
          name: activity.name,
          iconName: getActivityIconName(activity.name),
        }));

        const transformedEntry: TransformedDiaryEntryData = {
          time: entryDate.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          mood: diary.mood,
          iconSource: moodVisuals.iconSource,
          moodColor: moodVisuals.color,
          activities: transformedActivities,
          title: diary.title || 'Sem Título',
          content: diary.content,
          photoUrl: diary.photo,
        };

        return {
          date: entryDate.toLocaleDateString('pt-BR', {
            day: 'numeric',
            month: 'long',
          }),
          entries: [transformedEntry],
        };
      });
  }, [diaries]);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Favoritos</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>Erro ao carregar favoritos: {error}</Text>
      ) : favoriteEntries.length === 0 ? (
        <Text style={styles.noDataText}>Nenhum diário favorito encontrado.</Text>
      ) : (
        favoriteEntries.map((entry, index) => (
          <DiaryDayHistory key={index} date={entry.date} entries={entry.entries} />
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
