import { ExerciseLog } from '@/types/health/exercise';
import api from '../api';
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  format,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

type Period = 'week' | 'month';

export const getExerciseLogs = async (
  date: Date = new Date(),
  period: Period = 'week'
): Promise<ExerciseLog[]> => {
  try {
    let startDate: string;
    let endDate: string;

    if (period === 'week') {
      startDate = format(
        startOfWeek(date, { weekStartsOn: 0, locale: ptBR }),
        'yyyy-MM-dd'
      );
      endDate = format(
        endOfWeek(date, { weekStartsOn: 0, locale: ptBR }),
        'yyyy-MM-dd'
      );
    } else {
      startDate = format(startOfMonth(date), 'yyyy-MM-dd');
      endDate = format(endOfMonth(date), 'yyyy-MM-dd');
    }

    const response = await api.get<ExerciseLog[]>('physical/exercise/log/', {
      params: {
        start_date: startDate,
        end_date: endDate,
      },
    });

    return response.data;
  } catch (error: any) {
    console.log('Erro na API de Exercício:', error);
    return [];
  }
};
