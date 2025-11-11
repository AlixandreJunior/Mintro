import api from '../api';

export const getStepsList = async () => {
  try {
    const response = await api.get('health/steps/list/');

    const data = response.data;
    return data;
  } catch (error: any) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }

    throw new Error('Erro ao tentar buscar diario');
  }
};
