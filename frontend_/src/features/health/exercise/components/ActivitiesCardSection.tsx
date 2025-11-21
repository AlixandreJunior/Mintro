import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { ActivityCard } from '@/share/components/ActivityCard';
import { router } from 'expo-router';

import { getWeeklyProgress } from '@/share/utils/healthStats';
import { useExercise } from '../hooks/useExercise';
import { useMindfulness } from '../../mindfulness/hooks/useMindfulness';
import { MindfulnessLog } from '@/share/types/health/mindfulness';
import { ExerciseLog } from '@/share/types/health/exercise';

interface ActivitiesCardSectionProps {
  currentDate: Date;
}

export function ActivitiesCardSection({
  currentDate,
}: ActivitiesCardSectionProps) {
  const { handleExerciseLogList } = useExercise();
  const { handleMindfulnessLogList } = useMindfulness();

  const [data, setData] = useState<{
    exercise: ExerciseLog[];
    mindfulness: MindfulnessLog[];
  }>({
    exercise: [],
    mindfulness: [],
  });

  const loadData = useCallback(async () => {
    const [exercise, mindfulness] = await Promise.all([
      handleExerciseLogList(currentDate, 'week'),
      handleMindfulnessLogList(currentDate, 'week'),
    ]);

    setData({ exercise, mindfulness });
  }, [currentDate, handleExerciseLogList, handleMindfulnessLogList]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const exerciseDaysProgress = useMemo(
    () => getWeeklyProgress(data.exercise, currentDate),
    [data.exercise, currentDate]
  );

  const mindfulnessDaysProgress = useMemo(
    () => getWeeklyProgress(data.mindfulness, currentDate),
    [data.mindfulness, currentDate]
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
