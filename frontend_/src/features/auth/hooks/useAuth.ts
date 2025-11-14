import { useAuth } from '@/share/context/AuthContext';
import { useRouter } from 'expo-router';
import { AuthService } from '../AuthService';
import { useHandleRequest } from '@/share/hooks/useHandleRequest';

export function useAuthForm() {
  const { error, handleRequest, loading } = useHandleRequest();
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    const data = await handleRequest(() => AuthService.login(email, password));
    login(data.access, data.refresh);
    return data;
  };

  const handleSignUp = async (
    username: string,
    email: string,
    password: string
  ) => {
    const data = await handleRequest(() =>
      AuthService.signUp(username, email, password)
    );
    router.push('/(app)/(tabs)/mental');
    return data;
  };

  return { handleLogin, handleSignUp, error, loading };
}
