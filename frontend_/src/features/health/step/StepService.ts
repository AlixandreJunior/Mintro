import { Service } from '../../../share/service';

export class StepsService extends Service {
  static async list(
    date: string,
    period: 'day' | 'week' | 'month' | 'year'
  ): Promise<any> {
    return this.apiGet(
      'health/step/list/?date=' + date + '&period=' + period,
      'Erro ao tentar registros de passos'
    );
  }

  static async create(data: any): Promise<any> {
    return this.apiPost('health/step/register/', data);
  }
}
