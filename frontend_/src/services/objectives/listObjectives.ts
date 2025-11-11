import api from '../api';

export const getObjectiveList = async (): Promise<any> => {
  try {
    const response = await api.get('diary/objective/list/');

    const data = response.data;
    return data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.warn('Nenhum objetivo encontrado.');
      return [];
    }
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw new Error('Erro ao tentar buscar objetivos');
  }
};
