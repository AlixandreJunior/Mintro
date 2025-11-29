// DiaryEntryCard.tsx
import React from 'react';
import { View, Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import { DiaryActivities } from './DiaryActivities';
import { DiaryEntryContent } from './DiaryEntryContent';
import DiaryCard from './DiaryCard';
import { DiaryEntryHeader } from './DiaryEntryHeader';
import { Diary } from '@/share/types/mental/diary';
import { useDiary } from '../hooks/useDiary';
import { router } from 'expo-router';
import { formatTimeToHoursMinutes } from '@/share/utils/formatDatetimeToISO';
import { useToast } from '@/share/providers/ToastProvider';

interface DiaryEntryCardProps {
  diary: Diary & { iconSource: React.ReactNode };
  reload: () => Promise<void>;
}

const DiaryEntryCard: React.FC<DiaryEntryCardProps> = ({ diary, reload }) => {
  const { handleDiaryDelete } = useDiary();
  const { showToast } = useToast();
  const { width } = useWindowDimensions();

  const onDelete = async () => {
    try {
      await handleDiaryDelete(diary.id);
      showToast('Diário deletado com sucesso!', 'success');
      reload();
    } catch (err) {
      console.error(err);
      showToast('Erro ao deletar diário!', 'error');
    }
  };

  const onEdit = () => {
    router.replace(`/(app)/diary/${diary.id}`);
  };

  const styles = createStyles(width);

  return (
    <Pressable>
      <View style={styles.row}>
        <View style={styles.icon}>{diary.iconSource}</View>
        <DiaryCard style={styles.card}>
          <DiaryEntryHeader
            mood={diary.mood}
            time={formatTimeToHoursMinutes(diary.time)}
            onDelete={onDelete}
            onEdit={onEdit}
          />
          {diary.activities?.length > 0 && (
            <DiaryActivities activities={diary.activities} />
          )}
          {(diary.title || diary.content || diary.photo) && (
            <DiaryEntryContent
              title={diary.title}
              content={diary.content}
              photoUrl={diary.photo}
            />
          )}
        </DiaryCard>
      </View>
    </Pressable>
  );
};

const createStyles = (width: number) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: width * 0.03,
      width: '100%',
    },
    icon: {
      width: width * 0.1,
      height: width * 0.1,
      marginRight: width * 0.03,
      alignItems: 'center',
      justifyContent: 'center',
    },
    card: {
      flex: 1,
      paddingVertical: width * 0.03,
      paddingHorizontal: width * 0.035,
    },
  });

export default DiaryEntryCard;
