import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import DiaryDayHistory from './DiaryDayHistory';
import DiaryEmptyState from './DiaryEmptyState';
import LoadingState from './LoadingState';
import DiaryErrorState from './DiaryErrorState';
import { AdaptedDiaryHistory, useDiaryManager } from '@/share/hooks/useDiary';

interface DiaryHistoricSectionProps {
  initialDate: Date;
}

const DiaryHistoricSection: React.FC<DiaryHistoricSectionProps> = ({
  initialDate,
}) => {
  const { getDiaryHistory } = useDiaryManager();
  const [adaptedEntries, setAdaptedEntries] = useState<AdaptedDiaryHistory[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        const history = await getDiaryHistory(initialDate);
        setAdaptedEntries(history);
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar histórico');
        console.error('Erro ao carregar histórico:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [initialDate]);

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

export default DiaryHistoricSection;
