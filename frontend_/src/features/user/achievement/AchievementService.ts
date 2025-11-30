import { Achievement, AchievementLog } from '@/share/types/user/achievements';
import { Service } from '../../../share/service';

export class AchievementService extends Service {
  static async list(): Promise<Achievement[]> {
    return await this.apiGet(
      'user/achievements/',
      'Erro ao tentar buscar conquistas'
    );
  }

  static async retrieve(id: number): Promise<Achievement> {
    return await this.apiGet(
      `user/achievements/${id}/`,
      'Erro ao tentar buscar detalhe da conquista'
    );
  }

  static async retrieveLog(pk: number): Promise<AchievementLog> {
    return await this.apiGet(
      `user/achievements/log/${pk}/`,
      'Erro ao tentar buscar detalhe do log de conquista'
    );
  }

  static async listLog(): Promise<AchievementLog[]> {
    return await this.apiGet(
      'user/achievements/log/',
      'Erro ao tentar buscar conquistas do usuário'
    );
  }
}
