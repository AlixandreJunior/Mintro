import DateNavigator from '@/share/components/DateNavigator';
import PeriodSelector from '@/share/components/PeriodSelector';
import StepsChart from '@/share/components/StepsChart';
import { StepsSummary } from '@/share/components/StepsSummary';
import React from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';
import { ActivityIndicator, ScrollView, View } from 'react-native';

const { height } = Dimensions.get('window');

interface StepsMainContentProps {
  periods: {
    key: string;
    label: string;
  }[];
  loading: boolean;
  error: string | null;
  steps: number;
  stepGoal: number;
  chartData: {
    x: number;
    y: number;
  }[];
  progressPercentage: number;
  selectedPeriod: 'week' | 'month' | 'year';
  selectedDate: Date;
  setSelectedPeriod: React.Dispatch<
    React.SetStateAction<'week' | 'month' | 'year'>
  >;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

const StepsMainContent: React.FC<StepsMainContentProps> = ({
  periods,
  loading,
  error,
  stepGoal,
  steps,
  chartData,
  progressPercentage,
  selectedPeriod,
  selectedDate,
  setSelectedDate,
  setSelectedPeriod,
}) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <PeriodSelector
        //@ts-ignore
        periods={periods}
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
      />

      <DateNavigator
        currentDate={selectedDate}
        mode={selectedPeriod}
        onDateChange={setSelectedDate}
      />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
        </View>
      ) : error ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <>
          <StepsSummary
            totalSteps={steps}
            goalSteps={stepGoal}
            progress={progressPercentage}
          />
          <StepsChart data={chartData} mode={selectedPeriod} />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: { flexGrow: 1, paddingBottom: height * 0.03 },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  errorText: { color: 'red', fontSize: 16 },
});

export default StepsMainContent;
