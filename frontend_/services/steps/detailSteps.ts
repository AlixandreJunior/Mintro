import api from '../api';

export const getStepsDetail = async (date: string) => {
  try {
    const response = await api.get('health/steps/detail/', {
      params: { date }, // envia como query param
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw new Error('Erro ao tentar buscar detalhes dos passos');
  }
};
