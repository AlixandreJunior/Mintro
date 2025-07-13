import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import Header from '@/components/Layout/Header';
import HeaderWithOptions from '@/components/Layout/HeaderWithOptions';
import DateNavigator from '@/components/DateNavigator';
import StepsChart from '@/components/StepsChart';
import PeriodSelector from '@/components/PeriodSelector';
import { StepsSummary } from '@/components/StepsSummary';

const { height } = Dimensions.get('window');

const CHART_DATA = [
  { x: 0, y: 40 }, { x: 1, y: 0 }, { x: 2, y: 0 },
  { x: 3, y: 0 }, { x: 4, y: 200 }, { x: 5, y: 0 },
  { x: 6, y: 0 }, { x: 7, y: 0 }, { x: 8, y: 0 },
  { x: 9, y: 0 }, { x: 10, y: 0 }, { x: 11, y: 800 },
  { x: 12, y: 1000 }, { x: 13, y: 0 }, { x: 14, y: 0 },
  { x: 15, y: 1000 }, { x: 16, y: 0 }, { x: 17, y: 0 },
  { x: 18, y: 1000 }, { x: 19, y: 0 }, { x: 20, y: 0 },
  { x: 21, y: 1000 }, { x: 22, y: 0 }, { x: 23, y: 0 },
];

export default function App(): React.JSX.Element {
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month' | 'year'>('day');
  const [currentDateLabel, setCurrentDateLabel] = useState(new Date());

  const totalSteps = 6500;
  const goalSteps = 10000;
  const progressPercentage = totalSteps / goalSteps;

  const handlePeriodChange = (period: typeof selectedPeriod) => {
    setSelectedPeriod(period);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#C8E6C9" />
      <Header avatarChar="A" />
      <HeaderWithOptions title="Passos" />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <PeriodSelector selectedPeriod={selectedPeriod} onPeriodChange={handlePeriodChange} />
        <DateNavigator currentDate={currentDateLabel} mode={selectedPeriod} onDateChange={setCurrentDateLabel} />
        <StepsSummary totalSteps={totalSteps} goalSteps={goalSteps} progress={progressPercentage} />
        <StepsChart data={CHART_DATA} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingBottom: height * 0.03,
  },
});
