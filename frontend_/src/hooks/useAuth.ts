import { Alert } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { login as loginService } from '@/services/auth/login';
import { createAccount } from '@/services/user/createAccount';
import { useRouter } from 'expo-router';

export function useAuthForm() {
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (
    email: string,
    password: string,
    setError: (msg: string) => void
  ) => {
    setError('');
    try {
      const data = await loginService(email, password);
      login(data.access, data.refresh);
    } catch (err: any) {
      const message = err.message || 'Erro inesperado ao fazer login.';
      setError(message);
      Alert.alert('Erro', message);
    }
  };

  const handleSignUp = async (
    name: string,
    email: string,
    password: string,
    setError: (msg: string) => void
  ) => {
    setError('');

    if (!name.trim()) {
      setError('Nome é obrigatório');
      return;
    }
    if (!email.trim()) {
      setError('Email é obrigatório');
      return;
    }
    if (password.length < 6) {
      setError('Senha deve ter pelo menos 6 caracteres');
      return;
    }

    try {
      await createAccount(name, email, password);
      router.push('/(app)/(tabs)/mental');
    } catch (err: any) {
      const message = err.message || 'Erro inesperado ao criar conta.';
      setError(message);
      Alert.alert('Erro', message);
    }
  };

  return { handleLogin, handleSignUp };
}
