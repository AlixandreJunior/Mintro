import { Service } from '../../share/service';

/**
 * Serviço responsável por lidar com registros de passos do usuário.
 */
export class StepsService extends Service {
  /**
   * Busca todos os registros de passos.
   */
  static async listStepsLog() {
    return this.apiGet(
      'health/steps/list/',
      'Erro ao tentar registros de passos'
    );
  }

  /**
   * Cria um novo registro de passos.
   */
  static async createStepsLog(data: any) {
    return this.apiPost('health/steps/register/', data);
  }
}
