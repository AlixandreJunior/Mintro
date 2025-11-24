import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { ActivityCard } from '@/share/components/ActivityCard';
import { router } from 'expo-router';

import { getWeeklyProgress } from '@/share/utils/healthStats';
import { useExercise } from '../hooks/useExercise';
import { useMindfulness } from '../../mindfulness/hooks/useMindfulness';
import { MindfulnessLog } from '@/share/types/health/mindfulness';
import { ExerciseLog } from '@/share/types/health/exercise';

interface ActivitiesCardSectionProps {
  mindfulnessLogs: MindfulnessLog[];
  exerciseLogs: ExerciseLog[];
  currentDate: Date;
}

export function ActivitiesCardSection({
  mindfulnessLogs,
  exerciseLogs,
  currentDate,
}: ActivitiesCardSectionProps) {
  const exerciseDaysProgress = useMemo(
    () => getWeeklyProgress(exerciseLogs, currentDate),
    [exerciseLogs, currentDate]
  );

  const mindfulnessDaysProgress = useMemo(
    () => getWeeklyProgress(mindfulnessLogs, currentDate),
    [mindfulnessLogs, currentDate]
  );

  const completedExerciseDays = exerciseDaysProgress.filter(Boolean).length;
  const completedMindfulnessDays =
    mindfulnessDaysProgress.filter(Boolean).length;

  return (
    <>
      <ActivityCard
        title="Dias com Exercício"
        onPressCard={() => router.push('../exercises/')}
        activityDaysProgress={exerciseDaysProgress}
        completedActivityDays={completedExerciseDays}
      />

      <ActivityCard
        title="Dias com Mindfulness"
        onPressCard={() => router.push('../mindfulness/')}
        activityDaysProgress={mindfulnessDaysProgress}
        completedActivityDays={completedMindfulnessDays}
      />
    </>
  );
}
