import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { router } from 'expo-router';
import { StepsKcalPanel } from './StepsKcalPanel';
import { StepsDistancePanel } from './StepsDistancePanel';
import { StepsMainPanel } from './StepsMainPanel';
import { useSteps } from '@/features/health/step/hooks/useSteps';
import { Step } from '@/share/types/health/steps';
import { formatDateToISO } from '@/share/utils/formatDatetimeToISO';

const { width, height } = Dimensions.get('window');

interface StepsPanelProps {
  logs: Step[];
}
export const StepsPanel: React.FC<StepsPanelProps> = ({ logs }) => {
  const kcalPerStep = 0.05;
  const distancePerStep = 0.78;

  const totalSteps = useMemo(() => {
    return logs.reduce((acc, log) => acc + log.steps, 0);
  }, [logs]);

  const totalDistance = useMemo(() => {
    return logs.reduce((acc, log) => acc + distancePerStep, 0);
  }, [logs]);

  const totalKcal = useMemo(() => {
    return logs.reduce((acc, log) => acc + kcalPerStep, 0);
  }, [logs]);

  return (
    <TouchableOpacity
      style={styles.mainStats}
      onPress={() => router.push('/steps')}
    >
      <StepsDistancePanel distance={totalDistance} />
      <StepsMainPanel steps={totalSteps} />
      <StepsKcalPanel kcal={totalKcal} />
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
