import api from '../api';
import { Diary } from '@/src/types/mental/diary';

export const deleteDiary = async (id: number) => {
  try {
    const response = await api.delete(`diary/diary/detail/${id}/delete/`);

    return 'Diario deletado com sucesso.';
  } catch (error: any) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }

    throw new Error('Erro ao tentar buscar diario');
  }
};
