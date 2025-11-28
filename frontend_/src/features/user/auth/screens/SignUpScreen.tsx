import React, { useState } from 'react';
import { router } from 'expo-router';
import { AuthSubmitButton } from '../components/AuthSubmitButton';
import { AuthBackContainer } from '../components/AuthBackContainter';
import { useAuthForm } from '../hooks/useAuth';
import AuthSignUpForm from '../components/AuthSignUpForm';
import { AuthFormCard } from '../components/AuthFormCard';
import { useToast } from '@/share/providers/ToastProvider';

const SignUpScreen = () => {
  const { handleSignUp, error } = useAuthForm();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const textSubmit = 'Criar conta';
  const backText = 'Já tem uma conta?';
  const backLink = 'Entrar';

  const handleSubmit = async () => {
    try {
      await handleSignUp(name, email, password);
      showToast('Conta criada com sucesso!', 'success');
      router.push('/(auth)/login');
    } catch (err) {
      showToast('Erro ao criar conta!', 'error');
    }
  };

  return (
    <AuthFormCard
      welcomeText="Criar nova conta!"
      subtitleText="Preencha os dados para começar"
      error={error?.detail}
    >
      <AuthSignUpForm
        email={email}
        name={name}
        password={password}
        showPassword={showPassword}
        setEmail={setEmail}
        setName={setName}
        setPassword={setPassword}
        setShowPassword={setShowPassword}
        errors={error}
      />

      <AuthSubmitButton handleSubmit={handleSubmit} textSubmit={textSubmit} />

      <AuthBackContainer
        backLink={backLink}
        backText={backText}
        handleBack={() => router.push('/(auth)/login')}
      />
    </AuthFormCard>
  );
};

export default SignUpScreen;
