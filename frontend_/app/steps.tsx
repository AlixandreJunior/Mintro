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

import GoalModal from '@/components/GoalModal'; // Importa modal

const { height } = Dimensions.get('window');

const CHART_DATA = [
  { x: 0, y: 4000 },
  { x: 1, y: 0 },
  { x: 2, y: 0 },
  { x: 3, y: 0 },
  { x: 4, y: 200 },
  { x: 5, y: 0 },
  { x: 6, y: 0 },
  { x: 7, y: 0 },
  { x: 8, y: 0 },
  { x: 9, y: 0 },
  { x: 10, y: 0 },
  { x: 11, y: 800 },
  { x: 12, y: 1000 },
  { x: 13, y: 0 },
  { x: 14, y: 0 },
  { x: 15, y: 1000 },
  { x: 16, y: 0 },
  { x: 17, y: 0 },
  { x: 18, y: 1000 },
  { x: 19, y: 0 },
  { x: 20, y: 0 },
  { x: 21, y: 1000 },
  { x: 22, y: 0 },
  { x: 23, y: 0 },
];

export default function App(): React.JSX.Element {
  const [selectedPeriod, setSelectedPeriod] = useState<
    'day' | 'week' | 'month' | 'year'
  >('day');
  const [currentDateLabel, setCurrentDateLabel] = useState(new Date());

  const periods = [
    { key: 'day', label: 'Dia' },
    { key: 'week', label: 'Semana' },
    { key: 'month', label: 'Mês' },
    { key: 'year', label: 'Ano' },
  ];

  const [stepGoal, setStepGoal] = useState(10000); // Meta inicial

  const totalSteps = 6500;
  const progressPercentage = totalSteps / stepGoal;

  const [goalModalVisible, setGoalModalVisible] = useState(false);

  const handlePeriodChange = (period: typeof selectedPeriod) => {
    setSelectedPeriod(period);
  };

  // Salvar meta do modal
  const handleSaveGoal = (newGoal: number) => {
    setStepGoal(newGoal);
    setGoalModalVisible(false);
    // Aqui pode chamar API ou atualizar contexto
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
          totalSteps={totalSteps}
          goalSteps={stepGoal}
          progress={progressPercentage}
        />
        <StepsChart data={CHART_DATA} mode={selectedPeriod} />
      </ScrollView>

      {/* Modal para editar a meta de passos */}
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
