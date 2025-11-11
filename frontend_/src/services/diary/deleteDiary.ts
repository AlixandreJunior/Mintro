import api from '../api';

export const deleteDiary = async (id: number) => {
  try {
    const response = await api.delete(`diary/diary/delete/${id}/`);

    return 'Diario deletado com sucesso.';
  } catch (error: any) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }

    throw new Error('Erro ao tentar buscar diario');
  }
};
