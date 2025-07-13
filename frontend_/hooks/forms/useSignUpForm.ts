import { useState } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { createAccount } from '@/services/user/createAccount';

export function useSignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = async () => {
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
      router.push('/(tabs)/mental');
    } catch (err: any) {
      Alert.alert('Erro', err.message || 'Erro inesperado ao criar conta.');
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    togglePasswordVisibility: () => setShowPassword((prev) => !prev),
    error,
    handleSubmit,
    handleBackToLogin: () => router.push('/auth/login'),
  };
}
