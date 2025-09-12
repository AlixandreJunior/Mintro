import React from 'react';
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';

import MintroLogo from '@/components/layout/MintroLogo';
import SignUpForm from '@/components/SignUpForm';

const SignUpScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <MintroLogo />
        <SignUpForm />
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

export default SignUpScreen;
