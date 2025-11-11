import api from '../api';

export const updateDiary = async (id: number, data: FormData) => {
  try {
    const response = await api.patch(`diary/diary/update/${id}/`, data);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw new Error('Erro ao tentar atualizar usuário.');
  }
};
