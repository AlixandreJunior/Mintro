import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { router } from 'expo-router';
import { StepsMainPanel } from './StepsMainPanel';
import { Step } from '@/share/types/health/steps';
import { StepsSidePanel } from './StepsSidePanel';
import { useToast } from '@/share/providers/ToastProvider';
import { useSteps } from '../hooks/useSteps';

const { width, height } = Dimensions.get('window');

interface StepsPanelProps {
  logs: Step[];
}

export const StepsPanel: React.FC<StepsPanelProps> = ({ logs }) => {
  // Valores médios por passo
  const kcalPerStep = 0.05; // kcal por passo (média)
  const distancePerStep = 0.78 / 1000; // metros convertidos para km

  const totalSteps = useMemo(
    () => logs.reduce((acc, log) => acc + log.steps, 0),
    [logs]
  );

  const totalDistance = useMemo(
    () => totalSteps * distancePerStep,
    [totalSteps]
  );

  const totalKcal = useMemo(() => totalSteps * kcalPerStep, [totalSteps]);

  const [stepGoal, setStepGoal] = useState<number | null>(null);
  const { handleStepGoal } = useSteps();
  const { showToast } = useToast();

  useEffect(() => {
    const loadGoal = async () => {
      try {
        const data = await handleStepGoal();
        if (data?.goal) {
          setStepGoal(data.goal);
        }
      } catch (error) {
        console.log('Erro ao carregar meta de passos', error);
        showToast('Erro ao carregar meta de passos', 'error');
      }
    };
    loadGoal();
  }, []);

  return (
    <TouchableOpacity
      style={styles.mainStats}
      onPress={() => router.push('/steps')}
      activeOpacity={0.8}
    >
      <StepsSidePanel
        value={totalDistance}
        label="km"
        icon="map-marker"
        color="#5262f8ff"
      />
      <StepsMainPanel steps={totalSteps} goal={stepGoal} />
      <StepsSidePanel
        value={totalKcal}
        icon="fire"
        color="#F97316"
        label="kcal"
      />
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
