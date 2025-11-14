import { Service } from '../../share/service';

export class AuthService extends Service {
  static async signUp(username: string, email: string, password: string) {
    return this.apiPost(
      'user/create/',
      { username, email, password },
      'Erro ao tentar criar usuário.'
    );
  }

  static async login(email: string, password: string) {
    return this.apiPost<{ access: string; refresh: string }>(
      'user/auth/login/',
      { email, password },
      'Erro ao tentar fazer login.'
    );
  }

  static async logout() {
    return this.apiPost(
      'user/auth/logout/',
      {},
      'Erro ao tentar fazer logout.'
    );
  }
}
