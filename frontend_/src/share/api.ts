import axios, { AxiosRequestConfig, AxiosError, AxiosInstance } from 'axios';

/**
 * URL base da API.
 * Altere conforme o ambiente (desenvolvimento, staging, produção).
 */
const apiUrl = 'http://192.168.1.5:8000/';

/**
 * Instância principal do Axios usada para todas as chamadas à API.
 * - Define o tempo limite padrão (10 segundos)
 * - Usa interceptores para autenticação e conquistas
 */
const api: AxiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
});

console.log('API URL:', apiUrl);

/* ============================================================
 * 🔹 HANDLERS DE AUTENTICAÇÃO
 * ============================================================
 */

let onLogout: (() => void) | null = null;
let getTokens:
  | (() => Promise<{ access: string | null; refresh: string | null }>)
  | null = null;
let saveTokens: ((access: string, refresh: string) => Promise<void>) | null =
  null;

/**
 * Define as funções usadas para gerenciar autenticação.
 *
 * Exemplo de uso:
 * setAuthHandlers({
 *   onLogout: () => logoutUser(),
 *   getTokens: async () => ({ access: localStorage.getItem("access"), refresh: localStorage.getItem("refresh") }),
 *   saveTokens: async (a, r) => { localStorage.setItem("access", a); localStorage.setItem("refresh", r); },
 * })
 */
export const setAuthHandlers = (handlers: {
  onLogout: () => void;
  getTokens?: () => Promise<{ access: string | null; refresh: string | null }>;
  saveTokens?: (access: string, refresh: string) => Promise<void>;
}) => {
  onLogout = handlers.onLogout;
  getTokens = handlers.getTokens || null;
  saveTokens = handlers.saveTokens || null;
};

/* ============================================================
 * 🔹 HANDLER DE CONQUISTAS (ACHIEVEMENTS)
 * ============================================================
 */

let showAchievements: ((achievements: string[]) => void) | null = null;

/**
 * Registra uma função global que será chamada quando conquistas forem desbloqueadas.
 *
 * Exemplo:
 * registerAchievementHandler((achievements) => {
 *   abrirModalDeConquistas(achievements)
 * })
 */
export const registerAchievementHandler = (
  fn: (achievements: string[]) => void
) => {
  showAchievements = fn;
};

/* ============================================================
 * 🔹 INTERCEPTOR DE RESPOSTA
 * ============================================================
 */

/**
 * Intercepta todas as respostas da API.
 *
 * - Exibe conquistas se o backend retornar `unlocked_achievements`
 * - Faz refresh automático do token caso receba um erro 401 (Unauthorized)
 */
api.interceptors.response.use(
  // Trata respostas bem-sucedidas
  (response) => {
    const achievements = response?.data?.unlocked_achievements;
    if (
      Array.isArray(achievements) &&
      achievements.length > 0 &&
      showAchievements
    ) {
      showAchievements(achievements);
    }
    return response;
  },

  // Trata erros e tenta atualizar o token se for 401
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Se for 401 (token inválido) e ainda não tentou atualizar
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!getTokens || !onLogout) {
        onLogout?.();
        return Promise.reject(error);
      }

      try {
        // Busca o refresh token atual
        const { refresh } = await getTokens();
        if (!refresh) {
          onLogout();
          return Promise.reject(error);
        }

        // Solicita novos tokens
        const res = await axios.post(`${apiUrl}refresh/`, { refresh });
        const { access: newAccess, refresh: newRefresh } = res.data;

        // Salva os novos tokens
        if (saveTokens) await saveTokens(newAccess, newRefresh);

        // Atualiza o header e refaz a requisição original
        if (originalRequest.headers)
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;

        return api(originalRequest);
      } catch (e) {
        onLogout?.();
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
