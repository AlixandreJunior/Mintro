import { format, isToday, isYesterday } from 'date-fns';
import { ExerciseLog } from '../types/health/exercise';
import { MindfulnessLog } from '../types/health/mindfulness';
import { ptBR } from 'date-fns/locale';

export const parseDate = (log: any) => new Date(log.datetime ?? log.date);

export const getName = (log: any, isExercise: boolean) =>
  log?.exercise?.name ||
  log?.mindfulness?.name ||
  log?.description ||
  (isExercise ? 'Exercício' : 'Mindfulness');

export const getDetails = (
  log: ExerciseLog | MindfulnessLog,
  isExerciseLog: (log: ExerciseLog | MindfulnessLog) => log is ExerciseLog
) => {
  if (isExerciseLog(log)) {
    const dist = log.distance ? `${log.distance}km` : '';
    const dur = log.duration ? `${log.duration}min` : '';
    return [dist, dur].filter(Boolean).join(' - ');
  }
  return `${log.duration || 0} min`;
};

export const dayLabel = (d: Date) => {
  if (isToday(d)) return 'Hoje';
  if (isYesterday(d)) return 'Ontem';
  return format(d, "dd 'de' MMMM", { locale: ptBR });
};
