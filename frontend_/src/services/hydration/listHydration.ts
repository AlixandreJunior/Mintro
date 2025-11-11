// services/hydratation/listHydratation.ts
import api from '../api';
import { format } from 'date-fns'; // Apenas o format é necessário aqui

export const getHydratationList = async (
  date: Date = new Date()
): Promise<any> => {
  try {
    const formattedDate = format(date, 'yyyy-MM-dd'); // Data no formato YYYY-MM-DD
    const response = await api.get('health/hydration/', {
      params: { date: formattedDate },
    });
    return response.data;
  } catch (error: any) {
    console.log('Erro na API de Hidratação:', error);
    return [];
  }
};
