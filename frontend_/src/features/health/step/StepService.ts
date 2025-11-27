import { getPeriodRange } from '@/share/utils/getPeriodRange';
import { Service } from '../../../share/service';
import { StepWrite } from '@/share/types/health/steps';

export class StepsService extends Service {
  static async list(
    date: Date,
    period: 'day' | 'week' | 'month' | 'year'
  ): Promise<any> {
    const { startDate, endDate } = getPeriodRange(date, period);

    return this.apiGet(
      `health/step/list/?start_date=${startDate}&end_date=${endDate}`,
      'Erro ao tentar registros de passos'
    );
  }

  static async create(data: StepWrite): Promise<any> {
    return this.apiPost('health/step/register/', data);
  }
}
