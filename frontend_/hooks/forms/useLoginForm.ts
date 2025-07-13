import { useState } from 'react';
import { Alert } from 'react-native';
import { login as loginService } from '@/services/auth/login';
import { useAuth } from '@/context/AuthContext';

export function useLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const data = await loginService(email, password);
      login(data.access, data.refresh);
    } catch (err: any) {
      const message = err.message || 'Erro inesperado ao fazer login.';
      setError(message);
      Alert.alert('Erro', message);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    togglePasswordVisibility: () => setShowPassword((prev) => !prev),
    error,
    handleLogin,
  };
}
