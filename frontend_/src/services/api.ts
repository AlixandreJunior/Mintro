// services/api.ts
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

const apiUrl = 'http://192.168.1.5:8000/api/';

const api = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
});

console.log('API URL:', apiUrl);

// 🔹 Handlers de autenticação
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

// 🔹 Handler global para conquistas
let showAchievements: ((achievements: string[]) => void) | null = null;
export const registerAchievementHandler = (
  fn: (achievements: string[]) => void
) => {
  showAchievements = fn;
};

// 🔹 Interceptor de resposta
api.interceptors.response.use(
  (response) => {
    // Se vier unlocked_achievements, dispara o modal
    if (response?.data?.unlocked_achievements && showAchievements) {
      const achievements = response.data.unlocked_achievements;
      if (Array.isArray(achievements) && achievements.length > 0) {
        showAchievements(achievements);
      }
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // 🔹 Refresh token se receber 401
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!getTokens || !onLogout) {
        onLogout?.();
        return Promise.reject(error);
      }

      try {
        const { refresh } = await getTokens();
        if (!refresh) {
          onLogout();
          return Promise.reject(error);
        }

        const res = await axios.post(`${apiUrl}refresh/`, { refresh });
        const newAccess = res.data.access;
        const newRefresh = res.data.refresh;

        if (saveTokens) {
          await saveTokens(newAccess, newRefresh);
        }

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        }

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
