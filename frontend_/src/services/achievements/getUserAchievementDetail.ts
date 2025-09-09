import { AchievementLog } from '@/src/types/user/achievements';
import api from '../api';

export const getUserAchievementLogDetail = async (pk: number) => {
  try {
    const response = await api.get<AchievementLog>(
      `user/achievements/user/${pk}/`
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw new Error('Erro ao tentar buscar detalhe do log de conquista');
  }
};
