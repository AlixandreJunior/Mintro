import HeaderWithOptions from '@/share/components/layout/HeaderWithOptions';
import { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Step } from '@/share/types/health/steps';
import ShoeIcon from '@/share/components/icons/ShoeIcon';
import DashboardMainContent from '@/share/components/DashboardTemplate';
import { useSteps } from '../hooks/useSteps';
import { router } from 'expo-router';

const PERIODS = [
  { key: 'week', label: 'Semana' },
  { key: 'month', label: 'Mês' },
  { key: 'year', label: 'Ano' },
] as const;

type Period = (typeof PERIODS)[number]['key'];

const StepsScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('week');

  const { handleStepsList } = useSteps();

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithOptions
        title="Passos"
        options={[]}
        onBackPress={() => router.push('/(app)/(tabs)/activity')}
      />

      <DashboardMainContent<Step, Period>
        periods={PERIODS as any}
        selectedPeriod={selectedPeriod}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setSelectedPeriod={setSelectedPeriod}
        loader={handleStepsList}
        goal={10000}
        valueKey="steps"
        dateKey="date"
        labelSuffix="passos"
        barColor="#A5D6A7"
        icon={<ShoeIcon />}
        dateLabel="De hoje"
        un="passos"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});

export default StepsScreen;
