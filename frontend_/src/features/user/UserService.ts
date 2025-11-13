import { Service } from '../../share/service';

/**
Classe responsável por operações relacionadas ao usuário.
Inclui criação, busca e atualização do perfil.
*/
export class UserService extends Service {
  /**
  Cria um novo usuário.

  Recebe nome de usuário, e-mail e senha, valida os campos e envia os dados
  para o endpoint de criação. Lança erro se algum campo obrigatório estiver vazio.
  */
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

  /**
  Busca os dados do usuário autenticado.

  Faz uma requisição para obter as informações do usuário logado.
  */
  static async retrieve() {
    return this.apiGet('user/', 'Erro ao tentar buscar usuário.');
  }

  /**
  Atualiza os dados do usuário.

  Recebe um objeto com os campos a serem atualizados (como nome, e-mail ou senha)
  e envia para o endpoint de atualização.
  */
  static async update(data: any) {
    return this.apiPatch(
      'user/update/',
      data,
      'Erro ao tentar atualizar usuário.'
    );
  }
}
