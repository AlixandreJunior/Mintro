import { useState, useEffect } from 'react';
import { getUser } from '@/src/services/user/getUser';
import { getGoals } from '@/src/services/goals/getGoals';
import { logout } from '@/src/services/auth/logout'; // importe a função de logout
import { User } from '@/src/types/user/user';
import { Goal } from '@/types/user/goal';
import { router } from 'expo-router';

export function useUserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [goals, setGoals] = useState<Goal | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingGoals, setLoadingGoals] = useState(true);
  const [errorUser, setErrorUser] = useState<string | null>(null);
  const [errorGoals, setErrorGoals] = useState<string | null>(null);
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

    const fetchGoals = async () => {
      setLoadingGoals(true);
      setErrorGoals(null);
      try {
        const goalsData = await getGoals();
        setGoals(goalsData);
      } catch (err: any) {
        setErrorGoals(err.message || 'Falha ao carregar metas.');
        console.error('Erro ao buscar metas:', err);
      } finally {
        setLoadingGoals(false);
      }
    };

    fetchUser();
    fetchGoals();
  }, []);

  const handleLogout = async () => {
    setLogoutError(null);
    setLogoutSuccess(false);
    try {
      await logout();
      setLogoutSuccess(true);
      setUser(null);
      setGoals(null);
      router.push('/auth/login');
    } catch (err: any) {
      setLogoutError(err.message || 'Erro ao fazer logout.');
      console.error('Erro no logout:', err);
    }
  };

  return {
    user,
    goals,
    loadingUser,
    loadingGoals,
    errorUser,
    errorGoals,
    handleLogout,
    logoutError,
    logoutSuccess,
  };
}
