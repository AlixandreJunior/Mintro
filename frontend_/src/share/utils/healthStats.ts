import { isSameDay, isSameWeek, startOfWeek } from "date-fns";
import { ptBR } from "date-fns/locale";

export const getWeeklyProgress = (logs: { datetime: string }[], currentDate: Date) => {
  const progress = Array(7).fill(false);
  const currentWeekStart = startOfWeek(currentDate, {
    weekStartsOn: 0,
    locale: ptBR,
  });

  logs.forEach((log) => {
    const logDate = new Date(log.datetime);
    if (isSameWeek(logDate, currentWeekStart, { weekStartsOn: 0, locale: ptBR })) {
      progress[logDate.getDay()] = true;
    }
  });

  return progress;
};

export const calculateDailyStats = (logs: any[], date: Date) => {
  let totalDistance = 0;
  let totalDurationMinutes = 0;

  logs.forEach((log) => {
    const logDate = new Date(log.datetime);
    if (isSameDay(logDate, date)) {
      totalDistance += log.distance || 0;
      totalDurationMinutes += log.duration || 0;
    }
  });

  return {
    distance: totalDistance,
    steps: Math.round(totalDistance * 1300),
    kcal: Math.round(totalDurationMinutes * 5),
  };
};

export const calculateHydration = (logs: any[], goal = 2000) => {
  const total = logs.reduce((sum, log) => sum + (log.quantity || 0), 0);

  return {
    totalHydrationToday: total,
    hydrationProgressPercentage: (total / goal) * 100,
  };
};
