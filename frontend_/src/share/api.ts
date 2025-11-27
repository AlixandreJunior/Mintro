import axios, { AxiosRequestConfig, AxiosError, AxiosInstance } from 'axios';

const apiUrl = 'http://127.0.0.1:8000/';

const api: AxiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
});

console.log('API URL:', apiUrl);

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

let showAchievements: ((achievements: string[]) => void) | null = null;

export const registerAchievementHandler = (
  fn: (achievements: string[]) => void
) => {
  showAchievements = fn;
};

api.interceptors.request.use(async (config) => {
  if (getTokens && config.headers) {
    const { access } = await getTokens();
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }
  }
  return config;
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (error?: unknown) => void;
  request: AxiosRequestConfig;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      if (prom.request.headers && token) {
        prom.request.headers.Authorization = `Bearer ${token}`;
      }
      prom.resolve(api(prom.request));
    }
  });
  failedQueue = [];
};

const refreshToken = async () => {
  if (!getTokens) throw new Error('getTokens handler not defined');

  const { refresh } = await getTokens();
  if (!refresh) throw new Error('No refresh token available');

  const res = await axios.post(`${apiUrl}user/auth/refresh/`, { refresh });
  const { access: newAccess, refresh: newRefresh } = res.data;

  if (saveTokens) await saveTokens(newAccess, newRefresh);

  return newAccess;
};

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

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (!getTokens || !onLogout) {
        onLogout?.();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // Fila requests enquanto o refresh acontece
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, request: originalRequest });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newAccess = await refreshToken();
        processQueue(null, newAccess);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        onLogout?.();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
