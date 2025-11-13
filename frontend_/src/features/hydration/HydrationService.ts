// services/hydration/hydrationService.ts
import { format } from 'date-fns';
import { Service } from '../../share/service';

/**
 * Classe responsável por gerenciar os registros de hidratação do usuário.
 *
 * Inclui métodos para listar hidratações por data e registrar novas entradas.
 */
export class HydrationService extends Service {
  /**
   * Retorna a lista de registros de hidratação do usuário em uma data específica.
   *
   * Args:
   *   date: Data desejada (padrão: dia atual).
   */
  static async list(date: Date = new Date()) {
    const formattedDate = format(date, 'yyyy-MM-dd');
    return this.apiGet(
      `health/hydration/?date=${formattedDate}`,
      'Erro ao buscar registros de hidratação.'
    );
  }

  /**
   * Registra uma nova entrada de hidratação.
   *
   * Args:
   *   data: Objeto contendo os dados da hidratação (ex: quantidade, horário).
   */
  static async create(data: any) {
    return this.apiPost(
      'health/hydration/register/',
      data,
      'Erro ao registrar hidratação.'
    );
  }
}
