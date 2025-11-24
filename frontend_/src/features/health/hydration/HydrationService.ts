// services/hydration/hydrationService.ts
import { format } from 'date-fns';
import { Service } from '../../../share/service';
import { Hydration, HydrationWrite } from '@/share/types/health/hydratation';
import { ResponseSuccess } from '@/share/types/response';
import { getPeriodRange, Period } from '@/share/utils/getPeriodRange';
import { da } from 'date-fns/locale';

export class HydrationService extends Service {
  static async list(date: Date, period: Period): Promise<Hydration[]> {
    const { startDate, endDate } = getPeriodRange(date, period);

    return this.apiGet(
      `health/hydration/list/?start_date=${startDate}&end_date=${endDate}`,
      'Erro ao buscar registros de hidratação.'
    );
  }

  static async create(data: HydrationWrite): Promise<ResponseSuccess> {
    return this.apiPost(
      'health/hydration/register/',
      data,
      'Erro ao registrar hidratação.'
    );
  }
}
