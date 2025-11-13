import { Achievement, AchievementLog } from '@/share/types/user/achievements';
import { Service } from '../../share/service';

/**
 * Serviço responsável por gerenciar as conquistas (achievements) do usuário.
 *
 * Fornece métodos para listar, detalhar e consultar os logs de conquistas.
 */
export class AchievementService extends Service {
  /**
   * Lista todas as conquistas disponíveis no sistema.
   *
   * @returns {Promise<any>} Uma promessa contendo a lista de conquistas.
   * @throws {Error} Lança erro se a requisição falhar.
   */
  static async list(): Promise<Achievement[]> {
    return this.apiGet(
      'user/achievements/',
      'Erro ao tentar buscar conquistas'
    );
  }

  /**
   * Busca os detalhes de uma conquista específica com base no seu ID.
   *
   * @param {number} id - O ID da conquista a ser buscada.
   * @returns {Promise<any>} Uma promessa contendo os detalhes da conquista.
   * @throws {Error} Lança erro se a requisição falhar.
   */
  static async retrieve(id: number): Promise<Achievement> {
    return this.apiGet(
      `user/achievements/${id}/`,
      'Erro ao tentar buscar detalhe da conquista'
    );
  }

  /**
   * Busca os detalhes de um log de conquista obtido pelo usuário.
   *
   * @param {number} pk - A chave primária (ID) do log de conquista.
   * @returns {Promise<any>} Uma promessa contendo os detalhes do log.
   * @throws {Error} Lança erro se a requisição falhar.
   */
  static async retrieveLog(pk: number): Promise<AchievementLog> {
    return this.apiGet(
      `user/achievements/log/${pk}/`,
      'Erro ao tentar buscar detalhe do log de conquista'
    );
  }

  /**
   * Lista todas as conquistas que o usuário já obteve.
   *
   * @returns {Promise<any>} Uma promessa contendo os logs de conquistas do usuário.
   * @throws {Error} Lança erro se a requisição falhar.
   */
  static async listLog(): Promise<AchievementLog[]> {
    return this.apiGet(
      'user/achievements/log/',
      'Erro ao tentar buscar conquistas do usuário'
    );
  }
}
