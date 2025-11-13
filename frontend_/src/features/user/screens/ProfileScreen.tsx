import { Dimensions, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { UserInfoSection } from '@/share/components/UserInfoSection';
import { StatsSection } from '@/share/components/StatsSection';
import { useUserProfile } from '@/share/hooks/useUserProfile';
import AchievementSection from '@/share/components/AchievementsSection';

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
  const { user, loadingUser, errorUser, handleLogout } = useUserProfile();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <UserInfoSection user={user} onLogout={handleLogout} />
        <StatsSection
          fetchedUser={user}
          loadingUser={loadingUser}
          errorUser={errorUser}
        />
        <AchievementSection />
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
    paddingHorizontal: width * 0.05,
    backgroundColor: '#fff',
  },
});

export default ProfileScreen;
