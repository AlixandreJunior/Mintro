import React, { useState } from 'react';
import { router } from 'expo-router';
import { AuthSubmitButton } from '../components/AuthSubmitButton';
import { AuthBackContainer } from '../components/AuthBackContainter';
import { useAuthForm } from '../hooks/useAuth';
import AuthLoginForm from '../components/AuthLoginForm';
import { AuthFormCard } from '../components/AuthFormCard';
import { useToast } from '@/share/providers/ToastProvider'; // 🔹 import Toast

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const welcomeText = 'Bem-vindo de volta!';
  const subtitleText = 'Entre na sua conta para continuar';
  const textSubmit = 'Entrar';
  const backText = 'Não tem uma conta?';
  const backLink = 'Criar conta';

  const { handleLogin, error } = useAuthForm();
  const { showToast } = useToast();

  const handleSubmit = async () => {
    try {
      const result = await handleLogin(email, password);
      showToast('Login realizado com sucesso!', 'success');
      router.push('/(app)/(tabs)/activity');
    } catch (err) {
      showToast('Falha ao fazer login!', 'error');
    }
  };

  return (
    <AuthFormCard
      welcomeText={welcomeText}
      subtitleText={subtitleText}
      error={error?.detail}
    >
      <AuthLoginForm
        email={email}
        password={password}
        showPassword={showPassword}
        setEmail={setEmail}
        setPassword={setPassword}
        setShowPassword={setShowPassword}
        errors={error}
      />

      <AuthSubmitButton handleSubmit={handleSubmit} textSubmit={textSubmit} />

      <AuthBackContainer
        backLink={backLink}
        backText={backText}
        handleBack={() => router.push('/(auth)/signup')}
      />
    </AuthFormCard>
  );
};

export default LoginScreen;
