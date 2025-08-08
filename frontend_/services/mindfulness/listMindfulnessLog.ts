import api from '../api';
import { MindfulnessLog } from '@/types/health/mindfulness';
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  format,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

type Period = 'week' | 'month';

export const getMindfulnessList = async (
  date: Date = new Date(),
  period: Period = 'month'
): Promise<MindfulnessLog[]> => {
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

    const response = await api.get<MindfulnessLog[]>(
      'health/mindfulness/log/',
      {
        params: {
          start_date: startDate,
          end_date: endDate,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Erro na API de Mindfulness:', error);
    return [];
  }
};
