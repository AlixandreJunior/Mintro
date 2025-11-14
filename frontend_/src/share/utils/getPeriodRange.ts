import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  format,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

export type Period = 'week' | 'month';

export function getPeriodRange(
  date: Date = new Date(),
  period: Period = 'week'
) {
  const start =
    period === 'week'
      ? startOfWeek(date, { weekStartsOn: 0, locale: ptBR })
      : startOfMonth(date);

  const end =
    period === 'week'
      ? endOfWeek(date, { weekStartsOn: 0, locale: ptBR })
      : endOfMonth(date);

  return {
    startDate: format(start, 'yyyy-MM-dd'),
    endDate: format(end, 'yyyy-MM-dd'),
  };
}
