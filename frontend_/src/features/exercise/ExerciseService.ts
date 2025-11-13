import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Service } from '../../share/service';
import { ExerciseLog } from '@/share/types/health/exercise';

export class ExerciseService extends Service {
  static async list() {
    this.apiGet(
      'health/exercise/list/',
      'Erro ao tentar buscar lista de exercícios.'
    );
  }

  /*
  Retorna os logs de exercícios com base em uma data e um período (semana ou mês).
  O período padrão é "semana" e a data padrão é o dia atual.
*/
  static async listLog(
    date: Date = new Date(),
    period: 'week' | 'month' = 'week'
  ) {
    const start =
      period === 'week'
        ? startOfWeek(date, { weekStartsOn: 0, locale: ptBR })
        : startOfMonth(date);

    const end =
      period === 'week'
        ? endOfWeek(date, { weekStartsOn: 0, locale: ptBR })
        : endOfMonth(date);

    const startDate = format(start, 'yyyy-MM-dd');
    const endDate = format(end, 'yyyy-MM-dd');

    return this.apiGet(
      `health/exercise/log/list/?start_date=${startDate}&end_date=${endDate}`,
      'Erro ao buscar logs de exercícios.'
    );
  }

  /*
  Registra um novo log de exercício no servidor.
*/
  static async createLog(data: any): Promise<void> {
    this.apiPost(
      'health/exercise/log/register/',
      data,
      'Erro ao registrar exercício.'
    );
  }
}
