// DiaryHistoricSection.tsx
import { useWindowDimensions, StyleSheet, Text, View } from 'react-native';
import DiaryDayHistory from './DiaryDayHistory';
import DiaryEmptyState from './DiaryEmptyState';
import { useDiary } from '../hooks/useDiary';
import { useLoadList } from '@/share/hooks/useLoadList';
import { Diary } from '@/share/types/mental/diary';

interface DiaryHistoricSectionProps {
  initialDate: Date;
}

const DiaryHistoricSection: React.FC<DiaryHistoricSectionProps> = ({
  initialDate,
}) => {
  const { handleDiaryList } = useDiary();
  const { width } = useWindowDimensions();

  const { data: diaries, reload } = useLoadList<Diary>({
    loader: () => handleDiaryList(initialDate),
    deps: [initialDate],
  });

  const styles = createStyles(width);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Histórico</Text>
      {diaries.length === 0 ? (
        <DiaryEmptyState />
      ) : (
        <DiaryDayHistory entries={diaries} reload={reload} />
      )}
    </View>
  );
};

const createStyles = (width: number) =>
  StyleSheet.create({
    section: {
      marginBottom: width * 0.05,
      paddingHorizontal: width * 0.05,
    },
    sectionTitle: {
      fontSize: width * 0.045,
      fontFamily: 'Poppins_400Regular',
      color: '#111827',
      marginBottom: width * 0.03,
    },
  });

export default DiaryHistoricSection;
