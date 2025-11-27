import axios, { AxiosRequestConfig } from 'axios';
import api from './api';

export class Service {
  static handleError(error: unknown, fallback = 'Erro inesperado') {
    if (axios.isAxiosError(error)) {
      // Se vier um objeto do backend, lança diretamente
      if (error.response?.data && typeof error.response.data === 'object') {
        throw error.response.data;
      }

      // fallback para mensagens gerais
      const msg =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message ||
        fallback;
      throw { non_field_errors: [msg] };
    }

    throw { non_field_errors: [fallback] };
  }

  static isFormData(data: any): data is FormData {
    return data instanceof FormData;
  }

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

  static apiGet<T>(url: string, msg?: string) {
    return this.request<T>('get', url, undefined, undefined, msg);
  }

  static apiPost<T>(url: string, data: any, msg?: string) {
    return this.request<T>('post', url, data, undefined, msg);
  }

  static apiPatch<T>(url: string, data: any, msg?: string) {
    return this.request<T>('patch', url, data, undefined, msg);
  }

  static apiDelete<T>(url: string, msg?: string) {
    return this.request<T>('delete', url, undefined, undefined, msg);
  }
}
