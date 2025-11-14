import { Service } from '../../share/service';

export class ObjectiveService extends Service {
  static async list() {
    return this.apiGet('diary/objective/list/', 'Erro ao listar Objetivos.');
  }

  static async retrieve(id: number) {
    return this.apiGet(
      `diary/objective/detail/${id}/`,
      'Erro ao pegar dados de objetivos'
    );
  }

  static async create(data: any) {
    return this.apiPost(
      'diary/objective/create/',
      data,
      'Erro ao criar objetivo.'
    );
  }

  static async delete(id: number) {
    return this.apiDelete(
      `diary/objective/delete/${id}/`,
      'Erro ao deletar objetivos.'
    );
  }

  static async update(id: number, data: any) {
    return this.apiPatch(
      `diary/objective/update/${id}/`,
      data,
      'Erro ao tentar atualizar objetivo'
    );
  }
}
