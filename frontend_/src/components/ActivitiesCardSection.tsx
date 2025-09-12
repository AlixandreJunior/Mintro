import React, { useMemo } from 'react';
import { ActivityCard } from '@/components/ActivityCard';
import { router } from 'expo-router';
import { useExerciseLogs } from '@/hooks/useExerciseLogs';
import { useMindfulnessLogs } from '@/hooks/useMindfulnessLog';
import { getWeeklyProgress } from '@/utils/healthStats';

interface Props {
  currentDate: Date;
}

export function ActivitiesCardSection({ currentDate }: Props) {
    const { logs: mindfulnessLogs } = useMindfulnessLogs(currentDate, "week");
    const { logs: exerciseLogs } = useExerciseLogs(currentDate, "week");

    const exerciseDaysProgress = useMemo(() => getWeeklyProgress(exerciseLogs, currentDate),[exerciseLogs, currentDate]);
    const mindfulnessDaysProgress = useMemo(() => getWeeklyProgress(mindfulnessLogs, currentDate),[mindfulnessLogs, currentDate]);
    
    const completedExerciseDays = exerciseDaysProgress.filter(Boolean).length;
    const completedMindfulnessDays = mindfulnessDaysProgress.filter(Boolean).length;
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
