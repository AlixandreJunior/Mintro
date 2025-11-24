import { ScrollView, StyleSheet } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';

import HydrationChart from '@/features/health/hydration/components/HydratationChart';
import HydrationDateNavigator from '@/features/health/hydration/components/HydrationDateNavigator';
import HydrationPeriodSelector from './HydrationPeriodSelector';
import { HydrationSummary } from './HydrationSummary';
import { HydrationHistory } from '@/features/health/hydration/components/HydrationHistory';

import { formatDateToISO } from '@/share/utils/formatDatetimeToISO';
import { useHydration } from '../hooks/useHydration';
import { Hydration } from '@/share/types/health/hydratation';

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
  const [logs, setLogs] = useState<Hydration[]>([]);
  const { handleHydrationList, loading, error } = useHydration();

  useEffect(() => {
    const load = async () => {
      try {
        console.log(selectedDate);
        const data = await handleHydrationList(selectedDate, selectedPeriod);

        setLogs(data || []);
      } catch (err) {
        console.error('Erro ao carregar hidratação:', err);
        setLogs([]);
      }
    };

    load();
  }, [selectedDate, selectedPeriod]);

  const total = useMemo(() => {
    return logs.reduce((sum, { quantity = 0 }) => sum + quantity, 0);
  }, [logs]);

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

      <HydrationSummary logs={logs} mode={selectedPeriod} goal={2000} />

      <HydrationChart logs={logs} selectedPeriod={selectedPeriod} />

      <HydrationHistory
        logs={logs}
        dateLabel={formatDateToISO(selectedDate)}
        mode={selectedPeriod}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
});

export default HydrationMainContent;
