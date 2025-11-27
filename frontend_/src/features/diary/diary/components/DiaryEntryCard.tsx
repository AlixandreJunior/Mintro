import React from 'react';
import { View, Pressable, StyleSheet, Dimensions } from 'react-native';
import { DiaryActivities } from './DiaryActivities';
import { DiaryEntryContent } from './DiaryEntryContent';
import DiaryCard from './DiaryCard';
import { DiaryEntryHeader } from './DiaryEntryHeader';
import { Diary } from '@/share/types/mental/diary';
import { useDiary } from '../hooks/useDiary';
import { router } from 'expo-router';

interface DiaryEntryCardProps {
  diary: Diary & {
    iconSource: React.ReactNode;
  };
}

const DiaryEntryCard: React.FC<DiaryEntryCardProps> = ({ diary }) => {
  const timeObj = new Date(diary.created_at);
  const time =
    timeObj.getHours().toString().padStart(2, '0') +
    ':' +
    timeObj.getMinutes().toString().padStart(2, '0');

  const { handleDiaryDelete } = useDiary();

  const onDelete = async () => {
    await handleDiaryDelete(diary.id);
  };

  const onEdit = () => {
    router.replace(`/(app)/diary/${diary.id}`);
  };

  return (
    <Pressable>
      <View style={styles.row}>
        <View style={styles.icon}>{diary.iconSource}</View>
        <DiaryCard style={styles.card}>
          <DiaryEntryHeader
            mood={diary.mood}
            time={time}
            onDelete={onDelete}
            onEdit={onEdit}
          />
          {diary.activities?.length > 0 && (
            <DiaryActivities activities={diary.activities} />
          )}
          {diary.title || diary.content || diary.photo ? (
            <DiaryEntryContent
              title={diary.title}
              content={diary.content}
              photoUrl={diary.photo}
            />
          ) : null}
        </DiaryCard>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    width: '100%',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
});

export default DiaryEntryCard;
