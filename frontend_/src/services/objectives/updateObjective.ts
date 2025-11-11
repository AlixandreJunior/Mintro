import api from '../api';

export const updateObjective = async (id: number, updateData: object) => {
  try {
    const response = await api.patch(
      `diary/objective/update/${id}/`,
      updateData
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      // Retorna mensagem detalhada de erro se disponível
      throw new Error(
        typeof error.response.data === 'string'
          ? error.response.data
          : JSON.stringify(error.response.data)
      );
    }

    throw new Error('Erro ao tentar atualizar objetivo');
  }
};
