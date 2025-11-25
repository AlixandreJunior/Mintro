import React from 'react';
import { View } from 'react-native';

import { HydratationCard } from '@/features/health/hydration/components/HydratationCard';
import { ActivitiesCardSection } from '@/features/health/exercise/components/ActivitiesCardSection';
import { StepsPanel } from '@/features/health/step/components/StepsPanel';

import { useSteps } from '@/features/health/step/hooks/useSteps';
import { useHydration } from '@/features/health/hydration/hooks/useHydration';
import { useExercise } from '@/features/health/exercise/hooks/useExercise';
import { useMindfulness } from '@/features/health/mindfulness/hooks/useMindfulness';

import { useLoadList } from '../hooks/useLoadList';
import { Step } from '../types/health/steps';
import { Hydration } from '../types/health/hydratation';
import { ExerciseLog } from '../types/health/exercise';
import { MindfulnessLog } from '../types/health/mindfulness';

interface Props {
  currentDate: Date;
}

export function HealthStats({ currentDate }: Props) {
  const { handleStepsList } = useSteps();
  const { handleHydrationList } = useHydration();
  const { handleExerciseLogList } = useExercise();
  const { handleMindfulnessLogList } = useMindfulness();

  const { data: stepsLogs } = useLoadList<Step>({
    loader: () => handleStepsList(currentDate, 'day'),
    deps: [currentDate],
  });

  const { data: hydrationLogs } = useLoadList<Hydration>({
    loader: () => handleHydrationList(currentDate, 'day'),
    deps: [currentDate],
  });

  const { data: exerciseLogs } = useLoadList<ExerciseLog>({
    loader: () => handleExerciseLogList(currentDate, 'week'),
    deps: [currentDate],
  });

  const { data: mindfulnessLogs } = useLoadList<MindfulnessLog>({
    loader: () => handleMindfulnessLogList(currentDate, 'week'),
    deps: [currentDate],
  });

  return (
    <View>
      <StepsPanel logs={stepsLogs} />
      <HydratationCard logs={hydrationLogs} />
      <ActivitiesCardSection
        mindfulnessLogs={mindfulnessLogs}
        exerciseLogs={exerciseLogs}
        currentDate={currentDate}
      />
    </View>
  );
}
