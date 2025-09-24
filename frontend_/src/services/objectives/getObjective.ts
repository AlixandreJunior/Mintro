import api from '../api';

export const getObjective = async (id: number) => {
  try {
    const response = await api.get(`diary/objective/detail/${id}/`);

    const data = response.data;
    return data;
  } catch (error: any) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }

    throw new Error('Erro ao tentar buscar objetivo');
  }
};
