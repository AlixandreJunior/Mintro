import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useMemo } from 'react';
import { router } from 'expo-router';
import { StepsKcalPanel } from './StepsKcalPanel';
import { StepsDistancePanel } from './StepsDistancePanel';
import { StepsMainPanel } from './StepsMainPanel';
import { useSteps } from '@/hooks/useSteps';

const { width, height } = Dimensions.get('window');

interface StepsPanelProps{
  date: Date
}
export const StepsPanel: React.FC<StepsPanelProps> = ({date}) => {
  const {mergedStats} = useSteps(date)

  return (
    <TouchableOpacity
      style={styles.mainStats}
      onPress={() => router.push('/steps')}
    >
      <StepsDistancePanel distance={mergedStats.distance} />
      <StepsMainPanel steps={mergedStats.steps} />
      <StepsKcalPanel kcal={mergedStats.kcal} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: height * 0.03,
    minHeight: height * 0.25,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: width * 0.05,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
});
