import { Service } from '../../share/service';

export class UserService extends Service {
  static async create(username: string, email: string, password: string) {
    if (!username.trim() || !email.trim()) {
      throw new Error('Preencha todos os campos.');
    }

    return this.apiPost(
      'user/create/',
      { username, email, password },
      'Erro ao tentar criar usuário.'
    );
  }

  static async retrieve() {
    return this.apiGet('user/', 'Erro ao tentar buscar usuário.');
  }

  static async update(data: any) {
    return this.apiPatch(
      'user/update/',
      data,
      'Erro ao tentar atualizar usuário.'
    );
  }
}
