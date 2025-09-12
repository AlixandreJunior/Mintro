import { useMemo } from "react";
import { useExerciseLogs } from "./useExerciseLogs";
import { useHydrationLogs } from "./useHydratationLog";
import { useMindfulnessLogs } from "./useMindfulnessLog";
import { useSteps } from "./useSteps";
import {
  getWeeklyProgress,
  calculateDailyStats,
  calculateHydration,
} from "@/utils/healthStats";

const STEP_LENGTH_METERS = 0.762;

export function useHealthData(date: Date) {
  const { logs: mindfulnessLogs } = useMindfulnessLogs(date, "week");
  const { logs: exerciseLogs } = useExerciseLogs(date, "week");
  const { logs: hydrationLogs } = useHydrationLogs(date);
  const { steps, calories, loading: stepsLoading } = useSteps();

  const exerciseDaysProgress = useMemo(
    () => getWeeklyProgress(exerciseLogs, date),
    [exerciseLogs, date]
  );

  const mindfulnessDaysProgress = useMemo(
    () => getWeeklyProgress(mindfulnessLogs, date),
    [mindfulnessLogs, date]
  );

  const completedExerciseDays = exerciseDaysProgress.filter(Boolean).length;
  const completedMindfulnessDays = mindfulnessDaysProgress.filter(Boolean).length;

  const currentDayStats = useMemo(
    () => calculateDailyStats(exerciseLogs, date),
    [exerciseLogs, date]
  );

  const mergedStats = useMemo(() => {
    if (stepsLoading) return currentDayStats;

    const sensorDistanceKm = (steps * STEP_LENGTH_METERS) / 1000;

    return {
      ...currentDayStats,
      steps: currentDayStats.steps + steps,
      kcal: currentDayStats.kcal + Math.round(calories),
      distance: Number((currentDayStats.distance + sensorDistanceKm).toFixed(2)),
    };
  }, [stepsLoading, steps, calories, currentDayStats]);

  const { totalHydrationToday, hydrationProgressPercentage } = useMemo(
    () => calculateHydration(hydrationLogs),
    [hydrationLogs]
  );

  return {
    mindfulnessLogs,
    exerciseLogs,
    hydrationLogs,
    exerciseDaysProgress,
    mindfulnessDaysProgress,
    completedExerciseDays,
    completedMindfulnessDays,
    currentDayStats,
    mergedStats,
    totalHydrationToday,
    hydrationProgressPercentage,
  };
}
