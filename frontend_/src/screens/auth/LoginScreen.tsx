import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import MintroLogo from '@/components/layout/MintroLogo';
import LoginForm from '@/components/LoginForm';

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <MintroLogo />
        <LoginForm />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9F8',
  },
  scrollContent: {
    flexGrow: 1,
  },
});

export default LoginScreen;
