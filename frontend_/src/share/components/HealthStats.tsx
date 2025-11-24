import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { HydratationCard } from '@/features/health/hydration/components/HydratationCard';
import { ActivitiesCardSection } from '@/features/health/exercise/components/ActivitiesCardSection';
import { StepsPanel } from '@/features/health/step/components/StepsPanel';

import { useSteps } from '@/features/health/step/hooks/useSteps';
import { useHydration } from '@/features/health/hydration/hooks/useHydration';
import { useExercise } from '@/features/health/exercise/hooks/useExercise';
import { useMindfulness } from '@/features/health/mindfulness/hooks/useMindfulness';

import { formatDateToISO } from '../utils/formatDatetimeToISO';

import { Step } from '../types/health/steps';
import { Hydration } from '../types/health/hydratation';
import { ExerciseLog } from '../types/health/exercise';
import { MindfulnessLog } from '../types/health/mindfulness';

interface Props {
  currentDate: Date;
}

export function HealthStats({ currentDate }: Props) {
  const [stepsLogs, setStepsLogs] = useState<Step[]>([]);
  const [hydrationLogs, setHydrationLogs] = useState<Hydration[]>([]);
  const [exerciseLogs, setExerciseLogs] = useState<ExerciseLog[]>([]);
  const [mindfulnessLogs, setMindfulnessLogs] = useState<MindfulnessLog[]>([]);

  const { handleStepsList } = useSteps();
  const { handleHydrationList } = useHydration();
  const { handleExerciseLogList } = useExercise();
  const { handleMindfulnessLogList } = useMindfulness();

  useEffect(() => {
    const loadAll = async () => {
      const isoDate = formatDateToISO(currentDate);

      const loaders = [
        { fn: () => handleStepsList(isoDate, 'day'), set: setStepsLogs },
        { fn: () => handleHydrationList(isoDate), set: setHydrationLogs },
        {
          fn: () => handleExerciseLogList(isoDate, 'week'),
          set: setExerciseLogs,
        },
        {
          fn: () => handleMindfulnessLogList(isoDate, 'week'),
          set: setMindfulnessLogs,
        },
      ];

      await Promise.all(
        loaders.map(async ({ fn, set }) => {
          try {
            const data = await fn();
            set(data ?? []);
          } catch (error: any) {
            if (error?.response?.status === 404) {
              set([]);
            } else {
              console.error('Erro ao carregar logs:', error);
            }
          }
        })
      );
    };

    loadAll();
  }, [currentDate]);

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
