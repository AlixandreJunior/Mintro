import { Service } from '../../share/service';

export class StepsService extends Service {
  static async list() {
    return this.apiGet(
      'health/steps/list/',
      'Erro ao tentar registros de passos'
    );
  }

  static async create(data: any) {
    return this.apiPost('health/steps/register/', data);
  }
}
