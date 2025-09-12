import { Dimensions, StyleSheet, Text, View } from 'react-native';
import DiaryDayHistory from './DiaryDayHistory';
import { useDiary } from '@/hooks/useDiary';
import DiaryEmptyState from './DiaryEmptyState';
import LoadingState from './LoadingState';
import DiaryErrorState from './DiaryErrorState';

interface DiaryHistoricSectionProps {
  initialDate: Date;
}

export const DiaryHistoricSection: React.FC<DiaryHistoricSectionProps> = ({
  initialDate,
}) => {
  const { adaptedEntries, loading, error } = useDiary(initialDate);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Histórico</Text>
      {loading ? (
        <LoadingState />
      ) : error ? (
        <DiaryErrorState message={error} />
      ) : adaptedEntries.length === 0 ? (
        <DiaryEmptyState />
      ) : (
        adaptedEntries.map((dayData, dayIndex) => (
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
});
