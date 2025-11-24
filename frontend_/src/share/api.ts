import axios, { AxiosRequestConfig, AxiosError, AxiosInstance } from 'axios';

const apiUrl = 'http://127.0.0.1:8000/';

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
 * 🔹 HANDLER DE CONQUISTAS
 * ============================================================
 */

let showAchievements: ((achievements: string[]) => void) | null = null;

export const registerAchievementHandler = (
  fn: (achievements: string[]) => void
) => {
  showAchievements = fn;
};

/* ============================================================
 * 🔹 INTERCEPTOR DE REQUEST → INJETAR TOKEN AUTOMATICAMENTE
 * ============================================================
 */

api.interceptors.request.use(async (config) => {
  if (getTokens && config.headers) {
    const { access } = await getTokens();
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }
  }
  return config;
});

/* ============================================================
 * 🔹 INTERCEPTOR DE RESPONSE → REFRESH TOKEN
 * ============================================================
 */

api.interceptors.response.use(
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

  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Token expirado
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!getTokens || !onLogout) {
        onLogout?.();
        return Promise.reject(error);
      }

      try {
        // Recupera tokens
        const { refresh } = await getTokens();

        if (!refresh) {
          onLogout();
          return Promise.reject(error);
        }

        // Solicita um novo token
        const res = await axios.post(`${apiUrl}user/auth/refresh/`, {
          refresh,
        });
        const { access: newAccess, refresh: newRefresh } = res.data;

        // Salva novos tokens
        if (saveTokens) await saveTokens(newAccess, newRefresh);

        // Reenvia com novo token
        if (originalRequest.headers)
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;

        return api(originalRequest);
      } catch (refreshError) {
        onLogout?.();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
