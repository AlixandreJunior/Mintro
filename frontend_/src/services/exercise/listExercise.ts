import api from '../api';

export const getExerciseList = async () => {
  try {
    const response = await api.get('health/exercise/list/');

    const data = response.data;
    return data;
  } catch (error: any) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }

    throw new Error('Erro ao tentar buscar diario');
  }
};
