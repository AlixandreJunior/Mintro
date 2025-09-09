import api from '../api';

export const deleteObjective = async (id: number) => {
  try {
    const response = await api.delete(`diary/objective/detail/${id}/delete/`);

    return 'Objetivo deletado com sucesso.';
  } catch (error: any) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }

    throw new Error('Erro ao tentar buscar objetivo');
  }
};
