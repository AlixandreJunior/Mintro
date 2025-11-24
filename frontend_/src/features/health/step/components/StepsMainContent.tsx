import React, { useCallback, useMemo } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  ActivityIndicator,
  ScrollView,
  View,
} from 'react-native';

import DateNavigator from '@/share/components/DateNavigator';
import PeriodSelector from '@/share/components/PeriodSelector';
import { StepsSummary } from './StepsSummary';
import Chart from './StepsChart';

const { height } = Dimensions.get('window');

type Period = 'week' | 'month' | 'year';

interface StepsMainContentProps {
  periods: { key: Period; label: string }[];
  loading: boolean;
  error: string | null;
  steps: number;
  stepGoal: number;
  chartData: { x: number; y: number }[];
  progressPercentage: number;
  selectedPeriod: Period;
  selectedDate: Date;
  setSelectedPeriod: React.Dispatch<React.SetStateAction<Period>>;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

const StepsMainContent: React.FC<StepsMainContentProps> = ({
  periods,
  loading,
  error,
  steps,
  stepGoal,
  chartData,
  progressPercentage,
  selectedPeriod,
  selectedDate,
  setSelectedDate,
  setSelectedPeriod,
}) => {
  const handlePeriodChange = useCallback(
    (period: Period) => setSelectedPeriod(period),
    [setSelectedPeriod]
  );

  const handleDateChange = useCallback(
    (date: Date) => setSelectedDate(date),
    [setSelectedDate]
  );

  const content = useMemo(() => {
    return (
      <>
        <StepsSummary
          totalSteps={steps}
          goalSteps={stepGoal}
          progress={progressPercentage}
        />
        <Chart data={chartData} mode={selectedPeriod} />
      </>
    );
  }, [
    loading,
    error,
    steps,
    stepGoal,
    progressPercentage,
    chartData,
    selectedPeriod,
  ]);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <PeriodSelector
        periods={periods}
        selectedPeriod={selectedPeriod}
        onPeriodChange={handlePeriodChange}
      />

      <DateNavigator
        currentDate={selectedDate}
        mode={selectedPeriod}
        onDateChange={handleDateChange}
      />

      {content}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: { flexGrow: 1, paddingBottom: height * 0.03 },

  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default StepsMainContent;
