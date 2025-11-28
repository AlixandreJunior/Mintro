import { Service } from '../../../share/service';

export class UserService extends Service {
  static async retrieve(): Promise<any> {
    return this.apiGet('user/', 'Erro ao tentar buscar usuário.');
  }

  static async update(data: any): Promise<any> {
    return this.apiPatch(
      'user/update/',
      data,
      'Erro ao tentar atualizar usuário.'
    );
  }
}
