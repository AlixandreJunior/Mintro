import React from 'react';
import { View } from 'react-native';
import { MainStatsPanel } from '@/src/components/MainStatsPanel';
import { HydratationCard } from '@/src/components/HydratationCard';
import { ActivityCard } from '@/src/components/ActivityCard';
import { router } from 'expo-router';
import { isSameDay, isSameWeek, startOfWeek } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Props {
  currentDate: Date;
  mindfulnessLogs: any[];
  exerciseLogs: any[];
  hydrationLogs: any[];
  steps?: number;
  estimatedCaloriesBurned?: number;
  stepsLoading?: boolean;
}

const STEP_LENGTH_METERS = 0.762; // distância média de um passo em metros

export function HealthStats({
  currentDate,
  mindfulnessLogs,
  exerciseLogs,
  hydrationLogs,
  steps = 0,
  estimatedCaloriesBurned = 0,
  stepsLoading = false,
}: Props) {
  const getWeeklyProgress = (logs: { datetime: string }[]) => {
    const progress = Array(7).fill(false);
    const currentWeekStart = startOfWeek(currentDate, {
      weekStartsOn: 0,
      locale: ptBR,
    });

    logs.forEach((log) => {
      const logDate = new Date(log.datetime);
      if (
        isSameWeek(logDate, currentWeekStart, { weekStartsOn: 0, locale: ptBR })
      ) {
        const dayIndex = logDate.getDay();
        progress[dayIndex] = true;
      }
    });
    return progress;
  };

  const exerciseDaysProgress = getWeeklyProgress(exerciseLogs);
  const mindfulnessDaysProgress = getWeeklyProgress(mindfulnessLogs);

  const completedExerciseDays = exerciseDaysProgress.filter(Boolean).length;
  const completedMindfulnessDays =
    mindfulnessDaysProgress.filter(Boolean).length;

  const calculateDailyStats = (logs: any[], date: Date) => {
    let totalDistance = 0;
    let totalDurationMinutes = 0;

    logs.forEach((log) => {
      const logDate = new Date(log.datetime);
      if (isSameDay(logDate, date)) {
        totalDistance += log.distance || 0;
        totalDurationMinutes += log.duration || 0;
      }
    });

    const totalKcal = Math.round(totalDurationMinutes * 5);
    const totalSteps = Math.round(totalDistance * 1300);

    return {
      distance: totalDistance, // km ou metros conforme logs
      steps: totalSteps,
      kcal: totalKcal,
    };
  };

  const currentDayStats = calculateDailyStats(exerciseLogs, currentDate);

  // 🔹 Integrar passos do sensor
  if (!stepsLoading) {
    const sensorDistanceKm = (steps * STEP_LENGTH_METERS) / 1000; // distância em km
    currentDayStats.steps += steps;
    currentDayStats.kcal += Math.round(estimatedCaloriesBurned);
    currentDayStats.distance = Number(
      (currentDayStats.distance + sensorDistanceKm).toFixed(2)
    );
  }

  const totalHydrationToday = hydrationLogs.reduce(
    (sum, log) => sum + (log.quantity || 0),
    0
  );
  const hydrationGoal = 2000;
  const hydrationProgressPercentage =
    (totalHydrationToday / hydrationGoal) * 100;

  return (
    <View>
      <MainStatsPanel currentDayStats={currentDayStats} />

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
