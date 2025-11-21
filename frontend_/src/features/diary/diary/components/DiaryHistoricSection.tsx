import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import DiaryDayHistory from './DiaryDayHistory';
import DiaryEmptyState from './DiaryEmptyState';
import DiaryErrorState from './DiaryErrorState';
import { useDiary } from '../hooks/useDiary';
import { Diary } from '@/share/types/mental/diary';

interface DiaryHistoricSectionProps {
  initialDate: Date;
}

const DiaryHistoricSection: React.FC<DiaryHistoricSectionProps> = ({
  initialDate,
}) => {
  const { handleDiaryList, error } = useDiary();
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const { width } = useWindowDimensions();

  const styles = createStyles(width);

  useEffect(() => {
    const load = async () => {
      const list = await handleDiaryList();
      setDiaries(list ?? []);
    };
    load();
  }, [initialDate]);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Histórico</Text>

      {error ? (
        <DiaryErrorState message={error} />
      ) : diaries.length === 0 ? (
        <DiaryEmptyState />
      ) : (
        <DiaryDayHistory entries={diaries} />
      )}
    </View>
  );
};

const createStyles = (width: number) =>
  StyleSheet.create({
    section: {
      marginBottom: 8,
      paddingHorizontal: width * 0.05,
    },
    sectionTitle: {
      fontSize: 16,
      fontFamily: 'Poppins_400Regular',
      color: '#111827',
      marginBottom: 8,
    },
  });

export default DiaryHistoricSection;
