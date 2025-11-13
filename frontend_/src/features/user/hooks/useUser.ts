import { useState, useEffect } from 'react';
import { getUser } from '@/api/services/user/getUser';
import { logout as logoutRequest } from '@/api/services/auth/logout'; // importe a função de logout
import { User } from '@/share/types/user/user';
import { router } from 'expo-router';
import { useAuth } from '@/share/context/AuthContext';

export function useUserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [errorUser, setErrorUser] = useState<string | null>(null);
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const [logoutSuccess, setLogoutSuccess] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoadingUser(true);
      setErrorUser(null);
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (err: any) {
        setErrorUser(err.message || 'Falha ao carregar dados do usuário.');
        console.error('Erro ao buscar usuário:', err);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    setLogoutError(null);
    setLogoutSuccess(false);
    try {
      await logoutRequest();
      setLogoutSuccess(true);
      setUser(null);
      const { logout } = useAuth();
      await logout();
      router.push('/(auth)/login');
    } catch (err: any) {
      setLogoutError(err.message || 'Erro ao fazer logout.');
      console.error('Erro no logout:', err);
    }
  };

  return {
    user,
    loadingUser,
    errorUser,
    handleLogout,
    logoutError,
    logoutSuccess,
  };
}
