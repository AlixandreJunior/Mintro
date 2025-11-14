// services/mindfulness/mindfulnessService.ts
import { getPeriodRange, Period } from '@/share/utils/getPeriodRange';
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
    const { startDate, endDate } = getPeriodRange(date, period);
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
