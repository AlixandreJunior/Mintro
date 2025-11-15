// services/hydration/hydrationService.ts
import { format } from 'date-fns';
import { Service } from '../../share/service';
import { Hydration, HydrationWrite } from '@/share/types/health/hydratation';
import { ResponseSuccess } from '@/share/types/response';

export class HydrationService extends Service {
  static async list(date: Date = new Date()): Promise<Hydration[]> {
    const formattedDate = format(date, 'yyyy-MM-dd');
    return this.apiGet(
      `health/hydration/?date=${formattedDate}`,
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
