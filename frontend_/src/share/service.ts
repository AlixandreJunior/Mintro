import axios, { AxiosRequestConfig } from 'axios';
import api from './api';

/**
 * Classe utilitária para centralizar todas as requisições e tratamentos de API.
 */
export class Service {
  /**
   * Trata erros da API e lança uma mensagem amigável.
   */
  static handleError(error: unknown, fallback = 'Erro inesperado') {
    if (axios.isAxiosError(error)) {
      const msg =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message ||
        fallback;
      throw new Error(msg);
    }
    throw new Error(fallback);
  }

  /**
   * Verifica se o dado é uma instância de FormData.
   */
  static isFormData(data: any): data is FormData {
    return data instanceof FormData;
  }

  /**
   * Cria a configuração de cabeçalhos da requisição.
   * Adiciona automaticamente o header `multipart/form-data` quando necessário.
   */
  static buildConfig(
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosRequestConfig {
    return {
      ...config,
      headers: {
        ...(this.isFormData(data)
          ? { 'Content-Type': 'multipart/form-data' }
          : {}),
        ...config?.headers,
      },
    };
  }

  /**
   * Executa uma requisição genérica à API, com tratamento de erro centralizado.
   */
  static async request<T>(
    method: 'get' | 'post' | 'patch' | 'delete',
    url: string,
    dataOrConfig?: any,
    maybeConfig?: AxiosRequestConfig,
    fallbackMessage?: string
  ): Promise<T> {
    try {
      const args =
        method === 'get' || method === 'delete'
          ? [url, dataOrConfig]
          : [url, dataOrConfig, this.buildConfig(dataOrConfig, maybeConfig)];

      const response = await (api[method] as any)(...args);
      return response.data;
    } catch (error) {
      this.handleError(error, fallbackMessage);
      throw error;
    }
  }

  /**
   * Faz uma requisição GET.
   */
  static apiGet<T>(url: string, msg?: string) {
    return this.request<T>('get', url, undefined, undefined, msg);
  }

  /**
   * Faz uma requisição POST.
   */
  static apiPost<T>(url: string, data: any, msg?: string) {
    return this.request<T>('post', url, data, undefined, msg);
  }

  /**
   * Faz uma requisição PATCH.
   */
  static apiPatch<T>(url: string, data: any, msg?: string) {
    return this.request<T>('patch', url, data, undefined, msg);
  }

  /**
   * Faz uma requisição DELETE.
   */
  static apiDelete<T>(url: string, msg?: string) {
    return this.request<T>('delete', url, undefined, undefined, msg);
  }
}
