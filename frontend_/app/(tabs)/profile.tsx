import React from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import Header from '@/components/Layout/Header';
import { UserInfoSection } from '@/components/UserInfoSection';
import { StatsSection } from '@/components/StatsSection';
import { useUserProfile } from '@/hooks/useUserProfile';
import AchievementsCarousel from '@/components/AchievementsCarousel';
import { useAchievements } from '@/hooks/useAchievements'; // hook de conquistas

const { width, height } = Dimensions.get('window');
const screenContentPaddingHorizontal = width * 0.05;

export default function ProfileScreen() {
  const { user, loadingUser, errorUser } = useUserProfile();
  const { achievements, userAchievements, loading, error } = useAchievements();


  const displayName = user?.username || 'Carregando...';
  const joinYear = user?.created_at ? new Date(user.created_at).getFullYear() : 'N/A';
  const avatarChar = user?.username ? user.username.charAt(0).toUpperCase() : 'A';

  const isReady =
    !loading && !error &&
    !loadingUser && !errorUser &&
    achievements.length > 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header avatarChar={avatarChar} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <UserInfoSection avatarChar={avatarChar} displayName={displayName} joinYear={joinYear} />
        <StatsSection fetchedUser={user} loadingUser={loadingUser} errorUser={errorUser} />

        {isReady && (
          <AchievementsCarousel
            achievements={achievements}
            userAchievements={userAchievements}  // Passa o progresso do usuário
          />
        )}
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
