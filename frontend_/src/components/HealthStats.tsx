import React from 'react';
import { View } from 'react-native';
import { HydratationCard } from '@/components/HydratationCard';
import { ActivityCard } from '@/components/ActivityCard';
import { router } from 'expo-router';
import { useHealthData } from '@/hooks/useHealthData';
import { StepsPanel } from './StepsPanel';

interface Props {
  currentDate: Date;
}

export function HealthStats({ currentDate }: Props) {
  const {
    mergedStats,
    hydrationProgressPercentage,
    totalHydrationToday,
    exerciseDaysProgress,
    mindfulnessDaysProgress,
    completedExerciseDays,
    completedMindfulnessDays,
  } = useHealthData(currentDate);

  return (
    <View>
      <StepsPanel currentDayStats={mergedStats} />

      <HydratationCard
        handleHydrationPress={() => router.push('../hydratation/')}
        hydrationProgressPercentage={hydrationProgressPercentage}
        totalHydrationToday={totalHydrationToday}
      />

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
    </View>
  );
}
