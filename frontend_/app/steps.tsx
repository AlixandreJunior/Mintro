import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Dimensions,
  Text,
} from 'react-native';
import Header from '@/components/Layout/Header';
import HeaderWithOptions from '@/components/Layout/HeaderWithOptions';
import DateNavigator from '@/components/DateNavigator';
import StepsChart from '@/components/StepsChart';
import PeriodSelector from '@/components/PeriodSelector';
import { StepsSummary } from '@/components/StepsSummary';
import GoalModal from '@/components/GoalModal';

import { useSteps } from '@/hooks/useSteps';

const { height } = Dimensions.get('window');

export default function App(): React.JSX.Element {
  const [selectedPeriod, setSelectedPeriod] = useState<
    'week' | 'month' | 'year'
  >('week');
  const [currentDateLabel, setCurrentDateLabel] = useState(new Date());

  const periods = [
    { key: 'week', label: 'Semana' },
    { key: 'month', label: 'Mês' },
    { key: 'year', label: 'Ano' },
  ];

  const [stepGoal, setStepGoal] = useState(10000);
  const [goalModalVisible, setGoalModalVisible] = useState(false);

  const { steps, estimatedCaloriesBurned, resetSteps } = useSteps();

  const progressPercentage = steps / stepGoal;

  const CHART_DATA = Array.from({ length: 24 }, (_, i) => ({
    x: i,
    y: i === new Date().getHours() ? steps : 0,
  }));

  const handlePeriodChange = (period: typeof selectedPeriod) => {
    setSelectedPeriod(period);
  };

  const handleSaveGoal = (newGoal: number) => {
    setStepGoal(newGoal);
    setGoalModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#C8E6C9" />
      <Header avatarChar="A" />
      <HeaderWithOptions
        title="Passos"
        options={[
          {
            label: 'Editar Meta',
            onPress: () => setGoalModalVisible(true),
          },
          {
            label: 'Resetar',
            onPress: () => resetSteps(),
          },
        ]}
      />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <PeriodSelector
          //@ts-ignore
          periods={periods}
          selectedPeriod={selectedPeriod}
          onPeriodChange={handlePeriodChange}
        />
        <DateNavigator
          currentDate={currentDateLabel}
          mode={selectedPeriod}
          onDateChange={setCurrentDateLabel}
        />
        <StepsSummary
          totalSteps={steps}
          goalSteps={stepGoal}
          progress={progressPercentage}
        />

        <StepsChart data={CHART_DATA} mode={selectedPeriod} />
      </ScrollView>

      <GoalModal
        visible={goalModalVisible}
        onClose={() => setGoalModalVisible(false)}
        onSave={handleSaveGoal}
        currentValue={stepGoal}
        goalType="steps"
      />
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
