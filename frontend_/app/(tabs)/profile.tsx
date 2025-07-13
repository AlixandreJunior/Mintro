import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Header from '@/components/Layout/Header';
import { UserInfoSection } from '@/components/UserInfoSection';
import { StatsSection } from '@/components/StatsSection';
import { useUserProfile } from '@/hooks/useUserProfile';

const screenContentPaddingHorizontal = 20;

export default function ProfileScreen() {
  const {
    user,
    goals,
    loadingUser,
    loadingGoals,
    errorUser,
    errorGoals,
  } = useUserProfile();

  const displayName = user?.username || 'Carregando...';
  const joinYear = user?.created_at
    ? new Date(user.created_at).getFullYear()
    : 'N/A';
  const avatarChar = user?.username
    ? user.username.charAt(0).toUpperCase()
    : 'A';

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header avatarChar={avatarChar} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <UserInfoSection
          avatarChar={avatarChar}
          displayName={displayName}
          joinYear={joinYear}
        />
        <StatsSection
          fetchedUser={user}
          userGoals={goals}
          loadingGoals={loadingGoals}
          loadingUser={loadingUser}
          errorGoals={errorGoals}
          errorUser={errorUser}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    marginTop: 10,
    paddingBottom: 20,
    paddingHorizontal: screenContentPaddingHorizontal,
    backgroundColor: '#fff',
  },
});
