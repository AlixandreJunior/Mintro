import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Mail, Lock } from 'lucide-react-native';
import { router } from 'expo-router';

import MintroLogo from '@/components/layout/MintroLogo';
import { EntryFormCard } from '@/components/specific/EntryFormCard';
import { EntryInput } from '@/components/ui/inputs/EntryInput';
import { useLoginForm } from '@/hooks/forms/useLoginForm';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
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
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <MintroLogo />
        <View style={styles.content}>
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9f8',
  },
  scrollContent: {
    flexGrow: 1,
    minHeight: height,
  },
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

export default LoginScreen;
