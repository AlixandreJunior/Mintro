import api from '../api';

export const updateUser = async (data: any) => {
  try {
    const response = await api.patch('user/update/', data);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw new Error('Erro ao tentar atualizar usuário.');
  }
};
