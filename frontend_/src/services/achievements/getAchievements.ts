import api from '../api';

export const getAchievements = async () => {
  try {
    const response = await api.get('user/achievements/');
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw new Error('Erro ao tentar buscar conquistas');
  }
};
