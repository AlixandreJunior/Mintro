import { Service } from '../../share/service';

export class StepsService extends Service {
  static async list(): Promise<any> {
    return this.apiGet(
      'health/steps/list/',
      'Erro ao tentar registros de passos'
    );
  }

  static async create(data: any): Promise<any> {
    return this.apiPost('health/steps/register/', data);
  }
}
