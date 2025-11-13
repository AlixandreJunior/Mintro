import api from '../../share/api';
import { Service } from '../../share/service';

export class DiaryService extends Service {
  static async createDiary(data: any) {
    console.log(data);
    try {
      const response = await api.post('diary/diary/create/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Erro ao criar diário:', error);

      // Erro com resposta do servidor
      if (error.response) {
        const serverMessage =
          error.response.data?.detail || JSON.stringify(error.response.data);
        throw new Error(serverMessage);
      }

      // Erro de rede ou outro erro genérico
      throw new Error(error.message || 'Erro desconhecido ao criar diário.');
    }
  }

  static async delete(id: number) {
    try {
      const response = await api.delete(`diary/diary/delete/${id}/`);

      return 'Diario deletado com sucesso.';
    } catch (error: any) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }

      throw new Error('Erro ao tentar buscar diario');
    }
  }

  static async retrieve(id: number) {
    try {
      const response = await api.get(`diary/diary/detail/${id}`);

      const data = response.data;
      return data;
    } catch (error: any) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }

      throw new Error('Erro ao tentar buscar diario');
    }
  }

  getActivities = async () => {
    try {
      const response = await api.get(`diary/activities`);

      const data = response.data;
      return data;
    } catch (error: any) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }

      throw new Error('Erro ao tentar buscar diario');
    }
  };

  static async list(month?: number, year?: number) {
    try {
      const params: Record<string, any> = {};

      if (month) params.month = month;
      if (year) params.year = year;

      const response = await api.get('diary/diary/', {
        params: params,
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        console.warn('Diários não encontrados para o mês/ano especificado.');
        return [];
      }
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Erro ao tentar buscar diário');
    }
  }

  static async update(id: number, data: FormData) {
    return this.apiPatch(`diary/diary/update/${id}/`, data);
  }
}
