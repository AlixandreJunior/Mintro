import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  View,
  Text,
} from 'react-native';
import Header from '@/components/layout/Header';
import HeaderWithOptions from '@/components/layout/HeaderWithOptions';
import DateNavigator from '@/components/DateNavigator';
import PeriodSelector from '@/components/PeriodSelector';
import StepsChart from '@/components/StepsChart';
import { StepsSummary } from '@/components/StepsSummary';
import GoalModal from '@/components/GoalModal';

import { useSteps } from '@/hooks/useSteps';

const { height } = Dimensions.get('window');

const StepsScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState<
    'week' | 'month' | 'year'
  >('week');
  const [stepGoal, setStepGoal] = useState(10000);
  const [goalModalVisible, setGoalModalVisible] = useState(false);

  const periods = [
    { key: 'week', label: 'Semana' },
    { key: 'month', label: 'Mês' },
    { key: 'year', label: 'Ano' },
  ];

  const { steps, loading, error, refreshSteps } = useSteps();

  const handlePeriodChange = (period: typeof selectedPeriod) =>
    setSelectedPeriod(period);
  const handleSaveGoal = (newGoal: number) => {
    setStepGoal(newGoal);
    setGoalModalVisible(false);
  };

  const transformStepsToChartData = () => {
    const now = new Date();
    switch (selectedPeriod) {
      case 'week':
        return Array.from({ length: 7 }, (_, day) => ({
          x: day,
          y: day === now.getDay() ? steps : 0,
        }));
      case 'month':
        const daysInMonth = new Date(
          now.getFullYear(),
          now.getMonth() + 1,
          0
        ).getDate();
        return Array.from({ length: daysInMonth }, (_, day) => ({
          x: day + 1,
          y: day + 1 === now.getDate() ? steps : 0,
        }));
      case 'year':
        return Array.from({ length: 12 }, (_, month) => ({
          x: month + 1,
          y: month === now.getMonth() ? steps : 0,
        }));
      default:
        return [];
    }
  };

  const chartData = transformStepsToChartData();
  const progressPercentage = steps / stepGoal;

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithOptions
        title="Passos"
        options={[
          { label: 'Atualizar', onPress: refreshSteps },
          { label: 'Editar Meta', onPress: () => setGoalModalVisible(true) },
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

      <GoalModal
        visible={goalModalVisible}
        onClose={() => setGoalModalVisible(false)}
        onSave={handleSaveGoal}
        currentValue={stepGoal}
        goalType="steps"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollViewContent: { flexGrow: 1, paddingBottom: height * 0.03 },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  errorText: { color: 'red', fontSize: 16 },
});

export default StepsScreen;
