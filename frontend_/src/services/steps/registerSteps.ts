import api from '../api';

export const registerStepsLog = async (data: any) => {
  try {
    const response = await api.post('health/steps/register/', data);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw new Error('Erro ao tentar atualizar passos.');
  }
};
