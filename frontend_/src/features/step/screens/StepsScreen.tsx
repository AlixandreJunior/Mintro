import HeaderWithOptions from '@/share/components/layout/HeaderWithOptions';
import StepsMainContent from '@/features/step/StepsMainContent';

import { useSteps } from '@/features/step/hooks/useSteps';
import { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';

const StepsScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState<
    'week' | 'month' | 'year'
  >('week');
  const [stepGoal, setStepGoal] = useState(10000);

  const { steps, chartData, progressPercentage, loading, error, refreshSteps } =
    useSteps(selectedDate, selectedPeriod, stepGoal);

  const periods = [
    { key: 'week', label: 'Semana' },
    { key: 'month', label: 'Mês' },
    { key: 'year', label: 'Ano' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithOptions title="Passos" options={[]} />
      <StepsMainContent
        chartData={chartData}
        error={error}
        loading={loading}
        periods={periods}
        progressPercentage={progressPercentage}
        selectedDate={selectedDate}
        selectedPeriod={selectedPeriod}
        setSelectedDate={setSelectedDate}
        setSelectedPeriod={setSelectedPeriod}
        stepGoal={stepGoal}
        steps={steps}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});

export default StepsScreen;
