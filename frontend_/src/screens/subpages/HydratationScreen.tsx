import { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { FloatingActionButton } from '@/components/FloatingButtonAction';
import HydrationHeader from '@/components/HydrationHeader';
import HydrationMainContent from '@/components/HydrationMainContent';

const HydrationScreen = () => {
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });
  const [selectedPeriod, setSelectedPeriod] = useState<
    'day' | 'week' | 'month' | 'year'
  >('day');

  return (
    <SafeAreaView style={styles.container}>
      <HydrationHeader />
      <HydrationMainContent
        selectedDate={selectedDate}
        selectedPeriod={selectedPeriod}
        setSelectedDate={setSelectedDate}
        setSelectedPeriod={setSelectedPeriod}
      />
      <FloatingActionButton
        onPress={() => router.push('/hydratation/register')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});

export default HydrationScreen;
