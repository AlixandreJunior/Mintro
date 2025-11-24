import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { format } from 'date-fns';

export type Period = 'day' | 'week' | 'month' | 'year';

export function getPeriodRange(
  date: Date = new Date(),
  period: Period = 'week'
) {
  let start: Date = date;
  let end: Date = date;

  switch (period) {
    case 'day':
      start = date;
      end = date;
      break;

    case 'week':
      start = startOfWeek(date, { weekStartsOn: 0, locale: ptBR });
      end = endOfWeek(date, { weekStartsOn: 0, locale: ptBR });
      break;

    case 'month':
      start = startOfMonth(date);
      end = endOfMonth(date);
      break;

    case 'year':
      start = startOfYear(date);
      end = endOfYear(date);
      break;
  }

  return {
    startDate: format(start, 'yyyy-MM-dd'),
    endDate: format(end, 'yyyy-MM-dd'),
  };
}
