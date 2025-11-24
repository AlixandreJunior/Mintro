import HeaderWithOptions from '@/share/components/layout/HeaderWithOptions';
import { useSteps } from '@/features/health/step/hooks/useSteps';
import { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { formatDateToISO } from '@/share/utils/formatDatetimeToISO';
import StepsMainContent from '../components/StepsMainContent';
import { Step } from '@/share/types/health/steps';

const PERIODS = [
  { key: 'week', label: 'Semana' },
  { key: 'month', label: 'Mês' },
  { key: 'year', label: 'Ano' },
] as const;

type Period = (typeof PERIODS)[number]['key'];

const stepGoal = 10000;

const StepsScreen = () => {
  const [logs, setLogs] = useState<Step[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('week');

  const { handleStepsList, loading, error } = useSteps();

  useEffect(() => {
    const loadSteps = async () => {
      try {
        const data = await handleStepsList(
          formatDateToISO(selectedDate),
          selectedPeriod
        );
        setLogs(data);
      } catch (error: any) {
        if (error?.response?.status === 404) {
          setLogs([]);
        } else {
          console.error('Erro ao carregar logs de passos:', error);
        }
      }
    };

    loadSteps();
  }, [selectedDate, selectedPeriod]);

  const progressPercentage = Math.min(
    100,
    Math.round((logs.reduce((acc, s) => acc + s.steps, 0) / stepGoal) * 100)
  );

  const periodConfig = {
    day: {
      length: 24,
      getIndex: (d: Date) => d.getHours(),
    },
    week: {
      length: 7,
      getIndex: (d: Date) => d.getDay(),
    },
    month: {
      length: 30,
      getIndex: (d: Date) => d.getDate() - 1,
    },
    year: {
      length: 12,
      getIndex: (d: Date) => d.getMonth(),
    },
  } as const;

  const chartData = useMemo(() => {
    const config = periodConfig[selectedPeriod];
    if (!config) return [];

    const buckets = Array.from({ length: config.length }, () => 0);

    logs.forEach((log) => {
      const date = new Date(log.date);
      const index = config.getIndex(date);

      if (index >= 0 && index < config.length) {
        buckets[index] += log.steps ?? 0;
      }
    });

    return buckets.map((y, i) => ({
      x: i + 1,
      y,
    }));
  }, [logs, selectedPeriod]);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithOptions title="Passos" options={[]} />

      <StepsMainContent
        chartData={chartData}
        steps={logs.reduce((acc, s) => acc + s.steps, 0)}
        error={error}
        loading={loading}
        periods={PERIODS as unknown as { key: Period; label: string }[]}
        selectedDate={selectedDate}
        selectedPeriod={selectedPeriod}
        setSelectedDate={setSelectedDate}
        setSelectedPeriod={setSelectedPeriod}
        stepGoal={stepGoal}
        progressPercentage={progressPercentage}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});

export default StepsScreen;
