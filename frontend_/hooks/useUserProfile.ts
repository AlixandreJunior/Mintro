// hooks/useUserProfile.ts
import { useState, useEffect } from 'react';
import { getUser } from '@/services/user/getUser';
import { getGoals } from '@/services/goals/getGoals';
import { User } from '@/types/user/user';
import { Goal } from '@/types/user/goal';

export function useUserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [goals, setGoals] = useState<Goal | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingGoals, setLoadingGoals] = useState(true);
  const [errorUser, setErrorUser] = useState<string | null>(null);
  const [errorGoals, setErrorGoals] = useState<string | null>(null);

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

  return {
    user,
    goals,
    loadingUser,
    loadingGoals,
    errorUser,
    errorGoals,
  };
}
