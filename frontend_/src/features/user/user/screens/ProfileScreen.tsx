import { Dimensions, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { UserInfoSection } from '@/features/user/user/components/UserInfoSection';
import { StatsSection } from '@/features/user/user/components/StatsSection';
import AchievementSection from '../../achievement/components/AchievementsSection';
import { useUser } from '../hooks/useUser';
import { useAuthForm } from '../../auth/hooks/useAuth';
import { User } from '@/share/types/user/user';
import { useEffect, useState } from 'react';

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await handleUserRetrieve();
      setUser(data);
    };
    load();
  });

  const { handleUserRetrieve, error, loading } = useUser();
  const { handleLogout } = useAuthForm();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <UserInfoSection user={user} onLogout={handleLogout} />
        <StatsSection
          fetchedUser={user}
          loadingUser={loading}
          errorUser={error}
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
