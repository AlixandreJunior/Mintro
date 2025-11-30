import { differenceInDays, startOfMonth, endOfMonth } from 'date-fns';

export type PeriodMode = 'day' | 'week' | 'month' | 'year';

interface BuildDashboardOptions<T> {
  logs: T[];
  mode: PeriodMode;
  goal: number;
  valueKey: keyof T;
  dateKey: keyof T;
  selectedDate: Date;
}

export function buildDashboardSummary<T>({
  logs,
  mode,
  goal,
  valueKey,
  dateKey,
  selectedDate,
}: BuildDashboardOptions<T>) {
  if (!logs.length) {
    return {
      value: 0,
      progress: 0,
      label: 'Nenhum registro no período',
    };
  }

  const total = logs.reduce((sum, item) => {
    const v = Number(item[valueKey]);
    return sum + (isNaN(v) ? 0 : v);
  }, 0);

  let daysInPeriod = 1;

  switch (mode) {
    case 'day':
      daysInPeriod = 1;
      break;

    case 'week':
      daysInPeriod = 7;
      break;

    case 'month': {
      const start = startOfMonth(selectedDate);
      const end = endOfMonth(selectedDate);
      daysInPeriod = differenceInDays(end, start) + 1;
      break;
    }

    case 'year':
      daysInPeriod = 365;
      break;
  }

  const avg = total / daysInPeriod;

  const progress = goal > 0 ? Math.min(1, avg / goal) : 0;

  let label = '';
  let value = avg;

  switch (mode) {
    case 'day': {
      const remaining = Math.max(0, goal - total);
      label = `Faltam ${remaining.toLocaleString(
        'pt-BR'
      )} para atingir sua meta diária`;
      value = total;
      break;
    }
    case 'week':
      label = `Média diária: ${avg.toLocaleString('pt-BR')}`;
      value = avg;
      break;
    case 'month':
      label = `Média diária no mês: ${avg.toLocaleString('pt-BR')}`;
      value = avg;
      break;
    case 'year':
      label = `Média diária no ano: ${avg.toLocaleString('pt-BR')}`;
      value = avg;
      break;
  }

  return {
    value,
    progress,
    label,
  };
}
