import api from '../api';
import {
  MindfulnessLog,
  MindfulnessLogWrite,
} from '@/src/types/health/mindfulness';

export const registerMindfulnessLog = async (data: MindfulnessLogWrite) => {
  try {
    const response = await api.post('health/mindfulness/log/register/', data);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw new Error('Erro ao tentar atualizar usuário.');
  }
};
