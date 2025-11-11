import api from '../api';

export const getAchievementDetail = async (pk: number) => {
  try {
    const response = await api.get(`user/achievements/${pk}/`);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw new Error('Erro ao tentar buscar detalhe da conquista');
  }
};
