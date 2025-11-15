import { getPeriodRange, Period } from '@/share/utils/getPeriodRange';
import { Service } from '../../share/service';
import {
  Exercise,
  ExerciseLog,
  ExerciseLogWrite,
} from '@/share/types/health/exercise';
import { ResponseSuccess } from '@/share/types/response';

export class ExerciseService extends Service {
  static async list(): Promise<Exercise[]> {
    return await this.apiGet(
      'health/exercise/list/',
      'Erro ao tentar buscar lista de exercícios.'
    );
  }

  static async listLog(
    date: Date = new Date(),
    period: Period = 'week'
  ): Promise<ExerciseLog[]> {
    const { startDate, endDate } = getPeriodRange(date, period);
    return await this.apiGet(
      `health/exercise/log/list/?start_date=${startDate}&end_date=${endDate}`,
      'Erro ao buscar logs de exercícios.'
    );
  }

  static async createLog(data: ExerciseLogWrite): Promise<ResponseSuccess> {
    return await this.apiPost(
      'health/exercise/log/register/',
      data,
      'Erro ao registrar exercício.'
    );
  }
}
