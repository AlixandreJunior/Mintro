import api from '../api';

export const getDiary = async (id: number) => {
  try {
    const response = await api.get(`diary/diary/detail/${id}`);

    const data = response.data;
    return data;
  } catch (error: any) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }

    throw new Error('Erro ao tentar buscar diario');
  }
};
