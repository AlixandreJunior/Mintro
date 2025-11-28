import { startOfWeek, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const LETTERS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

export function buildWeekDaysDisplay(date: Date, logs: any[]) {
  const start = startOfWeek(date, { weekStartsOn: 0, locale: ptBR });

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });

  return weekDays.map((day, idx) => ({
    id: LETTERS[idx],
    letter: LETTERS[idx],
    date: day,
    exercised: logs.some((log) => isSameDay(new Date(log.datetime), day)),
  }));
}
