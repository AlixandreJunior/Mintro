// services/mindfulness/mindfulnessService.ts
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  format,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Service } from '../../share/service';

type Period = 'week' | 'month';

/**
 * Classe responsável por gerenciar práticas de Mindfulness.
 *
 * Inclui métodos para listar tipos de mindfulness, buscar registros
 * de um período (semana ou mês) e registrar novas práticas.
 */
export class MindfulnessService extends Service {
  /**
   * Retorna a lista de tipos de práticas de mindfulness disponíveis.
   */
  static async list() {
    return Service.apiGet(
      'health/mindfulness/list/',
      'Erro ao buscar lista de mindfulness.'
    );
  }

  /**
   * Retorna os registros de mindfulness dentro de um período específico.
   *
   * Args:
   *   date: Data base para o filtro (padrão: data atual).
   *   period: Tipo de período — "week" ou "month".
   */
  static async listLogs(date: Date = new Date(), period: Period = 'week') {
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

    return Service.apiGet(
      `health/mindfulness/log/list/?start_date=${startDate}&end_date=${endDate}`,
      'Erro ao buscar registros de mindfulness.'
    );
  }

  /**
   * Registra uma nova prática de mindfulness (ex: meditação, respiração).
   *
   * Args:
   *   data: Objeto contendo os dados da prática.
   */
  static async createLog(data: any) {
    return Service.apiPost(
      'health/mindfulness/log/register/',
      data,
      'Erro ao registrar mindfulness.'
    );
  }
}
