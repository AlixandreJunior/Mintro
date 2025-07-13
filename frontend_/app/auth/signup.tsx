import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView, SafeAreaView, } from 'react-native';
import { Lock, Mail } from 'lucide-react-native';

import MintroLogo from '@/components/Layout/MintroLogo';
import { EntryFormCard } from '@/components/Cards/EntryFormCard';
import { EntryInput } from '@/components/Inputs/EntryInput';
import { useSignUpForm } from '@/hooks/forms/useSignUpForm';

const { width, height } = Dimensions.get('window');

export default function SignUpScreen() {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    togglePasswordVisibility,
    error,
    handleSubmit,
    handleBackToLogin,
  } = useSignUpForm();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <MintroLogo />
        <View style={styles.content}>
          <EntryFormCard
            welcomeText="Criar nova conta!"
            subtitleText="Preencha os dados para começar"
            error={error}
            handleSubmit={handleSubmit}
            textSubmit="Criar conta"
            handleBack={handleBackToLogin}
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9F8',
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
