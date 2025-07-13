import React from 'react';
import { View } from 'react-native';
import { MainStatsPanel } from "@/components/MainStatsPanel";
import { HydratationCard } from "@/components/HydratationCard";
import { ActivityCard } from "@/components/ActivityCard";
import { router } from 'expo-router';
import { isSameDay, isSameWeek, startOfWeek } from "date-fns";
import { ptBR } from 'date-fns/locale';

interface Props {
  currentDate: Date;
  mindfulnessLogs: any[];
  exerciseLogs: any[];
  hydrationLogs: any[];
}

export function HealthStats({ currentDate, mindfulnessLogs, exerciseLogs, hydrationLogs }: Props) {
  const getWeeklyProgress = (logs: { datetime: string }[]) => {
    const progress = Array(7).fill(false);
    const currentWeekStart = startOfWeek(currentDate, { weekStartsOn: 0, locale: ptBR });

    logs.forEach(log => {
      const logDate = new Date(log.datetime);
      if (isSameWeek(logDate, currentWeekStart, { weekStartsOn: 0, locale: ptBR })) {
        const dayIndex = logDate.getDay();
        progress[dayIndex] = true;
      }
    });
    return progress;
  };

  const exerciseDaysProgress = getWeeklyProgress(exerciseLogs);
  const mindfulnessDaysProgress = getWeeklyProgress(mindfulnessLogs);

  const completedExerciseDays = exerciseDaysProgress.filter(Boolean).length;
  const completedMindfulnessDays = mindfulnessDaysProgress.filter(Boolean).length;

  const calculateDailyStats = (logs: any[], date: Date) => {
    let totalDistance = 0;
    let totalDurationMinutes = 0;

    logs.forEach(log => {
      const logDate = new Date(log.datetime);
      if (isSameDay(logDate, date)) {
        totalDistance += log.distance || 0;
        totalDurationMinutes += log.duration || 0;
      }
    });

    const totalKcal = Math.round(totalDurationMinutes * 5);
    const totalSteps = Math.round(totalDistance * 1300);

    return {
      distance: totalDistance.toFixed(2),
      steps: totalSteps,
      kcal: totalKcal,
    };
  };

  const currentDayStats = calculateDailyStats(exerciseLogs, currentDate);

  const totalHydrationToday = hydrationLogs.reduce((sum, log) => sum + (log.quantity || 0), 0);
  const hydrationGoal = 2000;
  const hydrationProgressPercentage = (totalHydrationToday / hydrationGoal) * 100;

  return (
    <View>
      <MainStatsPanel currentDayStats={currentDayStats} />

      <HydratationCard
        handleHydrationPress={() => router.push("../hydratation/")}
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
