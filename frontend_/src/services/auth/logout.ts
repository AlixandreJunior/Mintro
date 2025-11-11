import { useAuth } from '@/context/AuthContext';
import api from '../api';

export interface createAccountResponse {
  detail: string;
}

export const logout = async () => {
  try {
    const response = await api.post<createAccountResponse>(
      'user/auth/logout/',
      {}
    );

    const data = response.data;
    return data;
  } catch (error: any) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }

    throw new Error('Erro ao tentar criar usuario');
  }
};
