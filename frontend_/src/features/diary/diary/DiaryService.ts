import { Service } from '@/share/service';
import { Diary } from '@/share/types/mental/diary';
import { ResponseSuccess } from '@/share/types/response';
import { getPeriodRange } from '@/share/utils/getPeriodRange';

export class DiaryService extends Service {
  static async listActivities() {
    return this.apiGet('diary/activities');
  }

  static async retrieve(id: number): Promise<Diary> {
    return this.apiGet(
      `diary/diary/detail/${id}`,
      'Erro ao tentar buscar diario'
    );
  }

  static async list(date: Date): Promise<Diary[]> {
    const { startDate, endDate } = getPeriodRange(date, 'month');
    return this.apiGet(
      `diary/diary/?start_date=${startDate}&end_date=${endDate}`,
      'Erro ao tentar buscar diário'
    );
  }
  static async create(data: any): Promise<ResponseSuccess> {
    return this.apiPost('diary/diary/create/', data, 'Erro ao criar diario.');
  }

  static async delete(id: number): Promise<ResponseSuccess> {
    return this.apiDelete(
      `diary/diary/delete/${id}/`,
      'Erro ao tentar buscar diario'
    );
  }

  static async update(id: number, data: FormData): Promise<ResponseSuccess> {
    return this.apiPatch(`diary/diary/update/${id}/`, data, 'Erro ');
  }
}
