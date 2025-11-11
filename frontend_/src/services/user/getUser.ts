import api from '../api';

export const getUser = async () => {
  try {
    const response = await api.get<any>('user/');

    const data = response.data;
    return data;
  } catch (error: any) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }

    throw new Error('Erro ao tentar buscar usuario');
  }
};
