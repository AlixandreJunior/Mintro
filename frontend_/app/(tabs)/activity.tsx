import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Dimensions } from 'react-native';
import Header from '@/components/Layout/Header';
import DateNavigator from '@/components/DateNavigator';
import { useHealthData } from '@/hooks/useHealthData';
import { HealthStats } from '@/components/HealthStats';
import { useSteps } from '@/hooks/useSteps';

const { width } = Dimensions.get('window');

export default function HealthScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const { mindfulnessLogs, exerciseLogs, hydrationLogs } =
    useHealthData(currentDate);

  // 👉 Hook de passos
  const { steps, calories, loading: stepsLoading } = useSteps();

  return (
    <SafeAreaView style={styles.container}>
      <Header avatarChar="A" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <DateNavigator
          currentDate={currentDate}
          mode="day"
          onDateChange={setCurrentDate}
        />

        <HealthStats
          currentDate={currentDate}
          mindfulnessLogs={mindfulnessLogs}
          exerciseLogs={exerciseLogs}
          hydrationLogs={hydrationLogs}
          steps={steps}
          estimatedCaloriesBurned={calories}
          stepsLoading={stepsLoading}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, paddingHorizontal: width * 0.05 },
});
