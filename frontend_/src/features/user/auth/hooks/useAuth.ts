import { useAuth } from '@/share/context/AuthContext';
import { useRouter } from 'expo-router';
import { AuthService } from '../AuthService';
import { useHandleRequest } from '@/share/hooks/useHandleRequest';

export function useAuthForm() {
  const { error, handleRequest, loading } = useHandleRequest();
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    try {
      const data = await handleRequest(() =>
        AuthService.login(email, password)
      );
      login(data.access, data.refresh);
      return data;
    } catch (err: any) {
      console.log('Erros de login:', err);
      throw err;
    }
  };

  const handleSignUp = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      await handleRequest(() => AuthService.signUp(username, email, password));
      router.push('/(auth)/login');
    } catch (err: any) {
      console.log('Erros de signup:', err);
      throw err;
    }
  };

  return { handleLogin, handleSignUp, error, loading };
}
