import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { router } from 'expo-router';

import Header from '@/components/Layout/Header';
import HeaderWithOptions from '@/components/Layout/HeaderWithOptions';
import DateNavigator from '@/components/DateNavigator';
import { HydrationHistory } from '@/components/HydrationHistory';
import { HydrationSummary } from '@/components/HydrationSummary';
import { formatDatetimeToISO, formatDateToISO } from '@/utils/formatDatetimeToISO';
import { useHydrationLogs } from '@/hooks/useHydratationLog';
import { FloatingActionButton } from '@/components/FloatingButtonAction';
import PeriodSelector from '@/components/PeriodSelector';
import StepsChart from '@/components/StepsChart';
import GoalModal from '@/components/GoalModal';

export default function HydrationScreen() {
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const [selectedPeriod, setSelectedPeriod] = useState<
    'day' | 'week' | 'month' | 'year'
  >('day');

  const periods = [
    { key: 'day', label: 'Dia' },
    { key: 'week', label: 'Semana' },
    { key: 'month', label: 'Mês' },
    { key: 'year', label: 'Ano' },
  ];

  const { logs, goal, loading, error } = useHydrationLogs(selectedDate);

  const total = logs.reduce((sum, { quantity = 0 }) => sum + quantity, 0);

  const handlePeriodChange = (period: typeof selectedPeriod) => {
    setSelectedPeriod(period);
  };

  const transformLogsToChartData = () => {
    switch (selectedPeriod) {
      case 'day':
        return Array.from({ length: 24 }, (_, hour) => {
          const total = logs
            .filter((log) => new Date(log.date).getHours() === hour)
            .reduce((sum, log) => sum + (log.quantity ?? 0), 0);
          return { x: hour, y: total };
        });

      case 'week':
        return Array.from({ length: 7 }, (_, day) => {
          const total = logs
            .filter((log) => new Date(log.date).getDay() === day)
            .reduce((sum, log) => sum + (log.quantity ?? 0), 0);
          return { x: day, y: total };
        });

      case 'month':
        return Array.from({ length: 30 }, (_, day) => {
          const total = logs
            .filter((log) => new Date(log.date).getDate() === day + 1)
            .reduce((sum, log) => sum + (log.quantity ?? 0), 0);
          return { x: day + 1, y: total };
        });

      case 'year':
        return Array.from({ length: 12 }, (_, month) => {
          const total = logs
            .filter((log) => new Date(log.date).getMonth() === month)
            .reduce((sum, log) => sum + (log.quantity ?? 0), 0);
          return { x: month + 1, y: total };
        });

      default:
        return [];
    }
  };

  const [goalModalVisible, setGoalModalVisible] = useState(false);

  const handleSaveGoal = (newGoal: number) => {
    setGoalModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header avatarChar="A" />

      <HeaderWithOptions
        title="Hidratação"
        options={[
          {
            label: 'Editar Meta',
            onPress: () => {
              setGoalModalVisible(true);
            },
          },
        ]}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <PeriodSelector
          //@ts-ignore
          periods={periods}
          selectedPeriod={selectedPeriod}
          onPeriodChange={handlePeriodChange}
        />

        <DateNavigator
          currentDate={selectedDate}
          mode={selectedPeriod}
          onDateChange={setSelectedDate}
        />

        <HydrationSummary
          total={total}
          progress={(total / goal) * 100}
        />

        {selectedPeriod !== 'day' && (
          <StepsChart
            data={transformLogsToChartData()}
            mode={selectedPeriod}
            barColor="#4DC4FF"
          />
        )}

        <HydrationHistory
          logs={logs}
          dateLabel={formatDateToISO(selectedDate)}
          loading={loading}
          error={error}
        />
      </ScrollView>

      <FloatingActionButton
        onPress={() => router.push('/hydratation/register')}
      />

      <GoalModal
        visible={goalModalVisible}
        onClose={() => setGoalModalVisible(false)}
        onSave={handleSaveGoal}
        currentValue={goal}
        goalType="hydration"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollView: { flex: 1 },
});