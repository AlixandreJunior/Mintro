import React, { useState } from 'react';
import { View, StyleSheet, useWindowDimensions, Alert } from 'react-native';
import { Mail, Lock } from 'lucide-react-native';
import { router } from 'expo-router';
import { EntryFormCard } from '@/share/components/specific/EntryFormCard';
import { EntryInput } from '@/share/components/ui/inputs/EntryInput';
import { useAuthForm } from '@/share/hooks/useAuth';

const iconProps = { size: 20, color: '#9CA3AF', style: { marginRight: 12 } };

const LoginScreen = () => {
  const { height, width } = useWindowDimensions();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const { handleLogin } = useAuthForm();

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
        handleSubmit={() => {
          handleLogin(email, password, setError);
        }}
        textSubmit="Entrar"
        handleBack={() => router.push('/(auth)/signup')}
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
            setShowSecureText: () => setShowPassword((prev) => !prev),
          }}
          icon={<Lock {...iconProps} />}
        />
      </EntryFormCard>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;
