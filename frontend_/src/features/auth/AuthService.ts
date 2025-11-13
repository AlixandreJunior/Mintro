import { Service } from '../../share/service';

/**
 * Serviço responsável pela autenticação do usuário.
 *
 * Contém métodos para login e logout, utilizando os endpoints de autenticação da API.
 */
export class AuthService extends Service {
  /**
   * Realiza o login do usuário no sistema.
   *
   * Verifica se o e-mail e a senha foram preenchidos e, em seguida,
   * envia uma requisição para obter os tokens de autenticação.
   *
   * @param {string} email - E-mail do usuário.
   * @param {string} password - Senha do usuário.
   * @returns {Promise<{ access: string; refresh: string }>}
   * Retorna um objeto contendo os tokens `access` e `refresh` em caso de sucesso.
   * @throws {Error} Se algum campo estiver vazio ou ocorrer erro na requisição.
   */
  static async login(email: string, password: string) {
    if (!email.trim() || !password.trim()) {
      throw new Error('Preencha todos os campos.');
    }

    const data = await this.apiPost<{ access: string; refresh: string }>(
      'user/auth/login/',
      { email, password },
      'Erro ao tentar fazer login.'
    );

    return data;
  }

  /**
   * Encerra a sessão do usuário autenticado.
   *
   * Envia uma requisição para invalidar o token de autenticação atual.
   *
   * @returns {Promise<any>} Confirmação do logout bem-sucedido.
   * @throws {Error} Se ocorrer erro ao tentar efetuar logout.
   */
  static async logout() {
    return this.apiPost(
      'user/auth/logout/',
      {},
      'Erro ao tentar fazer logout.'
    );
  }
}
