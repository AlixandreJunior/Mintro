import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { HydrationHistory } from '@/components/HydrationHistory';
import { HydrationSummary } from '@/components/HydrationSummary';
import { formatDateToISO } from '@/utils/formatDatetimeToISO';
import HydrationChart from '@/components/HydratationChart';
import HydrationDateNavigator from '@/components/HydrationDateNavigator';
import HydrationPeriodSelector from '@/components/HydrationPeriodSelector';
import { useHydration } from '@/hooks/useHydratationLog';

interface HydrationMainContentProps {
  selectedPeriod: 'day' | 'week' | 'month' | 'year';
  selectedDate: Date;
  setSelectedPeriod: React.Dispatch<
    React.SetStateAction<'day' | 'week' | 'month' | 'year'>
  >;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

const HydrationMainContent: React.FC<HydrationMainContentProps> = ({
  selectedPeriod,
  selectedDate,
  setSelectedPeriod,
  setSelectedDate,
}) => {
  const { logs, loading, error } = useHydration(selectedDate);
  const total = logs.reduce((sum, { quantity = 0 }) => sum + quantity, 0);

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <HydrationPeriodSelector
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
      />
      <HydrationDateNavigator
        selectedDate={selectedDate}
        selectedPeriod={selectedPeriod}
        setSelectedDate={setSelectedDate}
      />
      <HydrationSummary total={total} progress={(total / 1000) * 100} />
      <HydrationChart
        selectedDate={selectedDate}
        selectedPeriod={selectedPeriod}
      />
      <HydrationHistory
        logs={logs}
        dateLabel={formatDateToISO(selectedDate)}
        loading={loading}
        error={error}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
});

export default HydrationMainContent;
