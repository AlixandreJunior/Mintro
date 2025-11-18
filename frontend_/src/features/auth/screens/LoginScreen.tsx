import React, { useState } from 'react';
import { router } from 'expo-router';
import { AuthSubmitButton } from '../components/AuthSubmitButton';
import { AuthBackContainer } from '../components/AuthBackContainter';
import { useAuthForm } from '../hooks/useAuth';
import AuthLoginForm from '../components/AuthLoginForm';
import { AuthFormCard } from '../components/AuthFormCard';

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

  return (
    <AuthFormCard
      welcomeText={welcomeText}
      subtitleText={subtitleText}
      error={error}
    >
      <AuthLoginForm
        email={email}
        password={password}
        showPassword={showPassword}
        setEmail={setEmail}
        setPassword={setPassword}
        setShowPassword={setShowPassword}
      />

      <AuthSubmitButton
        handleSubmit={() => handleLogin(email, password)}
        textSubmit={textSubmit}
      />
      <AuthBackContainer
        backLink={backLink}
        backText={backText}
        handleBack={() => router.push('/(auth)/signup')}
      />
    </AuthFormCard>
  );
};
export default LoginScreen;
