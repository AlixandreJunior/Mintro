import { Service } from '@/share/service';
import { Objective } from '@/share/types/mental/objectives';
import { ResponseSuccess } from '@/share/types/response';

export class ObjectiveService extends Service {
  static async list(): Promise<Objective[]> {
    return this.apiGet('diary/objective/list/', 'Erro ao listar Objetivos.');
  }

  static async retrieve(id: number): Promise<Objective> {
    return this.apiGet(
      `diary/objective/detail/${id}/`,
      'Erro ao pegar dados de objetivos'
    );
  }

  static async create(data: any): Promise<ResponseSuccess> {
    return this.apiPost(
      'diary/objective/create/',
      data,
      'Erro ao criar objetivo.'
    );
  }

  static async delete(id: number): Promise<ResponseSuccess> {
    return this.apiDelete(
      `diary/objective/delete/${id}/`,
      'Erro ao deletar objetivos.'
    );
  }

  static async update(id: number, data: any): Promise<ResponseSuccess> {
    return this.apiPatch(
      `diary/objective/update/${id}/`,
      data,
      'Erro ao tentar atualizar objetivo'
    );
  }
}
