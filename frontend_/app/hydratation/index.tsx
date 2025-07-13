import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { router } from 'expo-router';

import Header from '@/components/Layout/Header';
import HeaderWithOptions from '@/components/Layout/HeaderWithOptions';
import DateNavigator from '@/components/DateNavigator';
import { HydrationHistory } from '@/components/HydrationHistory';
import { HydrationSummary } from '@/components/HydrationSummary';
import { formatDatetimeToISO } from '@/utils/formatDatetimeToISO';
import { useHydrationLogs } from '@/hooks/useHydratationLog';
import { FloatingActionButton } from '@/components/FloatingButtonAction';

export default function HydrationScreen() {
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const { logs, goal, loading, error } = useHydrationLogs(selectedDate);

  const total = logs.reduce((sum, { quantity = 0 }) => sum + quantity, 0);

  return (
    <SafeAreaView style={styles.container}>
      <Header avatarChar="A" />
      <HeaderWithOptions
        title="Hidratação"
        onBackPress={() => router.back()}
        onOptionPress={() => {}}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <DateNavigator currentDate={selectedDate} mode="day" onDateChange={setSelectedDate} />
        <HydrationSummary total={total} remaining={goal - total} goal={goal} progress={(total / goal) * 100} />
        <HydrationHistory
          logs={logs}
          dateLabel={formatDatetimeToISO(selectedDate)}
          loading={loading}
          error={error}
        />
      </ScrollView>

      <FloatingActionButton onPress={() => router.push('/hydratation/register')}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollView: { flex: 1, backgroundColor: '#fff' },
});
