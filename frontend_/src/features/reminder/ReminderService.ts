import { Service } from '../../share/service';

/**
 * Classe responsável por gerenciar os lembretes do usuário.
 *
 * Inclui métodos para listar, buscar, criar, atualizar e deletar lembretes.
 */
export class ReminderService extends Service {
  /**
   * Lista todos os lembretes do usuário.
   *
   * Retorna uma lista com todos os lembretes cadastrados.
   */
  static async list() {
    return this.apiGet('user/reminder/list/', 'Erro ao listar lembretes.');
  }

  /**
   * Busca os detalhes de um lembrete específico.
   *
   * @param id - ID do lembrete.
   */
  static async retrieve(id: number) {
    return this.apiGet(
      `user/reminder/detail/${id}/`,
      'Erro ao buscar lembrete.'
    );
  }

  /**
   * Cria um novo lembrete.
   *
   * @param data - Dados do lembrete (ex: título, data, descrição).
   */
  static async create(data: any) {
    return this.apiPost(
      'user/reminder/create/',
      data,
      'Erro ao criar lembrete.'
    );
  }

  /**
   * Atualiza um lembrete existente.
   *
   * @param id - ID do lembrete.
   * @param data - Novos dados do lembrete.
   */
  static async update(id: number, data: any) {
    return this.apiPatch(
      `user/reminder/update/${id}/`,
      data,
      'Erro ao atualizar lembrete.'
    );
  }

  /**
   * Exclui um lembrete.
   *
   * @param id - ID do lembrete.
   */
  static async delete(id: number) {
    return this.apiDelete(
      `user/reminder/delete/${id}/`,
      'Erro ao deletar lembrete.'
    );
  }
}
