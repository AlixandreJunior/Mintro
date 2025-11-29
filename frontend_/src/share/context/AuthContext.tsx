import React, { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { setAuthHandlers } from '@/share/api';
import { AuthService } from '@/features/user/auth/AuthService';
import * as Notifications from 'expo-notifications';
import { useReminder } from '@/features/user/reminder/hooks/useReminder';
import { useToast } from '@/share/providers/ToastProvider';
import { useNotification } from '@/features/user/reminder/hooks/useNotification';

const isWeb = Platform.OS === 'web';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => Promise<void>;
  accessToken: string | null;
  refreshToken: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const { scheduleOnce, scheduleDaily } = useNotification();
  const { handleReminderList } = useReminder();
  const { showToast } = useToast();

  const storeTokens = async (access: string, refresh: string) => {
    if (isWeb) {
      await AsyncStorage.setItem('accessToken', access);
      await AsyncStorage.setItem('refreshToken', refresh);
    } else {
      await SecureStore.setItemAsync('accessToken', access);
      await SecureStore.setItemAsync('refreshToken', refresh);
    }
  };

  const fetchTokens = async () => {
    const access = isWeb
      ? await AsyncStorage.getItem('accessToken')
      : await SecureStore.getItemAsync('accessToken');

    const refresh = isWeb
      ? await AsyncStorage.getItem('refreshToken')
      : await SecureStore.getItemAsync('refreshToken');

    return { access, refresh };
  };

  const loadTokens = async () => {
    const tokens = await fetchTokens();
    setAccessToken(tokens.access);
    setRefreshToken(tokens.refresh);
    setIsAuthenticated(!!tokens.access);
  };

  const clearTokens = async () => {
    if (isWeb) {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
    } else {
      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('refreshToken');
    }
  };

  const login = async (access: string, refresh: string) => {
    try {
      await storeTokens(access, refresh);

      setAccessToken(access);
      setRefreshToken(refresh);
      setIsAuthenticated(true);

      // 🔹 sincronizar reminders locais
      try {
        const reminders = await handleReminderList();
        for (const r of reminders) {
          const [hour, minute] = r.time.split(':').map(Number);
          const dateObj = new Date(`${r.date}T${r.time}`);

          if (r.is_daily) {
            const localId = await scheduleDaily(
              r.title,
              r.content,
              hour,
              minute,
              r.type
            );
            r.local_notification_id = localId;
          } else {
            const localId = await scheduleOnce(
              r.title,
              r.content,
              dateObj,
              r.type
            );
            r.local_notification_id = localId;
          }
        }
      } catch (err) {
        console.error('Erro ao sincronizar lembretes locais:', err);
        showToast('Não foi possível sincronizar lembretes locais.', 'error');
      }

      router.replace('/(app)/(tabs)/mental');
    } catch (err) {
      console.error('Erro no login:', err);
      showToast('Erro ao fazer login.', 'error');
    }
  };

  const logout = async () => {
    try {
      // 🔹 cancelar todas as notificações locais
      await Notifications.cancelAllScheduledNotificationsAsync();

      if (refreshToken) {
        await AuthService.logout(refreshToken);
      }

      await clearTokens();

      setAccessToken(null);
      setRefreshToken(null);
      setIsAuthenticated(false);

      router.replace('/(auth)/login');
    } catch (err) {
      console.error('Erro ao fazer logout:', err);
      showToast('Erro ao fazer logout.', 'error');
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      await loadTokens();
      setAuthHandlers({
        onLogout: logout,
        getTokens: fetchTokens,
        saveTokens: storeTokens,
      });
    };
    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, accessToken, refreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de <AuthProvider>');
  }
  return context;
};
