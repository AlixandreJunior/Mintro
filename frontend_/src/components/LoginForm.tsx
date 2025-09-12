import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { Mail, Lock } from 'lucide-react-native';
import { router } from 'expo-router';
import { EntryFormCard } from '@/components/specific/EntryFormCard';
import { EntryInput } from '@/components/ui/inputs/EntryInput';
import { useLoginForm } from '@/hooks/forms/useLoginForm';

const LoginForm = () => {
  const { height, width } = useWindowDimensions();

  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    togglePasswordVisibility,
    error,
    handleLogin,
  } = useLoginForm();

  return (
    <View
      style={[
        styles.content,
        {
          paddingHorizontal: width * 0.06,
          paddingBottom: height * 0.05,
        },
      ]}
    >
      <EntryFormCard
        welcomeText="Bem-vindo de volta!"
        subtitleText="Entre na sua conta para continuar"
        error={error}
        handleSubmit={handleLogin}
        textSubmit="Entrar"
        handleBack={() => router.push('/auth/signup')}
        backText="Não tem uma conta?"
        backLink="Criar conta"
      >
        <EntryInput
          labelText="Email"
          keyboardType="email-address"
          onChange={setEmail}
          value={email}
          placeholder="Digite seu email"
          icon={<Mail {...iconProps} />}
        />

        <EntryInput
          labelText="Senha"
          keyboardType="default"
          onChange={setPassword}
          value={password}
          placeholder="Digite sua senha"
          secureText={{
            showSecureText: showPassword,
            setShowSecureText: togglePasswordVisibility,
          }}
          icon={<Lock {...iconProps} />}
        />
      </EntryFormCard>
    </View>
  );
};

const iconProps = { size: 20, color: '#9CA3AF', style: { marginRight: 12 } };

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginForm;
