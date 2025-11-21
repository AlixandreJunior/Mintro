import { useState, useCallback } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { router } from 'expo-router';

import { FloatingActionButton } from '@/share/components/FloatingButtonAction';
import HydrationMainContent from '@/features/health/hydration/components/HydrationMainContent';
import HeaderWithOptions from '@/share/components/layout/HeaderWithOptions';

const HydrationScreen = () => {
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const [selectedPeriod, setSelectedPeriod] = useState<
    'day' | 'week' | 'month' | 'year'
  >('day');

  const goToRegister = useCallback(() => {
    router.push('/hydratation/register');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithOptions title="Hidratação" />

      <HydrationMainContent
        selectedDate={selectedDate}
        selectedPeriod={selectedPeriod}
        setSelectedDate={setSelectedDate}
        setSelectedPeriod={setSelectedPeriod}
      />

      <FloatingActionButton onPress={goToRegister} />
    </SafeAreaView>
  );
};

export default HydrationScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});
