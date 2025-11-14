import { Service } from '../../share/service';

export class ReminderService extends Service {
  static async list() {
    return this.apiGet('user/reminder/list/', 'Erro ao listar lembretes.');
  }

  static async retrieve(id: number) {
    return this.apiGet(
      `user/reminder/detail/${id}/`,
      'Erro ao buscar lembrete.'
    );
  }

  static async create(data: any) {
    return this.apiPost(
      'user/reminder/create/',
      data,
      'Erro ao criar lembrete.'
    );
  }

  static async update(id: number, data: any) {
    return this.apiPatch(
      `user/reminder/update/${id}/`,
      data,
      'Erro ao atualizar lembrete.'
    );
  }

  static async delete(id: number) {
    return this.apiDelete(
      `user/reminder/delete/${id}/`,
      'Erro ao deletar lembrete.'
    );
  }
}
