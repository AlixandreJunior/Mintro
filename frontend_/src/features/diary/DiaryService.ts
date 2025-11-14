import { Service } from '../../share/service';

export class DiaryService extends Service {
  static async listActivities() {
    return this.apiGet('diary/activities');
  }

  static async retrieve(id: number) {
    return this.apiGet(
      `diary/diary/detail/${id}`,
      'Erro ao tentar buscar diario'
    );
  }

  static async list(month?: number, year?: number) {
    return this.apiGet(
      `diary/diary/?month=${month}&year=${year}`,
      'Erro ao tentar buscar diário'
    );
  }
  static async create(data: any) {
    return this.apiPost('diary/diary/create/', data, 'Erro ao criar diario.');
  }

  static async delete(id: number) {
    return this.apiDelete(
      `diary/diary/delete/${id}/`,
      'Erro ao tentar buscar diario'
    );
  }

  static async update(id: number, data: FormData) {
    return this.apiPatch(`diary/diary/update/${id}/`, data, 'Erro ');
  }
}
