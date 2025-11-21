import React, { useState } from 'react';
import { router } from 'expo-router';
import { AuthSubmitButton } from '../components/AuthSubmitButton';
import { AuthBackContainer } from '../components/AuthBackContainter';
import { useAuthForm } from '../hooks/useAuth';
import AuthSignUpForm from '../components/AuthSignUpForm';
import { AuthFormCard } from '../components/AuthFormCard';

const SignUpScreen = () => {
  const { handleSignUp, error } = useAuthForm();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const textSubmit = 'Criar conta';
  const backText = 'Já tem uma conta?';
  const backLink = 'Entrar';

  return (
    <AuthFormCard
      welcomeText="Criar nova conta!"
      subtitleText="Preencha os dados para começar"
      error={error}
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
      />

      <AuthSubmitButton
        handleSubmit={() => handleSignUp(name, email, password)}
        textSubmit={textSubmit}
      />
      <AuthBackContainer
        backLink={backLink}
        backText={backText}
        handleBack={() => router.push('/(auth)/login')}
      />
    </AuthFormCard>
  );
};

export default SignUpScreen;
