import React from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import Header from '@/components/layout/Header';
import { UserInfoSection } from '@/components/UserInfoSection';
import { StatsSection } from '@/components/StatsSection';
import { useUserProfile } from '@/hooks/useUserProfile';
import AchievementsCarousel from '@/components/AchievementsCarousel';

const { width } = Dimensions.get('window');
const screenContentPaddingHorizontal = width * 0.05;

const ProfileScreen = () => {
  const { user, loadingUser, errorUser, handleLogout } = useUserProfile();

  const avatarChar = user?.username
    ? user.username.charAt(0).toUpperCase()
    : 'A';

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header avatarChar={avatarChar} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <UserInfoSection
          user={user}
          onLogout={handleLogout}
        />
        <StatsSection
          fetchedUser={user}
          loadingUser={loadingUser}
          errorUser={errorUser}
        />
        <AchievementsCarousel/>
      </ScrollView>
    </SafeAreaView>
  );
};

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

export default ProfileScreen;
