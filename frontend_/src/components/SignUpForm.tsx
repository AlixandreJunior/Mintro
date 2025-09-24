import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Lock, Mail } from 'lucide-react-native';

import { EntryFormCard } from '@/components/specific/EntryFormCard';
import { EntryInput } from '@/components/ui/inputs/EntryInput';
import { useAuthForm } from '@/hooks/useAuth';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const SignUpForm = () => {
  const { handleSignUp } = useAuthForm();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <View style={styles.content}>
      <EntryFormCard
        welcomeText="Criar nova conta!"
        subtitleText="Preencha os dados para começar"
        error={error}
        handleSubmit={() => handleSignUp(name, email, password, setError)}
        textSubmit="Criar conta"
        handleBack={() => router.push('/(auth)/login')}
        backText="Já tem uma conta?"
        backLink="Entrar"
      >
        <EntryInput
          labelText="Nome de Usuário"
          keyboardType="default"
          onChange={setName}
          value={name}
          placeholder="Digite seu nome completo"
        />
        <EntryInput
          labelText="Email"
          keyboardType="email-address"
          onChange={setEmail}
          value={email}
          placeholder="Digite seu email"
          icon={<Mail size={20} color="#9CA3AF" style={styles.inputIcon} />}
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
          icon={<Lock size={20} color="#9CA3AF" style={styles.inputIcon} />}
        />
      </EntryFormCard>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: width * 0.06,
    paddingBottom: height * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputIcon: {
    marginRight: 12,
  },
});

export default SignUpForm;
