import {
  startOfWeek,
  addDays,
  format,
  startOfMonth,
  endOfMonth,
  differenceInDays,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const getValue = <T extends Record<string, any>>(
  log: T,
  valueKey: keyof T
) => Number(log[valueKey]) || 0;

export const getDate = <T extends Record<string, any>>(
  log: T,
  dateKey: keyof T
) => {
  const raw = log[dateKey] as any;
  return raw instanceof Date ? raw : new Date(String(raw));
};

export const normalizeDate = (d: Date) => format(d, 'yyyy-MM-dd');

export const buildWeekData = <T extends Record<string, any>>(
  logs: T[],
  selectedDate: Date,
  valueKey: keyof T,
  dateKey: keyof T
) => {
  const start = startOfWeek(selectedDate, { weekStartsOn: 1 });
  return [...Array(7)].map((_, i) => {
    const day = addDays(start, i);
    const dayLogs = logs.filter(
      (l) => normalizeDate(getDate(l, dateKey)) === normalizeDate(day)
    );
    const total = dayLogs.reduce((acc, l) => acc + getValue(l, valueKey), 0);
    return {
      label: format(day, 'EEEE', { locale: ptBR }).replace(/^\w/, (c) =>
        c.toUpperCase()
      ),
      total,
    };
  });
};

export const buildMonthData = <T extends Record<string, any>>(
  logs: T[],
  selectedDate: Date,
  valueKey: keyof T,
  dateKey: keyof T
) => {
  const start = startOfMonth(selectedDate);
  const end = endOfMonth(selectedDate);
  const totalDays = differenceInDays(end, start) + 1;
  const weeks = Math.ceil(totalDays / 7);

  return [...Array(weeks)].map((_, i) => {
    const weekStart = addDays(start, i * 7);
    const weekEnd = addDays(weekStart, 6);
    const weekLogs = logs.filter((l) => {
      const d = getDate(l, dateKey);
      return d >= weekStart && d <= weekEnd;
    });
    const total = weekLogs.reduce((acc, l) => acc + getValue(l, valueKey), 0);
    const activeDays = new Set(
      weekLogs.map((l) => normalizeDate(getDate(l, dateKey)))
    ).size;
    const avg = activeDays ? Math.round(total / activeDays) : 0;
    return { label: `Semana ${i + 1}`, total: avg };
  });
};

export const buildYearData = <T extends Record<string, any>>(
  logs: T[],
  selectedDate: Date,
  valueKey: keyof T,
  dateKey: keyof T
) => {
  const year = selectedDate.getFullYear();
  return [...Array(12)].map((_, monthIndex) => {
    const monthLogs = logs.filter(
      (l) => getDate(l, dateKey).getMonth() === monthIndex
    );
    const total = monthLogs.reduce((acc, l) => acc + getValue(l, valueKey), 0);
    const daysActive = new Set(
      monthLogs.map((l) => normalizeDate(getDate(l, dateKey)))
    ).size;
    const avg = daysActive ? Math.round(total / daysActive) : 0;
    return {
      label: format(new Date(year, monthIndex, 1), 'MMMM', {
        locale: ptBR,
      }).replace(/^\w/, (c) => c.toUpperCase()),
      total: avg,
    };
  });
};
