// services/mindfulness/mindfulnessService.ts
import { getPeriodRange, Period } from '@/share/utils/getPeriodRange';
import { Service } from '../../../share/service';
import { ResponseSuccess } from '@/share/types/response';
import {
  Mindfulness,
  MindfulnessLog,
  MindfulnessLogWrite,
} from '@/share/types/health/mindfulness';

export class MindfulnessService extends Service {
  static async list(): Promise<Mindfulness[]> {
    return Service.apiGet(
      'health/mindfulness/list/',
      'Erro ao buscar lista de mindfulness.'
    );
  }

  static async listLogs(
    date: Date,
    period: Period = 'week'
  ): Promise<MindfulnessLog[]> {
    const { startDate, endDate } = getPeriodRange(date, period);
    return Service.apiGet(
      `health/mindfulness/log/list/?start_date=${startDate}&end_date=${endDate}`,
      'Erro ao buscar registros de mindfulness.'
    );
  }

  static async createLog(data: MindfulnessLogWrite): Promise<ResponseSuccess> {
    return Service.apiPost(
      'health/mindfulness/log/register/',
      data,
      'Erro ao registrar mindfulness.'
    );
  }

  static async deleteLog(id: number): Promise<ResponseSuccess> {
    return await this.apiDelete(`health/mindfulness/log/delete/${id}/`);
  }

  static async updateLog(
    id: number,
    data: MindfulnessLogWrite
  ): Promise<ResponseSuccess> {
    return await this.apiPatch(
      `health/mindfulness/log/update/${id}/`,
      data,
      'Erro ao registrar exercício.'
    );
  }
}
